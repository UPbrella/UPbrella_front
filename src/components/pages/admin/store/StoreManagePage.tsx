import { Divider } from "@mui/material";
import AdminWrapper from "@/components/templates/admin/AdminWrapper";
import StoreList from "@/components/pages/admin/store/UI/StoreList";
// import LocationMapTagList from "@/components/pages/admin/store/UI/LocationMapTagList";
// import LocationCategoryTagList from "@/components/pages/admin/store/UI/LocationCategoryTagList";

// 어드민 > 협업지점 관리 페이지 (+ 위치 태그 관리)
const StoreManagePage = () => {
  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8 min-w-[1360px]">
        {/* 협업 지점 리스트 */}
        <StoreList />
        <Divider />

        {/* 대분류 위치 태그 */}
        {/* <LocationMapTagList /> */}
        {/* <Divider /> */}

        {/* 소분류 위치 태그 */}
        {/* <LocationCategoryTagList /> */}
      </div>
    </AdminWrapper>
  );
};

export default StoreManagePage;
