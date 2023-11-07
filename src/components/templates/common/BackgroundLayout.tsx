import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { Outlet } from "react-router-dom";

const BackgroundLayout = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-cover bg-basic">
      <HeaderContainer />
      <div className="max-w-[1440px] min-h-[100vh] px-40 mx-auto flex flex-col sm:px-0 lg:px-20">
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
        <div className="justify-between hidden py-20 border-t border-gray-100 xl:flex">
          <FooterLabel />
          <FooterSns />
        </div>
      </div>
    </div>
  );
};

export default BackgroundLayout;
