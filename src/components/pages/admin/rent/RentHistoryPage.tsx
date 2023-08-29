import styled from "@emotion/styled";
import { useRentHistories } from "@/hooks/queries/rentQueries";
import { TRentHistory } from "@/types/admin/RentTypes";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";

type TRentHistoryState = TRentHistory & {
  isReturned: boolean;
};

const RentHistoryPage = () => {
  const { data, isLoading } = useRentHistories();

  return (
    <>
      <CssDataTable
        emptyMessage={
          isLoading ? (
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
        value={data}
      >
        {Object.keys(RENT_ADMIN_TABLE).map((key) => {
          const field = key as keyof TRentHistoryState;
          const minWidth = RENT_ADMIN_TABLE[field].width ?? "130px";
          const header = RENT_ADMIN_TABLE[field].kor;
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
                  ? (data) => (
                      <Dropdown
                        options={dropDownOptions}
                        value={data[field]}
                        onChange={() => {
                          // TODO:API
                          return;
                        }}
                      />
                    )
                  : null
              }
            />
          );
        })}
      </CssDataTable>
    </>
  );
};

export default RentHistoryPage;

const CssDataTable = styled(DataTable)`
  font-size: 14px;

  th,
  td {
    text-align: center !important;
  }

  .p-column-header-content {
    justify-content: center !important;
  }
`;

const RENT_ADMIN_TABLE: Record<
  keyof TRentHistoryState,
  { kor: string; width?: number; options?: { label: string; value: boolean }[]; notSort?: boolean }
> = {
  id: { kor: "일련 번호", width: 100 },
  name: { kor: "이름" },
  phoneNumber: { kor: "전화번호", width: 150 },
  rentStoreName: { kor: "대여 지점", notSort: true },
  rentAt: { kor: "대여 날짜", width: 150 },
  umbrellaUuid: { kor: "우산 고유 번호" },
  elapsedDay: { kor: "대여 경과 일수" },
  rentCostCompleted: {
    kor: "보증금 입금 여부",
    width: 150,
    options: [
      { label: "환급 완료", value: true },
      { label: "미완료", value: false },
    ],
  },
  isReturned: { kor: "반납 여부" },
  refundCompleted: {
    kor: "보증금 환급 여부",
    width: 150,
    options: [
      { label: "입금", value: true },
      { label: "미입금", value: false },
    ],
  },
  returnBank: { kor: "환급 은행", notSort: true },
  bankNumber: { kor: "환급 계좌 번호", width: 150, notSort: true },
  returnAt: { kor: "반납 날짜", width: 150 },
  returnStoreName: { kor: "반납 지점", notSort: true },
  totalRentalDay: { kor: "총 대여 기간" },
  etc: { kor: "비고", notSort: true },
};
