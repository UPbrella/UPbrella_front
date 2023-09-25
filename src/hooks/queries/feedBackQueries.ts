import { getHistoriesStatus, getHistoriesImprovements } from "@/api/feedBackApi";
import { useQuery } from "react-query";
export const useGetHistoriesStatus = () => {
  return useQuery({
    queryKey: ["historiesStatus"],
    queryFn: () => getHistoriesStatus(),
    select: (res) => res.data,
  });
};

export const useGetHistoriesImprovements = () => {
  return useQuery({
    queryKey: ["historiesImprovements"],
    queryFn: () => getHistoriesImprovements(),
    select: (res) => res.data,
  });
};
