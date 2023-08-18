import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import CustomModal from "@/components/organisms/Modal";
import Map from "@/components/pages/admin/store/UI/Map";
import { TClassificationParams } from "@/types/admin/StoreTypes";
import { DEFAULT_COORDINATE } from "@/components/pages/admin/store/UI/StoreAddressInput";

type TProps = {
  selectedId?: number;
  setSelectedId: Dispatch<SetStateAction<number | undefined>>;
  isOpen: boolean;
  handleClose: () => void;
  onClickSaveBtn: () => void;
  tagData: TClassificationParams;
  setTagData: Dispatch<SetStateAction<TClassificationParams>>;
};

const ClassificationTagModal = ({
  selectedId,
  setSelectedId,
  isOpen,
  handleClose,
  onClickSaveBtn,
  tagData,
  setTagData,
}: TProps) => {
  const { naver } = window;
  const isNewTag = !selectedId;
  const mapElement = useRef(null);

  const [location, setLocation] = useState<naver.maps.LatLng>();

  // 좌표 변경 때, location state 변경
  useEffect(() => {
    const _location = new naver.maps.LatLng(
      tagData.latitude ?? DEFAULT_COORDINATE.lat,
      tagData.longitude ?? DEFAULT_COORDINATE.lng
    );
    setLocation(_location);
  }, [naver.maps.LatLng, tagData.latitude, tagData.longitude]);

  // map 생성
  useEffect(() => {
    if (!mapElement.current || !naver || !location) return;

    const mapOptions: naver.maps.MapOptions = {
      center: location,
    };

    const _map = new naver.maps.Map(mapElement.current, mapOptions);

    const marker = new naver.maps.Marker({
      position: location,
      map: _map,
    });

    naver.maps.Event.addListener(_map, "click", (e) => {
      const { x, y } = e.latlng;

      marker.setPosition(e.latlng);
      setTagData((prev) => ({
        ...prev,
        latitude: y,
        longitude: x,
      }));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver, mapElement.current]);

  return (
    <CustomModal
      titleText={`대여소 위치 페이지 내 지역 태그 ${isNewTag ? "추가" : "조회"}`}
      handleClose={() => {
        handleClose();
        setSelectedId(undefined);
      }}
      isOpen={isOpen}
      footerContents={
        !selectedId && (
          <Button size="large" autoFocus onClick={onClickSaveBtn}>
            추가
          </Button>
        )
      }
    >
      <div className={`flex flex-col gap-6 ${selectedId ? "pointer-events-none opacity-60" : ""} `}>
        <div className="flex items-center gap-5">
          태그 이름 :
          <TextField
            variant="standard"
            value={tagData.name}
            onChange={({ target: { value } }) => {
              setTagData((prev) => ({
                ...prev,
                name: value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <b>위도</b> {tagData.latitude} <b>경도</b> {tagData.longitude}
          </div>
          <Map ref={mapElement} />
        </div>
      </div>
    </CustomModal>
  );
};

export default ClassificationTagModal;
