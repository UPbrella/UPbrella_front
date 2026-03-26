export type TRentFormData = {
  classificationName: string;
  storeMetaId: number;
  rentStoreName: string;
  umbrellaUuid: number;
};

export type TReturnFormData = {
  classificationName: string;
  rentStoreName: string;
  storeId: number;
};

export type TReturnUmbrella = {
  uuid: number;
  elapsedDay: number;
};

export type TReturnDetail = {
  returnStoreId: number;
  bank: string;
  accountNumber: string;
  improvementReportContent?: string;
};

export type TRentDetail = {
  region: string;
  storeId: number;
  umbrellaId: number;
  phoneNumber: string;
  conditionReport?: string;
  salt?: string;
  signature?: string;
};

export type TRentPassword = {
  password: string;
};

export type TRentLockerCountParams = {
  storeMetaId: number;
  count: number;
};
