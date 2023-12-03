import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import Store from "@/components/molecules/Store";
import Card from "@/components/organisms/Card";
import {
  useGetStoreDetail,
  useGetStoreList,
  useGetSubClassifications,
} from "@/hooks/queries/storeQueries";
import { useEffect, useState } from "react";

// 협업 지점 소개 페이지
const RentalOfficePage = () => {
  // client
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [, setSelectedClassificationId] = useState<number | null>(null);
  const [selectedClassificationName, setSelectedClassificationName] = useState<string>("");

  // server
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { data: storeListRes } = useGetStoreList();
  const defaultStore = (storeListRes && storeListRes[0]?.stores[0]?.id) || 0;
  const { data: useGetStoreDetailData } = useGetStoreDetail(selectedStoreId ?? defaultStore);

  // 지역태그가 협업지점 목록을 포함하는 소분류 id 배열
  const subClassificationId = storeListRes?.map((item) => ({ id: item.subClassificationId }));

  // default card 스토어
  useEffect(() => {
    if (storeListRes && storeListRes.length > 0) {
      const randomIndex = Math.floor(Math.random() * storeListRes.length);
      const randomStore = storeListRes[randomIndex].stores;
      setSelectedStoreId(randomStore[0].id);
    }
  }, [storeListRes]);

  return (
    <div className="block xl:flex gap-[24px] py-24 min-h-[calc(100vh-80px)]">
      <div className="hidden xl:block min-w-[400px]">
        <div className="fixed max-h-[calc(100vh-80px)] min-w-[400px] max-w-[400px] overflow-auto ">
          {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />}
        </div>
      </div>

      <div className="flex-1 xl:block">
        <div className="min-h-[56px] flex justify-center xl:block">
          <div className="fixed">
            {subClassificationsRes && subClassificationId && (
              <LocationClassificationBtn
                classifications={subClassificationsRes}
                dataSubClassification={subClassificationId}
                setSelectedClassificationId={setSelectedClassificationId}
                setSelectedClassificationName={setSelectedClassificationName}
              />
            )}
          </div>
        </div>

        {storeListRes && subClassificationsRes && subClassificationId && (
          <Store
            storeList={storeListRes}
            classifications={subClassificationsRes}
            dataSubClassification={subClassificationId}
            setSelectedStoreId={setSelectedStoreId}
            selectedClassificationName={selectedClassificationName}
          />
        )}
      </div>
    </div>
  );
};

export default RentalOfficePage;
