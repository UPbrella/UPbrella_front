import {
  getRentHistories,
  patchHistoriesPayment,
  patchHistoriesRefund,
} from "@/api/rentHistoryApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

const RENT_QUERY_KEYS = {
  rentHistories: () => ["rent-histories"],
} as const;

export const useRentHistories = () => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...RENT_QUERY_KEYS.rentHistories()],
    queryFn: () => getRentHistories(),
    select: (res) =>
      res.data.rentalHistoryResponsePage.map((e) => ({ ...e, isReturned: !!e.rentAt })),
  });
};

export const usePatchPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (historyId: number) => patchHistoriesPayment(historyId),
    onSuccess: () => {
      queryClient.invalidateQueries(...RENT_QUERY_KEYS.rentHistories());
    },
  });
};

export const usePatchRefund = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (historyId: number) => patchHistoriesRefund(historyId),
    onSuccess: () => {
      queryClient.invalidateQueries(...RENT_QUERY_KEYS.rentHistories());
    },
  });
};
