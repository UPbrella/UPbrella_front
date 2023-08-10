import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Map from "@/components/pages/admin/store/UI/Map";
import { TextField } from "@mui/material";
import { TStoreBusinessHours, TStoreParams } from "@/types/admin/StoreTypes";

// 신촌역 좌표
export const DEFAULT_COORDINATE = {
  lat: 37.55972,
  lng: 126.94306,
};

type TProps = {
  storeData: TStoreParams;
  setStoreData: Dispatch<SetStateAction<TStoreParams>>;
  onChangeStoreData: (e: {
    target: {
      name: string;
      value: string | number | null | TStoreBusinessHours[];
    };
  }) => void;
};

// 협업지점 주소 입력란
const StoreAddressInput = ({ storeData, onChangeStoreData, setStoreData }: TProps) => {
  const { naver } = window;
  const mapElement = useRef(null);

  const [map, setMap] = useState<naver.maps.Map>();
  const [location, setLocation] = useState<naver.maps.LatLng>();
  const [marker, setMarker] = useState<naver.maps.Marker>();

  // map 처음 한번 생성
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const _location = new naver.maps.LatLng(
      storeData.longitude ?? DEFAULT_COORDINATE.lat,
      storeData.latitude ?? DEFAULT_COORDINATE.lng
    );

    const mapOptions: naver.maps.MapOptions = {
      center: _location,
    };

    const _map = new naver.maps.Map(mapElement.current, mapOptions);

    const marker = new naver.maps.Marker({
      position: _location,
      map: _map,
    });

    setMarker(marker);

    naver.maps.Event.addListener(_map, "click", (e) => {
      const { x, y } = e.latlng;
      marker.setPosition(e.latlng);
      setStoreData((prev) => ({
        ...prev,
        latitude: y,
        longitude: x,
      }));
    });

    setMap(_map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver]);

  // 좌표 변경 때, location state 변경
  useEffect(() => {
    const _location = new naver.maps.LatLng(
      storeData.latitude ?? DEFAULT_COORDINATE.lat,
      storeData.longitude ?? DEFAULT_COORDINATE.lng
    );
    setLocation(_location);
  }, [naver.maps.LatLng, storeData.latitude, storeData.longitude]);

  // location에 따라 marker와 지도 이동
  useEffect(() => {
    if (map && location && marker) {
      marker.setPosition(location);
      map.setCenter(location);
    }
  }, [location, map, marker]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[600px] gap-8">
        <div className="flex-1 flex items-center gap-4">
          주소
          <TextField
            className="flex-1"
            placeholder="주소 검색 후 선택해주세요."
            disabled
            value={storeData.address}
            name="address"
            onChange={onChangeStoreData}
          />
        </div>
        <div className="flex-1 flex items-center gap-4">
          상세 주소
          <TextField
            className="flex-1"
            placeholder="상세 주소를 입력해주세요."
            name="addressDetail"
            value={storeData.addressDetail}
            onChange={onChangeStoreData}
          />
        </div>
      </div>
      <div className="flex max-w-[600px]">
        <DaumPostcode
          onComplete={(res) => {
            // logic
            onChangeStoreData({
              target: {
                name: "address",
                value: res.address,
              },
            });
          }}
          autoClose={false}
        ></DaumPostcode>
        <div className="flex flex-col gap-5">
          <Map ref={mapElement} width="300px" height="400px" />
          <div>
            <div>위도: {storeData.latitude}</div>
            <div>경도: {storeData.longitude}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAddressInput;
