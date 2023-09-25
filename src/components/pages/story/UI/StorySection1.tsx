import { SectionBullet } from "@/components/pages/story/UI/SectionBullet";
import styled from "@emotion/styled";

const StorySection1 = () => {
  return (
    <CssSectionBg className="h-[480px]">
      <CssSectionBgColor className="h-full">
        <div className="text-center text-gray-700 px-20 flex h-[100%] justify-center items-center font-bold text-h40 lg:text-h26">
          <div>
            <div>갑작스럽게 내리는 비에</div>
            <div>
              <span className="text-primary-700">비닐 우산</span>을 구매하셨던 적이 있나요?
            </div>
          </div>

          <SectionBullet />
        </div>
      </CssSectionBgColor>
    </CssSectionBg>
  );
};

const CssSectionBg = styled.section`
  background-image: url("/src/assets/Story/main_section1_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const CssSectionBgColor = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
`;

export default StorySection1;
