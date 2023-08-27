import { ReactNode } from "react";
import AdminMenu from "@/components/templates/admin/AdminMenu";

type TProps = {
  children: ReactNode;
};

const AdminWrapper = ({ children }: TProps) => {
  return (
    <div className="flex flex-col gap-8">
      <AdminMenu />

      {/* 페이지 별 컨텐츠 */}
      <div className="flex-1 mt-[16px]]">{children}</div>
    </div>
  );
};

export default AdminWrapper;
