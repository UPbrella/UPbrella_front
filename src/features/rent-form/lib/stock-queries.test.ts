import assert from "node:assert/strict";
import { test } from "node:test";
import { QueryClient } from "@tanstack/react-query";
import { invalidateStock } from "./stock-queries.ts";

test("대여·반납 뒤 재고 쿼리만 무효화하고 대여 상태 쿼리는 남긴다", async () => {
  const client = new QueryClient();
  const stockKeys = [
    ["stores", undefined],
    ["stores", 3],
    ["classifications", 1],
    ["storeList"],
    ["umbrellas", { page: 0 }],
    ["umbrellas-statistics", 3],
  ];
  const keptKeys = [["returnUmbrella"], ["rentFormData", 7]];
  for (const key of [...stockKeys, ...keptKeys]) {
    client.setQueryData(key, {});
  }

  await invalidateStock(client);

  for (const key of stockKeys) {
    assert.equal(client.getQueryState(key)?.isInvalidated, true, JSON.stringify(key));
  }
  for (const key of keptKeys) {
    assert.equal(client.getQueryState(key)?.isInvalidated, false, JSON.stringify(key));
  }
});
