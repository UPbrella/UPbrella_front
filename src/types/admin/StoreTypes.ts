// api 데이터
export type TStoreDetail = {
  id: number;
  name: string;
  classification: string; // "신촌"
  activateStatus: boolean;
  address: string;
  umbrellaLocation: string;
  businessHours: string; // "09:00 ~ 18:00";
  contactNumber: string; // "010-0000-0000";
  instagramId: string; // "upbrella";
  coordinate: string; // "37.503716, 127.053718"
  imageUrls: string[]; // src url
};

// 표에서 확인할 데이터
export type TStoreTable = Omit<TStoreDetail, "id" | "coordinate" | "imageUrls"> & {
  naverMapLink: string; // 네이버 지도 링크
  images: string[]; // 이미지 텍스트
};

export type TStoreTableKey = keyof TStoreTable;
