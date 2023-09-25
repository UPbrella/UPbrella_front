import {
  useGetHistoriesImprovements,
  useGetHistoriesStatus,
} from "@/hooks/queries/feedBackQueries";
import FeedBackDataTable from "@/components/atoms/FeedBackDataTable";

const UmbrellaFeedBackPage = () => {
  // 신고 내역 조회
  const { data: conditionReportsRes, isLoading: isLoadingCondition } = useGetHistoriesStatus();

  // 개선 요청 내역 조회
  const { data: improvementReportsRes, isLoading: isLoadingImprovement } =
    useGetHistoriesImprovements();

  // 'content'가 null이 아닌 항목만 필터링
  const filteredConditionReports = conditionReportsRes?.conditionReports.filter(
    (report) => report.content !== ""
  );

  const filteredImprovementReports = improvementReportsRes?.improvementReports.filter(
    (report) => report.content !== ""
  );

  return (
    <div className="flex gap-8">
      <FeedBackDataTable
        title="신고 내역 조회 - 대여폼"
        isLoading={isLoadingCondition}
        value={filteredConditionReports}
      />

      <FeedBackDataTable
        title="개선 요청 내역 조회 - 반납폼"
        isLoading={isLoadingImprovement}
        value={filteredImprovementReports}
      />
    </div>
  );
};

export default UmbrellaFeedBackPage;
