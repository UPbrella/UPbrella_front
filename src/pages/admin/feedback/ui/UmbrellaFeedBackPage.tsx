import { useTranslation } from "react-i18next";
import {
  useGetHistoriesImprovements,
  useGetHistoriesStatus,
} from "@/entities/feedback/api/feedback.queries";
import { FeedBackDataTable } from "@/entities/feedback/ui";

const UmbrellaFeedBackPage = () => {
  const { t } = useTranslation();

  const { data: conditionReportsRes, isLoading: isLoadingCondition } = useGetHistoriesStatus();

  const { data: improvementReportsRes, isLoading: isLoadingImprovement } =
    useGetHistoriesImprovements();

  const filteredConditionReports = conditionReportsRes?.conditionReports.filter(
    (report) => report.content !== ""
  );

  const filteredImprovementReports = improvementReportsRes?.improvementReports.filter(
    (report) => report.content !== ""
  );

  return (
    <div className="flex gap-8 md:flex-col">
      <FeedBackDataTable
        title={t("admin.feedback.reportTitle")}
        isLoading={isLoadingCondition}
        value={filteredConditionReports}
      />

      <FeedBackDataTable
        title={t("admin.feedback.improvementTitle")}
        isLoading={isLoadingImprovement}
        value={filteredImprovementReports}
      />
    </div>
  );
};

export default UmbrellaFeedBackPage;
