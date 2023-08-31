import { getRentHistories } from "@/api/rentHistoryApi";
import { useQuery } from "react-query";

const RENT_QUERY_KEYS = {
  rentHistories: () => ["rent-histories"],
} as const;

export const useRentHistories = () => {
  return useQuery({
    queryKey: [...RENT_QUERY_KEYS.rentHistories()],
    queryFn: () => getRentHistories(),
    select: (res) =>
      res.data.rentalHistoryResponsePage.map((e) => ({ ...e, isReturned: !!e.rentAt })),
  });
};
