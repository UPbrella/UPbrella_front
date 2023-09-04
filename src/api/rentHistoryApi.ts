import { $axios } from "@/lib/axios";
import { TRentHistoriesParams, TRentHistoriesRes } from "@/types/admin/RentTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  RENT_HISTORY: () => `/rent/histories`,
  RENT_REFUND: (historyId: number) => `/rent/histories/refund/${historyId}`,
  RENT_PAYMENT: (historyId: number) => `/rent/histories/payment/${historyId}`,
} as const;

// 우산 대여 기록 전체 조회
export const getRentHistories = async ({ refunded, page, size }: TRentHistoriesParams) => {
  const _refunded = (() => {
    if (refunded === "all") {
      return undefined;
    }

    if (refunded === "notDone") {
      return false;
    }

    if (refunded === "done") {
      return true;
    }
  })();

  const res = await $axios.get<TApiResponse<TRentHistoriesRes>>(API.RENT_HISTORY(), {
    params: {
      refunded: _refunded,
      page,
      size,
    },
  });
  return res.data;
};

// 보증금 입금 여부 상태 토글
export const patchHistoriesPayment = async (historyId: number) => {
  await $axios.patch(API.RENT_PAYMENT(historyId));
};

// 보증금 환급 여부 상태 토글
export const patchHistoriesRefund = async (historyId: number) => {
  await $axios.patch(API.RENT_REFUND(historyId));
};
