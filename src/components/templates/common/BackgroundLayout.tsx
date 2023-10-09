import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const BackgroundLayout = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full xl:bg-basic xl:bg-cover">
      <div className="max-w-[1440px] min-h-[100vh] px-40 pb-20 mx-auto flex flex-col sm:px-0 lg:px-20">
        <div className="relative">
          <div className="relative z-[200]">
            <HeaderContainer />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BackgroundLayout;
