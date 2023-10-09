import { TAdminStoreDetail, TStoreTableData, TStoreTableKey } from "@/types/admin/StoreTypes";
import { Button } from "@mui/material";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { Column } from "primereact/column";
import { filterStoreTableView } from "@/components/pages/admin/store/helper";
import { STORE_ADMIN_TABLE } from "@/utils/admin/storeHelpers";
import { InputSwitch } from "primereact/inputswitch";
import { usePatchStoreActive, usePatchStoreInactive } from "@/hooks/queries/storeQueries";
import CustomModal from "@/components/organisms/Modal";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "@/assets/main_logo.svg";

type TProps = {
  storesRes: TAdminStoreDetail[];
  onClickStoreRow: (id: number, type: "store" | "image") => void;
};

const StoreTable = ({ storesRes, onClickStoreRow }: TProps) => {
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedStore, setSelectedStore] = useState<TStoreTableData>();

  const { mutate: mutateStoreActive, isLoading: isMutatingStoreActive } = usePatchStoreActive();
  const { mutate: mutateStoreInactive, isLoading: isMutatingStoreInactive } =
    usePatchStoreInactive();

  const filterStoreTableData = storesRes.map((storeRes) => filterStoreTableView(storeRes));

  const onMutateStoreActiveStatus = (storeRes: TStoreTableData, checked: boolean) => {
    if (window.confirm(`${storeRes.name} 의 활성여부를 변경하시겠어요?`)) {
      if (checked) {
        // 활성화
        mutateStoreActive(storeRes.id);
        return;
      }

      // 비활성화
      mutateStoreInactive(storeRes.id);
    }
  };

  return (
    <>
      {/* QR Modal */}
      {selectedStore && isOpen && (
        <StoreQRModal
          selectedStore={selectedStore}
          isOpen={isOpen}
          handleCloseModal={handleClose}
        />
      )}

      {/* Table */}
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
        emptyMessage={"결과가 없습니다."}
        onRowClick={(e) => {
          const storeRes = e.data as TStoreTableData;
          onClickStoreRow(storeRes.id, "store");
        }}
        rowHover
      >
        <Column
          header="QR 코드"
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
              확인
            </Button>
          )}
        />
        {Object.keys(STORE_ADMIN_TABLE).map((key) => {
          const field = key as TStoreTableKey;
          const { label, minWidth } = STORE_ADMIN_TABLE[field];
          return (
            <Column
              key={key}
              style={{ minWidth }}
              header={label}
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
                      이미지 업로드 및 확인
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
      titleText={`"${selectedStore.name}" QR 코드`}
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
          QR 이미지 다운로드
        </Button>
        <div>{QR_CODE_URL}</div>
      </div>
    </CustomModal>
  );
};
