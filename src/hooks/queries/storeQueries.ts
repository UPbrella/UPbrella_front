import { useQuery } from "react-query";
import { getClassifications, getStores } from "@/api/storeApi";

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
