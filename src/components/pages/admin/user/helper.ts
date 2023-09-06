export const USER_ADMIN_TABLE: Record<keyof TUserRes, { label: string; width?: string }> = {
  id: { label: `사용자 고유번호` },
  socialId: { label: "사용자 소셜 고유번호", width: "150px" },
  name: { label: "사용자 이름" },
  phoneNumber: { label: "전화번호", width: "150px" },
  bank: { label: "은행" },
  accountNumber: { label: "계좌번호" },
  adminStatus: { label: "관리자 여부" },
} as const;

// TODO: Type 파일에서 import (삭제예정)
export type TUserRes = {
  id: number;
  socialId: number;
  name: string;
  phoneNumber: string;
  bank: string | null;
  accountNumber: string | null;
  adminStatus: boolean;
};
