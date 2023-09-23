import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className="flex justify-between bg-white py-20">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default Footer;
