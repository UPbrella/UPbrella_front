import { CssDataTable } from "@/components/pages/admin/components/Table";
import { Typography } from "@mui/material";
import { ProgressSpinner } from "primereact/progressspinner";
import { TStatus } from "@/types/admin/FeedBackTypes";
import { Column } from "primereact/column";

export type FeedBackDataTableProps = {
  title: string;
  isLoading: boolean;
  value: TStatus[] | undefined;
};

const FeedBackDataTable = ({ title, isLoading, value }: FeedBackDataTableProps) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <div className="flex gap-8">
        <div>
          <CssDataTable
            emptyMessage={
              isLoading ? (
                <div>
                  <ProgressSpinner />
                </div>
              ) : (
                "결과가 없습니다."
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
            {Object.keys(FEEDBACK_TABLE).map((key) => {
              const field = key as keyof KEY;
              const minWidth = FEEDBACK_TABLE[field].width ?? "150px";
              const maxWidth = minWidth;
              const header = FEEDBACK_TABLE[field].label;

              return (
                <Column key={key} style={{ minWidth, maxWidth }} field={field} header={header} />
              );
            })}
          </CssDataTable>
        </div>
      </div>
    </>
  );
};

export default FeedBackDataTable;

export type KEY = Omit<TStatus, "etc">;

export const FEEDBACK_TABLE: Record<keyof KEY, { label: string; width?: string }> = {
  id: { label: "NO" },
  umbrellaUuid: { label: "우산 고유번호" },
  content: { label: "내용", width: "700px" },
};
