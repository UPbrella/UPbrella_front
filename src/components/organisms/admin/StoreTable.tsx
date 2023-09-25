import { TAdminStoreDetail, TStoreTableData, TStoreTableKey } from "@/types/admin/StoreTypes";
import { Button } from "@mui/material";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { Column } from "primereact/column";
import { filterStoreTableView } from "@/components/pages/admin/store/helper";
import { STORE_ADMIN_TABLE } from "@/utils/admin/storeHelpers";
import { InputSwitch } from "primereact/inputswitch";
import { usePatchStoreActive, usePatchStoreInactive } from "@/hooks/queries/storeQueries";

type TProps = {
  storesRes: TAdminStoreDetail[];
  onClickStoreRow: (id: number, type: "store" | "image") => void;
};

const StoreTable = ({ storesRes, onClickStoreRow }: TProps) => {
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
