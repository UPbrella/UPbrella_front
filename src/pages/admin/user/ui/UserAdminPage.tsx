/* eslint-disable @typescript-eslint/no-non-null-assertion */
import toast from "react-hot-toast";
import { Button, Divider, Input, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { CssDataTable } from "@/shared/ui/DataTable";
import { USER_ADMIN_TABLE, USER_BLACKLIST_TABLE } from "@/features/admin-user/lib/user-helpers";
import {
  useDeleteBlackUsers,
  useDeleteUsers,
  useGetBlackUsers,
  useGetUsers,
  usePatchAdminUsers,
} from "@/entities/user/api/user.queries";
import { ProgressSpinner } from "primereact/progressspinner";
import { FormEvent, useEffect, useState } from "react";
import { TBlackUserRes, TUserRes } from "@/entities/user/model/types";
import { InputSwitch } from "primereact/inputswitch";
import { replaceItemAtIndex } from "@/shared/lib/utils";
import { downloadExcel } from "@/shared/lib/excel";
import { useTranslation } from "react-i18next";

const UserAdminPage = () => {
  const { t } = useTranslation();

  // client
  const [searchWord, setSearchWord] = useState("");
  const [userData, setUserData] = useState<TUserRes[]>([]);

  // server
  const { data: userRes, isLoading, isError } = useGetUsers();
  const {
    data: userBlackRes,
    isLoading: isBlackUsersLoading,
    isError: isBlackUsersError,
  } = useGetBlackUsers();

  const { mutate: mutateDeleteUser, isLoading: isDeletingUser } = useDeleteUsers();
  const { mutate: mutateDeleteBlackUser, isLoading: isDeletingBlackUser } = useDeleteBlackUsers();
  const { mutate: mutateAdminUser, isLoading: isPatchingAdminUser } = usePatchAdminUsers();

  useEffect(() => {
    if (userRes) {
      setUserData(userRes);
    }
  }, [userRes]);

  const handleUpdateBlackUser = (user: TUserRes) => {
    if (window.confirm(t("admin.user.blacklistConfirm", { name: user.name }))) {
      if (!user.id) {
        toast.error(t("admin.common.clientError"));
        return;
      }

      mutateDeleteUser(user.id, {
        onError: () => {
          toast.error(t("admin.common.serverErrorToast"));
          return;
        },
      });
    }
  };

  const handleDeleteUser = (user: TBlackUserRes) => {
    if (window.confirm(t("admin.user.withdrawConfirm", { id: user.id }))) {
      if (!user.id) {
        toast.error(t("admin.common.clientError"));
        return;
      }

      mutateDeleteBlackUser(user.id, {
        onError: () => {
          toast.error(t("admin.common.serverErrorToast"));
          return;
        },
      });
    }
  };

  const onClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let result = userRes;
    if (!result) {
      return;
    }

    if (!searchWord.trim()) {
      setUserData(result);
      return;
    }

    result = result.filter(({ name }) => name.includes(searchWord));
    setUserData(result);
  };

  const onChangeAdminStatus = ({ index, value }: { index: number; value: boolean }) => {
    if (window.confirm(t("admin.user.roleConfirm", { name: userData[index].name }))) {
      mutateAdminUser(userData[index].id, {
        onSuccess: () => {
          setUserData((prev) =>
            replaceItemAtIndex({
              arr: prev,
              index,
              newValue: { ...prev[index], adminStatus: value },
            })
          );
        },
        onError: () => {
          toast.error(t("admin.common.serverErrorToast"));
          return;
        },
      });
    }
  };

  const onClickExcelBtn = () => {
    if (userRes)
      downloadExcel({
        fileName: t("admin.user.excelFileName"),
        rows: userRes.map((e) => ({
          [t(USER_ADMIN_TABLE.id.labelKey)]: e.id,
          [t(USER_ADMIN_TABLE.name.labelKey)]: e.name,
          [t(USER_ADMIN_TABLE.phoneNumber.labelKey)]: e.phoneNumber,
          [t(USER_ADMIN_TABLE.bank.labelKey)]: e.bank ?? "-",
          [t(USER_ADMIN_TABLE.accountNumber.labelKey)]: e.accountNumber ?? "-",
          [t(USER_ADMIN_TABLE.email.labelKey)]: e.email,
          [t(USER_ADMIN_TABLE.adminStatus.labelKey)]: e.adminStatus ? "O" : "X",
          [t(USER_ADMIN_TABLE.createdAt.labelKey)]: e.createdAt ?? "-",
        })),
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Typography className="!mb-16" variant="h5">
          {t("admin.user.title")}
        </Typography>
        <div className="mb-16">
          <Button
            size="large"
            variant="contained"
            disabled={isLoading && !userRes}
            onClick={onClickExcelBtn}
          >
            {t("admin.common.download")}
          </Button>
        </div>

        <div className="flex items-center justify-between mb-16 md:flex-col">
          <Typography variant="h6">
            {t("admin.user.count")} {userRes?.length}
          </Typography>

          <form className="flex gap-3" onSubmit={onClickSearch}>
            <Input
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder={t("admin.user.searchPlaceholder")}
            />
            <Button variant="contained" type="submit">
              {t("admin.user.search")}
            </Button>
            <Button variant="contained" color="warning" onClick={() => setUserData(userRes ?? [])}>
              {t("admin.user.reset")}
            </Button>
          </form>
        </div>
        <CssDataTable
          paginator
          rows={10}
          scrollable
          showGridlines
          stripedRows
          value={userData}
          emptyMessage={
            isLoading ? (
              <div className="flex justify-center">
                <ProgressSpinner />
              </div>
            ) : isError ? (
              t("admin.common.serverError")
            ) : (
              t("admin.common.emptyResult")
            )
          }
        >
          {Object.keys(USER_ADMIN_TABLE).map((column) => {
            const key = column as keyof TUserRes;
            const minWidth = USER_ADMIN_TABLE[key].width ?? "130px";

            return (
              <Column
                key={key}
                style={{ minWidth }}
                header={t(USER_ADMIN_TABLE[key].labelKey)}
                field={column}
                body={
                  key === "adminStatus"
                    ? (data, { rowIndex }) => {
                        return (
                          <InputSwitch
                            disabled={isPatchingAdminUser || data.phoneNumber === "deleted"}
                            checked={data[column]}
                            onChange={(e) =>
                              onChangeAdminStatus({
                                index: rowIndex,
                                value: e.value!,
                              })
                            }
                          />
                        );
                      }
                    : undefined
                }
              />
            );
          })}
          <Column
            body={(data: TUserRes) => {
              return (
                <Button
                  style={{
                    width: "130px",
                  }}
                  disabled={isDeletingUser || data.phoneNumber === "deleted"}
                  variant="outlined"
                  color="error"
                  onClick={() => handleUpdateBlackUser(data)}
                >
                  {t("admin.user.blacklistBtn")}
                </Button>
              );
            }}
          />
        </CssDataTable>
      </div>
      <Divider className="w-full" />
      <div>
        <Typography className="!mb-8" variant="h5">
          {t("admin.user.blacklistTitle")}
        </Typography>

        <CssDataTable
          paginator
          rows={5}
          scrollable
          showGridlines
          stripedRows
          value={userBlackRes}
          emptyMessage={
            isBlackUsersLoading ? (
              <div className="flex justify-center">
                <ProgressSpinner />
              </div>
            ) : isBlackUsersError ? (
              t("admin.common.serverError")
            ) : (
              t("admin.common.emptyResult")
            )
          }
        >
          {Object.keys(USER_BLACKLIST_TABLE).map((column) => {
            const key = column as keyof Omit<TBlackUserRes, "id">;
            return (
              <Column key={key} header={t(USER_BLACKLIST_TABLE[key].labelKey)} field={column} />
            );
          })}
          <Column
            body={(data: TBlackUserRes) => {
              return (
                <Button
                  disabled={isDeletingBlackUser}
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteUser(data)}
                >
                  {t("admin.user.fullWithdraw")}
                </Button>
              );
            }}
          />
        </CssDataTable>
      </div>
    </div>
  );
};

export default UserAdminPage;
