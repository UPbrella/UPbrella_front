import { getUpbrellaHistories } from "@/pages/story/ui/data";
import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useTranslation } from "react-i18next";

const StorySection7 = () => {
  const { t } = useTranslation();

  return (
    <section className="px-40 py-80 mt-80 lg:px-0 lg:py-40">
      <div className="flex flex-col gap-[24px] font-semibold text-center">
        <div className="text-h18 lg:text-h15 text-primary-500">Our Journey</div>
        <div className="text-gray-700 text-h32 lg:text-h24">{t("story.s7.title")}</div>
        <div className="text-gray-600 text-h18 lg:text-h15">
          <div>A Better Choice, UPbrella</div>
          <div>{t("story.s7.desc1")}</div>
          <div>{t("story.s7.desc2")}</div>
        </div>
      </div>

      <div className="flex justify-center mt-40">
        <Stepper orientation="vertical">
          {getUpbrellaHistories().map(({ year, works }) => {
            return (
              <Step active={true} key={year}>
                <StepLabel
                  StepIconComponent={() => (
                    <span className="w-9 h-9 ml-8 rounded-[50%] bg-primary-500"></span>
                  )}
                >
                  <div className="text-bold text-h24 lg:text-h20 text-primary-500">
                    {year} {t("story.s7.yearSuffix")}
                  </div>
                </StepLabel>
                <StepContent>
                  <div className="flex flex-col gap-[20px]">
                    {works.reverse().map(({ month, details }) => {
                      return (
                        <div key={month} className="flex gap-[24px] text-h15 text-gray-700">
                          <div className="min-w-[40px] font-semibold">
                            {month}
                            {t("story.s7.monthSuffix")}
                          </div>
                          <div className="flex flex-col gap-[16px]">
                            {details.map((detail) => {
                              return <div key={detail}>{detail}</div>;
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </section>
  );
};

export default StorySection7;
