import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import Card from "@/components/organisms/Card";
import Store from "@/components/molecules/Store";
import { useGetSubClassifications } from "@/hooks/queries/storeQueries";

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

  // server
  const { data: subClassificationsRes } = useGetSubClassifications();

  const classificationName =
    subClassificationsRes?.map((item) => ({
      name: item.name,
    })) || [];

  return (
    <div className="flex mt-24">
      <div className="flex mr-24 md:hidden">
        <Card />
      </div>
      <div>
        <LocationClassificationBtn classifications={classificationName} />
        <div className="font-bold	text-24 mt-64 ml-5 mb-16">신촌</div>
        <div className="grid  grid-cols-3 grid-flow-row gap-4 lg:grid-cols-2">
          {storeData.map((store, index) => (
            <Store key={index} title={store.title} category={store.category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalOfficePage;
