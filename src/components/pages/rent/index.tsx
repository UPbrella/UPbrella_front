import MobileHeader from "@/components/organisms/MobileHeader";
import RentBasic from "@/components/atoms/Rent/RentBasic";
import RentStatus from "@/components/atoms/Rent/RentStatus";
import RentButton from "@/components/atoms/Rent/RentButton";
import RentLocationMolecules from "@/components/molecules/RentLocationMolecules";

const RentPage = () => {
  return (
    <div className="flex-col max-w-2xl">
      <MobileHeader />
      <div className="mt-20 text-24 font-semibold leading-32 text-black mb-32">
        우산을 빌릴까요?
      </div>
      <RentBasic label="이름" />
      <RentBasic label="전화번호" />
      <RentLocationMolecules />
      <RentBasic label="우산번호" />
      <RentStatus label="상태신고" placeholder="우산이나 대여 환경에 문제가 있다면 작성해주세요!" />
      <RentButton label="대여하기" />
    </div>
  );
};

export default RentPage;
