// get
export type TUmbrellaRes = {
  id: number;
  historyId: number | null; // storeId
  storeMetaId: number; // storeId
  uuid: number;
  rentable: boolean;
  etc: string | null;
};

export type TUmbrellaStatisticsRes = {
  totalRentCount: number; // 전체 대여 건
  totalUmbrellaCount: number; // 전체 우산
  rentableUmbrellaCount: number; // 대여 가능 우산
  rentedUmbrellaCount: number; // 대여 중인 우산
  missingUmbrellaCount: number; // 분실 우산
  missingRate: number; //  분실률
};

export type TUmbrellasGetParams = {
  page?: number;
  size?: number;
};

export type TUmbrellasStoreGetParams = {
  storeId: number;
} & TUmbrellasGetParams;

// post
export type TUmbrellasPostReq = Omit<TUmbrellaRes, "id" | "historyId">;

// patch
export type TUmbrellaPatchReq = TUmbrellasPostReq & { missed: boolean };

export type TUmbrellasPatchParams = {
  umbrellaId: number;
  data: TUmbrellaPatchReq;
};
