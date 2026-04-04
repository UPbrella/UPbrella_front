import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomModal from "@/shared/ui/Modal";
import StoreModalContents from "@/pages/admin/store/ui/StoreModalBody";
import { TStoreBusinessHours, TStoreParams } from "@/entities/store/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStores, patchStores, postStores } from "@/entities/store/api/store-api";
import toast from "react-hot-toast";
import { isValidateStoreSave } from "@/features/admin-store/lib/store-helpers";
import { formatPhoneNumber } from "@/shared/lib/utils";
import { STORE_QUERY_KEYS } from "@/entities/store/api/store.queries";

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

const StoreModal = ({ isOpen, onCloseModal, selectedStore, selectedStoreId }: TProps) => {
  const { t } = useTranslation();
  const { kakao } = window;

  // client
  const [isDirty, setIsDirty] = useState(false);
  const [storeData, setStoreData] = useState(selectedStore);

  // server
  const queryClient = useQueryClient();
  const { mutate: createStore } = useMutation(postStores);
  const { mutate: updateStore } = useMutation(patchStores);
  const { mutate: removeStore } = useMutation(deleteStores);

  useEffect(() => {
    if (selectedStore) {
      setStoreData(selectedStore);
      setIsDirty(false);
    }
  }, [selectedStore]);

  const getCoordinateByAddress = (address: string) => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: TKakaoAddressResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          if (result[0]) {
            setStoreData((prev) => ({
              ...prev,
              address,
              latitude: +result[0].y,
              longitude: +result[0].x,
            }));
          } else {
            toast.error(t("admin.store.toast.coordError"));
          }
        }
      });
    });
  };

  const onChangeStoreData = (e: {
    target: { name: string; value: string | number | null | TStoreBusinessHours[] };
  }) => {
    setIsDirty(true);
    const { name, value } = e.target;
    if (name === "contactNumber") {
      if (typeof value === "string") {
        setStoreData({
          ...storeData,
          [name]: formatPhoneNumber(value),
        });
        return;
      }
    }

    if (name === "address") {
      getCoordinateByAddress(value as string);
      return;
    }

    if (name === "content") {
      if ((value as string).length > 200) return;
      setStoreData({
        ...storeData,
        content: value as string,
      });
      return;
    }

    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  const onClickSaveStore = () => {
    if (!isValidateStoreSave(storeData)) return;

    if (selectedStoreId) {
      updateStore(
        { storeId: selectedStoreId, params: storeData },
        {
          onSuccess: () => {
            toast.success(t("admin.store.toast.editSuccess"));
            queryClient.invalidateQueries([...STORE_QUERY_KEYS.stores()]);
            queryClient.invalidateQueries([
              ...STORE_QUERY_KEYS.storeBusinessHours(selectedStoreId),
            ]);
            onCloseModal();
            return;
          },
          onError: () => {
            toast.error(t("admin.store.toast.editFail"));
            return;
          },
        }
      );
      return;
    }

    createStore(storeData, {
      onSuccess: () => {
        toast.success(t("admin.store.toast.createSuccess"));
        queryClient.invalidateQueries([...STORE_QUERY_KEYS.stores()]);
        onCloseModal();
        return;
      },
      onError: () => {
        toast.error(t("admin.store.toast.createFail"));
        return;
      },
    });
    return;
  };

  const onClickDeleteStore = () => {
    if (!selectedStoreId) return;
    if (window.confirm(t("admin.common.deleteConfirm"))) {
      removeStore(selectedStoreId, {
        onSuccess: () => {
          toast.success(t("admin.store.toast.deleteSuccess"));
          queryClient.invalidateQueries(["stores"]);
          onCloseModal();
          return;
        },
        onError: () => {
          toast.error(t("admin.store.toast.deleteFail"));
          return;
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={() => {
        if (isDirty) {
          if (window.confirm(t("admin.common.discardConfirm"))) {
            onCloseModal();
          }
          return;
        }
        onCloseModal();
      }}
      titleText={!selectedStoreId ? t("admin.store.modalAdd") : t("admin.store.modalEdit")}
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
              {t("admin.common.add")}
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
              {t("admin.common.edit")}
            </Button>
            <Button
              color="error"
              size="large"
              autoFocus
              onClick={() => {
                onClickDeleteStore();
              }}
            >
              {t("admin.common.delete")}
            </Button>
          </>
        )
      }
    >
      <StoreModalContents
        storeData={storeData}
        setStoreData={setStoreData}
        onChangeStoreData={onChangeStoreData}
        selectedStoreId={selectedStoreId}
      />
    </CustomModal>
  );
};

export default StoreModal;
