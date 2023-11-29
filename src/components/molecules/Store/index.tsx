import { TStoreListAll, TSubClassification } from "@/types/admin/StoreTypes";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImg from "@/assets/Story/section4-1.jpeg";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";

export type TStoreProps = {
  storeList: TStoreListAll[];
  classifications: TSubClassification[];
  datasubClassification: { id: number }[];
  setSelectedStoreId?: (storeId: number) => void;
  selectedClassificationId?: number;
  selectedClassificationName?: string; 
};

const Store = ({
  storeList,
  classifications,
  datasubClassification,
  setSelectedStoreId,
  selectedClassificationName,
}: TStoreProps) => {
  const classificationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);


  // 협업지점을 갖고 있는 지역태그만 filtering 및 화면에 표시
  const currentStoreClassifiaction = datasubClassification.flatMap(datasubItem => {
  const match = classifications.find(classificationItem => classificationItem.id === datasubItem.id);
  if (match) {
    return [{ id: match.id, name: match.name }];
  }
  return [];
  });



  useEffect(() => {
    if (selectedClassificationName && currentStoreClassifiaction) {
      const index = currentStoreClassifiaction.findIndex(
        (classification) => classification.name === selectedClassificationName
      )
      if (index !== -1 && classificationRefs.current[index]) {
        const element = classificationRefs.current[index];
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [selectedClassificationName, currentStoreClassifiaction]);

  return (
    <div className="flex flex-col w-full h-full lg:max-w-600 lg:mt-32 smMaxLg:items-center">
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
                  }
                  if (window.innerWidth <= 1024) {
                    navigate(LAYOUT_ROUTES_URL.rentalOfficeDetail.path(`${storeItem.id}`));
                  }
                }}
              >
                <div
                  ref={containerRef}
                  id={`store-${storeItem.id}`}
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
