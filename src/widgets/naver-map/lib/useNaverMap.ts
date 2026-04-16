import { DEFAULT_COORDINATE } from "@/shared/constants/map";
import { RefObject, useEffect, useRef, useState } from "react";

/**
 * 네이버 맵 인스턴스 생성 및 중심 좌표 제어 훅
 * - 최초 1회만 맵을 생성하고, center가 바뀔 때마다 setCenter 호출
 */
export const useNaverMap = (
  ref: RefObject<HTMLDivElement | null>,
  center: { lat: number; lng: number }
) => {
  const { naver } = window;
  const [map, setMap] = useState<naver.maps.Map>();
  const mapCreated = useRef(false);

  // 맵 최초 생성 (한 번만 실행)
  useEffect(() => {
    if (mapCreated.current || !ref.current || !naver) return;

    const location = new naver.maps.LatLng(
      center.lat || DEFAULT_COORDINATE.lat,
      center.lng || DEFAULT_COORDINATE.lng
    );
    const mapInstance = new naver.maps.Map(ref.current, {
      center: location,
      zoom: 15,
    });

    mapCreated.current = true;
    setMap(mapInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, naver]);

  // 대분류 변경 등으로 center가 바뀌면 지도 중심 이동
  useEffect(() => {
    if (!map || !center.lat || !center.lng) return;
    map.setCenter(new naver.maps.LatLng(center.lat, center.lng));
  }, [map, naver, center.lat, center.lng]);

  return { map };
};
