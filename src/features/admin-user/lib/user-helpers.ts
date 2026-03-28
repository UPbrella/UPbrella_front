import { TBlackUserRes, TUserRes } from "@/entities/user/model/types";
import type ko from "@/shared/lib/i18n/locales/ko.json";

type TI18nKey = keyof typeof ko;

export const USER_ADMIN_TABLE: Record<keyof TUserRes, { labelKey: TI18nKey; width?: string }> = {
  id: { labelKey: "admin.user.col.id" },
  name: { labelKey: "admin.user.col.name" },
  phoneNumber: { labelKey: "admin.user.col.phone", width: "150px" },
  bank: { labelKey: "admin.user.col.bank" },
  accountNumber: { labelKey: "admin.user.col.account" },
  email: { labelKey: "admin.user.col.email", width: "150px" },
  adminStatus: { labelKey: "admin.user.col.admin" },
  createdAt: { labelKey: "admin.user.col.createdAt" },
};

export const USER_BLACKLIST_TABLE: Record<
  keyof TBlackUserRes,
  { labelKey: TI18nKey; width?: string }
> = {
  id: { labelKey: "admin.user.col.id" },
  blockedAt: { labelKey: "admin.user.col.blockedAt" },
};
