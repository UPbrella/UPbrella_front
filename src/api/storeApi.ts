import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import {
  TStoreAllRes,
  TClassificationAllRes,
  TClassificationParams,
  TSubClassificationAllRes,
  TSubClassificationParams,
  TStoreParams,
  TStoreImageParams,
  TClassificationAllStore,
  TStoreListDetail,
  TStoreListRes,
} from "@/types/admin/StoreTypes";

const API = {
  ADMIN_STORES: (id?: number) => (id ? `/admin/stores/${id}` : `/stores`),
  ADMIN_IMAGE_UPLOAD: (id: number) => `/admin/stores/${id}/images`,
  ADMIN_IMAGE_DELETE: (id: number) => `/admin/stores/images/${id}`,
  ADMIN_CLASSIFICATIONS: (id?: number) =>
    id ? `/admin/stores/classifications/${id}` : "/admin/stores/classifications/",
  CLASSIFICATIONS: () => "/stores/classifications",
  ADMIN_SUBCLASSIFICATIONS: (id?: number) =>
    id ? `/admin/stores/subClassifications/${id}` : "/admin/stores/subClassifications",
  STORE_CLASSIFICATIONS: (id: number) => `/stores/classification/${id}`,
  STORE_LIST: () => "/stores/introductions",
  STORE_DETAIL: (id: number) => `/stores/${id}`,
} as const;

// 협업지점 소개 페이지에서의 협업지점 목록 조회
export const getStoreList = async () => {
  const res = await $axios.get<TApiResponse<TStoreListRes>>(API.STORE_LIST());
  return res.data;
};

// 협업지점 전체 조회
export const getStores = async () => {
  const res = await $axios.get<TApiResponse<TStoreAllRes>>(API.ADMIN_STORES());
  return res.data;
};

// 협업지점 상세 조회
export const getStoreDetail = async (id: number) => {
  const res = await $axios.get<TApiResponse<TStoreListDetail>>(API.STORE_DETAIL(id));
  return res.data;
};

// 협업지점 이미지 업로드

// 협업지점 생성
export const postStores = async (params: TStoreParams) => {
  await $axios.post(API.ADMIN_STORES(), params);
};

// 협업지점 수정
export const patchStores = async ({
  storeId,
  params,
}: {
  storeId: number;
  params: TStoreParams;
}) => {
  await $axios.patch(API.ADMIN_STORES(storeId), params);
};

// 협업지점 삭제
export const deleteStores = async (storeId: number) => {
  await $axios.delete(API.ADMIN_STORES(storeId));
};

// 협업지점 이미지 업로드
export const postStoreImage = async ({ storeId, imageFile }: TStoreImageParams) => {
  await $axios.post(API.ADMIN_IMAGE_UPLOAD(storeId), imageFile);
};

// 협업지점 이미지 삭제
export const deleteStoreImage = async (storeId: number) => {
  await $axios.delete(API.ADMIN_IMAGE_DELETE(storeId));
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

// 대분류 태그 별 협업 지점 목록
export const getClassificationsStore = async (classificationId: number) => {
  const res = await $axios.get<TApiResponse<TClassificationAllStore>>(
    API.STORE_CLASSIFICATIONS(classificationId)
  );
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
