import SelectBox from "@/components/molecules/SelectBox";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import UmbrellaModal from "@/components/pages/admin/umbrella/UI/UmbrellaModal";
import {
  UMBRELLA_STATISTICS_TABLE,
  UMBRELLA_TABLE,
} from "@/components/pages/admin/umbrella/helper";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { usePaginator } from "@/hooks/custom/usePaginator";
import { useGetStores } from "@/hooks/queries/storeQueries";
import {
  UMBRELLAS_QUERY_KEYS,
  useDeleteUmbrellas,
  useGetUmbrellasStatistics,
  useGetUmbrellas,
} from "@/hooks/queries/umbrellaQueries";
import { TUmbrellaRes, TUmbrellaStatisticsRes } from "@/types/admin/umbrellaTypes";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";
import { Button, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import UmbrellaExcelButton from "@/components/pages/admin/umbrella/UI/UmbrellaExcelButton";

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
  const IsAllStore = storeFilter === "all";
  const paginationParams = {
    storeId: IsAllStore ? 0 : storeFilter,
    page,
    size: 10,
  };

  // server
  const queryClient = useQueryClient();
  const { data: storeRes, isLoading: isStoreLoading } = useGetStores();
  const { mutate: deleteMutate, isLoading: isDeleteMutating } = useDeleteUmbrellas();
  const { data: umbrellaRes, isFetching: isUmbrellasLoading } = useGetUmbrellas(paginationParams);
  const { data: umbrellaStatistics, isFetching: isStatisticsLoading } = useGetUmbrellasStatistics(
    IsAllStore ? 0 : storeFilter
  );

  const standard = () => {
    if (storeRes) {
      return IsAllStore ? "전체" : storeRes.find((e) => e.id === storeFilter)?.name;
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setSelectedUmbrellaRes(undefined);
  };

  const onClickRemoveButton = (umbrellaId: number) => {
    if (window.confirm(`${umbrellaId} 번 우산을 삭제하시겠습니까?`)) {
      const storeId = IsAllStore ? undefined : storeFilter;

      deleteMutate(umbrellaId, {
        onSuccess: () => {
          Promise.all([
            queryClient.invalidateQueries(UMBRELLAS_QUERY_KEYS.getUmbrellas(paginationParams)),
            queryClient.invalidateQueries(UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeId)),
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
      <div className="flex items-center gap-16 w-500 md:w-auto md:gap-4 md:flex-col md:items-start">
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
      {umbrellaStatistics && standard() && (
        <div>
          <Typography className="!mb-16" variant="h5">
            {`"${standard()}" 우산 대여 정보`}
          </Typography>
          <CssDataTable value={[umbrellaStatistics]}>
            {Object.keys(UMBRELLA_STATISTICS_TABLE).map((key) => {
              const field = key as keyof TUmbrellaStatisticsRes;
              return (
                <Column
                  style={{ minWidth: "100px" }}
                  key={key}
                  header={UMBRELLA_STATISTICS_TABLE[field].label}
                  field={field}
                />
              );
            })}
          </CssDataTable>
        </div>
      )}

      {/* 우산 관리 테이블 */}
      {umbrellaRes && storeRes && (
        <>
          <div>
            <Typography className="!mb-16" variant="h5">
              {"우산 관리 테이블"}
            </Typography>
            <UmbrellaExcelButton
              storeId={IsAllStore ? 0 : storeFilter}
              totalCount={umbrellaStatistics?.totalUmbrellaCount}
              isLoading={isStatisticsLoading || isUmbrellasLoading}
              storeName={storeRes.find((e) => e.id === storeFilter)?.name ?? "전체"}
            />
            <CssDataTable
              rowHover
              showGridlines
              value={umbrellaRes}
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
                return (
                  <Column
                    key={field}
                    header={UMBRELLA_TABLE[field].label}
                    field={field}
                    style={{ minWidth: "150px" }}
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
                style={{ minWidth: "150px" }}
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
              totalRecords={umbrellaStatistics?.totalUmbrellaCount}
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
          storeId={IsAllStore ? 0 : storeFilter}
          paginationParams={paginationParams}
        />
      )}
    </div>
  );
};

export default UmbrellaAdminPage;
