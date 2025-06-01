import toast from "react-hot-toast";
import { useState } from "react";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { Typography, Button } from "@mui/material";
import SelectBox from "@/components/molecules/SelectBox";
import { ProgressSpinner } from "primereact/progressspinner";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { downloadRentDataExcel } from "@/components/pages/admin/rent/helper";
import { TRefundedStatus, TRentHistory } from "@/types/admin/RentTypes";
import { usePaginator } from "@/hooks/custom/usePaginator";
import {
  useRentHistories,
  usePatchPayment,
  usePatchRefund,
  useDeleteAccount,
} from "@/hooks/queries/rentQueries";

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
  const { mutate: mutateUpdatePayment, isLoading: isUpdatingPayment } = usePatchPayment();
  const { mutate: mutateUpdateRefund, isLoading: isUpdatingRefund } = usePatchRefund();
  const { mutate: mutateDeleteAccount, isLoading: isDeletingAccount } = useDeleteAccount();

  // 보증금 입금
  const onTogglePayment = (historyId: number) => {
    mutateUpdatePayment(historyId, {
      onSuccess: () => {
        toast.success("성공적으로 변경되었습니다.");
      },
    });
  };

  // 보증금 환급
  const onToggleRefund = (historyId: number) => {
    mutateUpdateRefund(historyId, {
      onSuccess: () => {
        toast.success("성공적으로 변경되었습니다.");
      },
    });
  };

  // 계좌 정보 삭제
  const handleDeleteAccount = (historyId: number) => {
    if (window.confirm(`계좌정보를 삭제하시겠습니까 ?`)) {
      mutateDeleteAccount(historyId, {
        onSuccess: () => {
          toast.success("성공적으로 삭제하였습니다.");
        },
        onError: () => {
          toast.error("서버 에러가 발생했습니다.");
          return;
        },
      });
    }
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
      <div className="flex items-center gap-8">
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
          {rentHistoriesRes && (
            <RentHistoryExcelButton historiesCount={rentHistoriesRes.countOfAllHistories} />
          )}
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
            const header = RENT_ADMIN_TABLE[field].label;
            const dropDownOptions = RENT_ADMIN_TABLE[field].options;

            return (
              <Column
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
          <Column
            body={(data) => {
              if (!data["refundCompleted"])
                return (
                  <div className="min-w-[100px] whitespace-pre">{`보증금 환급 후에 \n 삭제 가능합니다.`}</div>
                );

              return (
                <Button
                  disabled={isDeletingAccount}
                  style={{ minWidth: "120px" }}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleDeleteAccount(data.id);
                    return;
                  }}
                >
                  계좌 정보 삭제
                </Button>
              );
            }}
          />
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

export const RentHistoryExcelButton = ({ historiesCount }: { historiesCount: number }) => {
  const { data: rentHistoriesRes, isLoading } = useRentHistories({
    refunded: "all",
    size: historiesCount,
  });

  // 한글 매핑
  const onClickExcelBtn = () => {
    if (rentHistoriesRes)
      downloadRentDataExcel({
        fileName: "대여_반납_조회_",
        rows: rentHistoriesRes.rentalHistoryResponsePage.map((e) => ({
          [RENT_ADMIN_TABLE.id.label]: e.id,
          [RENT_ADMIN_TABLE.name.label]: e.name,
          [RENT_ADMIN_TABLE.phoneNumber.label]: e.phoneNumber,
          [RENT_ADMIN_TABLE.rentStoreName.label]: e.rentStoreName,
          [RENT_ADMIN_TABLE.rentAt.label]: e.rentAt,
          [RENT_ADMIN_TABLE.umbrellaUuid.label]: e.umbrellaUuid,
          [RENT_ADMIN_TABLE.elapsedDay.label]: e.elapsedDay,
          [RENT_ADMIN_TABLE.paid.label]: e.paid ? "O" : "X",
          [RENT_ADMIN_TABLE.refundCompleted.label]: e.refundCompleted ? "O" : "X",
          [RENT_ADMIN_TABLE.bank.label]: e.bank,
          [RENT_ADMIN_TABLE.accountNumber.label]: e.accountNumber,
          [RENT_ADMIN_TABLE.returnAt.label]: e.returnAt,
          [RENT_ADMIN_TABLE.returnStoreName.label]: e.returnStoreName,
          [RENT_ADMIN_TABLE.totalRentalDay.label]: e.totalRentalDay,
          [RENT_ADMIN_TABLE.etc.label]: e.etc,
        })),
      });
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

export const RENT_ADMIN_TABLE: Record<
  keyof TRentHistory,
  {
    label: string;
    width?: number;
    options?: { label: string; value: boolean }[];
  }
> = {
  id: { label: "일련 번호", width: 100 },
  name: { label: "이름" },
  phoneNumber: { label: "전화번호", width: 150 },
  rentStoreName: { label: "대여 지점" },
  rentAt: { label: "대여 날짜", width: 150 },
  umbrellaUuid: { label: "우산 고유 번호" },
  elapsedDay: { label: "대여 경과 일수" },
  paid: {
    label: "보증금 입금 여부",
    width: 150,
    options: [
      { label: "입금", value: true },
      { label: "미입금", value: false },
    ],
  },
  refundCompleted: {
    label: "보증금 환급 여부",
    width: 150,
    options: [
      { label: "환급 완료", value: true },
      { label: "미완료", value: false },
    ],
  },
  bank: { label: "환급 은행" },
  accountNumber: { label: "환급 계좌 번호", width: 150 },
  returnAt: { label: "반납 날짜", width: 150 },
  returnStoreName: { label: "반납 지점" },
  totalRentalDay: { label: "총 대여 기간" },
  etc: { label: "비고" },
};
