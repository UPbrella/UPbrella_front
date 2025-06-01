/* eslint-disable @typescript-eslint/no-non-null-assertion */
import toast from "react-hot-toast";
import { Button, Divider, Input, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { USER_ADMIN_TABLE, USER_BLACKLIST_TABLE } from "@/components/pages/admin/user/helper";
import {
  useDeleteBlackUsers,
  useDeleteUsers,
  useGetBlackUsers,
  useGetUsers,
  usePatchAdminUsers,
} from "@/hooks/queries/userQueries";
import { ProgressSpinner } from "primereact/progressspinner";
import { FormEvent, useEffect, useState } from "react";
import { TBlackUserRes, TUserRes } from "@/types/admin/userTypes";
import { InputSwitch } from "primereact/inputswitch";
import { replaceItemAtIndex } from "@/utils/utils";
import { downloadRentDataExcel } from "@/components/pages/admin/rent/helper";

// TODO:user, black user 컴포넌트 분리
const UserAdminPage = () => {
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
    if (window.confirm(`"${user.name}" 유저를 블랙리스트 등록하시겠습니까 ?`)) {
      if (!user.id) {
        toast.error("클라이언트 에러가 발생했습니다.");
        return;
      }

      mutateDeleteUser(user.id, {
        onError: () => {
          toast.error("서버 에러가 발생했습니다.");
          return;
        },
      });
    }
  };

  const handleDeleteUser = (user: TBlackUserRes) => {
    if (window.confirm(`${user.id} 유저를 완전 탈퇴시키겠습니까 ?`)) {
      if (!user.id) {
        toast.error("클라이언트 에러가 발생했습니다.");
        return;
      }

      mutateDeleteBlackUser(user.id, {
        onError: () => {
          toast.error("서버 에러가 발생했습니다.");
          return;
        },
      });
    }
  };

  // 회원 검색
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
    if (window.confirm(`${userData[index].name} 의 권한을 변경하시겠습니까?`)) {
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
          toast.error("서버 에러가 발생했습니다.");
          return;
        },
      });
    }
  };

  const onClickExcelBtn = () => {
    if (userRes)
      downloadRentDataExcel({
        fileName: "회원_조회_",
        rows: userRes.map((e) => ({
          [USER_ADMIN_TABLE.id.label]: e.id,
          [USER_ADMIN_TABLE.name.label]: e.name,
          [USER_ADMIN_TABLE.phoneNumber.label]: e.phoneNumber,
          [USER_ADMIN_TABLE.bank.label]: e.bank ?? "-",
          [USER_ADMIN_TABLE.accountNumber.label]: e.accountNumber ?? "-",
          [USER_ADMIN_TABLE.email.label]: e.email,
          [USER_ADMIN_TABLE.adminStatus.label]: e.adminStatus ? "O" : "X",
          [USER_ADMIN_TABLE.createdAt.label]: e.createdAt ?? "-",
        })),
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Typography className="!mb-16" variant="h5">
          {"유저 조회"}
        </Typography>
        <div className="mb-16">
          <Button
            size="large"
            variant="contained"
            disabled={isLoading && !userRes}
            onClick={onClickExcelBtn}
          >
            데이터 다운로드
          </Button>
        </div>

        <div className="flex items-center justify-between mb-16 md:flex-col">
          <Typography variant="h6">사용자 수 : {userRes?.length}</Typography>

          <form className="flex gap-3" onSubmit={onClickSearch}>
            <Input
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="회원이름을 입력하세요"
            />
            <Button variant="contained" type="submit">
              검색
            </Button>
            <Button variant="contained" color="warning" onClick={() => setUserData(userRes ?? [])}>
              초기화
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
              "서버 에러입니다."
            ) : (
              "결과가 없습니다."
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
                header={USER_ADMIN_TABLE[key].label}
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
                  블랙리스트 등록
                </Button>
              );
            }}
          />
        </CssDataTable>
      </div>
      <Divider className="w-full" />
      <div>
        <Typography className="!mb-8" variant="h5">
          {"블랙 리스트 유저 조회"}
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
              "서버 에러입니다."
            ) : (
              "결과가 없습니다."
            )
          }
        >
          {Object.keys(USER_BLACKLIST_TABLE).map((column) => {
            const key = column as keyof Omit<TBlackUserRes, "id">;
            return <Column key={key} header={USER_BLACKLIST_TABLE[key].label} field={column} />;
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
                  완전 탈퇴
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
