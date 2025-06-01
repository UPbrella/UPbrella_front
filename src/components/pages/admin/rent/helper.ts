import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

export const downloadRentDataExcel = ({
  fileName,
  rows,
}: {
  rows: unknown[];
  fileName: string;
}) => {
  const worksheet = utils.json_to_sheet(rows);
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

  saveAs(data, fileName + `${year}${month}${day}_${date}` + EXCEL_EXTENSION);
};
