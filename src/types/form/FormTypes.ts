export type TRentFormData = {
  classificationName: string;
  storeMetaId: number;
  rentStoreName: string;
  umbrellaUuid: number;
};

export type TRentDetail = {
  region: string;
  storeId: number;
  umbrellaId: number;
  conditionReport?: string;
};
