import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
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
    </>
  );
};

export default MainLayout;
