import { $axios } from "@/lib/axios";
import {
  TStoreAllRes,
  TSubClassificationAllRes,
  TSubClassificationParams,
} from "@/types/admin/StoreTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  ADMIN_STORES: () => `/stores`,
  ADMIN_SUBCLASSIFICATIONS: (id?: number) =>
    id ? `/stores/subClassifications/${id}` : "/stores/subClassifications",
} as const;

// 협업지점 전체 조회
export const getStores = async () => {
  const res = await $axios.get<TApiResponse<TStoreAllRes>>(API.ADMIN_STORES());
  return res.data;
};

// 소분류 태그
export const getSubClassifications = async () => {
  const res = await $axios.get<TApiResponse<TSubClassificationAllRes>>(
    API.ADMIN_SUBCLASSIFICATIONS()
  );
  return res.data;
};

export const postSubClassification = async (params: TSubClassificationParams) => {
  await $axios.post(API.ADMIN_SUBCLASSIFICATIONS(), params);
};

export const deleteSubClassification = async (deleteId: number) => {
  await $axios.delete(API.ADMIN_SUBCLASSIFICATIONS(deleteId));
};
