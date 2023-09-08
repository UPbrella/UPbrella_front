import styled from "@emotion/styled";
import { DataTable } from "primereact/datatable";

export const CssDataTable = styled(DataTable)`
  font-size: 14px;

  th,
  td {
    text-align: center !important;
  }

  .p-column-header-content {
    justify-content: center !important;
  }
`;
