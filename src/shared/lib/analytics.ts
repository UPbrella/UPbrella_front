// GA4 퍼널 이벤트 트래킹 — gtag는 index.html에서 전역 로드됨
export type TFunnelEvent =
  | "visit"
  | "view_map"
  | "view_store_detail"
  | "click_rent"
  | "view_login"
  | "complete_login"
  | "view_payment"
  | "copy_account";

const VISIT_TRACKED_KEY = "upbrella-visit-tracked";

export const track = (event: TFunnelEvent, params?: Record<string, string | number | boolean>) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  const eventParams = import.meta.env.DEV ? { ...params, debug_mode: true } : params;

  window.gtag("event", event, eventParams);
};

// 세션당 최초 1회만 visit 이벤트 발생
export const trackVisitOnce = () => {
  if (sessionStorage.getItem(VISIT_TRACKED_KEY)) {
    return;
  }

  sessionStorage.setItem(VISIT_TRACKED_KEY, "true");
  track("visit");
};
