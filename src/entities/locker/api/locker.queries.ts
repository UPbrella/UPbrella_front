import { deleteLockers, getLockers, patchLockers, postLockers } from "./locker-api";
import type { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import i18n from "@/shared/lib/i18n";
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
      toast.success(i18n.t("admin.locker.toast.createSuccess"));
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
      toast.success(i18n.t("admin.locker.toast.editSuccess"));
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
      toast.success(i18n.t("admin.locker.toast.deleteSuccess"));
      queryClient.invalidateQueries(LOCKER_QUERY_KEYS.all);
    },
  });
};
