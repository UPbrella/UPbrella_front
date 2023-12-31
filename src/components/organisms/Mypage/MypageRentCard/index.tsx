import MypageRentList from "@/components/molecules/Mypage/MypageRentList";
import { TRentContentInfo } from "@/types/mypage/MypageTypes";
import MypageRentEmptyList from "@/components/molecules/MypageRentEmptyList";

export type MypageRentCardProps = {
  rentList: TRentContentInfo[];
};

const MypageRentCard = ({ rentList }: MypageRentCardProps) => {
  return (
    <section className="xl:py-24 lg:pt-8 flex flex-col flex-1">
      <div className="text-32 font-semibold leading-40 text-black mb-24 lg:hidden">이용 내역</div>
      <div className="flex-1">
        {rentList.length > 0 ? <MypageRentList rentList={rentList} /> : <MypageRentEmptyList />}
      </div>
    </section>
  );
};
export default MypageRentCard;
