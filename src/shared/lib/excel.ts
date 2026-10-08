import { saveAs } from "file-saver";
import { excelFileName } from "./excel-name";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

// xlsx(수백 KB)는 다운로드 클릭 시에만 로드
export const downloadExcel = async ({ fileName, rows }: { rows: unknown[]; fileName: string }) => {
  const { utils, write } = await import("xlsx");

  const worksheet = utils.json_to_sheet(rows);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([excelBuffer], { type: EXCEL_TYPE }), excelFileName(fileName, new Date()));
};
