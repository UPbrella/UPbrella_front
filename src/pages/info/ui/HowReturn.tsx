import InformTitle from "@/shared/ui/InformTitle";
import rental_step1 from "@/shared/assets/Rental/rental_step1.png";
import rental_step3 from "@/shared/assets/Rental/rental_step3.png";
import return_step2 from "@/shared/assets/Return/return_step2.png";
import return_step3 from "@/shared/assets/Return/return_step3.png";
import return_step4 from "@/shared/assets/Return/return_step4.png";
import return_step5 from "@/shared/assets/Return/return_step5.png";
import { useTranslation } from "react-i18next";

const HowReturn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row xl:justify-center max-w-700 xl:h-520">
        <div className="flex flex-col mt-48 xl:mt-194">
          <InformTitle stepTitle="STEP 1" title={t("info.return.step1.title")} />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            {t("info.return.step1.desc")}
          </div>
        </div>
        <img src={rental_step1} className="mx-auto mt-40 w-240 h-394 xl:mt-126" />
      </section>
      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
          <div className="flex flex-col xl:mt-206 mt-80">
            <InformTitle stepTitle="STEP 2" title={t("info.return.step2.title")} />
            <div className="pt-24 text-gray-600">{t("info.return.step2.desc")}</div>
          </div>
          <img
            src={return_step2}
            className="w-360 h-400 mt-96 lg:mt-49 lg:mx-auto lg:w-280 lg:h-311"
          />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
        <div className="flex flex-col xl:mt-206 mt-80">
          <InformTitle stepTitle="STEP 3" title={t("info.return.step3.title")} />
          <div className="pt-24 text-gray-600">{t("info.return.step3.desc")}</div>
        </div>
        <img src={return_step3} className="mx-auto w-347 h-320 xl:mt-200 mt-62" />
      </section>

      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse xl:p-0 max-w-700 xl:max-w-fit">
          <div className="flex flex-col xl:mt-194 mt-80">
            <InformTitle stepTitle="STEP 4" title={t("info.return.step4.title")} />
            <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
              {t("info.return.step4.desc1")} <br />
              {t("info.return.step4.desc2")}
            </div>
          </div>
          <div className="flex mx-auto xl:mx-0 mt-40 gap-x-4 xl:mt-95">
            <img src={rental_step3} className="hidden w-240 h-425 xl:block" />
            <img src={return_step4} className=" w-240 h-425" />
          </div>
        </section>
      </div>

      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520 xl:p-0">
        <div className="flex flex-col xl:mt-194 mt-80">
          <InformTitle stepTitle="STEP 5" title={t("info.return.step5.title")} />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            {t("info.return.step5.desc1")} <br /> {t("info.return.step5.desc2")}
          </div>
        </div>
        <img src={return_step5} className="mx-auto mt-40 w-280 h-418 xl:mt-102" />
      </section>
    </div>
  );
};

export default HowReturn;
