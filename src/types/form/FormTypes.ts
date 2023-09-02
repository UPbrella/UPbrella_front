export type TRentFormData = {
  classificationName: string;
  rentStoreName: string;
  umbrellaUuid: number;
};

export type TRentFormDataParams = Omit<TRentFormData, "umbrellaId" | "type">;
