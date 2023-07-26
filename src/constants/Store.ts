import { TStoreTableKey } from "@/types/admin/StoreTypes";

// 협업 지점 관련 ENUM
const STORE_ENUM: { [key in TStoreTableKey]: string } = {
  name: "협업 지점명",
  classification: "분류",
  activateStatus: "활성",
  address: "주소",
  umbrellaLocation: "우산위치",
  businessHours: "영업시간",
  contactNumber: "연락처",
  instagramId: "인스타",
  naverMapLink: "네이버지도",
  images: "이미지",
};

export default {
  STORE_ENUM,
};
