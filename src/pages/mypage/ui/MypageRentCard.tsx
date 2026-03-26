import MypageRentList from "@/pages/mypage/ui/MypageRentList";
import EmptyArea from "@/shared/ui/EmptyArea";
import { TRentHistoriesRes } from "@/entities/user/api/user-api";

type TMypageRentCardProps = {
  rentList: TRentHistoriesRes[];
};

const MypageRentCard = ({ rentList }: TMypageRentCardProps) => {
  return (
    <section className="flex flex-col flex-1 xl:py-24 lg:pt-8">
      <div className="mb-24 font-semibold text-black text-32 leading-40 lg:hidden">이용 내역</div>
      <div className="flex-1">
        {rentList.length > 0 ? (
          <MypageRentList rentList={rentList} />
        ) : (
          <EmptyArea text="이용 내역이 아직 없어요!" />
        )}
      </div>
    </section>
  );
};
export default MypageRentCard;
