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

// 비공개 모드 등에서 sessionStorage 접근이 예외를 던짐. 앱 시작 시 호출되므로 막히면 저장 없이 판별만
const readStored = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStored = (platform: TPlatform) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, platform);
  } catch {
    // 저장 실패 시 TWA는 첫 페이지 이후 web으로 잡힘. 집계 일부 손실만 있고 동작엔 영향 없음
  }
};

export const getPlatform = (): TPlatform => {
  const platform = detectPlatform(navigator.userAgent, document.referrer, readStored());

  writeStored(platform);
  return platform;
};
