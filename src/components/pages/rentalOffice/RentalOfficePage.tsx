import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import Store from "@/components/molecules/Store";
import Card from "@/components/organisms/Card";
import { useGetStoreList, useGetSubClassifications } from "@/hooks/queries/storeQueries";
import { useState } from "react";

const RentalOfficePage = () => {
  const [, setSelectedStoreId] = useState<number | null>(null);
  const [, setSelectedClassificationId] = useState<number | null>(null);
  const [selectedClassificationName, setSelectedClassificationName] = useState<string>("");

  // server
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { data: storeListRes } = useGetStoreList();

  // TODO: 백엔드 404 에러 미해결로 문의드린 상태
  // const { data: useGetStoreDetailData } = useGetStoreDetail(selectedStoreId ?? 16);

  // useEffect(() => {
  //   // console.log("전체 스토어 리스트", storeListRes);
  //   // console.log("전체 카테고리 리스트", subClassificationsRes);
  //   // console.log("selected store 아이디", selectedStoreId);
  //   // console.log("selected store 정보", useGetStoreDetailData);
  // }, [selectedStoreId]);

  return (
    <div className="flex mt-24">
      <div className="flex mr-24 md:hidden">
        {/* {useGetStoreDetailData && <Card storeDetail={useGetStoreDetailData} />} */}
        <Card />
      </div>
      <div>
        {subClassificationsRes && (
          <LocationClassificationBtn
            classifications={subClassificationsRes}
            setSelectedClassificationId={setSelectedClassificationId}
            setSelectedClassificationName={setSelectedClassificationName}
          />
        )}
        <div>
          {storeListRes && (
            <div>
              <Store
                storeList={storeListRes}
                classifications={subClassificationsRes}
                setSelectedStoreId={setSelectedStoreId}
                selectedClassificationName={selectedClassificationName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalOfficePage;
