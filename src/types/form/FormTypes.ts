export type TRentFormData = {
  classificationName: string;
  storeMetaId: number;
  rentStoreName: string;
  umbrellaUuid: number;
};

export type TRentFormDataParams = Omit<TRentFormData, "umbrellaId" | "type">;
