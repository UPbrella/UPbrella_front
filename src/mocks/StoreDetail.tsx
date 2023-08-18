import { TStoreDetail } from "@/types/stores/StoresTypes";

const StoreDetailMockData: TStoreDetail[] = [
  {
    id: 1,
    name: "모티브 스터디카페",
    category: ["카페", "디저트"],
    classification: "신촌",
    umbrellaCount: 4,
    umbrellaLocation: "가게 앞",
    storeLocation: "서울시 가나구 다라로 78-9",
    businessHours: "9:00-18:00",
    contactNumber: "010-1234-5678",
    instagramId: "motive-shinchon",
    content: "안녕하세요 모티브입니다.",
  },
  {
    id: 2,
    name: "연희동 카페",
    category: ["카페", "디저트"],
    classification: "신촌",
    umbrellaCount: 4,
    umbrellaLocation: "가게 뒷골목",
    storeLocation: "서울시 가나구 다라로 78-9",
    businessHours: "9:00-18:00",
    contactNumber: "010-1234-5678",
    instagramId: "abc-shinchon",
    content: "안녕하세요 연희동 카페입니다.",
  },
];

export default {
  StoreDetailMockData,
};
