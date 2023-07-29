import { TStoreTable, TStoreTableKey } from "@/types/admin/StoreTypes";
import { TTableColumn } from "@/types/commonTypes";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type TProps = {
  columns: TTableColumn<TStoreTableKey>[];
  rows: TStoreTable[];
  onClickStoreRow: (id: number) => void;
};

// 테이블 컴포넌트 (재사용 고려하여 리팩토링 필요)
const StoreTable = ({ columns, rows, onClickStoreRow }: TProps) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow
                className="cursor-pointer"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                onClick={() => onClickStoreRow(row.id!)}
                hover
                key={`${row.name} + ${i}`}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value && column.formatFn ? column.formatFn(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StoreTable;
