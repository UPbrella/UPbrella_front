import { TStoreTableKey } from "@/entities/store/model/types";

export const STORE_ADMIN_TABLE: Record<TStoreTableKey, { label: string; minWidth?: string }> = {
  id: { label: "id", minWidth: "60px" },
  name: { label: "협업 지점명", minWidth: "150px" },
  address: { label: "주소", minWidth: "250px" },
  imageUrls: { label: "이미지", minWidth: "200px" },
  activateStatus: { label: "활성여부", minWidth: "100px" },
  category: { label: "분류", minWidth: "150px" },
  umbrellaLocation: { label: "우산위치", minWidth: "130px" },
  businessHour: { label: "영업시간", minWidth: "200px" },
  contactNumber: { label: "전화번호", minWidth: "130px" },
  instagramId: { label: "인스타그램", minWidth: "130px" },
  content: { label: "대여 조건", minWidth: "300px" },
};
