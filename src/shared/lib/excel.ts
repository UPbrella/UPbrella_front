import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const downloadExcel = ({ fileName, rows }: { rows: unknown[]; fileName: string }) => {
  const worksheet = utils.json_to_sheet(rows);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
  const date = new Date().toISOString().substring(0, 10).replace(/-/g, "");

  saveAs(data, `${fileName}_${date}${EXCEL_EXTENSION}`);
};
