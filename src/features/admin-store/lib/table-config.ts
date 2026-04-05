import { TStoreTableKey } from "@/entities/store/model/types";
import type ko from "@/shared/lib/i18n/locales/ko.json";

type TI18nKey = keyof typeof ko;

export const STORE_ADMIN_TABLE: Record<
  TStoreTableKey,
  { labelKey: TI18nKey | null; minWidth?: string }
> = {
  id: { labelKey: null, minWidth: "60px" },
  name: { labelKey: "admin.store.columns.name", minWidth: "150px" },
  address: { labelKey: "admin.store.columns.address", minWidth: "250px" },
  imageUrls: { labelKey: "admin.store.columns.image", minWidth: "200px" },
  activateStatus: { labelKey: "admin.store.columns.active", minWidth: "100px" },
  category: { labelKey: "admin.store.columns.category", minWidth: "150px" },
  umbrellaLocation: { labelKey: "admin.store.columns.location", minWidth: "130px" },
  businessHour: { labelKey: "admin.store.columns.hours", minWidth: "200px" },
  contactNumber: { labelKey: "admin.store.columns.contact", minWidth: "130px" },
  instagramId: { labelKey: "admin.store.columns.instagram", minWidth: "130px" },
  content: { labelKey: "admin.store.columns.intro", minWidth: "300px" },
};
