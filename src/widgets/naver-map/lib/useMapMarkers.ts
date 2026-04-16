import {
  createClusterIcon,
  createSingleMarkerIcon,
} from "@/widgets/naver-map/lib/clusterMarkerUtils";
import { createClusterManager, getClustersInBounds } from "@/widgets/naver-map/lib/markerCluster";
import { useCallback, useEffect, useRef } from "react";
import Supercluster from "supercluster";

type MarkerStore = {
  id: number;
  name: string;
  openStatus: boolean;
  latitude: number;
  longitude: number;
};

/**
 * Supercluster 기반 지도 마커/클러스터 전체 관리 훅
 * - stores 변경 → 클러스터 재생성 + 마커 다시 그리기
 * - 지도 이동/줌(idle) → 현재 뷰포트에 맞게 마커 갱신
 * - selectedStoreId 변경 → 선택 마커 스타일 반영
 * - 클러스터 클릭 → 확대, 개별 마커 클릭 → onStoreSelect 콜백
 */
export const useMapMarkers = (
  map: naver.maps.Map | undefined,
  stores: MarkerStore[],
  selectedStoreId: number | undefined,
  onStoreSelect: (storeId: number) => void
) => {
  const { naver } = window;
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const clusterRef = useRef<Supercluster | null>(null);

  // ref로 최신 값을 참조하여 renderMarkers의 재생성을 방지
  const selectedStoreIdRef = useRef(selectedStoreId);
  selectedStoreIdRef.current = selectedStoreId;
  const onStoreSelectRef = useRef(onStoreSelect);
  onStoreSelectRef.current = onStoreSelect;

  // 지도 위의 모든 마커 제거
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // 현재 뷰포트 기준으로 클러스터/개별 마커를 다시 그리는 핵심 함수
  const renderMarkers = useCallback(() => {
    if (!map || !clusterRef.current) return;

    clearMarkers();

    const clusters = getClustersInBounds(clusterRef.current, map);
    const newMarkers: naver.maps.Marker[] = [];

    clusters.forEach((cluster) => {
      const [lng, lat] = cluster.geometry.coordinates;
      const isCluster = cluster.properties.cluster;

      let iconContent: string;
      let size: naver.maps.Size;
      let anchor: naver.maps.Point;

      if (isCluster) {
        const pointCount = cluster.properties.point_count || 0;
        const hasActiveStore = cluster.properties.hasActiveStore || false;
        iconContent = createClusterIcon(pointCount, hasActiveStore);
        size = new naver.maps.Size(32, 40);
        anchor = new naver.maps.Point(16, 40);
      } else {
        const { storeId, name, openStatus } = cluster.properties;
        const isSelected = storeId === selectedStoreIdRef.current;
        iconContent = createSingleMarkerIcon(name, openStatus, isSelected);
        size = isSelected ? new naver.maps.Size(44, 60) : new naver.maps.Size(32, 40);
        anchor = isSelected ? new naver.maps.Point(22, 60) : new naver.maps.Point(16, 40);
      }

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map,
        icon: { content: iconContent, size, anchor },
      });

      // 클러스터 클릭 → 확대 / 개별 마커 클릭 → 상세 정보
      naver.maps.Event.addListener(marker, "click", () => {
        if (isCluster && clusterRef.current) {
          const expansionZoom = clusterRef.current.getClusterExpansionZoom(cluster.id as number);
          map.setCenter(new naver.maps.LatLng(lat, lng));
          map.setZoom(expansionZoom);
        } else {
          onStoreSelectRef.current(cluster.properties.storeId);
        }
      });

      newMarkers.push(marker);
    });

    markersRef.current = newMarkers;
  }, [map, naver, clearMarkers]);

  // stores 변경 시 Supercluster 재생성 + 마커 갱신
  useEffect(() => {
    if (stores.length === 0) {
      clusterRef.current = null;
      clearMarkers();
      return;
    }

    clusterRef.current = createClusterManager(stores);
    renderMarkers();
  }, [stores, renderMarkers, clearMarkers]);

  // 지도 이동/줌 완료(idle) 시 마커 갱신
  useEffect(() => {
    if (!map) return;

    const listener = naver.maps.Event.addListener(map, "idle", renderMarkers);
    return () => naver.maps.Event.removeListener(listener);
  }, [map, naver, renderMarkers]);

  // 선택 매장 변경 시 마커 스타일 갱신 (ref로 최신 값 참조)
  useEffect(() => {
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStoreId]);
};
