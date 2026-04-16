import { getDistanceFromLatLonInKm } from "@/entities/store/lib/location-utils";
import { useEffect, useState } from "react";

type SelectableStore = {
  id: number;
  latitude: number;
  longitude: number;
};

/** 유저 위치 기준 가장 가까운 매장 ID 반환 */
const findNearestStoreId = (
  stores: SelectableStore[],
  position: { lat: number; lng: number }
): number => {
  const distances = stores.map((store) =>
    getDistanceFromLatLonInKm(position.lat, position.lng, store.latitude, store.longitude)
  );
  const minIndex = distances.indexOf(Math.min(...distances));
  return stores[minIndex].id;
};

/** 랜덤 매장 ID 반환 */
const pickRandomStoreId = (stores: SelectableStore[]): number => {
  const index = Math.floor(Math.random() * stores.length);
  return stores[index].id;
};

/**
 * 매장 선택 로직 훅
 * - 유저 위치가 있으면 가장 가까운 매장 자동 선택
 * - 없으면 랜덤 매장 선택
 * - stores나 userPosition이 바뀔 때마다 재계산
 */
export const useStoreSelection = (
  stores: SelectableStore[],
  userPosition: { lat: number; lng: number } | null
) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number>();

  // stores 또는 유저 위치 변경 시 최적 매장 자동 선택
  useEffect(() => {
    if (stores.length === 0) return;

    const storeId = userPosition
      ? findNearestStoreId(stores, userPosition)
      : pickRandomStoreId(stores);

    setSelectedStoreId(storeId);
  }, [stores, userPosition]);

  return { selectedStoreId, setSelectedStoreId };
};
