export type RentBasicProps = {
  label: string;
};

const RentBasic = ({ label, placeholder }: RentBasicProps) => {
  return (
    <div className="flex-col w-330 p-5">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 mr-4">{label}</div>
      <input
        className="w-full h-48 mt-4 rounded-8 p-12 gap-2.5 text-15 text-gray-500 leading-22 placeholder-gray-300 bg-gray-100"
        type="text"
      />
    </div>
  );
};

export default RentBasic;
