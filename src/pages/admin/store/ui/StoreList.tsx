import { useState } from "react";
import { Button } from "@mui/material";
import { useGetStores } from "@/entities/store/api/store.queries";
import useModalStatus from "@/shared/hooks/useModalStatus";
import StoreTable from "@/features/admin-store/ui/StoreTable";
import ContentsTitle from "@/shared/ui/ContentsTitle";
import StoreModal from "@/pages/admin/store/ui/StoreModal";
import { storeInitializer } from "@/features/admin-store/lib/store-helpers";
import StoreImagesModal from "@/pages/admin/store/ui/StoreImagesModal";

// 협업지점 리스트 + 모달
const StoreList = () => {
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
        {/* 컨텐츠 헤더  */}
        <ContentsTitle title={"협업지점 목록"}>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              setModalType("store");
            }}
          >
            추가
          </Button>
        </ContentsTitle>

        {/* 협업 지점 테이블 */}
        {storesRes && <StoreTable storesRes={storesRes} onClickStoreRow={onClickStoreRow} />}
        {isError && <>서버 에러입니다.</>}
      </div>

      {/* store 생성 및 수정 Modal */}
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
