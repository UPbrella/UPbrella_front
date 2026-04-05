import { TStatus } from "@/entities/feedback/model/types";
import { CssDataTable } from "@/shared/ui/DataTable";
import { Typography } from "@mui/material";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type FeedbackTableKey = Omit<TStatus, "etc">;

type FeedbackColumnDef = { label: string; width?: string };

type FeedBackDataTableProps = {
  title: string;
  isLoading: boolean;
  value: TStatus[] | undefined;
};

const FeedBackDataTable = ({ title, isLoading, value }: FeedBackDataTableProps) => {
  const { t } = useTranslation();
  const feedbackTable = useMemo((): Record<keyof FeedbackTableKey, FeedbackColumnDef> => {
    return {
      id: { label: "NO" },
      umbrellaUuid: { label: t("admin.feedback.col.umbrellaUuid") },
      content: { label: t("admin.feedback.col.content"), width: "700px" },
    };
  }, [t]);

  return (
    <div className="flex-1">
      <Typography variant="h5" className="!mb-8">
        {title}
      </Typography>
      <div className="flex w-full gap-8">
        <div className="w-full">
          <CssDataTable
            paginator
            rows={10}
            emptyMessage={
              isLoading ? (
                <div>
                  <ProgressSpinner />
                </div>
              ) : (
                t("admin.common.emptyResult")
              )
            }
            scrollable
            showGridlines
            stripedRows
            removableSort
            sortMode="multiple"
            editMode="cell"
            value={value}
          >
            {Object.keys(feedbackTable).map((key) => {
              const field = key as keyof FeedbackTableKey;
              const minWidth = feedbackTable[field].width ?? "150px";
              const maxWidth = minWidth;
              const header = feedbackTable[field].label;

              return <Column key={key} style={{ maxWidth }} field={field} header={header} />;
            })}
          </CssDataTable>
        </div>
      </div>
    </div>
  );
};

export default FeedBackDataTable;
