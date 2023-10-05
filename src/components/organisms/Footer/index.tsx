import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className="flex justify-between px-40 py-20 smMaxLg:hidden border-t border-gray-100">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default Footer;
