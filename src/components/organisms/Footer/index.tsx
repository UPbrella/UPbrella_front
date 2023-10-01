import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white">
      <div className="flex justify-between px-40 py-20 lg:hidden md:hidden border-t border-gray-100">
        <FooterLabel />
        <FooterSns />
      </div>
    </div>
  );
};

export default Footer;
