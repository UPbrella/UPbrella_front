import { TStoreTableKey } from "@/types/admin/StoreTypes";

export const STORE_ADMIN_TABLE: Record<TStoreTableKey, { label: string; minWidth?: string }> = {
  id: { label: "id", minWidth: "60px" },
  name: { label: "협업 지점명", minWidth: "150px" },
  address: { label: "주소", minWidth: "250px" },
  imageUrls: { label: "이미지", minWidth: "200px" },
  activateStatus: { label: "활성여부", minWidth: "100px" },
  category: { label: "분류", minWidth: "150px" },
  umbrellaLocation: { label: "우산위치", minWidth: "130px" },
  businessHour: { label: "영업시간", minWidth: "200px" },
  contactNumber: { label: "연락처", minWidth: "200px" },
  instagramId: { label: "인스타", minWidth: "180px" },
  content: { label: "소개", minWidth: "150px" },
};
