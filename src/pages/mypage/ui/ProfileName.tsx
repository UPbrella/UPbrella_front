import { useTranslation } from "react-i18next";

type ProfileNameProps = {
  userName?: string;
  totalRentNum: number;
};

const ProfileName = ({ userName, totalRentNum }: ProfileNameProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col justify-center items-center w-full text-gray-700 border-b border-gray-200 border-solid">
      <div className="flex justify-center items-end mb-8 font-bold">
        <p className="mr-4 text-24 leading-32">{userName}</p>
        <p className="text-16 leading-24">{t("mypage.profile.nameSuffix")}</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-24 font-normal text-14 leading-20">
        <p>{t("mypage.profile.impact1", { name: userName?.slice(-2) })}</p>
        <p>{t("mypage.profile.impact2", { count: totalRentNum * 100 })}</p>
      </div>
    </section>
  );
};
export default ProfileName;
