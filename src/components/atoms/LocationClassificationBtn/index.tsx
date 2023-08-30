import { useState } from "react";

export type TLocationClassificationBtn = {
  classifications: {
    name: string;
    latitude?: number | null;
    longitude?: number | null;
  }[];
  map?: naver.maps.Map;
};

const LocationClassificationBtn = ({ classifications, map }: TLocationClassificationBtn) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);

    if (map && window.naver && window.naver.maps) {
      const location = classifications[index];
      const newCenter = new window.naver.maps.LatLng(
        location.latitude ?? 0,
        location.longitude ?? 0
      );
      map.setCenter(newCenter);
    }
  };

  return (
    <div>
      {classifications.map((item, index) => (
        <button
          key={item.name}
          className={`${
            activeIndex === index
              ? "text-primary-500 border-primary-500"
              : "text-gray-700 border-gray-300"
          } font-semibold px-16 py-8 mr-8 rounded-999 border text-15 bg-white`}
          onClick={() => handleClick(index)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default LocationClassificationBtn;
