import {
  getRentHistories,
  patchHistoriesPayment,
  patchHistoriesRefund,
} from "@/api/rentHistoryApi";
import { TRentHistoriesParams } from "@/types/admin/RentTypes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const RENT_QUERY_KEYS = {
  rentHistories: () => ["rent-histories"],
} as const;

export const useRentHistories = (params: TRentHistoriesParams) => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...RENT_QUERY_KEYS.rentHistories(), { params }],
    queryFn: () => getRentHistories(params),
    select: (res) => {
      return {
        ...res.data,
        rentalHistoryResponsePage: res.data.rentalHistoryResponsePage.map((e) => {
          const isReturned = !!e.rentAt;
          const returnData = {
            refundCompleted: isReturned ? e.refundCompleted : null,
            bank: isReturned ? e.bank : null,
            accountNumber: isReturned ? e.accountNumber : null,
            returnAt: isReturned ? e.returnAt : null,
            returnStoreName: isReturned ? e.returnStoreName : null,
            totalRentalDay: isReturned ? e.totalRentalDay : null,
          };

          return {
            ...e,
            ...returnData,
          };
        }),
      };
    },
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
