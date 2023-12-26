import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  TUmbrellasPatchParams,
  TUmbrellasPostReq,
  TUmbrellasStoreGetParams,
} from "@/types/admin/umbrellaTypes";

export const UMBRELLAS_QUERY_KEYS = {
  getUmbrellas: (params: TUmbrellasStoreGetParams) => ["umbrellas", params],
  getUmbrellasStatistics: (storeId?: number) => ["umbrellas-statistics", storeId],
} as const;

export const useGetUmbrellas = (params: TUmbrellasStoreGetParams) => {
  const { page, storeId, size } = params;

  return useQuery({
    keepPreviousData: true,
    queryKey: UMBRELLAS_QUERY_KEYS.getUmbrellas(params),
    queryFn: () => {
      // 전체
      if (!storeId) {
        return getUmbrellas({ page, size });
      }

      // 개별 지점
      return getUmbrellasStore(params);
    },
    select: (res) => res.data.umbrellaResponsePage,
    enabled: !!size,
  });
};

export const useGetUmbrellasStatistics = (storeId: number) => {
  return useQuery({
    keepPreviousData: true,
    queryKey: UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeId),
    queryFn: () => {
      // 전체
      if (!storeId) {
        return getUmbrellasStatistics();
      }

      // 개별 지점
      return getUmbrellasStatisticsStore(storeId);
    },
    select: (res) => ({
      ...res.data,
      missingRate: (Math.ceil(res.data.missingRate * 100) / 100).toFixed(2),
    }),
    retry: 0,
  });
};

export const usePostUmbrellas = () => {
  return useMutation({
    mutationFn: (data: TUmbrellasPostReq) => postUmbrellas(data),
    onSuccess: () => {
      toast.success("우산 생성이 완료되었습니다.");
    },
  });
};

export const usePatchUmbrellas = () => {
  return useMutation({
    mutationFn: (params: TUmbrellasPatchParams) => patchUmbrellas(params),
    onSuccess: () => {
      toast.success("우산 수정이 완료되었습니다.");
    },
  });
};

export const useDeleteUmbrellas = () => {
  return useMutation({
    mutationFn: (umbrellaId: number) => deleteUmbrellas(umbrellaId),
    onSuccess: () => {
      toast.success("우산이 삭제 되었습니다.");
    },
  });
};
