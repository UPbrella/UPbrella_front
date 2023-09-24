import { TCustomError } from "@/types/commonTypes";

/**
 * 서버에서 보내주는 default error message를 얻어옴
 */
export const getErrorMessage = (error: TCustomError) => {
  const defaultMessage = "잘못된 요청이거나 서버 오류입니다.";

  if (error.response) {
    return error.response?.data?.message ?? defaultMessage;
  } else {
    return defaultMessage;
  }
};
