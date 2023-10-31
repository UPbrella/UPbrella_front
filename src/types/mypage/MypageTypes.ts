export type TInfos = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type MypageRentListProps = {
  rentList: TRentContentInfo[];
};

export type TRentContentInfo = {
  umbrellaUuid: number;
  rentedAt: string;
  rentedStore: string;
  returnedDue: string; //TODO: returnedDue에는 계산 값을 넣어야
  returnAt: string;
  returned: boolean;
  refunded: boolean;
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
