import { getPlatform } from "@/shared/lib/platform";

// GA4 퍼널 이벤트 트래킹 — gtag는 index.html에서 전역 로드됨
export type TFunnelEvent =
  | "visit"
  | "view_map"
  | "view_store_detail"
  | "click_rent"
  | "view_login"
  | "complete_login"
  | "view_payment"
  | "copy_account"
  | "rent_complete"
  // QR 스캔: 진입 → 카메라 준비 → 인식 → 확인 (대여·반납은 kind 파라미터로 구분)
  | "view_qr_scan"
  | "qr_camera_ready"
  | "qr_camera_error"
  | "qr_scan_invalid"
  | "qr_scan_success"
  | "qr_confirm";

const SESSION_KEY_PREFIX = "upbrella-tracked:";

export const track = (event: TFunnelEvent, params?: Record<string, string | number | boolean>) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  const eventParams = import.meta.env.DEV ? { ...params, debug_mode: true } : params;

  window.gtag("event", event, eventParams);
};

// 같은 key는 세션당 1회만 전송 (예: 로그인 후 같은 페이지로 돌아와도 중복 집계 X)
export const trackOnce = (
  key: string,
  event: TFunnelEvent,
  params?: Record<string, string | number | boolean>
) => {
  const storageKey = SESSION_KEY_PREFIX + key;

  if (sessionStorage.getItem(storageKey)) {
    return;
  }

  sessionStorage.setItem(storageKey, "true");
  track(event, params);
};

export const trackVisitOnce = () => trackOnce("visit", "visit");

// 모든 이벤트에 붙는 사용자 속성. GA4에서 웹/iOS 앱/Android 앱별 퍼널을 나눠 보려고 설정
// (GA4 콘솔 > 맞춤 정의에 사용자 범위 "platform" 등록 필요)
export const setPlatformProperty = () => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("set", "user_properties", { platform: getPlatform() });
};
