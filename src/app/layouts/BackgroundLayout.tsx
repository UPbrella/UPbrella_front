import FooterLabel from "@/widgets/footer/ui/FooterLabel";
import FooterSNS from "@/widgets/footer/ui/FooterSNS";
import { HeaderContainer } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const BackgroundLayout = () => {
  return (
    <div className="fixed inset-0 flex flex-col bg-cover bg-basic">
      <HeaderContainer />
      <div className="max-w-[1440px] w-full flex-1 overflow-auto px-40 mx-auto flex flex-col sm:px-0 lg:px-20">
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
        <div className="justify-between hidden py-20 border-t border-gray-100 xl:flex">
          <FooterLabel />
          <FooterSNS />
        </div>
      </div>
    </div>
  );
};

export default BackgroundLayout;
