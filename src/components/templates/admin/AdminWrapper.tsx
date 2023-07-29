import AdminMenu from "@/components/templates/admin/AdminMenu";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const AdminWrapper = ({ children }: TProps) => {
  return (
    <div className="flex">
      {/* 어드민 메뉴 */}
      <AdminMenu />

      {/* 페이지 별 컨텐츠 */}
      <div className="flex-1 mt-[16px] mx-[16px] ">{children}</div>
    </div>
  );
};

export default AdminWrapper;
