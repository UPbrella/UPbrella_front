import { getStores, getClassifications, getSubClassifications } from "@/api/storeApi";
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
