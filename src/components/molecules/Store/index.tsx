import { TStoreListAll, TSubClassification } from "@/types/admin/StoreTypes";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImg from "@/assets/Story/section4-1.jpeg";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";

export type TStoreProps = {
  storeList: TStoreListAll[];
  classifications?: TSubClassification[];
  setSelectedStoreId?: (storeId: number) => void;
  selectedClassificationId?: number;
  selectedClassificationName?: string; // 선택한 분류 이름을 받음
};

const Store = ({
  storeList,
  classifications,
  setSelectedStoreId,
  selectedClassificationName,
}: TStoreProps) => {
  const classificationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedClassificationName && classifications) {
      const index = classifications.findIndex(
        (classification) => classification.name === selectedClassificationName
      );
      if (index !== -1 && classificationRefs.current[index]) {
        const element = classificationRefs.current[index];
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [selectedClassificationName, classifications]);

  return (
    <div className="flex flex-col w-full h-full lg:max-w-600 lg:mt-32 smMaxLg:items-center ">
      {storeList.map((store, index) => (
        <div key={index} className="w-full">
          <div
            ref={(el) => (classificationRefs.current[index] = el)}
            className="my-16 ml-5 font-bold text-24 xl:mt-64"
          >
            {classifications
              ? classifications.find(
                  (classification) => classification.id === store.subClassificationId
                )?.name
              : ""}
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-4 lg:grid-cols-2 mdMaxlg:grid-cols-2">
            {store.stores.map((storeItem, itemIndex) => (
              <div
                className="flex mb-12 cursor-pointer"
                key={itemIndex}
                onClick={() => {
                  if (storeItem && storeItem.id && setSelectedStoreId) {
                    setSelectedStoreId(storeItem.id);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                  if (window.innerWidth <= 1024) {
                    navigate(LAYOUT_ROUTES_URL.rentalOfficeDetail.path(`${storeItem.id}`));
                  }
                }}
              >
                <div
                  ref={containerRef}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  <img
                    src={`${storeItem.thumbnail}`}
                    alt={storeItem.name}
                    className="object-cover rounded-12 aspect-storeImg"
                    onError={(e) => {
                      e.currentTarget.src = DefaultImg;
                    }}
                  />

                  <div className="mt-12 font-semibold text-gray-700 text-16">{storeItem.name}</div>
                  <div className="text-gray-600 text-12">{storeItem.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
