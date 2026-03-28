import styled from "@emotion/styled";
import sectionImg1 from "@/shared/assets/Story/section4-1.jpeg";
import sectionImg2 from "@/shared/assets/Story/section4-2.jpeg";
import sectionImg3 from "@/shared/assets/Story/section4-3.jpeg";
import sectionImg4 from "@/shared/assets/Story/section4-4.jpeg";
import { SectionBullet } from "@/pages/story/ui/SectionBullet";
import { useTranslation } from "react-i18next";

const StorySection4 = () => {
  const { t } = useTranslation();

  return (
    <CssSectionBg
      className={`mt-80 p-80 px-80 md:px-20  flex justify-center items-center gap-[40px]`}
    >
      <div className="flex-1 lg:hidden">
        <Images />
      </div>

      <div className="flex-1 flex flex-col gap-[24px] font-semibold">
        <header className="text-h18 lg:text-h15 text-primary-500">{t("story.s4.header")}</header>
        <div className="text-gray-700 text-h32 lg:text-h24">
          {t("story.s4.line1")} <br /> {t("story.s4.line2")} <br /> {t("story.s4.line3")}
        </div>

        <div className="xl:hidden">
          <Images />
        </div>

        <div className="text-gray-600 text-h18 lg:text-h15">
          {t("story.s4.line4")}
          <br className="lg:hidden" /> {t("story.s4.line5")}
          <br className="lg:hidden" /> {t("story.s4.line6")}
        </div>
      </div>

      <SectionBullet index={2} />
    </CssSectionBg>
  );
};

const Images = () => {
  const { t } = useTranslation();
  const images = [sectionImg1, sectionImg2, sectionImg3, sectionImg4];

  return (
    <div className="grid grid-cols-2 w-fit float-right gap-[16px] lg:w-full">
      {images.map((e, i) => (
        <img
          key={i}
          className="object-cover w-[202px] aspect-square lg:w-full rounded-20"
          src={e}
          alt={t("story.s4.imgAlt", { index: i + 1 })}
        />
      ))}
    </div>
  );
};

const CssSectionBg = styled.section`
  background: var(--gray-gray-100, #f8f8fa);
`;

export default StorySection4;
