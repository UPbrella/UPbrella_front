import { useMemo, useState } from "react";
import { TStoreDetail, TStoreTableKey } from "@/types/admin/StoreTypes";
import { TTableColumn } from "@/types/commonTypes";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

type TProps = {
  columns: TTableColumn<TStoreTableKey>[];
  rows: TStoreDetail[];
  onClickStoreRow: (id: number, type: "store" | "image") => void;
};

// TODO: primereact table로 변경
// 테이블 컴포넌트 (재사용 고려하여 리팩토링 필요)
const StoreTable = ({ columns, rows, onClickStoreRow }: TProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const visibleRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rows, rowsPerPage]
  );

  return (
    <Paper elevation={8}>
      <TableContainer>
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
            {visibleRows.map((row, i) => {
              return (
                <TableRow className="cursor-pointer" hover key={`${row.name} + ${i}`}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const isImageCell = column.id === "imageUrls";

                    return (
                      <TableCell
                        style={isImageCell ? { cursor: "default" } : {}}
                        key={column.id}
                        align={column.align}
                        onClick={() => onClickStoreRow(row.id, isImageCell ? "image" : "store")}
                      >
                        {value && column.formatFn ? column.formatFn(value) : (value as string)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        onPageChange={(_, page) => setPage(page)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default StoreTable;
