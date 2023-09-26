import { SectionBullet } from "@/components/pages/story/UI/SectionBullet";
import styled from "@emotion/styled";

const StorySection5 = () => {
  return (
    <CssSectionBg className="h-[400px]">
      <CssSectionBgColor className="h-full">
        <div className="text-center text-white px-20 flex flex-col gap-[24px] h-[100%] justify-center items-center font-semibold">
          <div className="text-h18 lg:text-h15 text-primary-500">업브렐라 팀</div>
          <div className="text-h32 lg:text-h24">업브렐라 팀을 소개합니다!</div>
          <div className="text-h18 lg:text-h15">
            더 지속가능한 플랫폼, 더 편리한 플랫폼을 만들기 위해 저희 팀은 모였습니다.
          </div>
          <SectionBullet index={3} />
        </div>
      </CssSectionBgColor>
    </CssSectionBg>
  );
};

const CssSectionBg = styled.section`
  background-image: url("/assets/section5_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const CssSectionBgColor = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
`;

export default StorySection5;
