import { TStoreDetail } from "@/types/admin/StoreTypes";

export const storeInitializer = (): TStoreDetail => {
  return {
    name: "",
    category: "",
    classification: "", // "신촌"
    subClassification: "", // "~동"
    activateStatus: false, // 활성화 여부
    address: "",
    umbrellaLocation: "",
    businessHours: "", // "09:00 ~ 18:00",
    contactNumber: "", // "010-0000-0000",
    instagramId: "", // "upbrella",
    latitude: "", // "
    longitude: "",
    imageUrls: [], // src url
    content: "",
  };
};
