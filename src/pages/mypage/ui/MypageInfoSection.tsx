import MypageFormContent from "@/pages/mypage/ui/MypageFormContent";
import MypageFormTitle from "@/pages/mypage/ui/MypageFormTitle";
import { formatPhoneNumber } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";

type MypageInfoSectionProps = {
  name: string;
  phoneNumber: string;
  email: string;
};

const MypageInfoSection = ({ name, phoneNumber, email }: MypageInfoSectionProps) => {
  const { t } = useTranslation();
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  return (
    <section className="p-24 border border-solid border-gray-200 rounded-12">
      <div className="flex flex-col">
        <div className="flex mb-24">
          <div className="mr-24">
            <MypageFormTitle label={t("mypage.info.name")} />
          </div>
          <div className="">
            <MypageFormContent label={name} />
          </div>
        </div>
        <div className="flex mb-24">
          <div className="mr-24">
            <MypageFormTitle label={t("mypage.info.phone")} />
          </div>
          <div className="">
            <MypageFormContent label={formattedPhoneNumber} />
          </div>
        </div>
        <div className="flex">
          <div className="mr-24">
            <MypageFormTitle label={t("mypage.info.email")} />
          </div>
          <div className="">
            <MypageFormContent label={email} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MypageInfoSection;
