import { Outlet } from "react-router-dom";
import { HeaderContainer } from "@/widgets/header";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <HeaderContainer />

      <div className="max-w-[1440px] mx-auto px-20 xl:px-40 w-full flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
