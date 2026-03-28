import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import MypageRentSection from "@/pages/mypage/ui/MypageRentSection";
import { useTranslation } from "react-i18next";

type ProfileRentProps = {
  currentRentInfo?: TRentHistoriesRes;
};

const ProfileRent = ({ currentRentInfo }: ProfileRentProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col w-full text-gray-700">
      <div className="mb-8 font-semibold text-16 leading-24">{t("mypage.profile.currentRent")}</div>
      {!currentRentInfo ? (
        <div className="flex flex-col justify-center items-center p-20 w-full font-normal text-gray-700 border border-solid rounded-12 bg-primary-100 border-primary-300 text-15 leading-22">
          <p className="mb-8">{t("mypage.profile.noRent")}</p>
          <p>{t("mypage.profile.noRentDesc1")}</p>
          <p className="mb-8"> {t("mypage.profile.noRentDesc2")}</p>
          <p>A better choice, UPbrella</p>
        </div>
      ) : (
        <MypageRentSection rentInfo={currentRentInfo} isProfile={true} isRecent={true} />
      )}
    </section>
  );
};
export default ProfileRent;
