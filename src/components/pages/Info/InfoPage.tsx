import LocationClassificationBtn from "@/components/atoms/LocationClassificationBtn";
import { TClassification } from "@/types/admin/StoreTypes";
import { useState } from "react";
import HowRent from "@/components/organisms/Info/HowRent";
import HowReturn from "@/components/organisms/Info/HowReturn";
import FAQ from "@/components/organisms/Info/FAQ";
import Footer from "@/components/organisms/Footer";
import { FixWidthWrapper } from "../story/UpbrellaStoryPage";
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
    <>
      <FixWidthWrapper>
        <HeaderContainer />
        <div className="flex items-center lg:w-680 lg:mx-auto md:px-10">
          <div className="flex flex-1 flex-col justify-center sm:px-0 xl:px-40">
            <div className="font-semibold text-24 pb-32 pt-24">이용안내</div>
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
    </>
  );
};

export default InfoPage;
