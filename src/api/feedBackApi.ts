import { $axios } from "@/lib/axios";
import { TApiResponse } from "@/types/commonTypes";
import { TConditionRes, TImprovementRes } from "@/types/admin/FeedBackTypes";

const API = {
  HISTORIES_STATUS: () => `/admin/rent/histories/status`,
  HISTORIES_IMPROVEMENTS: () => `/admin/rent/histories/improvements`,
} as const;

// 신고 내역 조회
export const getHistoriesStatus = async () => {
  const res = await $axios.get<TApiResponse<TConditionRes>>(API.HISTORIES_STATUS(), {
    withCredentials: true,
  });
  return res.data;
};

// 개선 요청 내역 조회
export const getHistoriesImprovements = async () => {
  const res = await $axios.get<TApiResponse<TImprovementRes>>(API.HISTORIES_IMPROVEMENTS(), {
    withCredentials: true,
  });
  return res.data;
};
