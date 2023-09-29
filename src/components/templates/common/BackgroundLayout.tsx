import Footer from "@/components/organisms/Footer";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const BackgroundLayout = () => {
  return (
    <div className="max-w-[1440px] min-h-[100vh] mx-auto flex flex-col sm:px-0 lg:px-20 xl:bg-basic">
      <div className="relative px-40">
        <div className="relative z-10">
          <HeaderContainer />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <div className="px-40 bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default BackgroundLayout;
