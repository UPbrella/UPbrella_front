import { TClassification } from "@/types/admin/StoreTypes";
import { useState } from "react";

export type TLocationClassificationBtn = {
  classifications: TClassification[];
  setSelectedClassification: React.Dispatch<React.SetStateAction<number | 0>>;
  map?: naver.maps.Map;
};

const LocationClassificationBtn = ({
  classifications,
  setSelectedClassification,
  map,
}: TLocationClassificationBtn) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number, classificationId: number) => {
    setActiveIndex(index);

    setSelectedClassification(classificationId);

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
          onClick={() => handleClick(index, item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default LocationClassificationBtn;
