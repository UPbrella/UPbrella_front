import { TRentalLocationTitle } from "@/types/label/RentalLocationTitleTypes";

const RentalLocationTitle = ({ title, category }: TRentalLocationTitle) => {
  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold mr-3">{title}</div>
      <div className="text-sm text-gray">{category.join(", ")}</div>
    </div>
  );
};

export default RentalLocationTitle;
