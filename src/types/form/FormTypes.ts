export type TRentFormData = {
  classificationName: string;
  storeMetaId: number;
  rentStoreName: string;
  umbrellaUuid: number;
};

export type TRentFormBody = {
  region: string;
  storeId: number;
  umbrellaId: number;
  conditionReport?: string;
};

export type TRentFormDataParams = Omit<TRentFormData, "umbrellaId" | "type">;
