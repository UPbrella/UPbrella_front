import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import { TLockersRes, TLockersDataParams, TLockersPatchParams } from "@/types/admin/lockersTypes";

const API = {
  GET_ADMIN_LOCKERS: () => `/admin/lockers`,
  POST_ADMIN_LOCKERS: () => `/admin/lockers`,
  PATCH_ADMIN_LOCKERS: (lockerId: number) => `/admin/lockers/${lockerId}`,
  DELETE_ADMIN_LOCKERS: (lockerId: number) => `/admin/lockers/${lockerId}`,
} as const;

export const getLockers = async () => {
  const res = await $axios.get<TApiResponse<{ lockers: TLockersRes[] }>>(API.GET_ADMIN_LOCKERS());
  return res.data;
};

export const postLockers = async (params: TLockersDataParams) => {
  await $axios.post(API.POST_ADMIN_LOCKERS(), params);
};

export const patchLockers = async ({ lockerId, data }: TLockersPatchParams) => {
  await $axios.patch(API.PATCH_ADMIN_LOCKERS(lockerId), data);
};

export const deleteLockers = async (lockerId: number) => {
  await $axios.delete(API.DELETE_ADMIN_LOCKERS(lockerId));
};
