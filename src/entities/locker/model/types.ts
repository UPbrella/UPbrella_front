export type TLockersRes = {
  id: number;
  storeMetaId: number;
  secretKey: string;
};

export type TLockersDataParams = {
  storeId: number;
  secretKey: string;
};

export type TLockersPatchParams = {
  lockerId: number;
  data: Partial<TLockersDataParams>;
};
