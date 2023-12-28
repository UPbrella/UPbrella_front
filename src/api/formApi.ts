import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import {
  TRentFormData,
  TReturnFormData,
  TReturnUmbrella,
  TReturnDetail,
  TRentDetail,
  TRentPassword,
  TRentLockerCountParams,
} from "@/types/form/FormTypes";

const API = {
  RENT_FORM: (umbrellaId: number) => `/rent/form/${umbrellaId}`,
  RENT: () => `/rent`,
  RETURN_FORM: (storeId: number, salt?: string, signature?: string) =>
    salt && signature
      ? `/return/form/${storeId}?salt=${salt}&signature=${signature}`
      : `/return/form/${storeId}`,
  RETURN_UMBRELLA: () => `users/loggedIn/umbrella`,
  RENT_LOCKER_COUNT: (storeMetaId: number) => `/lockers/${storeMetaId}`,
} as const;

// 대여폼 데이터 조회
export const getRentFormData = async (umbrellaId: number) => {
  const res = await $axios.get<TApiResponse<TRentFormData>>(API.RENT_FORM(umbrellaId));
  return res.data;
};

// 반납폼 데이터 조회
export const getReturnFormData = async (storeId: number) => {
  const res = await $axios.get<TApiResponse<TReturnFormData>>(API.RETURN_FORM(storeId));
  return res.data;
};

export const getReturnFormLockData = async (storeId: number, salt: string, signature: string) => {
  const res = await $axios.get<TApiResponse<TReturnFormData>>(
    API.RETURN_FORM(storeId, salt, signature)
  );
  return res.data;
};

// 우산 대여 신청
export const postRent = async (params: TRentDetail) => {
  const res = await $axios.post<TApiResponse<TRentPassword | null>>(API.RENT(), params);
  return res.data;
};

// 사용자가 빌린 우산 조회
export const getReturnUmbrella = async () => {
  const res = await $axios.get<TApiResponse<TReturnUmbrella>>(API.RETURN_UMBRELLA());
  return res.data;
};

// 우산 반납 신청
export const patchReturn = async (params: TReturnDetail) => {
  await $axios.patch(API.RENT(), params);
};

// 대여 시, 보관함 카운트 동기화
export const patchLockerCount = async ({ storeMetaId, count }: TRentLockerCountParams) => {
  const res = await $axios.patch<TApiResponse<TRentPassword>>(API.RENT_LOCKER_COUNT(storeMetaId), {
    count,
  });
  return res.data.data.password;
};
