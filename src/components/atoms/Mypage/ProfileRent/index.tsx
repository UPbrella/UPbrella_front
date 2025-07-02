import { TRentHistoriesRes } from "@/api/clientUserApi";
import MypageRentSection from "@/components/atoms/Mypage/MypageRentSection";

export type ProfileRentProps = {
  currentRentInfo?: TRentHistoriesRes;
};

const ProfileRent = ({ currentRentInfo }: ProfileRentProps) => {
  return (
    <section className="flex flex-col w-full text-gray-700">
      <div className="mb-8 font-semibold text-16 leading-24">대여 중인 우산</div>
      {!currentRentInfo ? (
        <div className="flex flex-col justify-center items-center p-20 w-full font-normal text-gray-700 border border-solid rounded-12 bg-primary-100 border-primary-300 text-15 leading-22">
          <p className="mb-8">대여 중인 우산이 없습니다.</p>
          <p>지구를 지키는 작은 우산,</p>
          <p className="mb-8"> 업브렐라와 함께 펼쳐주세요!</p>
          <p>A better choice, UPbrella</p>
        </div>
      ) : (
        <MypageRentSection rentInfo={currentRentInfo} isProfile={true} isRecent={true} />
      )}
    </section>
  );
};
export default ProfileRent;
