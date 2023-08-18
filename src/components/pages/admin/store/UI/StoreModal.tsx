import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "@/components/organisms/Modal";
import StoreModalContents from "@/components/pages/admin/store/UI/StoreModalBody";
import { TStoreBusinessHours, TStoreParams } from "@/types/admin/StoreTypes";

// 그 외의 데이터가 더 있지만, type 지정은 일단 하지 않음.
type TKakaoAddressResult = {
  x: string;
  y: string;
};

type TProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  selectedStore: TStoreParams;
  selectedStoreId?: number;
};

// 협업지점 modal
const StoreModal = ({ isOpen, onCloseModal, selectedStore, selectedStoreId }: TProps) => {
  const { kakao } = window;

  // client
  const [storeData, setStoreData] = useState(selectedStore);
  const [storeId, setStoreId] = useState<number>();

  useEffect(() => {
    if (selectedStore) {
      setStoreData(selectedStore);
    }
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStoreId) {
      setStoreId(selectedStoreId);
    }
  }, [selectedStoreId]);

  const isCreate = Boolean(storeId);

  // 주소에 따라 위도, 경도 저장
  const getCoordinateByAddress = (address: string) => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: TKakaoAddressResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          // x: latitude, y: longitude
          if (result[0]) {
            setStoreData({
              ...storeData,
              address,
              latitude: +result[0].x,
              longitude: +result[0].y,
            });
          } else {
            // console.error("위도, 경도 정보를 못 받아왔습니다.");
          }
        }
      });
    });
  };

  const onChangeStoreData = (e: {
    target: { name: string; value: string | number | null | TStoreBusinessHours[] };
  }) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      if (typeof value === "string") {
        if (value.length > 13) return;

        let _value = value;
        _value = value
          .replace(/[^0-9]/g, "") // 숫자를 제외한 모든 문자 제거
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        setStoreData({
          ...storeData,
          [name]: _value,
        });
        return;
      }
    }

    // 주소
    if (name === "address") {
      getCoordinateByAddress(value as string);
      return;
    }

    // 그외
    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={onCloseModal}
      titleText={`협업지점 ${isCreate ? "추가" : "수정"}`}
      footerContents={
        isCreate ? (
          <>
            <Button size="large" autoFocus onClick={onCloseModal}>
              추가
            </Button>
          </>
        ) : (
          <>
            <Button size="large" autoFocus onClick={onCloseModal}>
              수정
            </Button>
            <Button
              color="error"
              size="large"
              autoFocus
              onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까 ?")) {
                  //  삭제
                  onCloseModal();
                }
              }}
            >
              삭제
            </Button>
          </>
        )
      }
    >
      <StoreModalContents storeData={storeData} onChangeStoreData={onChangeStoreData} />
    </CustomModal>
  );
};

export default StoreModal;
