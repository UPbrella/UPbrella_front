import { TCustomError } from "@/shared/model/types";

export const getErrorMessage = (error: TCustomError) => {
  const defaultMessage = "잘못된 요청이거나 서버 오류입니다.";

  if (error.response) {
    return error.response?.data?.message ?? defaultMessage;
  } else {
    return defaultMessage;
  }
};
