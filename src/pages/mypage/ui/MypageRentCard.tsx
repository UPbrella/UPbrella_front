import MypageRentList from "@/pages/mypage/ui/MypageRentList";
import EmptyArea from "@/shared/ui/EmptyArea";
import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import { useTranslation } from "react-i18next";

type TMypageRentCardProps = {
  rentList: TRentHistoriesRes[];
};

const MypageRentCard = ({ rentList }: TMypageRentCardProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col flex-1 xl:py-24 lg:pt-8">
      <div className="mb-24 font-semibold text-black text-32 leading-40 lg:hidden">
        {t("mypage.rent.title")}
      </div>
      <div className="flex-1">
        {rentList.length > 0 ? (
          <MypageRentList rentList={rentList} />
        ) : (
          <EmptyArea text={t("mypage.rent.empty")} />
        )}
      </div>
    </section>
  );
};
export default MypageRentCard;
