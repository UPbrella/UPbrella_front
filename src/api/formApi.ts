import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import { TRentFormData, TRentDetail } from "@/types/form/FormTypes";

const API = {
  RENT_FORM: (umbrellaId: number) => `/rent/form/${umbrellaId}`,
  RENT: () => `/rent`,
} as const;

// 대여폼 데이터 조회
export const getRentFormData = async (umbrellaId: number) => {
  const res = await $axios.get<TApiResponse<TRentFormData>>(API.RENT_FORM(umbrellaId));
  return res.data;
};

// 우산 대여 신청
export const postRent = async (params: TRentDetail) => {
  await $axios.post(API.RENT(), params);
};
