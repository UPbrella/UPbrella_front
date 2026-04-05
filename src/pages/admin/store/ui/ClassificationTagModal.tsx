import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
import CustomModal from "@/shared/ui/Modal";
import Map from "@/widgets/naver-map/ui/Map";
import { TClassificationParams } from "@/entities/store/model/types";
import { DEFAULT_COORDINATE } from "@/shared/constants/map";

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
  const { t } = useTranslation();
  const { naver } = window;
  const isNewTag = !selectedId;
  const mapElement = useRef(null);

  const [location, setLocation] = useState<naver.maps.LatLng>();

  useEffect(() => {
    const _location = new naver.maps.LatLng(
      tagData.latitude ?? DEFAULT_COORDINATE.lat,
      tagData.longitude ?? DEFAULT_COORDINATE.lng
    );
    setLocation(_location);
  }, [naver.maps.LatLng, tagData.latitude, tagData.longitude]);

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
      titleText={
        isNewTag ? t("admin.store.tag.regionAddTitle") : t("admin.store.tag.regionViewTitle")
      }
      handleClose={() => {
        handleClose();
        setSelectedId(undefined);
      }}
      isOpen={isOpen}
      footerContents={
        !selectedId && (
          <Button size="large" autoFocus onClick={onClickSaveBtn}>
            {t("admin.common.add")}
          </Button>
        )
      }
    >
      <div
        className={`w-500 flex flex-col gap-6 ${
          selectedId ? "pointer-events-none opacity-60" : ""
        } `}
      >
        <div className="flex items-center gap-5">
          {t("admin.store.tag.nameLabel")}
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
            <b>{t("admin.store.form.latitude")}</b> {tagData.latitude}{" "}
            <b>{t("admin.store.form.longitude")}</b> {tagData.longitude}
          </div>
          <Map ref={mapElement} />
        </div>
      </div>
    </CustomModal>
  );
};

export default ClassificationTagModal;
