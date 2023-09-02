import { $axios } from "@/lib/axios";
import { TRentHistory } from "@/types/admin/RentTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  RENT_HISTORY: () => `/rent/histories`,
} as const;

// 우산 대여 기록 전체 조회
export const getRentHistories = async () => {
  const res = await $axios.get<TApiResponse<{ rentalHistoryResponsePage: TRentHistory[] }>>(
    API.RENT_HISTORY()
  );
  return res.data;
};
