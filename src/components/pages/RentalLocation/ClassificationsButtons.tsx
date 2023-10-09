import { useState, useEffect } from "react";
import { TClassification } from "@/types/admin/StoreTypes";

const ClassificationsButtons = ({
  classificationsRes,
  selectedClassification,
  setSelectedClassification,
}: {
  classificationsRes: TClassification[];
  selectedClassification?: TClassification;
  setSelectedClassification: (res: TClassification) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    const selectedIdIndex = classificationsRes.findIndex(
      ({ id }) => id === selectedClassification?.id
    );

    if (selectedIdIndex === -1) return;
    setActiveIndex(selectedIdIndex);
  }, [classificationsRes, selectedClassification?.id]);

  return (
    <div className="flex gap-2 overflow-auto flex-nowrap">
      {classificationsRes.map((item, index) => (
        <button
          key={item.id}
          className={`${
            activeIndex === index
              ? "text-primary-500 border-primary-500"
              : "text-gray-700 border-gray-300"
          } font-semibold px-16 py-8 rounded-999 border text-15 bg-white`}
          onClick={() => setSelectedClassification(item)}
          style={{
            flex: "0 0 auto",
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ClassificationsButtons;
