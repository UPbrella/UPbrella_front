import umbrellaImg from "@/shared/assets/Story/section3.png";
import { SectionBullet } from "@/pages/story/ui/SectionBullet";
import { useTranslation } from "react-i18next";

const StorySection3 = () => {
  const { t } = useTranslation();

  return (
    <section
      className={`mt-80 py-80 lg:py-40 px-40 md:px-0 flex justify-center items-center gap-[40px]`}
    >
      <div className="flex flex-col gap-[24px] font-semibold lg:w-full">
        <header className="text-h18 lg:text-h15 text-primary-500">{t("story.s3.header")}</header>
        <div className="text-gray-700 text-h32 lg:text-h24">
          {t("story.s3.line1")} <br /> {t("story.s3.line2")}
        </div>

        <div className="xl:hidden">
          <img src={umbrellaImg} alt={t("story.s3.imgAlt")} className="w-full" />
        </div>

        <div className="text-gray-600 text-h18 lg:text-h15">
          {t("story.s3.line3")}
          <br className="lg:hidden" /> {t("story.s3.line4")}
          <br /> {t("story.s3.line5")}
          <br className="lg:hidden" /> {t("story.s3.line6")}
        </div>
      </div>
      <div className="lg:hidden">
        <img src={umbrellaImg} alt={t("story.s3.imgAlt")} className="w-420" />
      </div>
      <SectionBullet index={1} />
    </section>
  );
};

export default StorySection3;
