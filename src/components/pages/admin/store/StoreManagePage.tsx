import { Divider } from "@mui/material";
import StoreList from "@/components/pages/admin/store/UI/StoreList";
import ClassificationTagList from "@/components/pages/admin/store/UI/ClassificationTagList";
import SubClassificationTagList from "@/components/pages/admin/store/UI/SubClassificationTagList";

// 어드민 > 협업지점 관리 페이지 (+ 위치 태그 관리)
const StoreManagePage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* 협업 지점 리스트 */}
      <StoreList />
      <Divider />

      {/* 대여소 위치 태그 - 대분류 태그 */}
      <ClassificationTagList />
      <Divider />

      {/* 지점 소개 위치 태그 - 소분류 태그 */}
      <SubClassificationTagList />
    </div>
  );
};

export default StoreManagePage;
