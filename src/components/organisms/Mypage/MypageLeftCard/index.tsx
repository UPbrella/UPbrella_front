import { TRentInfo } from "@/components/atoms/Mypage/MypageRentSection";
import ProfileName from "@/components/atoms/Mypage/ProfileName";
import ProfileRent from "@/components/atoms/Mypage/ProfileRent";
import MypageNav from "@/components/molecules/Mypage/MypageNav";

export type MypageLeftCardProps = {
  userName: string;
  totalRentNum: number;
  profileInfo: TRentInfo;
  isReturned: boolean;
};

const MypageLeftCard = ({
  userName,
  totalRentNum,
  profileInfo,
  isReturned,
}: MypageLeftCardProps) => {
  return (
    <section className="flex flex-col items-center w-320">
      <section className="flex flex-col items-center w-full px-24 pt-32 pb-24 mb-24 border border-solid border-gray-200 rounded-12">
        <div className="mb-24">
          <ProfileName userName={userName} totalRentNum={totalRentNum} />
        </div>
        <ProfileRent profileInfo={profileInfo} isReturned={isReturned} />
      </section>
      <MypageNav />
    </section>
  );
};
export default MypageLeftCard;
