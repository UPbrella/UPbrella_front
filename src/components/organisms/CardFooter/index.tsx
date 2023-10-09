import FooterLabel from "@/components/molecules/Footer/FooterLabel";
import FooterSns from "@/components/molecules/Footer/FooterSNS";

const CardFooter = () => {
  return (
    <div className="hidden xl:flex flex-col gap-[8px] p-20">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default CardFooter;
