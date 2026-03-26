import type { TDayOfWeek } from "@/shared/model/types";

export type TClassification = {
  id: number;
  type: "CLASSIFICATION";
  name: string;
  latitude: number | null;
  longitude: number | null;
};

export type TSubClassification = {
  id: number;
  type: "SUB_CLASSIFICATION";
  name: string;
};

export type TStoreBusinessHours = {
  date: TDayOfWeek;
  openAt: string;
  closeAt: string;
};

export type TStoreList = {
  id: number;
  thumbnail: string;
  name: string;
  category: string;
};

export type TStoreListAll = {
  subClassificationId: number;
  stores: TStoreList[];
};

export type TStoreListDetail = {
  id: number;
  name: string;
  category: string;
  availableUmbrellaCount: number;
  openStatus: boolean;
  businessHours: string;
  contactNumber: string;
  instaUrl: string;
  address: string;
  umbrellaLocation: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrls: string[];
};

export type TAdminStoreDetail = {
  id: number;
  name: string;
  category: string;
  classification: TClassification;
  subClassification: TSubClassification;
  activateStatus: boolean;
  address: string;
  addressDetail: string;
  umbrellaLocation: string;
  businessHour: string;
  contactNumber?: string;
  instagramId?: string;
  latitude: number | null;
  longitude: number | null;
  content: string;
};

export type TStoreBusinessHoursRes = {
  id: number;
  date: TDayOfWeek;
  openAt: string;
  closeAt: string;
};

export type TStoreAllRes = { stores: TAdminStoreDetail[] };
export type TStoreListRes = { storesByClassification: TStoreListAll[] };

export type TClassificationStore = {
  id: number;
  name: string;
  openStatus: boolean;
  latitude: number;
  longitude: number;
  rentableUmbrellasCount: number;
};

export type TStoreParams = Omit<
  TAdminStoreDetail,
  "id" | "classification" | "subClassification" | "activateStatus"
> & {
  classificationId: number | null;
  subClassificationId: number | null;
  activateStatus?: boolean;
  businessHours: TStoreBusinessHours[];
};

export type TStoreImageParams = {
  storeId: number;
  imageFile: FormData;
};

export type TStoreTableData = Omit<
  TAdminStoreDetail,
  "addressDetail" | "latitude" | "longitude" | "subClassification" | "classification"
>;

export type TStoreTableKey = keyof TStoreTableData & "imageUrls";

export type TStoreImageRes = {
  id: number;
  imageUrl: string;
};

export type TClassificationAllRes = { classifications: TClassification[] };
export type TClassificationParams = Omit<TClassification, "id" | "type">;
export type TClassificationAllStore = { stores: TClassificationStore[] };

export type TSubClassificationAllRes = { subClassifications: TSubClassification[] };
export type TSubClassificationParams = Omit<TSubClassification, "id" | "type">;
