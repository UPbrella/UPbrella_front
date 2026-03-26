import FooterLabel from "@/widgets/footer/ui/FooterLabel";
import FooterSns from "@/widgets/footer/ui/FooterSNS";

const CardFooter = () => {
  return (
    <div className="hidden xl:flex flex-col gap-[8px] p-20">
      <FooterLabel />
      <FooterSns />
    </div>
  );
};

export default CardFooter;
