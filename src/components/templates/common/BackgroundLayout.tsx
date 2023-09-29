import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const BackgroundLayout = () => {
  return (
    <div className="max-w-[1440px] min-h-[100vh] px-40 pb-20 mx-auto flex flex-col sm:px-0 lg:px-20 xl:bg-basic">
      <div className="relative">
        <div className="relative z-10">
          <HeaderContainer />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default BackgroundLayout;
