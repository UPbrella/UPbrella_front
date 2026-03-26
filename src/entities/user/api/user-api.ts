import { $axios } from "@/shared/api";
import type { TApiResponse } from "@/shared/model/types";
import type { TBlackUserRes, TUserRes } from "../model/types";

const API = {
  GET_USERS: () => `/admin/users`,
  DELETE_USERS: (userId: number) => `/admin/users/${userId}`,
  GET_BLACK_USERS: () => `/users/blackList`,
  DELETE_BLACK_USERS: (userId: number) => `/users/blackList/${userId}`,
  PATCH_ADMIN_USERS: (userId: number) => `/admin/users/${userId}`,
  GET_RENT_HISTORIES: `/users/histories`,
} as const;

export type TRentHistoriesRes = {
  isRefunded: boolean;
  isReturned: boolean;
  rentedAt: string; //ex. "2025-07-01 09:26:07";
  rentedStore: string;
  returnAt: string; //ex. "2025-07-15 09:26:07";
  umbrellaUuid: number;
};

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

// 유저 관리자 권한 수정
export const patchAdminUsers = async (userId: number) => {
  await $axios.patch(API.PATCH_ADMIN_USERS(userId));
};

export const getClientRentHistories = async () => {
  const res = await $axios.get<TApiResponse<{ histories: TRentHistoriesRes[] }>>(
    API.GET_RENT_HISTORIES
  );
  return res.data;
};
