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
  const [isMobileCardOpen, setIsMobileCardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // server
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { data: storeListRes } = useGetStoreList();
  const { data: useGetStoreDetailData } = useGetStoreDetail(selectedStoreId ?? 1);

  return (
    <div className="flex justify-center mt-24 md:mt-0 md:flex-col sm:px-0">
      <div className="flex mr-24 md:hidden lg:hidden">
        {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />}
      </div>
      <div>
        {subClassificationsRes && !isMobileCardOpen && (
          <div className="md:hidden">
            <LocationClassificationBtn
              classifications={subClassificationsRes}
              setSelectedClassificationId={setSelectedClassificationId}
              setSelectedClassificationName={setSelectedClassificationName}
            />
          </div>
        )}
        <div>
          {storeListRes && !isMobileCardOpen && (
            <div>
              <Store
                storeList={storeListRes}
                setIsMobileCardOpen={setIsMobileCardOpen}
                classifications={subClassificationsRes}
                setSelectedStoreId={setSelectedStoreId}
                selectedClassificationName={selectedClassificationName}
                setIsMobile={setIsMobile}
              />
            </div>
          )}
        </div>
      </div>
      {isMobileCardOpen && useGetStoreDetailData && (
        <div className="flex justify-center items-center mr-8 xl:hidden">
          <Card
            storeDetail={useGetStoreDetailData}
            maxWidth={isMobile ? 320 : 600}
            maxHeight={isMobile ? 224 : 420}
          />
        </div>
      )}
    </div>
  );
};

export default RentalOfficePage;
