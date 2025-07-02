import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  GET_RENT_HISTORIES: `/users/histories`,
} as const;

export const getClientRentHistories = async () => {
  const res = await $axios.get<TApiResponse<{ histories: TRentHistoriesRes[] }>>(
    API.GET_RENT_HISTORIES
  );
  return res.data;
};

export type TRentHistoriesRes = {
  isRefunded: boolean;
  isReturned: boolean;
  rentedAt: string; //ex. "2025-07-01 09:26:07";
  rentedStore: string;
  returnAt: string; //ex. "2025-07-15 09:26:07";
  umbrellaUuid: number;
};
