export type TRentalLocationTitle = {
  title: string;
  category: string[];
};

const RentalLocationTitle = ({ title, category }: TRentalLocationTitle) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl font-bold mr-8">{title}</div>
      <div className="text-sm text-gray-600">{category.join(", ")}</div>
    </div>
  );
};

export default RentalLocationTitle;
