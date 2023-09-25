import MypageRentList, { TRentContentInfo } from "@/components/molecules/Mypage/MypageRentList";
import MypageRentEmptyList from "@/components/molecules/MypageRentEmptyList";

export type MypageRentCardProps = {
  rentList: TRentContentInfo[];
};

const MypageRentCard = ({ rentList }: MypageRentCardProps) => {
  return (
    <section className="py-24 flex flex-col flex-1">
      <div className="text-32 font-semibold leading-40 text-black mb-24">이용 내역</div>
      <div className="flex-1">
        {rentList.length > 0 ? <MypageRentList rentList={rentList} /> : <MypageRentEmptyList />}
      </div>
    </section>
  );
};
export default MypageRentCard;
