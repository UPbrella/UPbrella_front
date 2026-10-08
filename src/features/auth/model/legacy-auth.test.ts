import assert from "node:assert/strict";
import { test } from "node:test";

import { readLegacyAuth } from "./legacy-auth.ts";

test("recoil-persist에 저장된 로그인 상태를 읽음", () => {
  const raw = JSON.stringify({ loginState: true, redirectUrl: "/members/mypage/rent" });

  assert.deepEqual(readLegacyAuth(raw), { isLogin: true, redirectUrl: "/members/mypage/rent" });
});

test("값이 없거나 깨졌으면 로그아웃 상태", () => {
  const fallback = { isLogin: false, redirectUrl: "/" };

  assert.deepEqual(readLegacyAuth(null), fallback);
  assert.deepEqual(readLegacyAuth("{not json"), fallback);
  assert.deepEqual(readLegacyAuth(JSON.stringify({ loginState: "yes", redirectUrl: 3 })), fallback);
});
