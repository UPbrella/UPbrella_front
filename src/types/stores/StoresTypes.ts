// api 데이터
export type TStoreDetail = {
  id: number;
  name: string;
  category: string[];
  classification: string;
  umbrellaCount: number;
  umbrellaLocation: string;
  storeLocation: string;
  businessHours: string;
  contactNumber?: string;
  instagramId?: string;
  content?: string;
};
