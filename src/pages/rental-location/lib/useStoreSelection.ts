import { getDistanceFromLatLonInKm } from "@/entities/store/lib/location-utils";
import { useEffect, useRef, useState } from "react";

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
 * - 목록 갱신 시 현재 선택을 유지하고, 지역이나 유저 위치가 바뀌면 재계산
 */
export const useStoreSelection = (
  stores: SelectableStore[],
  userPosition: { lat: number; lng: number } | null
) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number>();
  const previousPosition = useRef(userPosition);

  // 재고 갱신으로 목록이 바뀌어도 보고 있던 매장을 유지한다.
  useEffect(() => {
    if (stores.length === 0) return;

    const positionChanged =
      previousPosition.current?.lat !== userPosition?.lat ||
      previousPosition.current?.lng !== userPosition?.lng;
    previousPosition.current = userPosition;
    setSelectedStoreId((current) => {
      if (!positionChanged && stores.some((store) => store.id === current)) return current;
      return userPosition ? findNearestStoreId(stores, userPosition) : pickRandomStoreId(stores);
    });
  }, [stores, userPosition]);

  return { selectedStoreId, setSelectedStoreId };
};
