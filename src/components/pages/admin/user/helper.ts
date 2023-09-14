import { TBlackUserRes, TUserRes } from "@/types/admin/userTypes";

export const USER_ADMIN_TABLE: Record<keyof TUserRes, { label: string; width?: string }> = {
  id: { label: `사용자 고유번호` },
  socialId: { label: "사용자 소셜 고유번호", width: "150px" },
  name: { label: "사용자 이름" },
  phoneNumber: { label: "전화번호", width: "150px" },
  bank: { label: "은행" },
  accountNumber: { label: "계좌번호" },
  adminStatus: { label: "관리자 여부" },
  email: { label: "이메일", width: "150px" },
} as const;

export const USER_BLACKLIST_TABLE: Record<
  keyof Omit<TBlackUserRes, "id">,
  { label: string; width?: string }
> = {
  socialId: { label: "사용자 소셜 고유번호" },
  blockedAt: { label: "블랙리스트 등재 시간" },
} as const;
