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
