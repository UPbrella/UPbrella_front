import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import { TClassification } from "@/types/admin/StoreTypes";
import { useState } from "react";
import HowRent from "@/components/organisms/Info/HowRent";
import HowReturn from "@/components/organisms/Info/HowReturn";
import FAQ from "@/components/organisms/Info/FAQ";
import Footer from "@/components/organisms/Footer";
import { FixWidthWrapper } from "@/components/pages/story/UpbrellaStoryPage";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";

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
    <div className="bg-white">
      <FixWidthWrapper>
        <HeaderContainer />
        <div className="flex items-center px-10">
          <div className="flex flex-col justify-center flex-1 px-0 xl:px-40">
            <div className="pt-24 pb-32 font-semibold text-24">이용안내</div>
            <LocationClassificationBtn
              classifications={mock}
              setSelectedClassificationId={setSelectedClassificationIndex}
              handleClassificationSelection={handleClassificationSelection}
            />
          </div>
        </div>
      </FixWidthWrapper>
      {selectedClassificationIndex === 0 && <HowRent />}
      {selectedClassificationIndex === 1 && <HowReturn />}
      {selectedClassificationIndex === 2 && <FAQ />}
      <FixWidthWrapper>
        <Footer />
      </FixWidthWrapper>
    </div>
  );
};

export default InfoPage;
