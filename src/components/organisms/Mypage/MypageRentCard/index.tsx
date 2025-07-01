import MypageRentList from "@/components/molecules/Mypage/MypageRentList";
import EmptyArea from "@/components/atoms/EmptyArea";
import { TRentHistoriesRes } from "@/api/clientUserApi";

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
