import { getClassifications, getSubClassifications, getClassificationsStore } from "@/api/storeApi";
import { useQuery } from "react-query";


// export const useGetStores = () => {
//   return useQuery({
//     queryKey: ["stores"],
//     queryFn: () => getStores(),
//     select: (res) => res.data.stores,
//   });
// };

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

// TODO: 백엔드 api 수정 필요, 수정 후 다시 조회 예정
// // 협업지점 소개 페이지에서의 협업지점 목록 조회
// export const useGetStoreList = () => {
//   return useQuery({
//     queryKey: ["storeList"],
//     queryFn: () => getStoreList(),
//     select: (res) => res.data.storesByClassification,
//   });
// };
