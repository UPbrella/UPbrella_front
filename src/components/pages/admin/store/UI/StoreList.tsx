import { useState } from "react";
import { Button } from "@mui/material";
import { useGetStores } from "@/hooks/queries/storeQueries";
import useModalStatus from "@/hooks/custom/useModalStatus";
import StoreTable from "@/components/organisms/admin/StoreTable";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import StoreModal from "@/components/pages/admin/store/UI/StoreModal";
import { storeInitializer } from "@/components/pages/admin/store/helper";
import { StoreTableColumns, getStoreTableData } from "@/utils/admin/storeHelpers";

// 협업지점 리스트 + 모달
const StoreList = () => {
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedStoreId, setSelectedStoreId] = useState<number>();

  // server
  const { data: storesRes } = useGetStores();

  const onClickStoreRow = (id: number) => {
    handleOpen();
    setSelectedStoreId(id);
  };

  const onCloseModal = () => {
    handleClose();
    setSelectedStoreId(undefined);
  };

  // TODO: filter table row Data
  const rows = getStoreTableData(storesRes ?? []);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* 컨텐츠 헤더  */}
        <ContentsTitle title={"협업지점 목록"}>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            추가
          </Button>
        </ContentsTitle>

        {/* 협업 지점 테이블 */}
        <StoreTable columns={StoreTableColumns} rows={rows} onClickStoreRow={onClickStoreRow} />
      </div>

      {/* store 생성 및 수정 Modal */}
      <StoreModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        selectedStore={storeInitializer(storesRes?.find((row) => row.id === selectedStoreId))}
        selectedStoreId={selectedStoreId}
      />
    </>
  );
};

export default StoreList;
