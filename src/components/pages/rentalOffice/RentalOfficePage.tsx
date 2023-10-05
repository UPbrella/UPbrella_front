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
  const { data: useGetStoreDetailData } = useGetStoreDetail(selectedStoreId ?? 1);

  return (
    <div className="flex justify-center mt-20">
      <div className="flex mr-24 lg:hidden">
        {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />}
      </div>
      <div>
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
