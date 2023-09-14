import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import Card from "@/components/organisms/Card";
import Store from "@/components/molecules/Store";
import { useGetClassifications } from "@/hooks/queries/storeQueries";
import { useState } from "react";

const RentalOfficePage = () => {
  const storeData = [
    { title: "모티스 스터디카페", category: ["카페", "디저트"] },
    { title: "다른 가게 이름", category: ["카페", "기타"] },
    { title: "또 다른 가게 이름", category: ["음식점", "레스토랑"] },
    { title: "모티스 스터디카페", category: ["카페", "디저트"] },
    { title: "다른 가게 이름", category: ["카페", "기타"] },
    { title: "또 다른 가게 이름", category: ["음식점", "레스토랑"] },
    // ... 더 많은 가게 데이터
  ];
  const [, setSelectedClassification] = useState(221);

  // server
  // const { data: subClassificationsRes } = useGetSubClassifications();
  const { data: classificationsRes } = useGetClassifications();

  return (
    <div className="flex mt-24">
      <div className="flex mr-24 md:hidden">
        <Card />
      </div>
      <div>
        {classificationsRes && (
          <LocationClassificationBtn
            classifications={classificationsRes}
            handleClassificationSelection={setSelectedClassification}
          />
        )}
        <div>
          <div className="font-bold	text-24 mt-64 ml-5 mb-16">신촌</div>
          <div className="grid  grid-cols-3 grid-flow-row gap-4 lg:grid-cols-2">
            {storeData.map((store, index) => (
              <Store key={index} title={store.title} category={store.category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalOfficePage;
