import { Button } from "@mui/material";
import { useGetUmbrellas } from "@/entities/umbrella/api/umbrella.queries";
import { UMBRELLA_TABLE } from "@/features/admin-umbrella/lib/umbrella-helpers";
import { downloadExcel } from "@/shared/lib/excel";
import { useTranslation } from "react-i18next";

type TProps = {
  storeId: number;
  totalCount?: number;
  isLoading: boolean;
  storeName: string;
};

const UmbrellaExcelButton = ({ storeId, totalCount, isLoading, storeName }: TProps) => {
  const { t } = useTranslation();
  const { data: umbrellaRes } = useGetUmbrellas({
    page: 0,
    storeId,
    size: isLoading ? undefined : totalCount,
  });

  const onClickExcelBtn = () => {
    if (umbrellaRes)
      downloadExcel({
        fileName: t("admin.umbrella.excelFileName", { storeName }),
        rows: umbrellaRes.map((e) => ({
          [t(UMBRELLA_TABLE.id.labelKey)]: e.id,
          [t(UMBRELLA_TABLE.historyId.labelKey)]: e.historyId ?? "-",
          [t(UMBRELLA_TABLE.storeMetaId.labelKey)]: e.storeMetaId,
          [t(UMBRELLA_TABLE.uuid.labelKey)]: e.uuid,
          [t(UMBRELLA_TABLE.rentable.labelKey)]: e.rentable ? "O" : "X",
          [t(UMBRELLA_TABLE.etc.labelKey)]: e.etc,
        })),
      });
  };

  return (
    <Button
      disabled={!umbrellaRes}
      size="large"
      className="!mb-16 w-[180px]"
      variant="outlined"
      onClick={onClickExcelBtn}
    >
      {t("admin.umbrella.downloadList")}
    </Button>
  );
};

export default UmbrellaExcelButton;
