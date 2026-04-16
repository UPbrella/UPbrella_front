import { getUserPosition } from "@/entities/store/lib/location-utils";
import { useEffect, useState } from "react";

/** 브라우저 Geolocation API로 사용자 현재 위치를 1회 조회하는 훅 */
export const useUserGeolocation = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    getUserPosition().then(
      (pos) => pos && setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    );
  }, []);

  return { position };
};
