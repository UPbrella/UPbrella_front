import CardFooter from "@/components/organisms/CardFooter";
import webMarker from "@/assets/web-marker.svg";
import Map from "../admin/store/UI/Map";
import { useEffect, useRef, useState } from "react";
import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import MapBtn from "@/components/molecules/MapBtn";
import "@/styles/markerLabel.css";
import Card from "@/components/organisms/Card";
import { useGetClassifications } from "@/hooks/queries/storeQueries";

// 기본 위치 좌표
export const DEFAULT_COORDINATE = {
  lat: 37.5608393877042,
  lng: 126.93545258588699,
};

export default function RentalInfo() {
  const { naver } = window;
  const mapElement = useRef(null);

  const [map, setMap] = useState<naver.maps.Map>();
  const [, setMarker] = useState<naver.maps.Marker>();

  // map 처음 한번 생성
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const _location = new naver.maps.LatLng(DEFAULT_COORDINATE.lat, DEFAULT_COORDINATE.lng);

    const mapOptions: naver.maps.MapOptions = {
      center: _location,
    };

    const _map = new naver.maps.Map(mapElement.current, mapOptions);

    const marker = new naver.maps.Marker({
      position: _location,
      map: _map,
      icon: {
        content: `<div class="marker-wrapper"> <img class="marker" alt="webMarker" src="${webMarker}" /><div class="custom-label">연세대학교 공학원</div></div>`,
        anchor: new naver.maps.Point(12, 35),
      },
    });

    setMarker(marker);
    setMap(_map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver]);

  // server
  const { data: classificationsRes } = useGetClassifications();

  const classificationData =
    classificationsRes?.map((item) => ({
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
    })) || [];

  // console.log("map is ", map);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        {/* 태블렛 환경에서 대여지점 카드 hidden */}

        <div className="sm:hidden pr-24">
          <Card />
        </div>
        <div className="w-full max-w-936 rounded-20 relative">
          <Map ref={mapElement} width="100%" height="896px" borderRadius="20px" />
          <div className="absolute top-0 left-0 z-10 p-24">
            <LocationClassificationBtn classifications={classificationData} map={map} />
          </div>
          <div className="absolute top-0 right-7 z-10 pt-86">
            <MapBtn map={map} />
          </div>
        </div>
      </div>
      <CardFooter />
    </div>
  );
}
