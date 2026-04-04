import { TUmbrellaState } from "@/features/admin-umbrella/model/types";
import {
  TUmbrellaPatchReq,
  TUmbrellaRes,
  TUmbrellaStatisticsRes,
} from "@/entities/umbrella/model/types";
import type ko from "@/shared/lib/i18n/locales/ko.json";

type TI18nKey = keyof typeof ko;

export const UMBRELLA_STATISTICS_TABLE: Record<
  keyof TUmbrellaStatisticsRes,
  { labelKey: TI18nKey; width?: string }
> = {
  totalRentCount: { labelKey: "admin.umbrella.col.totalRent" },
  totalUmbrellaCount: { labelKey: "admin.umbrella.col.totalCount" },
  rentableUmbrellaCount: { labelKey: "admin.umbrella.col.rentableCount" },
  rentedUmbrellaCount: { labelKey: "admin.umbrella.col.rentedCount" },
  missingUmbrellaCount: { labelKey: "admin.umbrella.col.missingCount" },
  missingRate: { labelKey: "admin.umbrella.col.missingRate" },
};

export const UMBRELLA_TABLE: Record<keyof TUmbrellaRes, { labelKey: TI18nKey; width?: string }> = {
  id: { labelKey: "admin.umbrella.col.id" },
  uuid: { labelKey: "admin.umbrella.col.uuid" },
  historyId: { labelKey: "admin.umbrella.col.historyId" },
  storeMetaId: { labelKey: "admin.umbrella.col.storeMetaId" },
  rentable: { labelKey: "admin.umbrella.col.rentableLabel" },
  etc: { labelKey: "admin.umbrella.col.etc" },
};

export const convertUmbrellaData = (res?: TUmbrellaRes) => {
  if (res) {
    return {
      id: res.id,
      storeMetaId: res.storeMetaId,
      uuid: res.uuid,
      rentable: res.rentable,
      missed: false,
      etc: res.etc,
    } satisfies TUmbrellaPatchReq & { id: number };
  }

  return {
    storeMetaId: null,
    uuid: null,
    rentable: true,
    etc: "",
  } satisfies TUmbrellaState;
};
