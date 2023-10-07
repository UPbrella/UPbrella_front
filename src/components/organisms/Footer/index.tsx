import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className="justify-between hidden px-40 py-20 border-t border-gray-100 xl:flex">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default Footer;
