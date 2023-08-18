import { useEffect, useRef } from "react";
import webMarker from "@/assets/web-marker.svg";

export type TNaverMapProps = {
  defaultLat: number;
  defaultLon: number;
  addMarker?: boolean;
  addLabel?: boolean;
  labelContent?: string;
};

const NaverMap = ({
  defaultLat,
  defaultLon,
  addMarker,
  addLabel,
  labelContent,
}: TNaverMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        // console.log("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }
      if (!mapRef.current) return;

      // 지도 중심 위치
      const defaultPosition = new naver.maps.LatLng(defaultLat, defaultLon);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: defaultPosition,
        zoom: 17,
      });

      // 마커 추가
      /* eslint-disable @typescript-eslint/no-unused-vars */
      if (addMarker) {
        const marker = new naver.maps.Marker({
          position: defaultPosition,
          map: map,
          icon: { content: `<img alt="webMarker" src="${webMarker}" />` },
        });
      }

      // 라벨 추가
      if (addLabel && labelContent) {
        const labelDiv = document.createElement("div");
        labelDiv.innerHTML = labelContent;
        labelDiv.style.color = "#333333";
        labelDiv.style.fontSize = "14px";
        labelDiv.style.fontWeight = "600";

        const labelSize = new naver.maps.Size(labelDiv.offsetWidth, labelDiv.offsetHeight);

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const labelMarker = new naver.maps.Marker({
          position: defaultPosition,
          map: map,
          icon: {
            content: labelDiv,
            anchor: new naver.maps.Point(labelSize.width + 30, labelSize.height - 42),
          },
        });
      }
    };

    // 네이버 지도 API 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NAVER_MAP_API_CLIENT_ID
    }`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [defaultLat, defaultLon, addMarker, addLabel, labelContent]);

  const mapStyle = {
    width: "936px",
    height: "896px",
    borderRadius: "20px",
  };

  return (
    <>
      <div className="flex ml-24">
        <div id="map" ref={mapRef} style={mapStyle}></div>
      </div>
    </>
  );
};

export default NaverMap;
