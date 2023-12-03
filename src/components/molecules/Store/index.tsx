import { TStoreListAll, TSubClassification } from "@/types/admin/StoreTypes";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImg from "@/assets/Story/section4-1.jpeg";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";

export type TStoreProps = {
  storeList: TStoreListAll[];
  classifications: TSubClassification[];
  dataSubClassification: { id: number }[];
  setSelectedStoreId?: (storeId: number) => void;
  selectedClassificationId?: number;
  selectedClassificationName?: string;
};

const Store = ({
  storeList,
  classifications,
  dataSubClassification,
  setSelectedStoreId,
  selectedClassificationName,
}: TStoreProps) => {
  const classificationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 협업지점을 갖고 있는 지역태그만 filtering 및 화면에 표시
  const currentStoreClassification = dataSubClassification.flatMap((dataSubItem) => {
    const match = classifications.find(
      (classificationItem) => classificationItem.id === dataSubItem.id
    );
    if (match) {
      return [{ id: match.id, name: match.name }];
    }
    return [];
  });

  useEffect(() => {
    if (selectedClassificationName && currentStoreClassification) {
      const index = currentStoreClassification.findIndex(
        (classification) => classification.name === selectedClassificationName
      );
      if (index !== -1 && classificationRefs.current[index]) {
        const element = classificationRefs.current[index];
        if (element) {
          window.scroll({
            behavior: "smooth",
            top: element.offsetTop - 160,
          });
        }
      }
    }
    // 분류 선택 변경시에만 작동
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassificationName]);

  return (
    <div className="flex flex-col gap-[56px] xl:max-w-none max-w-[640px] mx-auto">
      {storeList.map((store, index) => (
        <div key={index}>
          <div
            ref={(el) => (classificationRefs.current[index] = el)}
            className="mt-8 mb-16 font-bold text-24"
          >
            {classifications
              ? classifications.find(
                  (classification) => classification.id === store.subClassificationId
                )?.name
              : ""}
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-4 lg:grid-cols-2 mdMaxLg:grid-cols-2">
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
