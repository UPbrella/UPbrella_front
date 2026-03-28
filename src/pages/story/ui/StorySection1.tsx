import { SectionBullet } from "@/pages/story/ui/SectionBullet";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const StorySection1 = () => {
  const { t } = useTranslation();

  return (
    <CssSectionBg className="h-[480px]">
      <CssSectionBgColor className="h-full">
        <div className="text-center text-gray-700 px-20 flex h-[100%] justify-center items-center font-bold text-h40 lg:text-h26">
          <div>
            <div>{t("story.s1.line1")}</div>
            <div>
              <span className="text-primary-700">{t("story.s1.highlight")}</span>
              {t("story.s1.line2")}
            </div>
          </div>

          <SectionBullet />
        </div>
      </CssSectionBgColor>
    </CssSectionBg>
  );
};

const CssSectionBg = styled.section`
  background-image: url("/assets/main_section1_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const CssSectionBgColor = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
`;

export default StorySection1;
