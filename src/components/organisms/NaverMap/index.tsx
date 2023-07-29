import React, { useEffect, useRef } from "react";
import webMarker from "@/assets/web-marker.svg";

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        // console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      if (!mapRef.current) return;

      const markerPosition = new naver.maps.LatLng(37.56085742773332, 126.93548935431897);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: markerPosition,
        zoom: 17,
      });

      // 마커 추가
      new naver.maps.Marker({
        position: markerPosition,
        map: map,
        icon: {
          content: `<img alt="webMarker" src="${webMarker}" />`,
        },
      });

      const labelDiv = document.createElement("div");
      labelDiv.innerHTML = "연세대학교 신촌캠퍼스 공학원";
      labelDiv.style.color = "#333333";
      labelDiv.style.fontSize = "14px";
      labelDiv.style.fontWeight = "600";

      const labelSize = new naver.maps.Size(labelDiv.offsetWidth, labelDiv.offsetHeight);

      // 라벨 추가
      new naver.maps.Marker({
        position: markerPosition,
        map: map,
        icon: {
          content: labelDiv,
          anchor: new naver.maps.Point(labelSize.width + 50, labelSize.height - 42),
        },
      });
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
    initMap();
  }, []);

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
