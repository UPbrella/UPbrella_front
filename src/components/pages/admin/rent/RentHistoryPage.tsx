import styled from "@emotion/styled";
import { usePatchPayment, usePatchRefund, useRentHistories } from "@/hooks/queries/rentQueries";
import { TRentHistory } from "@/types/admin/RentTypes";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { toast } from "react-hot-toast";
import { Paginator } from "primereact/paginator";
import { useState } from "react";

type TRentHistoryState = TRentHistory & {
  isReturned: boolean;
};

const RentHistoryPage = () => {
  // client
  // TODO: API 수정 시 반영
  const [first] = useState(0);

  // server
  const { data: rentHistoriesRes, isLoading: isLoadingHistories } = useRentHistories();
  const { mutate: updatePayment, isLoading: isUpdatingPayment } = usePatchPayment();
  const { mutate: updateRefund, isLoading: isUpdatingRefund } = usePatchRefund();

  // 보증금 입금
  const onTogglePayment = (historyId: number) => {
    updatePayment(historyId, {
      onSuccess: () => {
        toast.success("성공적으로 변경되었습니다.");
      },
    });
  };

  // 보증금 환급
  const onToggleRefund = (historyId: number) => {
    updateRefund(historyId, {
      onSuccess: () => {
        toast.success("성공적으로 변경되었습니다.");
      },
    });
  };

  return (
    <>
      <CssDataTable
        emptyMessage={
          isLoadingHistories ? (
            <div className="w-[85vw] flex justify-center">
              <ProgressSpinner />
            </div>
          ) : (
            "결과가 없습니다."
          )
        }
        scrollable
        showGridlines
        stripedRows
        removableSort
        sortMode="multiple"
        editMode="cell"
        value={rentHistoriesRes}
      >
        {Object.keys(RENT_ADMIN_TABLE).map((key) => {
          const field = key as keyof TRentHistoryState;
          const minWidth = RENT_ADMIN_TABLE[field].width ?? "130px";
          const header = RENT_ADMIN_TABLE[field].label;
          const dropDownOptions = RENT_ADMIN_TABLE[field].options;
          const sortable = !RENT_ADMIN_TABLE[field].notSort;

          return (
            <Column
              sortable={sortable}
              key={key}
              style={{ minWidth }}
              field={field}
              header={header}
              body={
                dropDownOptions
                  ? (data: TRentHistoryState) => (
                      <Dropdown
                        disabled={isUpdatingPayment || isUpdatingRefund}
                        options={dropDownOptions}
                        value={data[field]}
                        onChange={() => {
                          if (field === "rentCostCompleted") onTogglePayment(data.id);
                          if (field === "refundCompleted") onToggleRefund(data.id);
                        }}
                      />
                    )
                  : null
              }
            />
          );
        })}
      </CssDataTable>
      <Paginator
        first={first}
        rows={10}
        pageLinkSize={5}
        // TODO: API 수정 반영
        // totalRecords={buildingList?.totalElements}
        // onPageChange={onPageChange}
      />
    </>
  );
};

export default RentHistoryPage;

const RENT_ADMIN_TABLE: Record<
  keyof TRentHistoryState,
  {
    label: string;
    width?: number;
    options?: { label: string; value: boolean }[];
    notSort?: boolean;
  }
> = {
  id: { label: "일련 번호", width: 100 },
  name: { label: "이름" },
  phoneNumber: { label: "전화번호", width: 150 },
  rentStoreName: { label: "대여 지점", notSort: true },
  rentAt: { label: "대여 날짜", width: 150 },
  umbrellaUuid: { label: "우산 고유 번호" },
  elapsedDay: { label: "대여 경과 일수" },
  rentCostCompleted: {
    label: "보증금 입금 여부",
    width: 150,
    options: [
      { label: "입금", value: true },
      { label: "미입금", value: false },
    ],
  },
  isReturned: { label: "반납 여부" },
  refundCompleted: {
    label: "보증금 환급 여부",
    width: 150,
    options: [
      { label: "환급 완료", value: true },
      { label: "미완료", value: false },
    ],
  },
  returnBank: { label: "환급 은행", notSort: true },
  bankNumber: { label: "환급 계좌 번호", width: 150, notSort: true },
  returnAt: { label: "반납 날짜", width: 150 },
  returnStoreName: { label: "반납 지점", notSort: true },
  totalRentalDay: { label: "총 대여 기간" },
  etc: { label: "비고", notSort: true },
};
