import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <HeaderContainer />
      {/* <Nav /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
