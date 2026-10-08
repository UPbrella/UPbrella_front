const EXCEL_EXTENSION = ".xlsx";

// 예: ("users", 2026-10-08) → "users_20261008.xlsx"
export const excelFileName = (fileName: string, now: Date) => {
  const date = now.toISOString().substring(0, 10).replace(/-/g, "");

  return `${fileName}_${date}${EXCEL_EXTENSION}`;
};
