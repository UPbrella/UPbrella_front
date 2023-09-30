import {
  getClassifications,
  getSubClassifications,
  getStores,
  getStoreList,
  getClassificationsStore,
  getStoreDetail,
  patchStoreActive,
  patchStoreInactive,
} from "@/api/storeApi";
import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "react-query";

export const STORE_QUERY_KEYS = {
  stores: (storeId?: number) => ["stores", storeId],
  classifications: (classificationId?: number) => ["classifications", classificationId],
  subClassifications: () => ["subClassifications"],
  storeList: () => ["storeList"],
} as const;

export const useGetStores = () => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.stores()],
    queryFn: () => getStores(),
    select: (res) => res.data.stores,
  });
};

export const useGetClassifications = () => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.classifications()],
    queryFn: () => getClassifications(),
    select: (res) => res.data.classifications,
  });
};

export const useGetSubClassifications = () => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.subClassifications()],
    queryFn: () => getSubClassifications(),
    select: (res) => res.data.subClassifications,
  });
};

// 대분로 태그 별 협업지점 목록
export const useGetClassificationsStore = (classificationId: number) => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.classifications(classificationId)],
    queryFn: () => getClassificationsStore(classificationId),
    select: (res) => res.data.stores,
    enabled: !!classificationId,
  });
};

// 협업지점 상세조회
export const useGetStoreDetail = (storeId: number) => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.stores(storeId)],
    queryFn: () => getStoreDetail(storeId),
    enabled: !!storeId, // storeId가 null이면 쿼리 비활성화
    select: (res) => res.data,
  });
};

// 협업지점 소개 페이지에서의 협업지점 목록 조회
export const useGetStoreList = () => {
  return useQuery({
    queryKey: [...STORE_QUERY_KEYS.storeList()],
    queryFn: () => getStoreList(),
    select: (res) => res.data.storesByClassification,
  });
};

// 협업지점 활성화, 비활성화
export const usePatchStoreActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStoreActive,
    onSuccess: () => queryClient.invalidateQueries([...STORE_QUERY_KEYS.stores()]),
    onError: () => {
      toast.error("지점 이미지가 존재하지 않으면 영업지점을 활성화할 수 없습니다.");
    },
  });
};

export const usePatchStoreInactive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStoreInactive,
    onSuccess: () => queryClient.invalidateQueries([...STORE_QUERY_KEYS.stores()]),
    onError: () => {
      toast.error("서버 에러입니다.");
    },
  });
};
