import React from "react";

export type RentLocationProps = {
  label: string;
  isTitle?: boolean;
};

const RentLocation = ({ label, isTitle }: RentLocationProps) => {
  const ratioWidth = isTitle ? "30%" : "70%";

  return (
    <div className="flex-col p-5 mb-32" style={{ width: ratioWidth }}>
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 font-normal mr-4">
        {label}
      </div>
      <div className="h-48 mt-4 rounded-8 p-12 text-15 text-gray-500 leading-22 placeholder-gray-300 bg-gray-100">
        TODO
      </div>
    </div>
  );
};

export default RentLocation;
