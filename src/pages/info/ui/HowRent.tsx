import InformTitle from "@/shared/ui/InformTitle";
import rental_step1 from "@/shared/assets/Rental/rental_step1.png";
import rental_step2 from "@/shared/assets/Rental/rental_step2.png";
import rental_step3 from "@/shared/assets/Rental/rental_step3.png";
import rental_step3_2 from "@/shared/assets/Rental/rental_step3_2.png";
import rental_step4 from "@/shared/assets/Rental/rental_step4.png";
import rental_step5 from "@/shared/assets/Rental/rental_step5.png";
import { useTranslation } from "react-i18next";

const HowRent = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520 xl:px-0">
        <div className="flex flex-col mt-48 xl:mt-194">
          <InformTitle stepTitle="STEP 1" title={t("info.rent.step1.title")} />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            {t("info.rent.step1.desc")}
          </div>
        </div>
        <img src={rental_step1} className="w-240 h-394 mt-126 lg:mt-40 lg:mx-auto" />
      </section>

      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
          <div className="flex flex-col xl:mt-230 mt-80">
            <InformTitle stepTitle="STEP 2" title={t("info.rent.step2.title")} />
          </div>
          <img
            src={rental_step2}
            className="mx-auto xl:w-440 xl:h-332 xl:mt-188 mt-69 w-280 h-211"
          />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520">
        <div className="flex flex-col mt-80 xl:mt-206">
          <InformTitle stepTitle="STEP 3" title={t("info.rent.step3.title")} />
          <div className="pt-24 text-gray-600 text-15 xl:text-16">{t("info.rent.step3.desc")}</div>
        </div>
        <div className="flex mt-40 gap-x-4 xl:mt-95">
          <img src={rental_step3} className="hidden w-240 h-425 xl:block" />
          <img src={rental_step3_2} className="mx-auto w-240 h-425" />
        </div>
      </section>
      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520">
          <div className="flex flex-col xl:mt-194 mt-80">
            <InformTitle stepTitle="STEP 4" title={t("info.rent.step4.title")} />
            <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
              {t("info.rent.step4.desc1")} <br />
              {t("info.rent.step4.desc2")}
            </div>
          </div>
          <img src={rental_step4} className="mx-auto mt-40 w-240 h-425 xl:mt-95" />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520">
        <div className="flex flex-col xl:mt-194 mt-80">
          <InformTitle stepTitle="STEP 5" title={t("info.rent.step5.title")} />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            {t("info.rent.step5.desc1")} <br /> {t("info.rent.step5.desc2")}
          </div>
        </div>
        <img src={rental_step5} className="mx-auto mt-40 w-280 h-395 xl:mt-125" />
      </section>
    </div>
  );
};

export default HowRent;
