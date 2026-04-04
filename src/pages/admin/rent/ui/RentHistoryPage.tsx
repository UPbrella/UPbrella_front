import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { Typography, Button } from "@mui/material";
import SelectBox from "@/shared/ui/SelectBox";
import { ProgressSpinner } from "primereact/progressspinner";
import { CssDataTable } from "@/shared/ui/DataTable";
import { downloadExcel } from "@/shared/lib/excel";
import { TRefundedStatus, TRentHistory } from "@/entities/rent/model/types";
import { usePaginator } from "@/shared/hooks/usePaginator";
import {
  useRentHistories,
  usePatchPayment,
  usePatchRefund,
  useDeleteAccount,
} from "@/entities/rent/api/rent.queries";
import type ko from "@/shared/lib/i18n/locales/ko.json";

type TI18nKey = keyof typeof ko;

const RENT_ADMIN_TABLE: Record<
  keyof TRentHistory,
  {
    labelKey: TI18nKey;
    width?: number;
    optionKeys?: { labelKey: TI18nKey; value: boolean }[];
  }
> = {
  id: { labelKey: "admin.rent.col.id", width: 100 },
  name: { labelKey: "admin.rent.col.name" },
  phoneNumber: { labelKey: "admin.rent.col.phone", width: 150 },
  rentStoreName: { labelKey: "admin.rent.col.rentStore" },
  rentAt: { labelKey: "admin.rent.col.rentAt", width: 150 },
  umbrellaUuid: { labelKey: "admin.rent.col.umbrellaUuid" },
  elapsedDay: { labelKey: "admin.rent.col.elapsedDay" },
  paid: {
    labelKey: "admin.rent.col.depositPaid",
    width: 150,
    optionKeys: [
      { labelKey: "admin.rent.col.depositPaidYes", value: true },
      { labelKey: "admin.rent.col.depositPaidNo", value: false },
    ],
  },
  refundCompleted: {
    labelKey: "admin.rent.col.refunded",
    width: 150,
    optionKeys: [
      { labelKey: "admin.rent.filterComplete", value: true },
      { labelKey: "admin.rent.filterIncomplete", value: false },
    ],
  },
  bank: { labelKey: "admin.rent.col.bank" },
  accountNumber: { labelKey: "admin.rent.col.accountNumber", width: 150 },
  returnAt: { labelKey: "admin.rent.col.returnAt", width: 150 },
  returnStoreName: { labelKey: "admin.rent.col.returnStore" },
  totalRentalDay: { labelKey: "admin.rent.col.totalRentalDay" },
  etc: { labelKey: "admin.rent.col.etc" },
} as const;

const RentHistoryPage = () => {
  const { t } = useTranslation();
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

  const onTogglePayment = (historyId: number) => {
    mutateUpdatePayment(historyId, {
      onSuccess: () => {
        toast.success(t("admin.common.changeSuccess"));
      },
    });
  };

  const onToggleRefund = (historyId: number) => {
    mutateUpdateRefund(historyId, {
      onSuccess: () => {
        toast.success(t("admin.common.changeSuccess"));
      },
    });
  };

  const handleDeleteAccount = (historyId: number) => {
    if (window.confirm(t("admin.rent.deleteAccountConfirm"))) {
      mutateDeleteAccount(historyId, {
        onSuccess: () => {
          toast.success(t("admin.common.deleteSuccess"));
        },
        onError: () => {
          toast.error(t("admin.common.serverErrorToast"));
          return;
        },
      });
    }
  };

  const refundedOptions: { label: string; value: TRefundedStatus }[] = [
    { label: t("admin.rent.filterAll"), value: "all" },
    { label: t("admin.rent.filterIncomplete"), value: "notDone" },
    { label: t("admin.rent.filterComplete"), value: "done" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h5">{t("admin.rent.title")}</Typography>
      <div className="flex items-center gap-8">
        <div>
          <SelectBox
            label={t("admin.rent.refundFilter")}
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
              t("admin.common.emptyResult")
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
            const header = t(RENT_ADMIN_TABLE[field].labelKey);
            const optionKeys = RENT_ADMIN_TABLE[field].optionKeys;

            return (
              <Column
                key={key}
                style={{ minWidth }}
                field={field}
                header={header}
                body={
                  optionKeys
                    ? (data: TRentHistory) => (
                        <Dropdown
                          disabled={isUpdatingPayment || isUpdatingRefund}
                          options={optionKeys.map((o) => ({
                            label: t(o.labelKey),
                            value: o.value,
                          }))}
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
                  <div className="min-w-[100px] whitespace-pre">
                    {t("admin.rent.deleteAfterRefund")}
                  </div>
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
                  {t("admin.rent.deleteAccountBtn")}
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

const RentHistoryExcelButton = ({ historiesCount }: { historiesCount: number }) => {
  const { t } = useTranslation();
  const { data: rentHistoriesRes, isLoading } = useRentHistories({
    refunded: "all",
    size: historiesCount,
  });

  const onClickExcelBtn = () => {
    if (rentHistoriesRes)
      downloadExcel({
        fileName: t("admin.rent.excelFileName"),
        rows: rentHistoriesRes.rentalHistoryResponsePage.map((e) => ({
          [t(RENT_ADMIN_TABLE.id.labelKey)]: e.id,
          [t(RENT_ADMIN_TABLE.name.labelKey)]: e.name,
          [t(RENT_ADMIN_TABLE.phoneNumber.labelKey)]: e.phoneNumber,
          [t(RENT_ADMIN_TABLE.rentStoreName.labelKey)]: e.rentStoreName,
          [t(RENT_ADMIN_TABLE.rentAt.labelKey)]: e.rentAt,
          [t(RENT_ADMIN_TABLE.umbrellaUuid.labelKey)]: e.umbrellaUuid,
          [t(RENT_ADMIN_TABLE.elapsedDay.labelKey)]: e.elapsedDay,
          [t(RENT_ADMIN_TABLE.paid.labelKey)]: e.paid ? "O" : "X",
          [t(RENT_ADMIN_TABLE.refundCompleted.labelKey)]: e.refundCompleted ? "O" : "X",
          [t(RENT_ADMIN_TABLE.bank.labelKey)]: e.bank,
          [t(RENT_ADMIN_TABLE.accountNumber.labelKey)]: e.accountNumber,
          [t(RENT_ADMIN_TABLE.returnAt.labelKey)]: e.returnAt,
          [t(RENT_ADMIN_TABLE.returnStoreName.labelKey)]: e.returnStoreName,
          [t(RENT_ADMIN_TABLE.totalRentalDay.labelKey)]: e.totalRentalDay,
          [t(RENT_ADMIN_TABLE.etc.labelKey)]: e.etc,
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
      {t("admin.common.download")}
    </Button>
  );
};
