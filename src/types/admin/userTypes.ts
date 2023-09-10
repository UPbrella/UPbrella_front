export type TUserRes = {
  id: number;
  socialId: number;
  name: string;
  phoneNumber: string;
  bank: string | null;
  accountNumber: string | null;
  adminStatus: boolean;
  email: string | null;
};

export type TBlackUserRes = {
  id: number;
  socialId: number;
  blockedAt: string;
};
