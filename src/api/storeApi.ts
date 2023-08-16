import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import {
  TClassificationAllRes,
  TClassificationParams,
  TStoreAllRes,
} from "@/types/admin/StoreTypes";

const API = {
  ADMIN_STORES: () => `/stores`,
  ADMIN_CLASSIFICATIONS: (id?: number) =>
    id ? `/stores/classifications/${id}` : "/stores/classifications/",
} as const;

export const getStores = async () => {
  const res = await $axios.get<TApiResponse<TStoreAllRes>>(API.ADMIN_STORES());
  return res.data;
};

export const getClassifications = async () => {
  const res = await $axios.get<TApiResponse<TClassificationAllRes>>(API.ADMIN_CLASSIFICATIONS());
  return res.data;
};

export const postClassification = async (params: TClassificationParams) => {
  await $axios.post(API.ADMIN_CLASSIFICATIONS(), params);
};

export const deleteClassification = async (deleteId: number) => {
  await $axios.delete(API.ADMIN_CLASSIFICATIONS(deleteId));
};
