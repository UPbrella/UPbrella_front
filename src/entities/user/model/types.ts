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

// from MypageTypes
export type TInfos = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type TAccountPageInputs = {
  bank: string;
  accountNumber: string;
};

export type TAccountPageStatus = {
  isDeleted: boolean;
  isChanged: boolean;
  isRegistered: boolean;
};
