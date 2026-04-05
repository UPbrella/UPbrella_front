import { useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetStores } from "@/entities/store/api/store.queries";
import useModalStatus from "@/shared/hooks/useModalStatus";
import StoreTable from "@/features/admin-store/ui/StoreTable";
import ContentsTitle from "@/shared/ui/ContentsTitle";
import StoreModal from "@/pages/admin/store/ui/StoreModal";
import { storeInitializer } from "@/features/admin-store/lib/store-helpers";
import StoreImagesModal from "@/pages/admin/store/ui/StoreImagesModal";

const StoreList = () => {
  const { t } = useTranslation();
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedStoreId, setSelectedStoreId] = useState<number>();
  const [modalType, setModalType] = useState<"store" | "image">("store");

  // server
  const { data: storesRes, isError } = useGetStores();

  const onClickStoreRow = (id: number, type: "store" | "image") => {
    setModalType(type);
    handleOpen();
    setSelectedStoreId(id);
  };

  const onCloseModal = () => {
    handleClose();
    setSelectedStoreId(undefined);
  };

  const selectedStore = storesRes?.find((row) => row.id === selectedStoreId);

  return (
    <>
      <div className="flex flex-col gap-8">
        <ContentsTitle title={t("admin.store.listTitle")}>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              setModalType("store");
            }}
          >
            {t("admin.common.add")}
          </Button>
        </ContentsTitle>

        {storesRes && <StoreTable storesRes={storesRes} onClickStoreRow={onClickStoreRow} />}
        {isError && <>{t("admin.common.serverError")}</>}
      </div>

      {modalType === "store" && (
        <StoreModal
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          selectedStore={storeInitializer(selectedStore)}
          selectedStoreId={selectedStoreId}
        />
      )}

      {modalType === "image" && selectedStore && (
        <StoreImagesModal
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          selectedStore={{
            id: selectedStore.id,
            name: selectedStore.name,
          }}
        />
      )}
    </>
  );
};

export default StoreList;
