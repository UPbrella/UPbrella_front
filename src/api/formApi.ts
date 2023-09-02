import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import { TRentFormData } from "@/types/form/FormTypes";

const API = {
  RENT_FORM: (umbrellaId: number) => `/rent/form/${umbrellaId}`,
} as const;

// 대여폼 데이터 조회
export const getRentFormData = async (umbrellaId: number) => {
  const res = await $axios.get<TApiResponse<TRentFormData>>(API.RENT_FORM(umbrellaId));
  return res.data;
};
