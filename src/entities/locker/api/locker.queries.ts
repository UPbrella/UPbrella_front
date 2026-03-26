import { deleteLockers, getLockers, patchLockers, postLockers } from "./locker-api";
import type { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const LOCKER_QUERY_KEYS = {
  all: ["lockers"],
} as const;

export const useGetLockers = () => {
  return useQuery({
    queryKey: LOCKER_QUERY_KEYS.all,
    queryFn: getLockers,
    select: (res) => res.data.lockers,
  });
};

export const usePostLockers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLockers,
    onError: (err) => {
      const error = err as TCustomError;
      toast.error(getErrorMessage(error));
    },
    onSuccess: () => {
      toast.success("보관함 정보가 생성되었습니다.");
      queryClient.invalidateQueries(LOCKER_QUERY_KEYS.all);
    },
  });
};

export const usePatchLockers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLockers,
    onError: (err) => {
      const error = err as TCustomError;
      toast.error(getErrorMessage(error));
    },
    onSuccess: () => {
      toast.success("보관함 정보가 수정되었습니다.");
      queryClient.invalidateQueries(LOCKER_QUERY_KEYS.all);
    },
  });
};

export const useDeleteLockers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLockers,
    onError: (err) => {
      const error = err as TCustomError;
      toast.error(getErrorMessage(error));
    },
    onSuccess: () => {
      toast.success("보관함 정보가 삭제되었습니다.");
      queryClient.invalidateQueries(LOCKER_QUERY_KEYS.all);
    },
  });
};
