import { useState } from "react";
import { FixWidthWrapper } from "@/shared/ui/FixWidthWrapper";
import { HeaderContainer } from "@/widgets/header/ui/HeaderContainer";
import HowRent from "@/pages/info/ui/HowRent";
import HowReturn from "@/pages/info/ui/HowReturn";
import FAQ from "@/pages/info/ui/FAQ";
import Footer from "@/widgets/footer/ui/Footer";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import { useTranslation } from "react-i18next";

const InfoPage = () => {
  const { t } = useTranslation();
  const [activeInfoMenuIndex, setActiveInfoMenuIndex] = useState(0);

  const InfoMenu = [t("info.tab.howRent"), t("info.tab.howReturn"), t("info.tab.faq")];

  return (
    <>
      <SeoMetaTag
        title={t("seo.info.title")}
        description={t("seo.info.desc")}
        keywords={t("seo.info.keywords")}
      />
      <div className="bg-white">
        <HeaderContainer />

        <FixWidthWrapper>
          <div className="flex items-center px-10">
            <div className="flex flex-col justify-center flex-1 px-0 xl:px-40">
              <div className="pt-24 pb-32 font-semibold text-24">{t("info.pageTitle")}</div>

              <div className="flex w-full gap-2 overflow-auto flex-nowrap smMaxLg:max-w-600">
                {InfoMenu.map((title, index) => (
                  <button
                    key={title}
                    className={`${
                      activeInfoMenuIndex === index
                        ? "text-primary-500 border-primary-500"
                        : "text-gray-700 border-gray-300"
                    } font-semibold px-16 py-8 rounded-999 border text-15 bg-white`}
                    style={{
                      flex: "0 0 auto",
                    }}
                    onClick={() => setActiveInfoMenuIndex(index)}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FixWidthWrapper>

        {activeInfoMenuIndex === 0 && <HowRent />}
        {activeInfoMenuIndex === 1 && <HowReturn />}
        {activeInfoMenuIndex === 2 && <FAQ />}
        <Footer />
      </div>
    </>
  );
};

export default InfoPage;
