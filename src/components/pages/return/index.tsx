import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReturnPage = () => {
  const handleBankOpen = () => {
    // console.log("bank open");
  };

  return (
    <div className="flex-col max-w-2xl">
      <MobileHeader />
      <div className="mt-20 text-24 font-semibold leading-32 text-black mb-32">
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

      <div className="flex flex-col mb-32">
        <div className="text-15 leading-22 text-gray-700 mb-8">환급받을 계좌</div>
        <div className="flex justify-between w-full">
          <div className="relative w-120 flex items-center border border-gray-300 rounded-8 p-12">
            <input
              className="w-120 text-15 leading-22 text-black cursor-pointer placeholder-gray-400 bg-transparent"
              placeholder="카카오뱅크"
              readOnly
              onClick={handleBankOpen}
            />
            <ExpandMoreIcon
              style={{ position: "absolute", right: "3", fontSize: "20px", color: "#1C1B1F" }}
            />
          </div>
          <input
            className="ml-4 w-full border border-gray-300 rounded-8 p-12 focus:border-gray-600 focus:outline-none"
            type="number"
            placeholder="계좌번호"
            inputMode="numeric"
          />
        </div>
        <div className="mt-4 text-14 leading-20 text-gray-600">* ‘-’은 빼고 입력해주세요!</div>
      </div>

      <FormStatus
        label="개선 요청 사항"
        placeholder="개선이 필요하다고 느낀 점이 있다면 작성해주세요!"
      />
      <FormButton label="반납하기" />
    </div>
  );
};

export default ReturnPage;
