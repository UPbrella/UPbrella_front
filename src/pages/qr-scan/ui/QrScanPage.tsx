import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { parseQr, type TScanned } from "@/pages/qr-scan/model/parseQr";
import { track, trackOnce } from "@/shared/lib/analytics";
import { getPlatform } from "@/shared/lib/platform";
import { reportError } from "@/shared/lib/sentry";

// 권한 허용 위치가 기기마다 달라 안내 문구를 나눔
const cameraGuideKey = () => {
  const ua = navigator.userAgent;

  if (getPlatform() === "ios_app") {
    return "qrScan.guide.iosApp";
  }
  if (/iPhone|iPad|iPod/.test(ua)) {
    return "qrScan.guide.ios";
  }
  if (ua.includes("Android")) {
    return "qrScan.guide.android";
  }
  return "qrScan.guide.desktop";
};

// 인식 순간 프레임을 이미지로 남김. stop()이 스트림을 끊으면 video가 검게 변해서 정지 화면으로 대신 보여줌
const captureFrame = (video: HTMLVideoElement) => {
  if (!video.videoWidth) {
    return "";
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d")?.drawImage(video, 0, 0);

  return canvas.toDataURL("image/jpeg", 0.8);
};

// qr-scanner가 원인 없이 "Camera not found."만 던져서, 권한 상태로 거부/카메라 없음을 추정
// 예: denied → 권한 거부, granted → 카메라 없음·사용 중, unsupported → Permissions API 미지원
const cameraPermission = async () => {
  try {
    const { state } = await navigator.permissions.query({ name: "camera" as PermissionName });
    return state;
  } catch {
    return "unsupported";
  }
};

const QrScanPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [scanned, setScanned] = useState<TScanned | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [frozenFrame, setFrozenFrame] = useState("");

  const start = useCallback(async () => {
    setScanned(null);
    setFrozenFrame("");
    setIsInvalid(false);
    setHasError(false);

    // qr-scanner는 권한 거부·카메라 없음을 구분하지 않고 "Camera not found."만 던짐 → 원인 대신 허용 방법 안내
    try {
      await scannerRef.current?.start();
      return true;
    } catch (error) {
      setHasError(true);

      const permission = await cameraPermission();
      track("qr_camera_error", { permission });
      reportError(
        new Error(`QR camera: ${error instanceof Error ? error.message : String(error)}`),
        {
          feature: "qr_scan",
          camera_permission: permission,
          secure_context: String(window.isSecureContext),
        }
      );
      return false;
    }
  }, []);

  // 화면 진입 시 바로 카메라 시작. 업브렐라 QR이 아니면 안내만 띄우고 계속 스캔
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    scannerRef.current = new QrScanner(
      videoRef.current,
      ({ data }) => {
        const result = parseQr(data, window.location.hostname);

        if (!result) {
          setIsInvalid(true);
          trackOnce("qr_scan_invalid", "qr_scan_invalid");
          return;
        }

        track("qr_scan_success", {
          kind: result.kind,
          ...(result.kind === "rent" ? { umbrella_id: Number(result.umbrellaId) } : {}),
        });

        if (videoRef.current) {
          setFrozenFrame(captureFrame(videoRef.current));
        }
        scannerRef.current?.stop();
        setScanned(result);
      },
      { preferredCamera: "environment", highlightScanRegion: true, returnDetailedScanResult: true }
    );

    // 카메라가 켜지기 전에 떠나면 qr-scanner가 start()를 성공으로 끝내서, 화면을 떠난 뒤엔 집계하지 않음
    let isMounted = true;

    track("view_qr_scan");
    start().then((isReady) => {
      if (isMounted && isReady) {
        track("qr_camera_ready");
      }
    });

    return () => {
      isMounted = false;
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, [start]);

  return (
    <div className="flex flex-col gap-[16px] mx-auto py-24 w-full max-w-[480px]">
      <div>
        <h1 className="font-semibold text-gray-700 text-20">{t("qrScan.title")}</h1>
        <p className="mt-4 text-gray-600 text-14">{t("qrScan.desc")}</p>
      </div>

      <div className="overflow-hidden relative bg-black rounded-20 aspect-square">
        <video ref={videoRef} className="object-cover w-full h-full" muted playsInline />

        {frozenFrame && (
          <img src={frozenFrame} alt="" className="object-cover absolute inset-0 w-full h-full" />
        )}

        {hasError && (
          <div className="flex absolute inset-0 flex-col gap-[12px] justify-center items-center p-24 text-center text-white bg-black">
            <p className="font-semibold text-15">{t("qrScan.error")}</p>
            <p className="text-gray-400 text-14">{t(cameraGuideKey())}</p>
            {/* iOS 앱은 거부 후 같은 페이지에서 재요청이 막혀 새로고침해야 다시 물어봄 */}
            <button
              type="button"
              className="py-8 px-16 font-semibold rounded-8 bg-primary-500 text-14"
              onClick={() => window.location.reload()}
            >
              {t("qrScan.retry")}
            </button>
          </div>
        )}
      </div>

      {isInvalid && !scanned && (
        <p className="text-center text-primary-600 text-14">{t("qrScan.invalid")}</p>
      )}

      {scanned && (
        <div className="flex flex-col gap-[12px] p-20 rounded-20 bg-primary-200">
          <p className="font-semibold text-center text-gray-700 text-16">
            {scanned.kind === "rent"
              ? t("qrScan.confirm", { id: scanned.umbrellaId })
              : t("qrScan.returnConfirm")}
          </p>
          <div className="flex gap-[8px]">
            <button
              type="button"
              className="flex-1 py-12 font-semibold text-gray-700 bg-white rounded-8 text-15"
              onClick={start}
            >
              {t("qrScan.rescan")}
            </button>
            <button
              type="button"
              className="flex-1 py-12 font-semibold text-white rounded-8 bg-primary-500 text-15"
              onClick={() => {
                track("qr_confirm", { kind: scanned.kind });
                navigate(scanned.path);
              }}
            >
              {scanned.kind === "rent" ? t("qrScan.rent") : t("qrScan.return")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrScanPage;
