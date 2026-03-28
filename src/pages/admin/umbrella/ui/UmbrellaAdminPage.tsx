import SelectBox from "@/shared/ui/SelectBox";
import { CssDataTable } from "@/shared/ui/DataTable";
import UmbrellaModal from "@/pages/admin/umbrella/ui/UmbrellaModal";
import {
  UMBRELLA_STATISTICS_TABLE,
  UMBRELLA_TABLE,
} from "@/features/admin-umbrella/lib/umbrella-helpers";
import useModalStatus from "@/shared/hooks/useModalStatus";
import { usePaginator } from "@/shared/hooks/usePaginator";
import { useGetStores } from "@/entities/store/api/store.queries";
import {
  UMBRELLAS_QUERY_KEYS,
  useDeleteUmbrellas,
  useGetUmbrellasStatistics,
  useGetUmbrellas,
} from "@/entities/umbrella/api/umbrella.queries";
import { TUmbrellaRes, TUmbrellaStatisticsRes } from "@/entities/umbrella/model/types";
import { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import { Button, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import UmbrellaExcelButton from "@/pages/admin/umbrella/ui/UmbrellaExcelButton";

const UmbrellaAdminPage = () => {
  const { t } = useTranslation();
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
      return IsAllStore
        ? t("admin.umbrella.all")
        : storeRes.find((e) => e.id === storeFilter)?.name;
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setSelectedUmbrellaRes(undefined);
  };

  const onClickRemoveButton = (umbrellaId: number) => {
    if (window.confirm(t("admin.umbrella.deleteConfirm", { id: umbrellaId }))) {
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
            label={t("admin.umbrella.storeFilter")}
            name="store"
            disabled={isStoreLoading}
            value={storeFilter}
            menuItems={
              storeRes
                ? [
                    { label: t("admin.umbrella.all"), value: "all" },
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
            {t("admin.umbrella.addNew")}
          </Button>
        </div>
      </div>

      {umbrellaStatistics && standard() && (
        <div>
          <Typography className="!mb-16" variant="h5">
            {t("admin.umbrella.rentInfo", { name: standard() })}
          </Typography>
          <CssDataTable value={[umbrellaStatistics]}>
            {Object.keys(UMBRELLA_STATISTICS_TABLE).map((key) => {
              const field = key as keyof TUmbrellaStatisticsRes;
              return (
                <Column
                  style={{ minWidth: "100px" }}
                  key={key}
                  header={t(UMBRELLA_STATISTICS_TABLE[field].labelKey)}
                  field={field}
                />
              );
            })}
          </CssDataTable>
        </div>
      )}

      {umbrellaRes && storeRes && (
        <>
          <div>
            <Typography className="!mb-16" variant="h5">
              {t("admin.umbrella.tableTitle")}
            </Typography>
            <UmbrellaExcelButton
              storeId={IsAllStore ? 0 : storeFilter}
              totalCount={umbrellaStatistics?.totalUmbrellaCount}
              isLoading={isStatisticsLoading || isUmbrellasLoading}
              storeName={
                storeRes.find((e) => e.id === storeFilter)?.name ?? t("admin.umbrella.all")
              }
            />
            <CssDataTable
              rowHover
              showGridlines
              value={umbrellaRes}
              emptyMessage={t("admin.common.emptyResult")}
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
                    header={t(UMBRELLA_TABLE[field].labelKey)}
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
                        return data[field]
                          ? t("admin.umbrella.status.rentable")
                          : t("admin.umbrella.status.rented");
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
                      {t("admin.umbrella.deleteBtn")}
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
