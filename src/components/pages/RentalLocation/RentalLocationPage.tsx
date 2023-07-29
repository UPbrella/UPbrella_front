import NaverMap from "@/components/organisms/NaverMap";
import RentalInfo from "@/components/templates/RentalInfo";

const RentalLocationPage = () => {
  return (
    <div className="flex mx-40">
      <RentalInfo />
      <NaverMap />
    </div>
  );
};
export default RentalLocationPage;
