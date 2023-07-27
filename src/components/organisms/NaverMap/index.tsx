import React, { useEffect, useRef } from "react";
import webMarker from "@/assets/web-marker.svg";

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.56085742773332, 126.93548935431897),
        zoom: 17,
      });

      const markerPosition = new naver.maps.LatLng(37.56085742773332, 126.93548935431897);

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

    // 네이버 지도 API 로드 후 initMap 함수 호출
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=o6zrrodz08";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const mapStyle = {
    width: "896px",
    height: "896px",
    borderRadius: "20px",
  };

  return (
    <>
      <div className="flex">
        <header className="text-xl font-bold">지도 페이지</header>
        <div id="map" ref={mapRef} style={mapStyle}></div>
      </div>
    </>
  );
};

export default NaverMap;
