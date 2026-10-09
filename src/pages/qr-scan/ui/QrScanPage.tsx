import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { NOT_LAYOUT_ROUTES_URL } from "@/app/router/routes";

// 우산 QR 예: https://upbrella.co.kr/rent/form/3 → 3
const RENT_PATH = /^\/rent\/form\/(\d+)$/;
const QR_HOST = "upbrella.co.kr";

const parseUmbrellaId = (data: string) => {
  try {
    const { hostname, pathname } = new URL(data);
    const isOurHost =
      hostname === QR_HOST ||
      hostname.endsWith(`.${QR_HOST}`) ||
      hostname === window.location.hostname;

    if (!isOurHost) {
      return null;
    }

    return pathname.match(RENT_PATH)?.[1] ?? null;
  } catch {
    return null;
  }
};

// 권한 허용 위치가 기기마다 달라 안내 문구를 나눔. iOS 앱 WebView는 UA에 PWAShell이 붙음
const cameraGuideKey = () => {
  const ua = navigator.userAgent;

  if (ua.includes("PWAShell")) {
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

const QrScanPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [umbrellaId, setUmbrellaId] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [hasError, setHasError] = useState(false);

  const start = useCallback(async () => {
    setUmbrellaId(null);
    setIsInvalid(false);
    setHasError(false);

    // qr-scanner는 권한 거부·카메라 없음을 구분하지 않고 "Camera not found."만 던짐 → 원인 대신 허용 방법 안내
    try {
      await scannerRef.current?.start();
    } catch {
      setHasError(true);
    }
  }, []);

  // 화면 진입 시 바로 카메라 시작. 우산 QR이 아니면 안내만 띄우고 계속 스캔
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    scannerRef.current = new QrScanner(
      videoRef.current,
      ({ data }) => {
        const id = parseUmbrellaId(data);

        if (!id) {
          setIsInvalid(true);
          return;
        }

        scannerRef.current?.stop();
        setUmbrellaId(id);
      },
      { preferredCamera: "environment", highlightScanRegion: true, returnDetailedScanResult: true }
    );

    start();

    return () => {
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

      {isInvalid && !umbrellaId && (
        <p className="text-center text-primary-600 text-14">{t("qrScan.invalid")}</p>
      )}

      {umbrellaId && (
        <div className="flex flex-col gap-[12px] p-20 rounded-20 bg-primary-200">
          <p className="font-semibold text-center text-gray-700 text-16">
            {t("qrScan.confirm", { id: umbrellaId })}
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
              onClick={() => navigate(NOT_LAYOUT_ROUTES_URL.rent.path(umbrellaId))}
            >
              {t("qrScan.rent")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrScanPage;
