import {
  getRentFormData,
  getReturnFormData,
  getReturnFormLockData,
  getReturnUmbrella,
  patchLockerCount,
} from "@/api/formApi";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetRentFormData = (umbrellaId: number) => {
  return useQuery({
    queryKey: ["rentFormData"],
    queryFn: () => getRentFormData(umbrellaId),
    select: (res) => res.data,
    retry: 0,
  });
};

export const useGetReturnFormData = (storeId: number) => {
  return useQuery({
    queryKey: ["returnFormData"],
    queryFn: () => getReturnFormData(storeId),
    select: (res) => res.data,
    retry: 0,
  });
};

export const useGetReturnFormLockData = (storeId: number, salt: string, signature: string) => {
  return useQuery({
    queryKey: ["returnFormLockData"],
    queryFn: () => getReturnFormLockData(storeId, salt, signature),
    select: (res) => res.data,
    retry: 0,
  });
};

export const useGetReturnUmbrella = () => {
  return useQuery({
    queryKey: ["returnUmbrella"],
    queryFn: () => getReturnUmbrella(),
    select: (res) => res.data,
    retry: 0,
  });
};

export const usePatchRentLockerCount = () => {
  return useMutation({
    mutationFn: patchLockerCount,
    onError: (err: TCustomError) => {
      toast.error(getErrorMessage(err));
    },
  });
};
