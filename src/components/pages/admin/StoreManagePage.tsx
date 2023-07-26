import StoreContentTitle from "@/components/molecules/admin/StoreContentTitle";
import StoreTable from "@/components/organisms/admin/StoreTable";
import AdminWrapper from "@/components/templates/admin/AdminWrapper";
import Stores from "@/mocks/Stores";
import { StoreTableColumns, getStoreTableData } from "@/utils/admin/storeHelpers";
import { Button } from "@mui/material";

const StoreManagePage = () => {
  const rows = getStoreTableData(Stores.StoreMockData);

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        {/* 컨텐츠 헤더  */}
        <StoreContentTitle title={"협업지점 목록"}>
          <>
            <Button variant="contained" disableElevation>
              추가
            </Button>
            <Button variant="outlined">수정</Button>
          </>
        </StoreContentTitle>

        {/* 협업 지점 테이블 */}
        <StoreTable columns={StoreTableColumns} rows={rows} />
      </div>
    </AdminWrapper>
  );
};

export default StoreManagePage;
