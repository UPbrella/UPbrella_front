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

export type TRentFormDataParams = Omit<TRentFormData, "umbrellaId" | "type">;

export type TRentDetail = {
  region: string;
  storeId: number;
  umbrellaId: number;
  conditionReport?: string;
  salt?: string;
  signature?: string;
};

export type TRentPassword = {
  password: string;
};
