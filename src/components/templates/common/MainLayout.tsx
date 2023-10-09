import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[1440px] min-h-[100vh] pb-20 mx-auto flex flex-col px-20 xl:px-40">
      <div className="relative">
        <div className="relative z-[200]">
          <HeaderContainer />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
