import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import errorpage_img from "@/shared/assets/errorpage_img.png";
import EmptyArea from "@/shared/ui/EmptyArea";
import Footer from "@/widgets/footer/ui/Footer";
import MypageLeftCard from "@/pages/mypage/ui/MypageLeftCard";
import { useGetRentHistories } from "@/entities/user/api/user.queries";
import { BASIC_ROUTES_URL } from "@/app/router/routes";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type TProps = {
  renderChildren: (data: TRentHistoriesRes[]) => ReactNode;
};

const MypageLayout = ({ renderChildren }: TProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetRentHistories();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="m-auto">
        <EmptyArea text={t("mypage.loading")} />
      </div>
    );

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center px-20 m-auto">
        <img src={errorpage_img} className="w-196 h-160" />
        <div className="mt-16 font-semibold text-18">{t("mypage.error.title")}</div>
        <div className="mt-8 text-gray-600">{t("mypage.error.retry")}</div>
        <button
          className="px-32 py-16 mt-32 font-semibold bg-primary-200 text-primary-500 text-18 rounded-8"
          onClick={() => navigate(BASIC_ROUTES_URL.root.path())}
        >
          {t("common.error.goHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col w-full xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="mb-32 font-semibold text-black text-24 leading-32">{t("mypage.title")}</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
            <MypageLeftCard rentList={data} />
          </div>
          {renderChildren(data)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageLayout;
