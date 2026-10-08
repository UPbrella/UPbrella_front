import assert from "node:assert/strict";
import { test } from "node:test";

import { excelFileName } from "./excel-name.ts";

test("파일명은 이름_YYYYMMDD.xlsx", () => {
  assert.equal(excelFileName("users", new Date("2026-10-08T12:00:00Z")), "users_20261008.xlsx");
});
