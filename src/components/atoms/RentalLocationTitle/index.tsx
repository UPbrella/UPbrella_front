export type TRentalLocationTitle = {
  title: string;
  category: string;
};

const RentalLocationTitle = ({ title, category }: TRentalLocationTitle) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl font-bold mr-8 sm:text-18">{title}</div>
      <div className="text-sm text-gray-600 sm:text-12">{category}</div>
    </div>
  );
};

export default RentalLocationTitle;
