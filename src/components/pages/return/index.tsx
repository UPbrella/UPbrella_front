import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";

const ReturnPage = () => {
  return (
    <div className="flex-col max-w-2xl">
      <MobileHeader />
      <div className="mt-20 text-24 font-semibold leading-32 text-black mb-32">
        우산을 반납할까요?
      </div>
      <FormBasic label="이름" />
      <FormBasic label="전화번호" />
      <FormLocationMolecules label="반납지점" />
      <FormBasic label="우산번호" />
      <FormStatus
        label="개선 요청 사항"
        placeholder="개선이 필요하다고 느낀 점이 있다면 작성해주세요!"
      />
      <FormButton label="반납하기" />
    </div>
  );
};

export default ReturnPage;
