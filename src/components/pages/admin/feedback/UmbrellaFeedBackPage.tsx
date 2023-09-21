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

  // 'content'가 null이 아닌 항목만 필터링
  const filteredConditionReports = conditionReportsRes?.conditionReports.filter(
    (report) => report.content !== ""
  );

  const filteredImprovementReports = improvementReportsRes?.improvementReports.filter(
    (report) => report.content !== ""
  );

  return (
    <div>
      <div>
        <Typography>신고 내역 조회 - 대여폼</Typography>
        <CssDataTable value={filteredConditionReports}>
          <Column field="id" header="ID" />
          <Column field="umbrellaUuid" header="umbrellaUuid" />
          <Column field="content" header="content" />
        </CssDataTable>
      </div>

      <div>
        <Typography>개선 요청 내역 조회 - 반납폼</Typography>
        <CssDataTable value={filteredImprovementReports}>
          <Column field="id" header="ID" />
          <Column field="umbrellaUuid" header="umbrellaUuid" />
          <Column field="content" header="content" />
        </CssDataTable>
      </div>
    </div>
  );
};

export default UmbrellaFeedBackPage;
