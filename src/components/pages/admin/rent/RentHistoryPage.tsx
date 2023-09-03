import { useRentHistories } from "@/hooks/queries/rentQueries";
import { TRentHistory } from "@/types/admin/RentTypes";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { CssDataTable } from "@/components/pages/admin/components/Table";

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
      { label: "환급 완료", value: true },
      { label: "미완료", value: false },
    ],
  },
  isReturned: { label: "반납 여부" },
  refundCompleted: {
    label: "보증금 환급 여부",
    width: 150,
    options: [
      { label: "입금", value: true },
      { label: "미입금", value: false },
    ],
  },
  returnBank: { label: "환급 은행", notSort: true },
  bankNumber: { label: "환급 계좌 번호", width: 150, notSort: true },
  returnAt: { label: "반납 날짜", width: 150 },
  returnStoreName: { label: "반납 지점", notSort: true },
  totalRentalDay: { label: "총 대여 기간" },
  etc: { label: "비고", notSort: true },
};
