import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";
import { FixWidthWrapper } from "@/components/pages/story/UpbrellaStoryPage";

const Footer = () => {
  return (
    <div className="hidden w-screen py-20 border-t border-gray-100 xl:block">
      <FixWidthWrapper>
        <div className="flex justify-between">
          <FooterLabel />
          <FooterSns />
        </div>
      </FixWidthWrapper>
    </div>
  );
};

export default Footer;
