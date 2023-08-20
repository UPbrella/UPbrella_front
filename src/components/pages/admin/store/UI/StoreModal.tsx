import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "@/components/organisms/Modal";
import StoreModalContents from "@/components/pages/admin/store/UI/StoreModalBody";
import { TStoreBusinessHours, TStoreParams } from "@/types/admin/StoreTypes";
import { useMutation, useQueryClient } from "react-query";
import { deleteStores, patchStores, postStores } from "@/api/storeApi";
import toast from "react-hot-toast";
import { isValidateStoreSave } from "@/components/pages/admin/store/helper";

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
  // const [selectedStoreId, setSelectedStoreId] = useState<number>();

  // server
  const queryClient = useQueryClient();
  const { mutate: createStore } = useMutation(postStores);
  const { mutate: updateStore } = useMutation(patchStores);
  const { mutate: removeStore } = useMutation(deleteStores);

  useEffect(() => {
    if (selectedStore) {
      setStoreData(selectedStore);
    }
  }, [selectedStore]);

  // useEffect(() => {

  // 주소에 따라 위도, 경도 저장
  const getCoordinateByAddress = (address: string) => {
    // TODO: loading 걸리는 것 확인
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: TKakaoAddressResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          // x: longitude, y: latitude
          if (result[0]) {
            setStoreData((prev) => ({
              ...prev,
              address,
              latitude: +result[0].y,
              longitude: +result[0].x,
            }));
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

  // TODO: 생성 수정 조건 달기 필수값 검증 백엔드한테도 물어보기 (수정, 삭제 작동 안하는듯, 수정과 생성 조건이 같은지?)
  const onClickSaveStore = () => {
    if (!isValidateStoreSave(storeData)) return;

    // 수정
    if (selectedStoreId) {
      updateStore(
        { storeId: selectedStoreId, params: storeData },
        {
          onSuccess: () => {
            toast.success("지점이 수정 되었습니다.");
            queryClient.invalidateQueries(["stores"]);
            onCloseModal();
            return;
          },
          onError: () => {
            toast.error("수정에 실패했어요.");
            return;
          },
        }
      );
      return;
    }

    // 생성
    createStore(storeData, {
      onSuccess: () => {
        toast.success("지점이 생성 되었습니다.");
        queryClient.invalidateQueries(["stores"]);
        onCloseModal();
        return;
      },
      onError: () => {
        toast.error("생성에 실패했어요.");
        return;
      },
    });
    return;
  };

  // 삭제
  const onClickDeleteStore = () => {
    if (!selectedStoreId) return;
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      removeStore(selectedStoreId, {
        onSuccess: () => {
          toast.success("지점이 삭제 되었습니다.");
          queryClient.invalidateQueries(["stores"]);
          onCloseModal();
          return;
        },
        onError: () => {
          toast.error("삭제에 실패했어요.");
          return;
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={onCloseModal}
      titleText={`협업지점 ${!selectedStoreId ? "추가" : "수정"}`}
      footerContents={
        !selectedStoreId ? (
          <>
            <Button
              size="large"
              autoFocus
              onClick={() => {
                onClickSaveStore();
              }}
            >
              추가
            </Button>
          </>
        ) : (
          <>
            <Button
              size="large"
              autoFocus
              onClick={() => {
                onClickSaveStore();
              }}
            >
              수정
            </Button>
            <Button
              color="error"
              size="large"
              autoFocus
              onClick={() => {
                onClickDeleteStore();
              }}
            >
              삭제
            </Button>
          </>
        )
      }
    >
      <StoreModalContents
        storeData={storeData}
        setStoreData={setStoreData}
        onChangeStoreData={onChangeStoreData}
      />
    </CustomModal>
  );
};

export default StoreModal;
