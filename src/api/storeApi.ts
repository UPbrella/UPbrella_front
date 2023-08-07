import { $axios } from "@/lib/axios";
import { TStoreAllRes } from "@/types/admin/StoreTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  ADMIN_STORES: () => `/stores`,
} as const;

export const getStores = async () => {
  const res = await $axios.get<TApiResponse<TStoreAllRes>>(API.ADMIN_STORES());
  return res.data;
};
