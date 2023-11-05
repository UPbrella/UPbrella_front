import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import Store from "@/components/molecules/Store";
import Card from "@/components/organisms/Card";
import {
  useGetStoreDetail,
  useGetStoreList,
  useGetSubClassifications,
} from "@/hooks/queries/storeQueries";
import { useState } from "react";

const RentalOfficePage = () => {
  // client
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [, setSelectedClassificationId] = useState<number | null>(null);
  const [selectedClassificationName, setSelectedClassificationName] = useState<string>("");

  // server
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { data: storeListRes } = useGetStoreList();
  const defalutStore = (storeListRes && storeListRes[0]?.stores[0]?.id) || 0;
  const { data: useGetStoreDetailData } = useGetStoreDetail(selectedStoreId ?? defalutStore);

  return (
    <div className="block xl:flex gap-[24px]">
      <div className="hidden xl:block max-w-[400px] min-w-[400px]">
        {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />}
      </div>
      <div className="flex flex-col items-center flex-1 xl:block">
        {subClassificationsRes && (
          <LocationClassificationBtn
            classifications={subClassificationsRes}
            setSelectedClassificationId={setSelectedClassificationId}
            setSelectedClassificationName={setSelectedClassificationName}
          />
        )}

        {storeListRes && (
          <Store
            storeList={storeListRes}
            classifications={subClassificationsRes}
            setSelectedStoreId={setSelectedStoreId}
            selectedClassificationName={selectedClassificationName}
          />
        )}
      </div>
    </div>
  );
};

export default RentalOfficePage;
