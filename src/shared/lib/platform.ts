// 접속 환경 구분. 웹·iOS 앱·Android 앱(TWA)이 같은 웹을 띄워서 GA4·Sentry에서 나눠 보려고 쓴다
//   iOS 앱:     WKWebView UA 끝에 "PWAShell"
//   Android 앱: TWA 첫 진입 referrer가 android-app://kr.co.upbrella.twa (이후 페이지엔 없음 → sessionStorage 보관)
export type TPlatform = "web" | "ios_app" | "android_app";

const IOS_APP_UA = "PWAShell";
const TWA_REFERRER = "android-app://kr.co.upbrella.twa";
const STORAGE_KEY = "upbrella-platform";

export const detectPlatform = (ua: string, referrer: string, stored: string | null): TPlatform => {
  if (ua.includes(IOS_APP_UA)) {
    return "ios_app";
  }
  if (referrer.startsWith(TWA_REFERRER) || stored === "android_app") {
    return "android_app";
  }
  return "web";
};

export const getPlatform = (): TPlatform => {
  const platform = detectPlatform(
    navigator.userAgent,
    document.referrer,
    sessionStorage.getItem(STORAGE_KEY)
  );

  sessionStorage.setItem(STORAGE_KEY, platform);
  return platform;
};
