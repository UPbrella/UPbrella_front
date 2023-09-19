import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import {
  deleteUmbrellas,
  getUmbrellas,
  getUmbrellasStatistics,
  getUmbrellasStatisticsStore,
  getUmbrellasStore,
  patchUmbrellas,
  postUmbrellas,
} from "@/api/umbrellaApi";
import {
  TUmbrellasGetParams,
  TUmbrellasPatchParams,
  TUmbrellasPostReq,
  TUmbrellasStoreGetParams,
} from "@/types/admin/umbrellaTypes";

const UMBRELLAS_QUERY_KEYS = {
  getUmbrellas: (storeId?: number) => ["umbrellas", storeId],
  getUmbrellasStatistics: (storeId?: number) => ["umbrellas-statistics", storeId],
} as const;

export const useGetUmbrellas = (params: TUmbrellasGetParams) => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...UMBRELLAS_QUERY_KEYS.getUmbrellas(), { params }],
    queryFn: () => getUmbrellas(params),
    select: (res) => res.data.umbrellaResponsePage,
  });
};

export const useGetUmbrellasStore = ({ storeId, page, size }: TUmbrellasStoreGetParams) => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...UMBRELLAS_QUERY_KEYS.getUmbrellas(storeId), { page, size }],
    queryFn: () => getUmbrellasStore({ storeId, page, size }),
    select: (res) => res.data.umbrellaResponsePage,
  });
};

export const useGetUmbrellasStatistics = () => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics()],
    queryFn: () => getUmbrellasStatistics(),
    select: (res) => res.data,
  });
};

export const useGetUmbrellasStatisticsStore = (storeId: number) => {
  return useQuery({
    keepPreviousData: true,
    queryKey: [...UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeId)],
    queryFn: () => getUmbrellasStatisticsStore(storeId),
    select: (res) => res.data,
  });
};

export const usePostUmbrellas = () => {
  return useMutation({
    mutationFn: (data: TUmbrellasPostReq) => postUmbrellas(data),
    onSuccess: () => {
      // TODO: invalidate
      toast.success("우산 생성이 완료되었습니다.");
    },
  });
};

export const usePatchUmbrellas = () => {
  return useMutation({
    mutationFn: (params: TUmbrellasPatchParams) => patchUmbrellas(params),
    onSuccess: () => {
      // TODO: invalidate
      toast.success("우산 수정이 완료되었습니다.");
    },
  });
};

export const useDeleteUmbrellas = () => {
  return useMutation({
    mutationFn: (umbrellaId: number) => deleteUmbrellas(umbrellaId),
    onSuccess: () => {
      // TODO: invalidate
      toast.success("우산이 삭제 되었습니다.");
    },
  });
};
