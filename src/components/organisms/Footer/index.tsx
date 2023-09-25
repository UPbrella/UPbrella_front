import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const Footer = () => {
  return (
    <div className=" flex justify-between bg-white px-40 py-20 lg:hidden md:hidden">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default Footer;
