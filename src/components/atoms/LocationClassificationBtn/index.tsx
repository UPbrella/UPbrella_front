import { useState } from "react";

export type TLocationClassificationBtn = {
  text: string[];
};

const LocationClassificationBtn = ({ text }: TLocationClassificationBtn) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      {text.map((item, index) => (
        <button
          key={index}
          className={`${
            activeIndex === index
              ? "text-primary-500 border-primary-500"
              : "text-gray-700 border-gray-300"
          } font-semibold px-16 py-8 mr-8 rounded-999 border text-15`}
          onClick={() => handleClick(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default LocationClassificationBtn;
