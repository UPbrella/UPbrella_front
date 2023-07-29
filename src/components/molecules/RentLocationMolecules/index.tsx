import RentLocation from "@/components/atoms/Rent/RentLocation";

const RentLocationMolecules = () => {
  return (
    <div className="flex w-full justify-start">
      <RentLocation label="지역" isTitle />
      <RentLocation label="대여지점" />
    </div>
  );
};

export default RentLocationMolecules;
