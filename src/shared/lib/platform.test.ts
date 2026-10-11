import assert from "node:assert/strict";
import { test } from "node:test";

import { detectPlatform, getPlatform } from "./platform.ts";

const IOS_APP_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1 PWAShell";
const IOS_SAFARI_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.0.1 Mobile/15E148 Safari/604.1";
const ANDROID_CHROME_UA =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";
const TWA_REFERRER = "android-app://kr.co.upbrella.twa/";

test("iOS 앱 WebView는 UA의 PWAShell로 판별", () => {
  assert.equal(detectPlatform(IOS_APP_UA, "", null), "ios_app");
});

test("Android TWA는 첫 진입 referrer로 판별", () => {
  assert.equal(detectPlatform(ANDROID_CHROME_UA, TWA_REFERRER, null), "android_app");
});

test("TWA referrer는 첫 진입에만 있어서 저장값으로 유지", () => {
  assert.equal(detectPlatform(ANDROID_CHROME_UA, "", "android_app"), "android_app");
});

test("그 외 브라우저는 web", () => {
  assert.equal(detectPlatform(IOS_SAFARI_UA, "", null), "web");
  assert.equal(detectPlatform(ANDROID_CHROME_UA, "https://www.google.com/", null), "web");
});

test("저장소 접근이 막힌 환경(비공개 모드 등)에서도 예외 없이 판별", () => {
  const throwing = () => {
    throw new Error("SecurityError");
  };
  Object.assign(globalThis, {
    document: { referrer: "" },
    sessionStorage: { getItem: throwing, setItem: throwing },
  });
  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: IOS_APP_UA },
    configurable: true,
  });

  assert.equal(getPlatform(), "ios_app");
});
