import SelectBox from "@/components/molecules/SelectBox";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import UmbrellaModal from "@/components/pages/admin/umbrella/UI/UmbrellaModal";
import {
  UMBRELLA_STATISTICS_TABLE,
  UMBRELLA_TABLE,
  downloadUmbrellaDataExcel,
} from "@/components/pages/admin/umbrella/helper";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { usePaginator } from "@/hooks/custom/usePaginator";
import { useGetStores } from "@/hooks/queries/storeQueries";
import {
  UMBRELLAS_QUERY_KEYS,
  useDeleteUmbrellas,
  useGetUmbrellas,
  useGetUmbrellasStatistics,
  useGetUmbrellasStatisticsStore,
  useGetUmbrellasStore,
} from "@/hooks/queries/umbrellaQueries";
import { TUmbrellaRes, TUmbrellaStatisticsRes } from "@/types/admin/umbrellaTypes";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";
import { Button, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

const UmbrellaAdminPage = () => {
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [storeFilter, setStoreFilter] = useState<"all" | number>("all");
  const {
    onPageChange,
    pageState: { first, page, rows: size },
  } = usePaginator({
    rows: 10,
  });
  const [selectedUmbrellaRes, setSelectedUmbrellaRes] = useState<TUmbrellaRes>();

  // server
  const queryClient = useQueryClient();
  const { data: storeRes, isLoading: isStoreLoading } = useGetStores();
  const { data: allUmbrellaRes } = useGetUmbrellas({ page, size });
  const { data: storeUmbrellaRes } = useGetUmbrellasStore({
    storeId: storeFilter === "all" ? 0 : storeFilter,
    page,
    size: 10,
  });
  const { data: allUmbrellaStatistics } = useGetUmbrellasStatistics();
  const { data: storeUmbrellaStatistics } = useGetUmbrellasStatisticsStore(
    storeFilter === "all" ? 0 : storeFilter
  );
  const { mutate: deleteMutate, isLoading: isDeleteMutating } = useDeleteUmbrellas();

  const umbrellasRes = storeFilter === "all" ? allUmbrellaRes : storeUmbrellaRes;
  const umbrellaStatisticsRes =
    storeFilter === "all" ? allUmbrellaStatistics : storeUmbrellaStatistics;

  const standard = () => {
    if (storeRes) {
      return storeFilter === "all" ? "전체" : storeRes.find((e) => e.id === storeFilter)?.name;
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setSelectedUmbrellaRes(undefined);
  };

  const onClickRemoveButton = (umbrellaId: number) => {
    if (window.confirm(`${umbrellaId} 번 우산을 삭제하시겠습니까?`)) {
      const storeId = storeFilter === "all" ? undefined : storeFilter;

      deleteMutate(umbrellaId, {
        onSuccess: () => {
          Promise.all([
            queryClient.invalidateQueries([...UMBRELLAS_QUERY_KEYS.getUmbrellas(storeId)]),
            queryClient.invalidateQueries([
              ...UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeId),
            ]),
          ]);
        },
        onError: (err) => {
          const error = err as TCustomError;
          toast.error(getErrorMessage(error));
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 mb-24">
      <div className="w-500 flex gap-16 items-center">
        {/* filter */}
        <div>
          <SelectBox
            label="지점 필터"
            name="store"
            disabled={isStoreLoading}
            value={storeFilter}
            menuItems={
              storeRes
                ? [
                    { label: "전체", value: "all" },
                    ...storeRes.map(({ id, name }) => ({ label: name, value: id })),
                  ]
                : []
            }
            onChange={(_, value) => {
              const _value = value as "all" | number;
              setStoreFilter(_value);
            }}
          />
        </div>
        <div>
          {/* TODO: Prime 칼라 변경 */}
          <Button
            disabled={!storeRes}
            className="w-[150px]"
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            우산 새로 추가
          </Button>
        </div>
      </div>

      {/* 우산 대여 정보 현황 */}
      {umbrellaStatisticsRes && standard() && (
        <div>
          <Typography className="!mb-16" variant="h5">
            {`"${standard()}" 우산 대여 정보`}
          </Typography>
          <CssDataTable value={[umbrellaStatisticsRes]}>
            {Object.keys(UMBRELLA_STATISTICS_TABLE).map((key) => {
              const field = key as keyof TUmbrellaStatisticsRes;
              return (
                <Column key={key} header={UMBRELLA_STATISTICS_TABLE[field].label} field={field} />
              );
            })}
          </CssDataTable>
        </div>
      )}

      {/* 우산 관리 테이블 */}
      {umbrellasRes && storeRes && (
        <>
          <div>
            <Typography className="!mb-16" variant="h5">
              {"우산 관리 테이블"}
            </Typography>
            <UmbrellaExcelButton />
            <CssDataTable
              rowHover
              showGridlines
              value={umbrellasRes}
              emptyMessage={"결과가 없습니다."}
              style={{
                cursor: "pointer",
              }}
              onRowClick={(e) => {
                setSelectedUmbrellaRes(e.data as TUmbrellaRes);
                handleOpen();
              }}
            >
              {Object.keys(UMBRELLA_TABLE).map((key) => {
                const field = key as keyof TUmbrellaRes;
                // TODO: m-w
                return (
                  <Column
                    key={field}
                    header={UMBRELLA_TABLE[field].label}
                    field={field}
                    body={(data: TUmbrellaRes) => {
                      if (field === "storeMetaId") {
                        return `${storeRes.find((e) => e.id === data[field])?.name} (${
                          data[field]
                        })`;
                      }

                      if (field === "historyId" || field === "etc") {
                        return data[field] ?? "-";
                      }

                      if (field === "rentable") {
                        return data[field] ? "대여 가능" : "대여 불가능(대여 중)";
                      }

                      return data[field];
                    }}
                  />
                );
              })}
              <Column
                body={(data: TUmbrellaRes) => {
                  return (
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={isDeleteMutating}
                      onClick={() => {
                        onClickRemoveButton(data.id);
                      }}
                    >
                      우산 삭제
                    </Button>
                  );
                }}
              />
            </CssDataTable>
            <Paginator
              first={first}
              rows={size}
              pageLinkSize={5}
              totalRecords={umbrellaStatisticsRes?.totalUmbrellaCount}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}

      {isOpen && storeRes && (
        <UmbrellaModal
          isOpen={isOpen}
          handleClose={handleCloseModal}
          umbrellaRes={selectedUmbrellaRes}
          storeRes={storeRes}
          storeId={storeFilter === "all" ? 0 : storeFilter}
        />
      )}
    </div>
  );
};

export default UmbrellaAdminPage;

const UmbrellaExcelButton = () => {
  const { data: allUmbrellaStatistics } = useGetUmbrellasStatistics();
  const { data: allUmbrellaRes, isLoading } = useGetUmbrellas({
    page: 0,
    size: allUmbrellaStatistics?.totalUmbrellaCount,
  });

  // 한글 매핑
  const onClickExcelBtn = () => {
    if (allUmbrellaRes)
      downloadUmbrellaDataExcel(
        allUmbrellaRes.map((e) => ({
          [UMBRELLA_TABLE.id.label]: e.id,
          [UMBRELLA_TABLE.historyId.label]: e.historyId ?? "-",
          [UMBRELLA_TABLE.storeMetaId.label]: e.storeMetaId,
          [UMBRELLA_TABLE.uuid.label]: e.uuid,
          [UMBRELLA_TABLE.rentable.label]: e.rentable ? "O" : "X",
          [UMBRELLA_TABLE.etc.label]: e.etc,
        }))
      );
  };

  return (
    <Button
      disabled={isLoading || !allUmbrellaStatistics}
      size="large"
      className="!mb-16 w-[180px]"
      variant="outlined"
      onClick={onClickExcelBtn}
    >
      우산 목록 다운로드
    </Button>
  );
};
