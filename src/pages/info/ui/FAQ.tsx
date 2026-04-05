import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-20 pt-32 mx-auto mb-194 xl:px-120">
      <section className="w-full p-32 bg-gray-100 xl:max-w-[1260px] rounded-20 max-w-680 ">
        <div className="font-semibold text-18">
          <span className="mr-16 font-semibold text-18">Q</span>
          {t("info.faq.q1")}
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18 ">A</span>
          <div className="whitespace-pre-line">{t("info.faq.a1")}</div>
        </div>
      </section>
      <section className="w-full p-32 bg-gray-100 xl:max-w-[1260px] rounded-20 w-1200 max-w-680">
        <div className="font-semibold text-18">
          <span className="mr-16 font-semibold text-18">Q</span>
          {t("info.faq.q2")}
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18">A</span>
          <div className="whitespace-pre-line">{t("info.faq.a2")}</div>
        </div>
      </section>
      <section className="w-full p-32 bg-gray-100 xl:max-w-[1260px] rounded-20 w-1200 max-w-680">
        <div className="font-semibold text-18">
          <span className="mr-16 font-semibold text-18">Q</span>
          {t("info.faq.q3")}
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18">A</span>
          <div className="whitespace-pre-line">{t("info.faq.a3")}</div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
