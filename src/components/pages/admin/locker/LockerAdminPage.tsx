import { useState } from "react";
import { Column } from "primereact/column";
import { Button, CircularProgress } from "@mui/material";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { useGetLockers } from "@/hooks/queries/lockerQueries";
import { useGetStores } from "@/hooks/queries/storeQueries";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import LockerModal from "@/components/pages/admin/locker/LockerModal";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { TLockersRes } from "@/types/admin/lockersTypes";

const LockerAdminPage = () => {
  // client
  const { isOpen, handleClose, handleOpen } = useModalStatus();
  const [selectedLocker, setSelectedLocker] = useState<TLockersRes>();

  // server
  const {
    data: storesListRes,
    isLoading: isStoresLoading,
    isError: isStoresError,
  } = useGetStores();
  const {
    data: lockersListRes,
    isLoading: isLockersLoading,
    isError: isLockersError,
  } = useGetLockers();

  if (isStoresLoading || isLockersLoading) {
    return (
      <div className="flex flex-col items-center gap-4 mt-56">
        <div>데이터를 불러오는 중입니다.</div>
        <CircularProgress
          size={70}
          sx={{
            color: "#E86F52",
          }}
        />
      </div>
    );
  }

  if (isStoresError || isLockersError) {
    return (
      <div className="flex flex-col items-center mt-56">
        <div>데이터를 불러오던 중 에러가 발생했습니다. 다시 요청해주세요.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ContentsTitle title={"보관함 목록"}>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedLocker(undefined);
            handleOpen();
          }}
        >
          추가
        </Button>
      </ContentsTitle>

      {/* 테이블 */}
      <CssDataTable
        value={lockersListRes}
        emptyMessage={"생성한 보관함이 없습니다."}
        stripedRows
        paginator
        rows={10}
        scrollable
        showGridlines
        style={{
          cursor: "pointer",
        }}
        onRowClick={(e) => {
          const lockerRes = e.data as TLockersRes;
          setSelectedLocker(lockerRes);
          handleOpen();
        }}
        rowHover
      >
        <Column
          header="No"
          style={{ minWidth: "120px" }}
          body={(_, { rowIndex }) => <>{rowIndex + 1}</>}
        />

        <Column
          header="협업 지점"
          field="storeMetaId"
          style={{ minWidth: "150px" }}
          body={(data: TLockersRes) =>
            storesListRes.find((e) => e.id === data.storeMetaId)?.name ?? "잘못된 지점입니다."
          }
        />
        <Column
          header="비밀키"
          field="secretKey"
          style={{ minWidth: "120px" }}
          body={(data: TLockersRes) => (
            <div>
              {data.secretKey.length > 50 ? data.secretKey.slice(0, 50) + "..." : data.secretKey}
            </div>
          )}
        />
      </CssDataTable>

      {/* 모달 */}
      {isOpen && (
        <LockerModal
          isOpen={isOpen}
          handleClose={handleClose}
          storesListRes={storesListRes}
          selectedLocker={selectedLocker}
        />
      )}
    </div>
  );
};

export default LockerAdminPage;
