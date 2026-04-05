import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import ProfileName from "@/pages/mypage/ui/ProfileName";
import ProfileRent from "@/pages/mypage/ui/ProfileRent";
import MypageNav from "@/pages/mypage/ui/MypageNav";
import { useGetUserStatus } from "@/entities/user/api/user.queries";

type TProps = {
  rentList: TRentHistoriesRes[];
};

const MypageLeftCard = ({ rentList }: TProps) => {
  const { data: userRes } = useGetUserStatus();
  const currentRentInfo = rentList.find((rent) => !rent.isReturned);

  return (
    <section className="flex flex-col items-center w-320 lg:w-full">
      <section className="flex flex-col items-center px-24 pt-32 pb-24 mb-24 w-full border border-gray-200 border-solid rounded-12">
        <div className="mb-24 w-full">
          <ProfileName userName={userRes?.data.data.name} totalRentNum={rentList.length} />
        </div>
        <ProfileRent currentRentInfo={currentRentInfo} />
      </section>
      <MypageNav />
    </section>
  );
};
export default MypageLeftCard;
