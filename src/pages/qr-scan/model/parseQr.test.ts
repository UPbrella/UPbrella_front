import assert from "node:assert/strict";
import { test } from "node:test";

import { parseQr } from "./parseQr.ts";

const HOST = "upbrella.co.kr";

test("우산 QR → 대여", () => {
  assert.deepEqual(parseQr("https://upbrella.co.kr/rent/form/3", HOST), {
    kind: "rent",
    umbrellaId: "3",
    path: "/rent/form/3",
  });
});

test("대여소 QR → 반납, 쿼리 유지", () => {
  assert.deepEqual(parseQr("https://upbrella.co.kr/return/form?storeId=5", HOST), {
    kind: "return",
    path: "/return/form?storeId=5",
  });
});

test("보관함 QR → salt·signature까지 그대로 전달", () => {
  assert.deepEqual(
    parseQr("https://www.upbrella.co.kr/return/form?storeId=5&salt=a&signature=b", HOST),
    { kind: "return", path: "/return/form?storeId=5&salt=a&signature=b" }
  );
});

test("로컬·터널 등 현재 호스트에서 만든 QR도 허용", () => {
  assert.equal(parseQr("http://localhost:3000/rent/form/1", "localhost")?.kind, "rent");
});

test("업브렐라 QR이 아니면 null", () => {
  assert.equal(parseQr("https://evilupbrella.co.kr/rent/form/3", HOST), null);
  assert.equal(parseQr("https://upbrella.co.kr/return/form", HOST), null);
  assert.equal(parseQr("https://upbrella.co.kr/rentalLocation", HOST), null);
  assert.equal(parseQr("그냥 텍스트", HOST), null);
});

test("개발 하위 경로 QR은 앱 내부 경로로 변환", () => {
  assert.deepEqual(
    parseQr("https://home.test/upbrella-dev/rent/form/3", "home.test", "/upbrella-dev/"),
    {
      kind: "rent",
      umbrellaId: "3",
      path: "/rent/form/3",
    }
  );
  assert.deepEqual(
    parseQr(
      "https://home.test/upbrella-dev/return/form?storeId=5&salt=a&signature=b",
      "home.test",
      "/upbrella-dev/"
    ),
    {
      kind: "return",
      path: "/return/form?storeId=5&salt=a&signature=b",
    }
  );
});

test("개발 환경에서도 운영 QR과 경로가 다른 QR을 구분", () => {
  assert.equal(
    parseQr("https://upbrella.co.kr/rent/form/3", "home.test", "/upbrella-dev/")?.kind,
    "rent"
  );
  assert.equal(
    parseQr("https://home.test/upbrella-dev-other/rent/form/3", "home.test", "/upbrella-dev/"),
    null
  );
});
