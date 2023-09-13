import { useState } from "react";
import { Button } from "@mui/material";
import { useGetStores } from "@/hooks/queries/storeQueries";
import useModalStatus from "@/hooks/custom/useModalStatus";
import StoreTable from "@/components/organisms/admin/StoreTable";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import StoreModal from "@/components/pages/admin/store/UI/StoreModal";
import { storeInitializer } from "@/components/pages/admin/store/helper";
import { StoreTableColumns } from "@/utils/admin/storeHelpers";
import StoreImagesModal from "@/components/pages/admin/store/UI/StoreImagesModal";

// 협업지점 리스트 + 모달
const StoreList = () => {
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedStoreId, setSelectedStoreId] = useState<number>();
  const [modalType, setModalType] = useState<"store" | "image">("store");

  // server
  const { data: storesRes } = useGetStores();

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
        <StoreTable
          columns={StoreTableColumns}
          rows={storesRes ?? []}
          onClickStoreRow={onClickStoreRow}
        />
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
            imageUrls: selectedStore.imageUrls,
          }}
        />
      )}
    </>
  );
};

export default StoreList;
