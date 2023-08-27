import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <HeaderContainer />
      {/* <Nav /> */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
