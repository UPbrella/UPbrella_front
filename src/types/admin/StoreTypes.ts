// admin 협업지점

import { TDayOfWeek } from "@/types/commonTypes";

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

export type TStoreTableKey = keyof TStoreDetail;

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
