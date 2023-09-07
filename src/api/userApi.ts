import { $axios } from "@/lib/axios";
import { TBlackUserRes, TUserRes } from "@/types/admin/userTypes";
import { TApiResponse } from "@/types/commonTypes";

const API = {
  GET_USERS: () => `/admin/users`,
  DELETE_USERS: (userId: number) => `/admin/users/${userId}`,
  GET_BLACK_USERS: () => `/users/blackList`,
  DELETE_BLACK_USERS: (userId: number) => `/users/blackList/${userId}`,
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

// 블랙리스트 유저 전체 조회
export const getBlackUsers = async () => {
  const res = await $axios.get<TApiResponse<{ blackList: TBlackUserRes[] }>>(API.GET_BLACK_USERS());
  return res.data;
};

// 블랙리스트 유저 삭제
export const deleteBlackUsers = async (blackUserId: number) => {
  await $axios.delete(API.DELETE_BLACK_USERS(blackUserId));
};
