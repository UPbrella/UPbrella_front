import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const StorySection2 = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-80">
      <CssBackgroundGradient className="rounded-[32px] text-center py-80 lg:py-40 mx-40 px-16 xl:px-32 md:mx-0 flex flex-col items-center justify-center gap-[64px] lg:gap-[32px]">
        <div className="font-semibold text-gray-700 text-h32 lg:text-h24 flex flex-col gap-[4px]">
          <div>{t("story.s2.line1")}</div>
          <div>
            <span className="text-primary-700">{t("story.s2.highlight1")}</span>{" "}
            {t("story.s2.line2")}
          </div>
          <div>
            <span className="text-primary-700">{t("story.s2.highlight2")}</span>
            {t("story.s2.line3")}
          </div>
        </div>
        <div className="w-[760px] flex gap-[40px] lg:flex-col lg:w-full">
          <WhiteBox header={t("story.s2.card1.title")} content={t("story.s2.card1.value")} />
          <WhiteBox header={t("story.s2.card2.title")} content={t("story.s2.card2.value")} />
        </div>
      </CssBackgroundGradient>
    </section>
  );
};

const WhiteBox = ({ header, content }: { header: string; content: string }) => {
  return (
    <div className="flex-1 flex flex-col gap-[16px]">
      <div className="font-semibold text-gray-600 text-h18 lg:text-h16">{header}</div>
      <div className="font-semibold text-h36 lg:text-h26 p-40 bg-white rounded-[20px] text-black">
        {content}
      </div>
    </div>
  );
};

const CssBackgroundGradient = styled.div`
  background: linear-gradient(106deg, #fef4f2 17.24%, #e8f4ff 83.06%);
`;

export default StorySection2;
