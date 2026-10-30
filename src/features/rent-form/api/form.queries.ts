import {
  getRentFormData,
  getReturnFormData,
  getReturnFormLockData,
  getReturnUmbrella,
  patchLockerCount,
} from "./form-api";
import type { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetRentFormData = (umbrellaId: number) => {
  return useQuery({
    queryKey: ["rentFormData", umbrellaId],
    queryFn: () => getRentFormData(umbrellaId),
    select: (res) => res.data,
    retry: 0,
  });
};

export const useGetReturnFormData = (storeId: number) => {
  return useQuery({
    queryKey: ["returnFormData", storeId],
    queryFn: () => getReturnFormData(storeId),
    select: (res) => res.data,
    retry: 0,
  });
};

export const useGetReturnFormLockData = (storeId: number, salt: string, signature: string) => {
  return useQuery({
    queryKey: ["returnFormLockData", storeId, salt, signature],
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
