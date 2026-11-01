import type { QueryClient } from "@tanstack/react-query";

// 대여·반납 뒤 다시 불러올 지점·우산 재고 쿼리의 첫 키.
// "returnUmbrella"는 넣지 않는다. 다시 불러오면 완료 화면이 "이미 대여 중" 에러로 바뀐다.
const STOCK_QUERY_ROOTS = [
  "stores",
  "classifications",
  "storeList",
  "umbrellas",
  "umbrellas-statistics",
] as const;

export const invalidateStock = (client: QueryClient) =>
  Promise.all(STOCK_QUERY_ROOTS.map((root) => client.invalidateQueries({ queryKey: [root] })));
