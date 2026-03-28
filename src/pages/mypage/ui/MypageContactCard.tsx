import MypageContactSection from "@/pages/mypage/ui/MypageContactSection";
import { useTranslation } from "react-i18next";

const MypageContactCard = () => {
  const { t } = useTranslation();

  return (
    <div className="xl:py-24 lg:pt-8 w-full">
      <div className="text-black text-32 font-semibold leading-40 mb-24 lg:hidden">
        {t("mypage.contact.title")}
      </div>
      <div className="xl:flex xl:justify-between">
        <div className="w-full xl:mr-8 lg:mb-16">
          <MypageContactSection
            content1={t("mypage.contact.urgentDesc1")}
            content2={t("mypage.contact.urgentDesc2")}
            buttonContent={t("mypage.contact.dmBtn")}
            url={"https://www.instagram.com/upbrella.sinchon/"}
          />
        </div>
        <div className="w-full xl:ml-8">
          <MypageContactSection
            content1={t("mypage.contact.bizDesc1")}
            content2={t("mypage.contact.bizDesc2")}
            buttonContent={t("mypage.contact.contactBtn")}
            url={"/contact"}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8"></div>
    </div>
  );
};
export default MypageContactCard;
