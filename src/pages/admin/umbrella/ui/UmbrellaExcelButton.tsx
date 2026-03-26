import { Button } from "@mui/material";
import { useGetUmbrellas } from "@/entities/umbrella/api/umbrella.queries";
import { UMBRELLA_TABLE } from "@/features/admin-umbrella/lib/umbrella-helpers";
import { downloadExcel } from "@/shared/lib/excel";

type TProps = {
  storeId: number;
  totalCount?: number;
  isLoading: boolean;
  storeName: string;
};

const UmbrellaExcelButton = ({ storeId, totalCount, isLoading, storeName }: TProps) => {
  const { data: umbrellaRes } = useGetUmbrellas({
    page: 0,
    storeId,
    size: isLoading ? undefined : totalCount,
  });

  // 한글 매핑
  const onClickExcelBtn = () => {
    if (umbrellaRes)
      downloadExcel({
        fileName: `${storeName}_우산_조회`,
        rows: umbrellaRes.map((e) => ({
          [UMBRELLA_TABLE.id.label]: e.id,
          [UMBRELLA_TABLE.historyId.label]: e.historyId ?? "-",
          [UMBRELLA_TABLE.storeMetaId.label]: e.storeMetaId,
          [UMBRELLA_TABLE.uuid.label]: e.uuid,
          [UMBRELLA_TABLE.rentable.label]: e.rentable ? "O" : "X",
          [UMBRELLA_TABLE.etc.label]: e.etc,
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
      우산 목록 다운로드
    </Button>
  );
};

export default UmbrellaExcelButton;
