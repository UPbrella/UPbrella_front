import { getRentFormData } from "@/api/formApi";
import { useQuery } from "react-query";
export const useGetRentFormData = (umbrellaId: number) => {
  return useQuery({
    queryKey: ["rentFormData"],
    queryFn: () => getRentFormData(umbrellaId),
    select: (res) => res.data,
  });
};
