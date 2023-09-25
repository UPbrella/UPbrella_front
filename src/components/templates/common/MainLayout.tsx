import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[1440px] min-h-[100vh] px-40 mx-auto flex flex-col sm:px-0 lg:px-20 ">
      <div className="relative">
        {/* <Nav /> */}
        <div className="relative z-10">
          <HeaderContainer />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
