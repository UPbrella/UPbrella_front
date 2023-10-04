import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className="flex justify-between py-20 bg-white smMaxLg:hidden">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default Footer;
