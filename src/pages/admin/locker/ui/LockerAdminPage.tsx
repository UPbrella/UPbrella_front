import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { Button, CircularProgress } from "@mui/material";
import useModalStatus from "@/shared/hooks/useModalStatus";
import { useGetLockers } from "@/entities/locker/api/locker.queries";
import { useGetStores } from "@/entities/store/api/store.queries";
import ContentsTitle from "@/shared/ui/ContentsTitle";
import LockerModal from "@/pages/admin/locker/ui/LockerModal";
import { CssDataTable } from "@/shared/ui/DataTable";
import { TLockersRes } from "@/entities/locker/model/types";

const LockerAdminPage = () => {
  const { t } = useTranslation();
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
        <div>{t("admin.common.loading")}</div>
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
        <div>{t("admin.common.loadError")}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ContentsTitle title={t("admin.locker.title")}>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedLocker(undefined);
            handleOpen();
          }}
        >
          {t("admin.common.add")}
        </Button>
      </ContentsTitle>

      <CssDataTable
        value={lockersListRes}
        emptyMessage={t("admin.locker.empty")}
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
          header={t("admin.locker.storeColumn")}
          field="storeMetaId"
          style={{ minWidth: "150px" }}
          body={(data: TLockersRes) =>
            storesListRes.find((e) => e.id === data.storeMetaId)?.name ??
            t("admin.locker.invalidStore")
          }
        />
        <Column
          header={t("admin.locker.secretKey")}
          field="secretKey"
          style={{ minWidth: "120px" }}
          body={(data: TLockersRes) => (
            <div>
              {data.secretKey.length > 50 ? data.secretKey.slice(0, 50) + "..." : data.secretKey}
            </div>
          )}
        />
      </CssDataTable>

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
