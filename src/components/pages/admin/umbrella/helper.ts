import { TUmbrellaState } from "@/components/pages/admin/umbrella/types";
import {
  TUmbrellaPatchReq,
  TUmbrellaRes,
  TUmbrellaStatisticsRes,
} from "@/types/admin/umbrellaTypes";
import saveAs from "file-saver";
import { utils, write } from "xlsx";

export const UMBRELLA_STATISTICS_TABLE: Record<
  keyof TUmbrellaStatisticsRes,
  { label: string; width?: string }
> = {
  totalRentCount: { label: "전체 대여 건수" },
  totalUmbrellaCount: { label: "전체 우산 개수" },
  rentableUmbrellaCount: { label: "대여 가능한 우산 개수" },
  rentedUmbrellaCount: { label: "대여 중인 우산 개수" },
  missingUmbrellaCount: { label: "분실 우산 개수" },
  missingRate: { label: "분실률(%)" },
} as const;

export const UMBRELLA_TABLE: Record<keyof TUmbrellaRes, { label: string; width?: string }> = {
  id: { label: "id" },
  uuid: { label: "우산 관리번호" }, // hack
  historyId: { label: "현재 대여 일련번호(NO)" },
  storeMetaId: { label: "현위치(지점번호)" },
  rentable: { label: "가용 여부" },
  etc: { label: "비고" },
} as const;

export const convertUmbrellaData = (res?: TUmbrellaRes) => {
  if (res) {
    return {
      id: res.id,
      storeMetaId: res.storeMetaId,
      uuid: res.uuid,
      rentable: res.rentable,
      missed: false,
      etc: res.etc,
    } satisfies TUmbrellaPatchReq & { id: number };
  }

  return {
    storeMetaId: null,
    uuid: null,
    rentable: true,
    etc: "",
  } satisfies TUmbrellaState;
};

export const downloadUmbrellaDataExcel = (umbrellaRes: unknown[]) => {
  const worksheet = utils.json_to_sheet(umbrellaRes);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";

  const data = new Blob([excelBuffer], {
    type: EXCEL_TYPE,
  });

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDay();
  const date = `${new Date().getHours()}${new Date().getMinutes()}`;

  saveAs(data, "우산_조회" + `${year}${month}${day}_${date}` + EXCEL_EXTENSION);
};
