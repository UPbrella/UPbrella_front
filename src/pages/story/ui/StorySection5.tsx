import { SectionBullet } from "@/pages/story/ui/SectionBullet";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const StorySection5 = () => {
  const { t } = useTranslation();

  return (
    <CssSectionBg className="h-[400px]">
      <CssSectionBgColor className="h-full">
        <div className="text-center text-white px-20 flex flex-col gap-[24px] h-[100%] justify-center items-center font-semibold">
          <div className="text-h18 lg:text-h15 text-primary-500">{t("story.s5.label")}</div>
          <div className="text-h32 lg:text-h24">{t("story.s5.title")}</div>
          <div className="text-h18 lg:text-h15">{t("story.s5.desc")}</div>
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
