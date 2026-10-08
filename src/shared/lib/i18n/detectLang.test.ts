import assert from "node:assert/strict";
import { test } from "node:test";

import { detectLang } from "./detectLang.ts";

const GOOGLEBOT_UA =
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const NAVER_UA = "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)";
const CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

test("검색 봇은 브라우저 언어와 무관하게 ko", () => {
  assert.equal(detectLang(GOOGLEBOT_UA, "en-US"), "ko");
  assert.equal(detectLang(NAVER_UA, "en-US"), "ko");
});

test("일반 사용자는 브라우저 언어를 따름", () => {
  assert.equal(detectLang(CHROME_UA, "en-US"), "en");
  assert.equal(detectLang(CHROME_UA, "ko-KR"), "ko");
});
