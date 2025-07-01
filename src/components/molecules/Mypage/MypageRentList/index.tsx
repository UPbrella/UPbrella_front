import { TRentHistoriesRes } from "@/api/clientUserApi";
import MypageRentSection from "@/components/atoms/Mypage/MypageRentSection";

type TMypageRentCardProps = {
  rentList: TRentHistoriesRes[];
};

const MypageRentList = ({ rentList }: TMypageRentCardProps) => {
  return (
    <section className="flex flex-col flex-1 gap-4">
      {rentList.map((rent, index) => (
        <MypageRentSection key={index} isProfile={false} isRecent={index === 0} rentInfo={rent} />
      ))}
    </section>
  );
};
export default MypageRentList;
