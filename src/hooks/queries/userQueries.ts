import { deleteUsers, getUsers } from "@/api/userApi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_QUERY_KEYS = {
  users: () => ["users"],
} as const;

export const useGetUsers = () => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.users()],
    queryFn: () => getUsers(),
    select: (res) => res.data.users.map((e) => ({ ...e, adminStatus: e.adminStatus ? "O" : "X" })),
  });
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => deleteUsers(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(...USER_QUERY_KEYS.users());
      toast.success("삭제되었습니다.");
    },
  });
};
