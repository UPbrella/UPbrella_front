import MypageInfoSection from "@/components/molecules/Mypage/MypageInfoSection";

export type MypageInfoCardProps = {
  name: string;
  phoneNumber: string;
  email: string;
  onClickButton: () => void;
};

const MypageInfoCard = ({ name, phoneNumber, email, onClickButton }: MypageInfoCardProps) => {
  return (
    <div className="xl:py-24 lg:pt-8 w-full">
      <div className="text-black text-32 font-semibold leading-40 mb-24 lg:hidden">
        개인정보조회
      </div>
      <MypageInfoSection name={name} phoneNumber={phoneNumber} email={email} />
      <div className="flex justify-end mt-8">
        <button
          className="xl:h-56 lg:h-48 border border-solid bg-primary-200 rounded-8 text-primary-500 xl:text-18 lg:text-16 font-semibold leading-24 xl:px-32 lg:px-20"
          onClick={onClickButton}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};
export default MypageInfoCard;
