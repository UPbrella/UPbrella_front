import FooterLabel from "@/widgets/footer/ui/FooterLabel";
import FooterSns from "@/widgets/footer/ui/FooterSNS";
import { FixWidthWrapper } from "@/shared/ui/FixWidthWrapper";

const Footer = () => {
  return (
    <div className="w-full hidden py-20 border-t border-gray-100 xl:block">
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
