import { Typography } from "@mui/material";
import { Column } from "primereact/column";
import {
  useGetHistoriesImprovements,
  useGetHistoriesStatus,
} from "@/hooks/queries/feedbackQueries";
import { CssDataTable } from "../components/Table";

const UmbrellaFeedBackPage = () => {
  // 신고 내역 조회
  const { data: conditionReportsRes } = useGetHistoriesStatus();

  // 개선 요청 내역 조회
  const { data: improvementReportsRes } = useGetHistoriesImprovements();

  return (
    <div>
      <div>
        <Typography>신고 내역 조회 - 대여폼</Typography>
        <CssDataTable value={conditionReportsRes?.conditionReports}>
          <Column field="id" header="ID" />
          <Column field="umbrellaUuid" header="umbrellaUuid" />
          <Column field="content" header="content" />
        </CssDataTable>
      </div>

      <div>
        <Typography>개선 요청 내역 조회 - 반납폼</Typography>
        <CssDataTable value={improvementReportsRes?.improvementReports}>
          <Column field="id" header="ID" />
          <Column field="umbrellaUuid" header="umbrellaUuid" />
          <Column field="content" header="content" />
        </CssDataTable>
      </div>
    </div>
  );
};

export default UmbrellaFeedBackPage;
