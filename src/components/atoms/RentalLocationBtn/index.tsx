import { useState } from "react";

export type TRentalLocationBtn = {
  text: string[];
};

const RentalLocationBtn = ({ text }: TRentalLocationBtn) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      {text.map((item, index) => (
        <button
          key={index}
          className={`text-${
            activeIndex === index ? "main-color border-main-color" : "gray-700 border-gray-300"
          } text-gray font-semibold px-4 py-2 mr-2 rounded-999 border text-15`}
          onClick={() => handleClick(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default RentalLocationBtn;
