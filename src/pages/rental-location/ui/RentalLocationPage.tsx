import {
  useGetClassifications,
  useGetClassificationsStore,
  useGetStoreDetail,
} from "@/entities/store/api/store.queries";
import { getDistanceFromLatLonInKm, getUserPosition } from "@/entities/store/lib/location-utils";
import { TClassification } from "@/entities/store/model/types";
import Card from "@/entities/store/ui/Card";
import MobileCard from "@/entities/store/ui/MobileCard";
import ClassificationsButtons from "@/pages/rental-location/ui/ClassificationsButtons";
import { DEFAULT_COORDINATE } from "@/shared/constants/map";
import BottomSheet from "@/shared/ui/BottomSheet";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import {
  createClusterIcon,
  createSingleMarkerIcon,
} from "@/widgets/naver-map/lib/clusterMarkerUtils";
import { createClusterManager, getClustersInBounds } from "@/widgets/naver-map/lib/markerCluster";
import "@/widgets/naver-map/styles/clusterMarker.css";
import "@/widgets/naver-map/styles/markerLabel.css";
import Map from "@/widgets/naver-map/ui/Map";
import MapBtn from "@/widgets/naver-map/ui/MapBtn";
import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Supercluster from "supercluster";

// 대여소 위치 페이지
const RentalLocationPage = () => {
  const { t } = useTranslation();
  const { naver } = window;
  const mapElement = useRef<HTMLDivElement | null>(null);
  // Ref를 사용하여 맵의 너비 동적으로 가져오기
  const mapWidth = mapElement.current?.offsetWidth ?? null;

  // client
  // 선택 대분류
  const [selectedClassification, setSelectedClassification] = useState<TClassification>();
  // 선택 지점
  const [selectedStoreId, setSelectedStoreId] = useState<number>();
  const [map, setMap] = useState<naver.maps.Map>();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [showInitialCard, setShowInitialCard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const clusterRef = useRef<Supercluster | null>(null);

  // server
  const { data: classificationsRes } = useGetClassifications();
  const { data: storeDetail } = useGetStoreDetail(selectedStoreId ?? 0);
  const { data: storeListRes, isFetching } = useGetClassificationsStore(
    selectedClassification?.id ?? 0
  );

  // 대분류 초깃값 설정
  useEffect(() => {
    if (classificationsRes && !!classificationsRes.length) {
      setSelectedClassification(classificationsRes[0]);
    }
  }, [classificationsRes]);

  // map 처음 한번 생성
  useEffect(() => {
    if (!mapElement.current || !naver || map) return;

    const _location = new naver.maps.LatLng(
      selectedClassification?.latitude ?? DEFAULT_COORDINATE.lat,
      selectedClassification?.longitude ?? DEFAULT_COORDINATE.lng
    );
    const mapOptions: naver.maps.MapOptions = {
      center: _location,
      zoom: 15,
    };

    const _map = new naver.maps.Map(mapElement.current, mapOptions);
    setMap(_map);
  }, [classificationsRes, map, naver, selectedClassification]);

  // 대분류 변경시 지도 position 움직임
  useEffect(() => {
    if (map && selectedClassification) {
      const { latitude, longitude } = selectedClassification;
      if (!latitude || !longitude) return;

      const _location = new naver.maps.LatLng(latitude, longitude);
      map.setCenter(_location);
    }
  }, [map, naver.maps.LatLng, selectedClassification]);

  const activeStores = useMemo(
    () => storeListRes?.filter((store) => store.openStatus) ?? [],
    [storeListRes]
  );

  // 클러스터 매니저 초기화
  useEffect(() => {
    if (activeStores.length === 0) return;

    clusterRef.current = createClusterManager(activeStores);

    // 클러스터 재생성 시 마커도 업데이트
    if (map) {
      updateMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStores, map]);

  // 마커 업데이트 함수
  const updateMarkers = useCallback(() => {
    if (!map || !clusterRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const clusters = getClustersInBounds(clusterRef.current, map);
    const newMarkers: naver.maps.Marker[] = [];

    clusters.forEach((cluster) => {
      const [lng, lat] = cluster.geometry.coordinates;
      const isCluster = cluster.properties.cluster;

      let iconContent: string;
      let size: naver.maps.Size;
      let anchor: naver.maps.Point;

      if (isCluster) {
        // 클러스터 마커
        const pointCount = cluster.properties.point_count || 0;
        const hasActiveStore = cluster.properties.hasActiveStore || false;
        iconContent = createClusterIcon(pointCount, hasActiveStore);
        size = new naver.maps.Size(32, 40);
        anchor = new naver.maps.Point(16, 40);
      } else {
        // 개별 마커
        const { storeId, name, openStatus } = cluster.properties;
        const isSelected = storeId === selectedStoreId;
        iconContent = createSingleMarkerIcon(name, openStatus, isSelected);
        size = isSelected ? new naver.maps.Size(44, 60) : new naver.maps.Size(32, 40);
        anchor = isSelected ? new naver.maps.Point(22, 60) : new naver.maps.Point(16, 40);
      }

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
        icon: {
          content: iconContent,
          size: size,
          anchor: anchor,
        },
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (isCluster && clusterRef.current) {
          // 클러스터 클릭 시 확대
          const expansionZoom = clusterRef.current.getClusterExpansionZoom(cluster.id as number);
          map.setCenter(new naver.maps.LatLng(lat, lng));
          map.setZoom(expansionZoom);
        } else {
          // 개별 마커 클릭 시 상세 정보 표시
          setSelectedStoreId(cluster.properties.storeId);
          setIsBottomOpen(true);
        }
      });

      newMarkers.push(marker);
    });

    markersRef.current = newMarkers;
  }, [
    map,
    selectedStoreId,
    naver.maps.LatLng,
    naver.maps.Marker,
    naver.maps.Point,
    naver.maps.Size,
    naver.maps.Event,
  ]);

  // 지도 이동/줌 이벤트 리스너
  useEffect(() => {
    if (!map) return;

    const updateListener = naver.maps.Event.addListener(map, "idle", updateMarkers);

    // 초기 마커 표시
    updateMarkers();

    return () => {
      naver.maps.Event.removeListener(updateListener);
    };
  }, [map, updateMarkers, naver.maps.Event]);

  // selectedStoreId 변경 시 마커 업데이트
  useEffect(() => {
    updateMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStoreId]);

  useEffect(() => {
    if (activeStores.length > 0 && showInitialCard) {
      const randomIndex = Math.floor(Math.random() * activeStores.length);
      const randomStore = activeStores[randomIndex].id;
      setSelectedStoreId(randomStore);
      setShowInitialCard(false);
    }
  }, [activeStores, showInitialCard]);

  useEffect(() => {
    if (userPosition && activeStores.length > 0) {
      const distances = activeStores.map((store) =>
        getDistanceFromLatLonInKm(
          userPosition.lat,
          userPosition.lng,
          store.latitude,
          store.longitude
        )
      );

      const minDistanceIndex = distances.indexOf(Math.min(...distances));

      if (!showInitialCard) {
        setSelectedStoreId(activeStores[minDistanceIndex].id);
      }
    }
  }, [userPosition, activeStores, showInitialCard]);

  useEffect(() => {
    getUserPosition().then(
      (position) =>
        position &&
        setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    );
  }, []);

  useEffect(() => {
    if (activeStores.length > 0) {
      let selectedStore;

      if (userPosition) {
        const distances = activeStores.map((store) =>
          getDistanceFromLatLonInKm(
            userPosition.lat,
            userPosition.lng,
            store.latitude,
            store.longitude
          )
        );

        const minDistanceIndex = distances.indexOf(Math.min(...distances));

        selectedStore = activeStores[minDistanceIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * activeStores.length);
        selectedStore = activeStores[randomIndex];
      }

      setSelectedStoreId(selectedStore.id);
    }
  }, [activeStores, userPosition]);

  return (
    <>
      <SeoMetaTag
        title={t("seo.rentalLocation.title")}
        description={t("seo.rentalLocation.desc")}
        keywords={t("seo.rentalLocation.keywords")}
      />

      <div className="flex flex-col flex-1 pb-20">
        <div className="flex justify-center gap-[24px] flex-1">
          <div className="min-w-[400px] max-w-[400px] hidden xl:block">
            {storeDetail && <Card storeDetail={storeDetail} />}
          </div>

          <div className="flex relative flex-1 justify-center rounded-20 max-w-640 xl:max-w-full">
            {(isFetching || isLoading) && (
              <div className="absolute w-full h-full z-[101] bg-gray-50 bg-opacity-40 flex justify-center items-center">
                <CircularProgress
                  size={70}
                  sx={{
                    color: "#E86F52",
                  }}
                />
              </div>
            )}

            <Map ref={mapElement} width="100%" height="100%" borderRadius="20px" />
            <div className="absolute top-0 left-0 p-24 pr-60 w-full z-9">
              {classificationsRes && (
                <ClassificationsButtons
                  classificationsRes={classificationsRes}
                  selectedClassification={selectedClassification}
                  setSelectedClassification={setSelectedClassification}
                />
              )}
            </div>
            <div className="absolute top-0 right-7 z-10 pt-86">
              <MapBtn map={map} setIsLoading={setIsLoading} />
            </div>
            {isBottomOpen && mapWidth && storeDetail && (
              <BottomSheet
                isBottomSheetOpen={isBottomOpen}
                setIsBottomSheetOpen={setIsBottomOpen}
                snapPoints={[295, 295, 0]}
                _className="hidden lg:block"
              >
                <MobileCard storeDetail={storeDetail} />
              </BottomSheet>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalLocationPage;
