import CardFooter from "@/components/organisms/CardFooter";
import webMarker from "@/assets/webMarker.svg";
import Map from "../admin/store/UI/Map";
import { useCallback, useEffect, useRef, useState } from "react";
import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import MapBtn from "@/components/molecules/MapBtn";
import "@/styles/markerLabel.css";
import {
  STORE_QUERY_KEYS,
  useGetClassifications,
  useGetClassificationsStore,
  useGetStoreDetail,
} from "@/hooks/queries/storeQueries";
import { useQueryClient } from "react-query";
import BottomSheet from "@/components/atoms/BottomSheet";
import MobileCard from "@/components/molecules/MobileCard";
import Card from "@/components/organisms/Card";
import { getUserPosition, getDistanceFromLatLonInKm } from "@/utils/locationUtils";

// 기본 위치 좌표
export const DEFAULT_COORDINATE = {
  lat: 37.5608393877042,
  lng: 126.93545258588699,
};

const RentalInfo = () => {
  const { naver } = window;
  const mapElement = useRef<HTMLDivElement | null>(null);

  const [selectedClassification, setSelectedClassification] = useState(221);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [showInitialCard, setShowInitialCard] = useState(true);

  const [map, setMap] = useState<naver.maps.Map>();
  const [, setMarkers] = useState<naver.maps.Marker[]>([]);
  const [prevMarker, setPrevMarker] = useState<naver.maps.Marker | null>(null);

  // Ref를 사용하여 맵의 너비 동적으로 가져오기
  const mapWidth = mapElement.current?.offsetWidth ?? null;

  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);

  // map 처음 한번 생성
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const _location = new naver.maps.LatLng(DEFAULT_COORDINATE.lat, DEFAULT_COORDINATE.lng);

    const mapOptions: naver.maps.MapOptions = {
      center: _location,
      zoom: 17,
    };

    const _map = new naver.maps.Map(mapElement.current, mapOptions);

    setMap(_map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver]);

  // 상태 업데이트 함수 정의
  const handleClassificationSelection = (classificationId: number) => {
    setSelectedClassification(classificationId);
    queryClient.invalidateQueries([...STORE_QUERY_KEYS.classifications(classificationId)]);
  };

  // server
  const queryClient = useQueryClient();
  const { data: classificationsRes } = useGetClassifications();
  const { data: storeDetail } = useGetStoreDetail(selectedStoreId ?? 1);
  const storeMarker = useGetClassificationsStore(selectedClassification);

  const updateMapMarkers = useCallback(() => {
    if (!map || !window.naver.maps || !storeMarker.data) return; // 분류 ID가 없으면 아무것도 하지 않음
    const storeMarkerList = storeMarker.data; // 가게 목록 데이터

    // 조회한 가게 목록을 기반으로 마커를 생성하고 지도에 표시
    if (window.naver && window.naver.maps && storeMarkerList) {
      const newMarkers = storeMarkerList.map((store) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(store.latitude, store.longitude),
          map: map,
          icon: {
            content: `<div class="marker-wrapper"><img class="marker" alt="webMarker" src="${webMarker}" /><div class="umbrella-count">${store.rentableUmbrellasCount}</div><div class="custom-label">${store.name}</div></div>`,
            size: new naver.maps.Size(32, 40),
            anchor: new naver.maps.Point(12, 35),
          },
        });
        // 사용자 지정 데이터 저장
        marker.set("storeName", store.name);
        marker.set("umbrella", store.rentableUmbrellasCount);
        naver.maps.Event.addListener(marker, "click", () => {
          handleMarkerClick(marker, store.name, store.rentableUmbrellasCount, store.id);
        });
        return marker;
      });
      setMarkers(newMarkers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, storeMarker.data]);

  useEffect(() => {
    updateMapMarkers();
  }, [map, storeMarker.data, updateMapMarkers]);

  useEffect(() => {
    if (storeMarker.data && storeMarker.data.length > 0 && showInitialCard) {
      const randomIndex = Math.floor(Math.random() * storeMarker.data.length);
      const randomStore = storeMarker.data[randomIndex].id;
      setSelectedStoreId(randomStore);
      setShowInitialCard(false);
    }
  }, [storeMarker.data, showInitialCard]);

  useEffect(() => {
    if (userPosition && storeMarker.data && storeMarker.data.length > 0) {
      const distances = storeMarker.data.map((store) =>
        getDistanceFromLatLonInKm(
          userPosition.lat,
          userPosition.lng,
          store.latitude,
          store.longitude
        )
      );

      const minDistanceIndex = distances.indexOf(Math.min(...distances));

      if (!showInitialCard) {
        setSelectedStoreId(storeMarker.data[minDistanceIndex].id);
      }
    }
  }, [userPosition, storeMarker.data, showInitialCard]);

  useEffect(() => {
    getUserPosition().then(
      (position) =>
        position &&
        setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    );
  }, []);

  const handleMarkerClick = (
    marker: naver.maps.Marker,
    storeName: string,
    umbrella: number,
    storeId: number
  ) => {
    // 이전 활성화된 마커가 있으면 스타일 제거
    if (prevMarker) {
      const prevStoreName = prevMarker.get("storeName");
      const prevUmbrella = prevMarker.get("umbrella");
      prevMarker.setIcon({
        content: `<div class="marker-wrapper"><img class="marker" alt="webMarker" src="${webMarker}" /><div class="umbrella-count">${prevUmbrella}</div><div class="custom-label">${prevStoreName}</div></div>`,
        anchor: new naver.maps.Point(12, 35),
      });
    }

    // 현재 클릭한 마커의 스타일 변경
    marker.setIcon({
      content: `<div class="marker-wrapper-focus"><img class="marker-focus" alt="webMarkerFocus" src="${webMarker}" /><div class="umbrella-count-focus">${umbrella}</div><div class="custom-label-focus">${storeName}</div></div>`,
      anchor: new naver.maps.Point(12, 35),
    });

    setPrevMarker(marker); // Set this as the previous Marker
    setSelectedStoreId(storeId);
    setIsBottomOpen(true);
  };

  return (
    <div className="flex flex-col mt-24">
      <div className="flex justify-center">
        {/* 태블렛 환경에서 대여지점 카드 hidden  */}
        <div className="md:hidden pr-24">
          {storeDetail && !showInitialCard && <Card storeDetail={storeDetail} />}
        </div>
        <div className="w-full max-w-936 rounded-20 relative">
          <Map ref={mapElement} width="100%" height="896px" borderRadius="20px" />
          <div className="absolute top-0 left-0 z-9 p-24">
            {classificationsRes && (
              <LocationClassificationBtn
                classifications={classificationsRes}
                handleClassificationSelection={handleClassificationSelection}
                map={map}
              />
            )}
          </div>
          <div className="absolute top-0 right-7 z-10 pt-86 lg:hidden">
            <MapBtn map={map} />
            {isBottomOpen && mapWidth && storeDetail && (
              <BottomSheet
                isBottomSheetOpen={isBottomOpen}
                setIsBottomSheetOpen={setIsBottomOpen}
                snapPoints={[280, 280, 0]}
              >
                <MobileCard storeDetail={storeDetail} />
              </BottomSheet>
            )}
          </div>
        </div>
      </div>
      <CardFooter />
    </div>
  );
};

export default RentalInfo;
