import { TClassification, TSubClassification } from "@/types/admin/StoreTypes";
import { useRef, useState } from "react";

export type TLocationClassificationBtn = {
  classifications: (TClassification | TSubClassification)[];
  map?: naver.maps.Map;
  dataSubClassification?: { id: number }[];
  setSelectedClassificationId?: (id: number) => void;
  setSelectedClassificationName?: (name: string) => void;
  handleClassificationSelection?: (id: number) => void;
};

const LocationClassificationBtn = ({
  classifications,
  map,
  dataSubClassification,
  setSelectedClassificationId,
  setSelectedClassificationName,
  handleClassificationSelection,
}: TLocationClassificationBtn) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // 협업지점을 갖고 있는 지역태그만 filtering 및 화면에 표시
  const currentStoreClassification =
    dataSubClassification &&
    dataSubClassification.flatMap((dataSubItem) => {
      const match = classifications.find(
        (classificationItem) => classificationItem.id === dataSubItem.id
      );
      if (match) {
        return [{ id: match.id, name: match.name }];
      }
      return [];
    });

  const isTClassification = (
    item: TClassification | TSubClassification | null
  ): item is TClassification => {
    return item !== null && item.type === "CLASSIFICATION";
  };

  const handleClick = (index: number, classificationId: number, classificationName: string) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      handleClassificationSelection?.(index);
      const location = classifications[index];

      if (map instanceof window.naver.maps.Map && isTClassification(location)) {
        const newCenter = new window.naver.maps.LatLng(
          location.latitude ?? 0,
          location.longitude ?? 0
        );
        map?.setCenter(newCenter);
      } else if (classificationId && setSelectedClassificationId && setSelectedClassificationName) {
        setSelectedClassificationId(classificationId);
        setSelectedClassificationName(classificationName);
      }
    }
  };

  return (
    <div className="flex w-full gap-2 overflow-auto flex-nowrap">
      {currentStoreClassification &&
        currentStoreClassification.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (buttonsRef.current[index] = el)}
            className={`${
              activeIndex === index
                ? "text-primary-500 border-primary-500"
                : "text-gray-700 border-gray-300"
            } font-semibold px-16 py-8 rounded-999 border text-15 bg-white`}
            style={{
              flex: "0 0 auto",
            }}
            onClick={() => handleClick(index, item.id, item.name)}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
};

export default LocationClassificationBtn;
