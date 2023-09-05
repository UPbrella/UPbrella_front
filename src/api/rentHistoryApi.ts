import { $axios } from "@/lib/axios";
import { TRentHistory } from "@/types/admin/RentTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  RENT_HISTORY: () => `/admin/rent/histories`,
  RENT_REFUND: (historyId: number) => `/admin/rent/histories/refund/${historyId}`,
  RENT_PAYMENT: (historyId: number) => `/admin/rent/histories/payment/${historyId}`,
} as const;

// 우산 대여 기록 전체 조회
export const getRentHistories = async () => {
  const res = await $axios.get<TApiResponse<{ rentalHistoryResponsePage: TRentHistory[] }>>(
    API.RENT_HISTORY()
  );
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
