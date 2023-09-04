import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

export const downloadRentDataExcel = (rentRes: unknown[]) => {
  const worksheet = utils.json_to_sheet(rentRes);
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

  saveAs(data, "대여_반납_조회_" + `${year}${month}${day}_${date}` + EXCEL_EXTENSION);
};
