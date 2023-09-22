// admin 협업지점

import { TDayOfWeek } from "@/types/commonTypes";

// client 협업지점 목록 조회
export type TStoreListAll = {
  subClassificationId: number;
  stores: TStoreList[];
};

export type TStoreList = {
  id: number;
  thumbnail: string;
  name: string;
  category: string;
};

// client 협업지점 상세 조회
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

// admin 협업지점 조회(전체 조회, 이미 생성된)
export type TStoreDetail = {
  id: number;
  name: string;
  category: string;
  classification: TClassification; // "신촌"
  subClassification: TSubClassification; // "~동"
  activateStatus: boolean; // 활성화 여부
  address: string;
  addressDetail: string;
  thumbnail: string; // 썸네일
  umbrellaLocation: string;
  businessHour: string; // 화면 출력용
  businessHours: TStoreBusinessHours[]; // 마커 활성화 여부용
  contactNumber?: string; // "010-0000-0000";
  instagramId?: string; // "upbrella";
  latitude: number | null;
  longitude: number | null;
  content: string;
  imageUrls: TStoreImage[];
  password: string; // 자물쇠 비밀번호
};

// api response
export type TStoreAllRes = { stores: TStoreDetail[] };

// client 협업지점 목록 조회 response
export type TStoreListRes = { storesByClassification: TStoreListAll[] };

// 대분류 태그 별 협업 지점 목록
export type TClassificationStore = {
  id: number;
  name: string;
  openStatus: boolean;
  latitude: number;
  longitude: number;
  rentableUmbrellasCount: number;
};

// api request
export type TStoreParams = Omit<
  TStoreDetail,
  "id" | "classification" | "subClassification" | "thumbnail" | "imageUrls"
> & {
  classificationId: number | null;
  subClassificationId: number | null;
};

export type TStoreImageParams = {
  storeId: number;
  imageFile: FormData;
};

export type TStoreTableData = Omit<
  TStoreDetail,
  | "addressDetail"
  | "businessHours"
  | "latitude"
  | "longitude"
  | "password"
  | "subClassification"
  | "classification"
  | "thumbnail"
>;

export type TStoreTableKey = keyof TStoreTableData;

// 지역 태그 (대분류)
export type TClassification = {
  id: number;
  type: "CLASSIFICATION";
  name: string;
  latitude: number | null;
  longitude: number | null;
};

export type TStoreImage = {
  id: number;
  imageUrl: string;
};

export type TStoreBusinessHours = {
  date: TDayOfWeek;
  openAt: string;
  closeAt: string;
};

// api response
export type TClassificationAllRes = { classifications: TClassification[] };

// api request
export type TClassificationParams = Omit<TClassification, "id" | "type">;

// api response (대분류 태그 별 협업 지점 목록)
export type TClassificationAllStore = { stores: TClassificationStore[] };

// 지역 태그 (소분류)
export type TSubClassification = {
  id: number;
  type: "SUB_CLASSIFICATION";
  name: string;
};

// sub-class api response
export type TSubClassificationAllRes = { subClassifications: TSubClassification[] };

// sub-class api request
export type TSubClassificationParams = Omit<TSubClassification, "id" | "type">;
