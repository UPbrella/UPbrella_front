import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative">
      <div className="relative z-10">
        <HeaderContainer />
      </div>

      {/* <Nav /> */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
