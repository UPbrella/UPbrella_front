import styled from "@emotion/styled";
import sectionImg1 from "@/assets/Story/section4-1.jpeg";
import sectionImg2 from "@/assets/Story/section4-2.jpeg";
import sectionImg3 from "@/assets/Story/section4-3.jpeg";
import sectionImg4 from "@/assets/Story/section4-4.jpeg";
import { SectionBullet } from "@/components/pages/story/UI/SectionBullet";

const StorySection4 = () => {
  return (
    <CssSectionBg
      className={`mt-80 p-80 px-80 lgMaxMin:px-80 sm:px-20  flex justify-center items-center gap-[40px]`}
    >
      <div className="lg:hidden flex-1">
        <Images />
      </div>

      <div className="flex-1 flex flex-col gap-[24px] font-semibold">
        <header className="text-h18 lg:text-h15 text-primary-500">지역 공동체 의식 강화</header>
        <div className="text-h32 lg:text-h24 text-gray-700">
          ‘공유 우산’을 매개로 <br /> 학생과 지역 공동체가 <br /> 긴밀히 협업하는 플랫폼
        </div>

        <div className="xl:hidden">
          <Images />
        </div>

        <div className="text-h18 lg:text-h15 text-gray-600">
          현재 신촌, 한양대 인근 협업 지점의 인지도를 높이고,
          <br className="lg:hidden" /> 업브렐라와 협업 지점 간 시너지를 창출하여
          <br className="lg:hidden" /> 지역 상권을 활성화하고자 합니다.
        </div>
      </div>

      <SectionBullet index={2} />
    </CssSectionBg>
  );
};

const Images = () => {
  const images = [sectionImg1, sectionImg2, sectionImg3, sectionImg4];

  return (
    <div className="grid grid-cols-2 w-fit float-right gap-[16px] lg:w-full">
      {images.map((e, i) => (
        <img
          key={i}
          className="object-cover w-[202px] aspect-square lg:w-full rounded-20"
          src={e}
          alt={`업브렐라_이미지_section4_${i + 1}`}
        />
      ))}
    </div>
  );
};

const CssSectionBg = styled.section`
  background: var(--gray-gray-100, #f8f8fa);
`;

export default StorySection4;
