import MypageInfoSection from "@/components/molecules/Mypage/MypageInfoSection";

export type MypageInfoCardProps = {
  name: string;
  phoneNumber: string;
  email: string;
  onClickButton: () => void;
};

const MypageInfoCard = ({ name, phoneNumber, email, onClickButton }: MypageInfoCardProps) => {
  return (
    <div className="py-24 w-full">
      <div className="text-black text-32 font-semibold leading-40 mb-24">개인정보조회</div>
      <MypageInfoSection name={name} phoneNumber={phoneNumber} email={email} />
      <div className="flex justify-end mt-8">
        <button
          className="h-56 border border-solid bg-primary-200 rounded-8 text-primary-500 text-18 font-semibold leadin-24 px-32"
          onClick={onClickButton}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};
export default MypageInfoCard;
