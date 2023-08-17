import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import {
  TStoreAllRes,
  TClassificationAllRes,
  TClassificationParams,
  TSubClassificationAllRes,
  TSubClassificationParams,
  TStoreImageParams,
} from "@/types/admin/StoreTypes";

const API = {
  ADMIN_STORES: () => `/stores`,
  ADMIN_IMAGE_UPLOAD: (id: number) => `/stores/${id}/images`,
  ADMIN_CLASSIFICATIONS: (id?: number) =>
    id ? `/stores/classifications/${id}` : "/stores/classifications/",
  ADMIN_SUBCLASSIFICATIONS: (id?: number) =>
    id ? `/stores/subClassifications/${id}` : "/stores/subClassifications",
} as const;

// 협업지점 전체 조회
export const getStores = async () => {
  const res = await $axios.get<TApiResponse<TStoreAllRes>>(API.ADMIN_STORES());
  return res.data;
};

// 협업지점 이미지 업로드
export const postStoreImage = async ({ storeId, imageFile }: TStoreImageParams) => {
  await $axios.post(API.ADMIN_IMAGE_UPLOAD(storeId), imageFile);
};

// 대분류 태그
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
