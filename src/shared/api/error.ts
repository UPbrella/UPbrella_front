import i18n from "@/shared/lib/i18n";
import { TCustomError } from "@/shared/model/types";

export const getErrorMessage = (error: TCustomError) => {
  const defaultMessage = i18n.t("common.error.defaultApi");

  if (error.response) {
    return error.response?.data?.message ?? defaultMessage;
  } else {
    return defaultMessage;
  }
};
