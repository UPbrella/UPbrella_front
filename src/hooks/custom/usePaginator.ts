import { useState } from "react";
import { PaginatorPageChangeEvent } from "primereact/paginator";

export const usePaginator = ({
  first = 0,
  page = 0,
  rows = 20,
}: {
  first?: number;
  page?: number;
  rows?: number;
}) => {
  const [pageState, setPageState] = useState({
    first,
    page,
    rows,
  });

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setPageState({
      first: e.first,
      page: e.page,
      rows: e.rows,
    });
  };

  return { pageState, onPageChange };
};
