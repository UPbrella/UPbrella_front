import { getStores } from "@/api/storeApi";
import { useQuery } from "react-query";

export const useGetStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: () => getStores(),
    select: (res) => res.data.stores,
  });
};
