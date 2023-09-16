import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import { TClassification } from "@/types/admin/StoreTypes";
import { useState } from "react";
import HowRent from "@/components/organisms/Info/HowRent";
import HowReturn from "@/components/organisms/Info/HowReturn";
import FAQ from "@/components/organisms/Info/FAQ";

const mock: TClassification[] = [
  {
    id: 1,
    type: "CLASSIFICATION",
    name: "우산 대여 방법",
    latitude: null,
    longitude: null,
  },
  {
    id: 2,
    type: "CLASSIFICATION",
    name: "우산 반납 방법",
    latitude: null,
    longitude: null,
  },
  {
    id: 3,
    type: "CLASSIFICATION",
    name: "자주 묻는 질문",
    latitude: null,
    longitude: null,
  },
];

const InfoPage = () => {
  const [selectedClassificationIndex, setSelectedClassificationIndex] = useState(0);

  const handleClassificationSelection = (index: number) => {
    setSelectedClassificationIndex(index);
  };

  return (
    <>
      <div className="px-120">
        <div className="font-semibold text-24 pb-32 pt-24">이용안내</div>
        <LocationClassificationBtn
          classifications={mock}
          setSelectedClassificationId={setSelectedClassificationIndex}
          handleClassificationSelection={handleClassificationSelection}
        />
      </div>
      {selectedClassificationIndex === 0 ? <HowRent /> : null}
      {selectedClassificationIndex === 1 ? <HowReturn /> : null}
      {selectedClassificationIndex === 2 ? <FAQ /> : null}
    </>
  );
};

export default InfoPage;
