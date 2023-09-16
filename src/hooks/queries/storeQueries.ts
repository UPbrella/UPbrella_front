import {
  getClassifications,
  getSubClassifications,
  getStores,
  getStoreList,
  getClassificationsStore,
  getStoreDetail,
} from "@/api/storeApi";

import { useQuery } from "react-query";

export const useGetStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: () => getStores(),
    select: (res) => res.data.stores,
  });
};

export const useGetClassifications = () => {
  return useQuery({
    queryKey: ["classifications"],
    queryFn: () => getClassifications(),
    select: (res) => res.data.classifications,
  });
};

export const useGetSubClassifications = () => {
  return useQuery({
    queryKey: ["subClassifications"],
    queryFn: () => getSubClassifications(),
    select: (res) => res.data.subClassifications,
  });
};

// 대분로 태그 별 협업지점 목록
export const useGetClassificationsStore = (classificationId: number) => {
  return useQuery({
    queryKey: ["classificationsStore", classificationId],
    queryFn: () => getClassificationsStore(classificationId),
    select: (res) => res.data.stores,
  });
};

// 협업지점 상세조회
export const useGetStoreDetail = (storeId: number) => {
  return useQuery(["store", storeId], () => getStoreDetail(storeId), {
    enabled: storeId !== null, // storeId가 null이면 쿼리 비활성화
    select: (res) => res.data,
  });
};

// 협업지점 소개 페이지에서의 협업지점 목록 조회
export const useGetStoreList = () => {
  return useQuery({
    queryKey: ["storeList"],
    queryFn: () => getStoreList(),
    select: (res) => res.data.storesByClassification,
  });
};
