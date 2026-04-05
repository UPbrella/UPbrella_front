import { getHistoriesImprovements, getHistoriesStatus } from "./feedback-api";
import { useQuery } from "@tanstack/react-query";

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
