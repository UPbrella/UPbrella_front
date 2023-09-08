import { $axios } from "@/lib/axios";
import { TUserRes } from "@/types/admin/userTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  GET_USERS: () => `/admin/users`,
  DELETE_USERS: (userId: number) => `/admin/users/${userId}`,
} as const;

// 유저 전체 조회
export const getUsers = async () => {
  const res = await $axios.get<TApiResponse<{ users: TUserRes[] }>>(API.GET_USERS());
  return res.data;
};

// 유저 삭제
export const deleteUsers = async (userId: number) => {
  await $axios.delete(API.DELETE_USERS(userId));
};
