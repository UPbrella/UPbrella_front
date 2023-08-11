import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";

const ReturnPage = () => {
  // const [isReturn, setIsReturn] = useState<boolean>(false);

  return (
    <div className="flex-col max-w-2xl">
      <MobileHeader />
      <div className="mt-20 text-24 font-semibold leading-32 text-black">
        {/* {isReturn ? "우산을 반납했어요!" : "우산을 반납할까요?"} */}
        우산을 반납할까요?
      </div>
      <div className="mt-16 mb-32 max-w-2xl border border-gray-200 rounded-12 p-16">
        <ul className="list-disc text-8 ml-16">
          <li className="text-14 leading-20 gray-700">
            수집된 개인정보는 <p className="inline font-semibold">서비스 운영의 목적으로만</p>{" "}
            사용됩니다.
          </li>
          <li className="text-14 leading-20 gray-700">
            대여 신청 시 정보를{" "}
            <p className="inline text-red">
              정확히 입력해주셔야 <p className="inline text-14 font-semibold">원활한 보증금 환급</p>
            </p>
            이 가능합니다.
          </li>
        </ul>
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
