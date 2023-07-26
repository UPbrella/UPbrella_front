import { $axios } from "@/lib/axios";

const API = {
  ADMIN_STORES: () => `/stores`,
} as const;

export const getStores = async () => {
  const res = await $axios.get(API.ADMIN_STORES());
  return res.data;
};
