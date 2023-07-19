import React from "react";

export type RentBasicProps = {
  label: string;
  placeholder?: string;
  isRequired: boolean;
};

const RentBasic = ({ label, placeholder, isRequired }: RentBasicProps) => {
  return (
    <div className="flex-col w-330 p-5">
      <div className="flex items-center mb-4">
        <div className="text-gray-700 text-15 leading-22 font-normal mr-4">{label}</div>
        {isRequired && <div className="text-gray-500 text-12 font-normal">(선택)</div>}
      </div>
      <input
        className="w-full h-48 mt-4 rounded-8 border border-gray-300 p-12 text-15 text-gray-700 leading-22 font-normal placeholder-gray-300"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default RentBasic;
