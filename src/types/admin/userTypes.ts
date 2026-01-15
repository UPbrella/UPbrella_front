export type TUserRes = {
  id: number;
  name: string;
  phoneNumber?: string | null;
  bank: string | null;
  accountNumber: string | null;
  adminStatus: boolean;
  email: string;
  createdAt: string | null;
};

export type TBlackUserRes = {
  id: number;
  blockedAt: string;
};
