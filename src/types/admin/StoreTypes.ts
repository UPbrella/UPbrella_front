// api 데이터
export type TStoreDetail = {
  id?: number;
  name: string;
  category: string;
  // classification, subClassification 은 객체 형식으로 변경될 예정
  classification: string; // "신촌"
  subClassification: string; // "~동"
  activateStatus: boolean; // 활성화 여부
  address: string;
  umbrellaLocation: string;
  businessHours: string; // "09:00 ~ 18:00";
  contactNumber?: string; // "010-0000-0000";
  instagramId?: string; // "upbrella";
  latitude: number | string;
  longitude: number | string;
  imageUrls: string[]; // src url]
  content: string;
};

// 표에서 확인할 데이터
export type TStoreTable = TStoreDetail & {
  naverMapLink: string; // 네이버 지도 링크
  images: string[]; // 이미지 텍스트
};

export type TStoreTableKey = keyof TStoreTable;
