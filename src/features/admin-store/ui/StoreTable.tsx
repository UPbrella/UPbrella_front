import { usePatchStoreActive, usePatchStoreInactive } from "@/entities/store/api/store.queries";
import { TAdminStoreDetail, TStoreTableData, TStoreTableKey } from "@/entities/store/model/types";
import { filterStoreTableView } from "@/features/admin-store/lib/store-helpers";
import { STORE_ADMIN_TABLE } from "@/features/admin-store/lib/table-config";
import logo from "@/shared/assets/main_logo.svg";
import useModalStatus from "@/shared/hooks/useModalStatus";
import { CssDataTable } from "@/shared/ui/DataTable";
import CustomModal from "@/shared/ui/Modal";
import { Button } from "@mui/material";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TProps = {
  storesRes: TAdminStoreDetail[];
  onClickStoreRow: (id: number, type: "store" | "image") => void;
};

const StoreTable = ({ storesRes, onClickStoreRow }: TProps) => {
  const { t } = useTranslation();
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedStore, setSelectedStore] = useState<TStoreTableData>();

  const { mutate: mutateStoreActive, isLoading: isMutatingStoreActive } = usePatchStoreActive();
  const { mutate: mutateStoreInactive, isLoading: isMutatingStoreInactive } =
    usePatchStoreInactive();

  const filterStoreTableData = storesRes.map((storeRes) => filterStoreTableView(storeRes));

  const onMutateStoreActiveStatus = (storeRes: TStoreTableData, checked: boolean) => {
    if (window.confirm(t("admin.store.activeConfirm", { name: storeRes.name }))) {
      if (checked) {
        mutateStoreActive(storeRes.id);
        return;
      }

      mutateStoreInactive(storeRes.id);
    }
  };

  return (
    <>
      {selectedStore && isOpen && (
        <StoreQRModal
          selectedStore={selectedStore}
          isOpen={isOpen}
          handleCloseModal={handleClose}
        />
      )}

      <CssDataTable
        paginator
        rows={10}
        scrollable
        showGridlines
        style={{
          cursor: "pointer",
        }}
        stripedRows
        value={filterStoreTableData}
        emptyMessage={t("admin.common.emptyResult")}
        onRowClick={(e) => {
          const storeRes = e.data as TStoreTableData;
          onClickStoreRow(storeRes.id, "store");
        }}
        rowHover
      >
        <Column
          header={t("admin.store.qr")}
          style={{ minWidth: "90px" }}
          body={(data: TStoreTableData) => (
            <Button
              variant="outlined"
              color="warning"
              onClick={(e) => {
                setSelectedStore(data);
                handleOpen();
                e.stopPropagation();
              }}
            >
              {t("admin.common.confirm")}
            </Button>
          )}
        />
        {Object.keys(STORE_ADMIN_TABLE).map((key) => {
          const field = key as TStoreTableKey;
          const { labelKey, minWidth } = STORE_ADMIN_TABLE[field];
          return (
            <Column
              key={key}
              style={{ minWidth }}
              header={labelKey ? t(labelKey) : field}
              field={field}
              body={(data: TStoreTableData) => {
                if (field === "activateStatus") {
                  return (
                    <InputSwitch
                      disabled={isMutatingStoreActive || isMutatingStoreInactive}
                      checked={data[field]}
                      onChange={(e) => {
                        onMutateStoreActiveStatus(data, e.value as boolean);
                        e.stopPropagation();
                      }}
                    />
                  );
                }

                if (field === "imageUrls") {
                  return (
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        onClickStoreRow(data.id, "image");
                        e.stopPropagation();
                      }}
                    >
                      {t("admin.store.imageUpload")}
                    </Button>
                  );
                }

                return data[field];
              }}
            />
          );
        })}
      </CssDataTable>
    </>
  );
};

export default StoreTable;

const StoreQRModal = ({
  isOpen,
  handleCloseModal,
  selectedStore,
}: {
  isOpen: boolean;
  handleCloseModal: () => void;
  selectedStore: TStoreTableData;
}) => {
  const { t } = useTranslation();
  const QR_CODE_URL = `${window.location.origin}/return/form?storeId=${selectedStore.id}`;

  const handleDownloadClick = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas ? canvas.toDataURL("image/png") : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${selectedStore.name}-storeId:${selectedStore.id}.png`;
    link.click();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={handleCloseModal}
      titleText={`"${selectedStore.name}" ${t("admin.store.qr")}`}
    >
      <div className="flex flex-col items-center gap-[4px] p-16">
        <QRCodeCanvas
          size={200}
          includeMargin
          value={QR_CODE_URL}
          imageSettings={{
            src: logo,
            height: 50,
            width: 50,
            excavate: false,
          }}
        />
        <Button variant="contained" onClick={handleDownloadClick}>
          {t("admin.store.qrDownload")}
        </Button>
        <div>{QR_CODE_URL}</div>
      </div>
    </CustomModal>
  );
};
