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
    <div className="flex mt-24">
      <div className="flex mr-24 md:hidden">
        {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />}
      </div>
      <>
        {subClassificationsRes && (
          <LocationClassificationBtn
            classifications={subClassificationsRes}
            setSelectedClassificationId={setSelectedClassificationId}
            setSelectedClassificationName={setSelectedClassificationName}
          />
        )}
        <>
          {storeListRes && (
            <Store
              storeList={storeListRes}
              classifications={subClassificationsRes}
              setSelectedStoreId={setSelectedStoreId}
              selectedClassificationName={selectedClassificationName}
            />
          )}
        </>
      </>
    </div>
  );
};

export default RentalOfficePage;
