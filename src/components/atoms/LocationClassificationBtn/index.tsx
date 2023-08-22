import { useState } from "react";

export type TLocationClassificationBtn = {
  text: string[];
  map: naver.maps.Map | undefined;
};

const LocationClassificationBtn = ({ text, map }: TLocationClassificationBtn) => {
  const { naver } = window;

  const [activeIndex, setActiveIndex] = useState(0);
  const shinchon = new naver.maps.LatLng(37.5608393877042, 126.93545258588699);
  const yeonhee = new naver.maps.LatLng(37.573885406749994, 126.93472815974937);

  const handleClick = (index: number) => {
    setActiveIndex(index);

    if (index === 0) {
      map?.setCenter(shinchon);
    } else {
      map?.setCenter(yeonhee);
    }
  };
  return (
    <div>
      {text.map((item, index) => (
        <button
          key={item}
          className={`${
            activeIndex === index
              ? "text-primary-500 border-primary-500"
              : "text-gray-700 border-gray-300"
          } font-semibold px-16 py-8 mr-8 rounded-999 border text-15 bg-white`}
          onClick={() => handleClick(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default LocationClassificationBtn;
