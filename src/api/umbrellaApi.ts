import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import {
  TUmbrellaRes,
  TUmbrellaStatisticsRes,
  TUmbrellasGetParams,
  TUmbrellasPatchParams,
  TUmbrellasPostReq,
  TUmbrellasStoreGetParams,
} from "@/types/admin/umbrellaTypes";

const API = {
  GET_UMBRELLAS: () => `/admin/umbrellas`,
  GET_UMBRELLAS_STORE: (storeId: number) => `/admin/umbrellas/${storeId}`,
  POST_UMBRELLAS: () => `/admin/umbrellas`,
  PATCH_UMBRELLAS: (umbrellaId: number) => `/admin/umbrellas/${umbrellaId}`,
  DELETE_UMBRELLAS: (umbrellaId: number) => `/admin/umbrellas/${umbrellaId}`,
  GET_UMBRELLAS_STATISTICS: () => `/admin/umbrellas/statistics`,
  GET_UMBRELLAS_STATISTICS_STORE: (storeId: number) => `/admin/umbrellas/statistics/${storeId}`,
} as const;

// 우산 관련 get
export const getUmbrellas = async (params: TUmbrellasGetParams) => {
  const res = await $axios.get<TApiResponse<{ umbrellaResponsePage: TUmbrellaRes[] }>>(
    API.GET_UMBRELLAS(),
    { params }
  );
  return res.data;
};

export const getUmbrellasStore = async ({ storeId, page, size }: TUmbrellasStoreGetParams) => {
  const res = await $axios.get<TApiResponse<{ umbrellaResponsePage: TUmbrellaRes[] }>>(
    API.GET_UMBRELLAS_STORE(storeId),
    { params: { page, size } }
  );
  return res.data;
};

export const getUmbrellasStatistics = async () => {
  const res = await $axios.get<TApiResponse<TUmbrellaStatisticsRes>>(
    API.GET_UMBRELLAS_STATISTICS()
  );
  return res.data;
};

export const getUmbrellasStatisticsStore = async (storeId: number) => {
  const res = await $axios.get<TApiResponse<TUmbrellaStatisticsRes>>(
    API.GET_UMBRELLAS_STATISTICS_STORE(storeId)
  );
  return res.data;
};

// 우산 post, patch delete
export const postUmbrellas = async (data: TUmbrellasPostReq) => {
  await $axios.post(API.POST_UMBRELLAS(), data);
};

export const patchUmbrellas = async ({ data, umbrellaId }: TUmbrellasPatchParams) => {
  await $axios.post(API.PATCH_UMBRELLAS(umbrellaId), data);
};

export const deleteUmbrellas = async (umbrellaId: number) => {
  await $axios.post(API.DELETE_UMBRELLAS(umbrellaId));
};
