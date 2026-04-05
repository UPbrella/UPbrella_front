import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DaumPostcode from "react-daum-postcode";
import Map from "@/widgets/naver-map/ui/Map";
import { TextField } from "@mui/material";
import { TStoreBusinessHours, TStoreParams } from "@/entities/store/model/types";

import { DEFAULT_COORDINATE } from "@/shared/constants/map";

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

const StoreAddressInput = ({ storeData, onChangeStoreData, setStoreData }: TProps) => {
  const { t } = useTranslation();
  const { naver } = window;
  const mapElement = useRef(null);

  const [map, setMap] = useState<naver.maps.Map>();
  const [location, setLocation] = useState<naver.maps.LatLng>();
  const [marker, setMarker] = useState<naver.maps.Marker>();

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const _location = new naver.maps.LatLng(
      storeData.latitude ?? DEFAULT_COORDINATE.lat,
      storeData.longitude ?? DEFAULT_COORDINATE.lng
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
      const { _lat, _lng } = e.latlng;
      marker.setPosition(e.latlng);
      setStoreData((prev) => ({
        ...prev,
        latitude: _lat,
        longitude: _lng,
      }));
    });

    setMap(_map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver]);

  useEffect(() => {
    const _location = new naver.maps.LatLng(
      storeData.latitude ?? DEFAULT_COORDINATE.lat,
      storeData.longitude ?? DEFAULT_COORDINATE.lng
    );
    setLocation(_location);
  }, [naver.maps.LatLng, storeData.latitude, storeData.longitude]);

  useEffect(() => {
    if (map && location && marker) {
      marker.setPosition(location);
      map.setCenter(location);
    }
  }, [location, map, marker]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col max-w-[300px] self-end gap-4">
        <div className="flex-1 flex justify-between items-center gap-4">
          {t("admin.store.form.address")}
          <TextField
            className="w-200"
            placeholder={t("admin.store.form.addressSearchPlaceholder")}
            disabled
            value={storeData.address}
            name="address"
            onChange={onChangeStoreData}
          />
        </div>
        {storeData.address && (
          <div className="flex-1 flex justify-between items-center gap-4">
            {t("admin.store.form.detailAddress")}
            <TextField
              className="w-200"
              placeholder={t("admin.store.form.detailAddressPlaceholder")}
              name="addressDetail"
              value={storeData.addressDetail}
              onChange={onChangeStoreData}
            />
          </div>
        )}
      </div>
      <div className="flex max-w-[600px]">
        <DaumPostcode
          onComplete={(res) => {
            onChangeStoreData({
              target: {
                name: "address",
                value: res.address,
              },
            });
          }}
          focusInput={false}
          autoClose={false}
        ></DaumPostcode>
        <div className="flex flex-col gap-5">
          <Map ref={mapElement} width="300px" height="400px" />
          <div className="flex flex-col">
            <div>
              {t("admin.store.form.latitude")}: {storeData.latitude}
            </div>
            <div>
              {t("admin.store.form.longitude")}: {storeData.longitude}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAddressInput;
