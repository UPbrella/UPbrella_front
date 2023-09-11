import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { Column } from "primereact/column";
import { CssDataTable } from "@/components/pages/admin/components/Table";
import { TUserRes, USER_ADMIN_TABLE } from "@/components/pages/admin/user/helper";
// import { useDeleteUsers, useGetUsers } from "@/hooks/queries/userQueries";
// import { ProgressSpinner } from "primereact/progressspinner";

// TODO: 검색 기능
// TODO: 페이지네이션
const UserAdminPage = () => {
  // const { data, isLoading, isError } = useGetUsers();
  // const { mutate } = useDeleteUsers();

  const handleDeleteUser = (user: TUserRes) => {
    if (window.confirm(`"${user.name}" 유저를 삭제하시겠습니까 ?`)) {
      if (!user.id) {
        toast.error("클라이언트 에러가 발생했습니다.");
        return;
      }

      // mutate(user.id, {
      //   onError: () => {
      //     toast.error("서버 에러가 발생했습니다.");
      //     return;
      //   },
      // });
    }
  };

  return (
    <CssDataTable
      scrollable
      showGridlines
      stripedRows
      value={mock}
      // emptyMessage={
      //   isLoading ? (
      //     <div className="flex justify-center">
      //       <ProgressSpinner />
      //     </div>
      //   ) : isError ? (
      //     "서버 에러입니다."
      //   ) : (
      //     "결과가 없습니다."
      //   )
      // }
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
          />
        );
      })}
      <Column
        body={(data: TUserRes) => {
          return (
            <Button variant="outlined" color="error" onClick={() => handleDeleteUser(data)}>
              삭제
            </Button>
          );
        }}
      />
    </CssDataTable>
  );
};

export default UserAdminPage;

const mock = [
  {
    id: 87,
    socialId: 62126831,
    name: "고구마",
    phoneNumber: "010-3331-1087",
    bank: "VzAuKsR02T4baXCPHpuaHA==",
    accountNumber: "gTKTp1/0bTeMFsg1DBeimA==",
    adminStatus: true,
  },
  {
    id: 55,
    socialId: 90383717,
    name: "수박",
    phoneNumber: "010-1377-1233",
    bank: "Or7oeGcipa8PYEZ+pJ342w==",
    accountNumber: "9VCMsXtN2PnJa5N8+cIYmg==",
    adminStatus: false,
  },
  {
    id: 10,
    socialId: 22038376,
    name: "파인애플",
    phoneNumber: "010-1110-1110",
    bank: "OUrI/A2fc+ZCb3jmMo/TRQ==",
    accountNumber: "qZ4L426YDZffXoe/2qR8/g==",
    adminStatus: true,
  },
  {
    id: 53,
    socialId: 39169387,
    name: "감자",
    phoneNumber: "010-2303-2487",
    bank: "VzAuKsR02T4baXCPHpuaHA==",
    accountNumber: "7rh9NPlFZuTd1u/oY++FyQ==",
    adminStatus: true,
  },
  {
    id: 53,
    socialId: 81471898,
    name: "배추",
    phoneNumber: "010-1000-9031",
    bank: "mr50+pUt5CBec0TSxvyHJA==",
    accountNumber: "l+s1DAkhK0mEOcQLDgGJVA==",
    adminStatus: true,
  },
  {
    id: 39,
    socialId: 20511900,
    name: "오렌지",
    phoneNumber: "010-1005-3904",
    bank: "CBJey/XsOsUbHkHmde3jRw==",
    accountNumber: "RSYi8VtcRSikfRbaaC0Q4A==",
    adminStatus: true,
  },
] satisfies TUserRes[];
