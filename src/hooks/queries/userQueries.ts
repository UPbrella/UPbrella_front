import {
  deleteBlackUsers,
  deleteUsers,
  getBlackUsers,
  getUsers,
  patchAdminUsers,
} from "@/api/userApi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_QUERY_KEYS = {
  users: () => ["users"],
  blackUsers: () => ["black-users"],
} as const;

export const useGetUsers = () => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.users()],
    queryFn: () => getUsers(),
    select: (res) => res.data.users,
  });
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => deleteUsers(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(...USER_QUERY_KEYS.users());
      toast.success("블랙리스트로 등록되었습니다.");
    },
  });
};

export const useGetBlackUsers = () => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.blackUsers()],
    queryFn: () => getBlackUsers(),
    select: (res) => res.data.blackList,
  });
};

export const useDeleteBlackUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blackUserId: number) => deleteBlackUsers(blackUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(...USER_QUERY_KEYS.blackUsers());
      toast.success("탈퇴되었습니다.");
    },
  });
};

export const usePatchAdminUsers = () => {
  return useMutation({
    mutationFn: (userId: number) => patchAdminUsers(userId),
    onSuccess: () => {
      toast.success("변경되었습니다.");
    },
  });
};
