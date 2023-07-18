export type RentLocationProps = {
  label: string;
  isTitle: boolean;
  location: string;
};

const RentLocation = ({ label, isTitle, location }: RentLocationProps) => {
  const width = isTitle ? "96px" : "216px";

  return (
    <div className="flex-col w-330 p-5">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 font-normal mr-4">
        {label}
      </div>
      <input
        className="w-full h-48 mt-4 rounded-lg border border-gray-300 p-12 text-15 text-gray-700 leading-22 font-normal placeholder-gray-300"
        type="text"
        placeholder={location}
        style={{ width }}
      />
    </div>
  );
};

export default RentLocation;
