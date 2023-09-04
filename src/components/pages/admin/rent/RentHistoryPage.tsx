import styled from "@emotion/styled";
import { usePatchPayment, usePatchRefund, useRentHistories } from "@/hooks/queries/rentQueries";
import { TRefundedStatus, TRentHistory } from "@/types/admin/RentTypes";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-hot-toast";
import { Paginator } from "primereact/paginator";
import { usePaginator } from "@/hooks/custom/usePaginator";
import { Button, Typography } from "@mui/material";
import SelectBox from "@/components/molecules/SelectBox";
import { useState } from "react";
import { downloadRentDataExcel } from "@/components/pages/admin/rent/helper";

const RentHistoryPage = () => {
  const {
    onPageChange,
    pageState: { first, page, rows },
  } = usePaginator({
    rows: 10,
  });

  // client
  const [filterRefunded, setFilterRefunded] = useState<TRefundedStatus>("all");

  // server
  const { data: rentHistoriesRes, isLoading: isLoadingHistories } = useRentHistories({
    refunded: filterRefunded,
    page,
    size: rows,
  });
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

  const refundedOptions: { label: string; value: TRefundedStatus }[] = [
    {
      label: "전체",
      value: "all",
    },
    {
      label: "미완료",
      value: "notDone",
    },
    {
      label: "환급 완료",
      value: "done",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h5">{"대여, 반납 현황 조회"}</Typography>
      <div className="flex gap-8 items-center">
        <div>
          <SelectBox
            label="보증금 환급 여부"
            name="refunded"
            value={filterRefunded}
            menuItems={refundedOptions}
            onChange={(_, value) => {
              const _value = value as TRefundedStatus;
              setFilterRefunded(_value);
            }}
          />
        </div>

        <div>
          <RentHistoryExcelButton />
        </div>
      </div>

      <div>
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
          value={rentHistoriesRes?.rentalHistoryResponsePage}
        >
          {Object.keys(RENT_ADMIN_TABLE).map((key) => {
            const field = key as keyof TRentHistory;
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
                    ? (data: TRentHistory) => (
                        <Dropdown
                          disabled={isUpdatingPayment || isUpdatingRefund}
                          options={dropDownOptions}
                          value={data[field]}
                          onChange={() => {
                            if (field === "paid") onTogglePayment(data.id);
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
          rows={rows}
          pageLinkSize={5}
          totalRecords={rentHistoriesRes?.countOfAllHistories}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RentHistoryPage;

export const RentHistoryExcelButton = () => {
  const { data: rentHistoriesRes, isLoading } = useRentHistories({
    refunded: "all",
  });

  // 한글 매핑
  const onClickExcelBtn = () => {
    if (rentHistoriesRes)
      downloadRentDataExcel(
        rentHistoriesRes.rentalHistoryResponsePage.map((e) => ({
          [RENT_ADMIN_TABLE.id.kor]: e.id,
          [RENT_ADMIN_TABLE.name.kor]: e.name,
          [RENT_ADMIN_TABLE.phoneNumber.kor]: e.phoneNumber,
          [RENT_ADMIN_TABLE.rentStoreName.kor]: e.rentStoreName,
          [RENT_ADMIN_TABLE.rentAt.kor]: e.rentAt,
          [RENT_ADMIN_TABLE.umbrellaUuid.kor]: e.umbrellaUuid,
          [RENT_ADMIN_TABLE.elapsedDay.kor]: e.elapsedDay,
          [RENT_ADMIN_TABLE.paid.kor]: e.paid ? "O" : "X",
          [RENT_ADMIN_TABLE.refundCompleted.kor]: e.refundCompleted ? "O" : "X",
          [RENT_ADMIN_TABLE.bank.kor]: e.bank,
          [RENT_ADMIN_TABLE.accountNumber.kor]: e.accountNumber,
          [RENT_ADMIN_TABLE.returnAt.kor]: e.returnAt,
          [RENT_ADMIN_TABLE.returnStoreName.kor]: e.returnStoreName,
          [RENT_ADMIN_TABLE.totalRentalDay.kor]: e.totalRentalDay,
          [RENT_ADMIN_TABLE.etc.kor]: e.etc,
        }))
      );
  };

  return (
    <Button
      disabled={isLoading && !rentHistoriesRes}
      fullWidth
      size="large"
      variant="contained"
      onClick={onClickExcelBtn}
    >
      데이터 다운로드
    </Button>
  );
};

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

export const RENT_ADMIN_TABLE: Record<
  keyof TRentHistory,
  { kor: string; width?: number; options?: { label: string; value: boolean }[]; notSort?: boolean }
> = {
  id: { kor: "일련 번호", width: 100 },
  name: { kor: "이름" },
  phoneNumber: { kor: "전화번호", width: 150 },
  rentStoreName: { kor: "대여 지점", notSort: true },
  rentAt: { kor: "대여 날짜", width: 150 },
  umbrellaUuid: { kor: "우산 고유 번호" },
  elapsedDay: { kor: "대여 경과 일수" },
  paid: {
    kor: "보증금 입금 여부",
    width: 150,
    options: [
      { label: "입금", value: true },
      { label: "미입금", value: false },
    ],
  },
  refundCompleted: {
    kor: "보증금 환급 여부",
    notSort: true,
    width: 150,
    options: [
      { label: "환급 완료", value: true },
      { label: "미완료", value: false },
    ],
  },
  bank: { kor: "환급 은행", notSort: true },
  accountNumber: { kor: "환급 계좌 번호", width: 150, notSort: true },
  returnAt: { kor: "반납 날짜", width: 150 },
  returnStoreName: { kor: "반납 지점", notSort: true },
  totalRentalDay: { kor: "총 대여 기간" },
  etc: { kor: "비고", notSort: true },
};
