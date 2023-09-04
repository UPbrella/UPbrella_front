import MypageRentSection, { TRentInfo } from "@/components/atoms/Mypage/MypageRentSection";

export type ProfileRentProps = {
  profileInfo: TRentInfo;
};

const ProfileRent = ({ profileInfo }: ProfileRentProps) => {
  return (
    <section className="flex flex-col w-full text-gray-700">
      <div className="mb-8 text-16 font-semibold leading-24">대여 중인 우산</div>
      <MypageRentSection rentInfo={profileInfo} isProfile={true} isRecent={true} />
    </section>
  );
};
export default ProfileRent;
