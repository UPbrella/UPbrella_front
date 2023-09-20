import CardFooter from "@/components/organisms/CardFooter";
import webMarker from "@/assets/webMarker.svg";
import Map from "../admin/store/UI/Map";
import { useCallback, useEffect, useRef, useState } from "react";
import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import MapBtn from "@/components/molecules/MapBtn";
import "@/styles/markerLabel.css";
import { useGetClassifications, useGetClassificationsStore } from "@/hooks/queries/storeQueries";
import { useQueryClient } from "react-query";
import BottomSheet from "@/components/atoms/BottomSheet";
import MobileCard from "@/components/molecules/MobileCard";

// 기본 위치 좌표
export const DEFAULT_COORDINATE = {
  lat: 37.5608393877042,
  lng: 126.93545258588699,
};

export default function RentalInfo() {
  const { naver } = window;
  const mapElement = useRef(null);
  const [selectedClassification, setSelectedClassification] = useState(221);

  const [map, setMap] = useState<naver.maps.Map>();
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);
  const [prevMarker, setPrevMarker] = useState<naver.maps.Marker | null>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
    // 해당 classificationId에 대한 캐시 무효화
    setSelectedClassification(classificationId);
    queryClient.invalidateQueries(["classificationsStore", classificationId]);
  };

  // server
  const queryClient = useQueryClient();
  const { data: classificationsRes } = useGetClassifications();
  const storeMarker = useGetClassificationsStore(selectedClassification);

  const updateMapMarkers = useCallback(() => {
    if (!map || !window.naver.maps || !storeMarker.data) return; // 분류 ID가 없으면 아무것도 하지 않음
    const storeMarkerList = storeMarker.data; // 가게 목록 데이터

    // 이전에 생성된 마커 제거
    markers.forEach((marker) => {
      marker.setMap(null);
      setPrevMarker(null);
      // naver.maps.Event.removeListener(marker);
    });

    // 조회한 가게 목록을 기반으로 마커를 생성하고 지도에 표시
    if (map && window.naver && window.naver.maps && storeMarkerList) {
      const newMarkers = storeMarkerList.map((store) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(store.latitude, store.longitude),
          map: map,
          icon: {
            content: `<div class="marker-wrapper"><img class="marker" alt="webMarker" src="${webMarker}" /><div class="umbrella-count">${store.rentableUmbrellasCount}</div><div class="custom-label">${store.name}</div></div>`,
            anchor: new naver.maps.Point(12, 35),
          },
        });
        // 사용자 지정 데이터 저장
        marker.set("storeName", store.name);
        marker.set("umbrella", store.rentableUmbrellasCount);
        naver.maps.Event.addListener(marker, "click", () => {
          handleMarkerClick(marker, store.name, store.rentableUmbrellasCount);
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

  const handleMarkerClick = (marker: naver.maps.Marker, storeName: string, umbrella: number) => {
    // 이전 활성화된 마커가 있으면 축소
    if (prevMarker !== null) {
      const prevStoreName = prevMarker.get("storeName");
      const prevUmbrella = prevMarker.get("umbrella");
      const prevIcon = {
        content: `<div class="marker-wrapper"><img class="marker" alt="webMarker" src="${webMarker}" /><div class="umbrella-count">${prevUmbrella}</div><div class="custom-label">${prevStoreName}</div></div>`,
        anchor: new naver.maps.Point(12, 35),
      };
      prevMarker.setIcon(prevIcon);
    }
    // 클릭한 마커를 확대
    else {
      const newIcon = {
        content: `<div class="marker-wrapper"><img class="marker-focus" alt="webMarker" src="${webMarker}" /><div class="umbrella-count-focus">${umbrella}</div><div class="custom-label-focus">${storeName}</div></div>`,
        anchor: new naver.maps.Point(12, 35),
      };
      marker.setIcon(newIcon);

      // 현재 클릭한 마커를 이전 클릭한 마커로 설정
      setPrevMarker(marker);
    }
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="flex flex-col mt-24">
      <div className="flex justify-center">
        {/* 태블렛 환경에서 대여지점 카드 hidden */}

        <div className="md:hidden pr-24">
          // TODO: 백엔드 대분류 협업지점 목록 해결 후 수정예정
          {/* <Card /> */}
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
          </div>
          <BottomSheet
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            snapPoints={[640, 320, 0]}
            _className="lg:hidden xl:hidden"
          >
            <MobileCard />
          </BottomSheet>
          ;
        </div>
      </div>
      <CardFooter />
    </div>
  );
}
