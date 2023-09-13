import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import BottomSheet from "@/components/atoms/BottomSheet";
import BankContent from "@/components/atoms/Form/BankContent";
import FormModal from "@/components/molecules/FormModal";
import ReturnModal from "@/components/atoms/Form/ReturnModal";
import { useGetReturnFormData, useGetReturnUmbrella } from "@/hooks/queries/formQueries";
import { useRecoilValue } from "recoil";
import { loginInfo } from "@/recoil";
import { formatPhoneNumber } from "@/utils/utils";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { patchReturn } from "@/api/formApi";

const ReturnPage = () => {
  // 반납전(false), 반납후(true)
  const [isReturn, setIsReturn] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // 로그인 유저 정보 조회 (이름, 전화번호, 은행명, 계좌번호)
  const userInfo = useRecoilValue(loginInfo);
  useEffect(() => {
    setName(userInfo.name);
    const formattedPhone = formatPhoneNumber(userInfo.phoneNumber);
    setPhone(formattedPhone);
  }, [userInfo]);

  // 반납폼
  // const [storeId, setStoreId] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classificationName, setClassificationName] = useState("");
  const [rentStoreName, setRentStoreName] = useState("");
  const [umbrellaUuid, setUmbrellaUuid] = useState(0);
  const [bank, setBank] = useState(userInfo.bank || "은행명");
  const [accountNumber, setAccountNumber] = useState(userInfo.accountNumber || "");
  const [improvementReportContent, setImprovementReportContent] = useState("");
  const [elapsedDay, setElapsedDay] = useState(0);

  // TODO url (storeId)
  const returnStoreId = 1;

  // 반납 폼 데이터 조회 (classificationName, rentStoreName)
  const { data: formData } = useGetReturnFormData(returnStoreId);
  useEffect(() => {
    if (formData) {
      setClassificationName(formData.classificationName);
      setRentStoreName(formData.rentStoreName);
    }
  }, [formData]);

  // 사용자가 빌린 우산 조회 (umbrellaUuid, 대여일수)
  const { data: umbrellaData } = useGetReturnUmbrella();
  useEffect(() => {
    if (umbrellaData) {
      setUmbrellaUuid(umbrellaData.uuid);
      setElapsedDay(umbrellaData.elapsedDay);
    }
  }, [umbrellaData]);

  // 필수조건 입력 확인
  useEffect(() => {
    if (bank !== "" && accountNumber && accountNumber.length !== 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [bank, accountNumber]);

  // POST 우산반납신청
  const { mutate: updateRent } = useMutation(patchReturn);
  const onClickPatchBtn = () => {
    updateRent(
      {
        returnStoreId,
        bank,
        accountNumber,
        improvementReportContent,
      },
      {
        onError: () => {
          toast.error("반납신청 실패");
          return;
        },
        onSuccess: () => {
          toast.success("반납신청 성공");
          setIsReturn(true);
          return;
        },
      }
    );
  };

  return (
    <div className="flex-col max-w-2xl mx-auto">
      <MobileHeader />
      <div className="mt-20 text-24 font-semibold leading-32 text-black mb-32">
        {!isReturn ? "우산을 반납할까요?" : "우산을 반납했어요!"}
      </div>
      <div className="mt-16 mb-32 max-w-2xl border border-gray-200 rounded-12 p-16">
        <ul className="list-disc text-8 ml-16">
          <li className="text-14 leading-20 gray-700">
            수집된 개인정보는 <span className="inline font-semibold">서비스 운영의 목적으로만</span>{" "}
            사용됩니다.
          </li>
          <li className="text-14 leading-20 gray-700">
            대여 신청 시 정보를{" "}
            <span className="inline text-red">
              정확히 입력해주셔야{" "}
              <span className="inline text-14 font-semibold">원활한 보증금 환급</span>
            </span>
            이 가능합니다.
          </li>
        </ul>
      </div>

      <FormBasic label="이름" value={name} />
      <FormBasic label="전화번호" value={phone} />
      <FormLocationMolecules region={classificationName} storeName={rentStoreName} />
      <FormBasic label="우산번호" value={umbrellaUuid} />

      <div className="flex flex-col mb-32">
        <div className="text-15 leading-22 text-gray-700 mb-8">환급받을 계좌</div>
        <div className="flex justify-between w-full">
          {isReturn ? (
            <div className="relative w-120 flex items-center rounded-8 p-12 text-15 text-gray-500 leading-22 bg-gray-100">
              <div className="w-120 text-15 leading-22 cursor-pointer focus:outline-none">
                {bank}
              </div>
              <ExpandMoreIcon
                style={{ position: "absolute", right: "3", fontSize: "20px", color: "#999999" }}
              />
            </div>
          ) : (
            <div
              className={`relative w-120 flex items-center rounded-8 p-12 border border-gray-300 bg-white ${
                bank !== "은행명" ? "text-gray-700" : "text-gray-500"
              }`}
              onClick={() => setIsBottomSheetOpen(true)}
            >
              <div className="w-120 text-15 leading-22 cursor-pointer focus:outline-none">
                {bank}
              </div>
              <ExpandMoreIcon
                style={{ position: "absolute", right: "3", fontSize: "20px", color: "#1C1B1F" }}
              />
              <BottomSheet
                isBottomSheetOpen={isBottomSheetOpen}
                setIsBottomSheetOpen={setIsBottomSheetOpen}
                snapPoints={[484, 272, 0]}
              >
                <BankContent setBank={setBank} setIsBottomSheetOpen={setIsBottomSheetOpen} />
              </BottomSheet>
            </div>
          )}

          {isReturn ? (
            <div className="w-full ml-4 rounded-8 p-12 text-15 text-gray-500 leading-22 bg-gray-100">
              {accountNumber}
            </div>
          ) : (
            <input
              className={`ml-4 w-full rounded-8 p-12 focus:border-gray-600 focus:outline-none border border-gray-300`}
              placeholder={accountNumber ? accountNumber : "계좌번호"}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          )}
        </div>
        <div className="mt-4 text-14 leading-20 text-gray-600">* ‘-’은 빼고 입력해주세요!</div>
      </div>

      <FormStatus
        label="개선 요청 사항"
        placeholder="개선이 필요하다고 느낀 점이 있다면 작성해주세요!"
        setStatus={setImprovementReportContent}
        status={improvementReportContent}
        isComplete={isReturn}
      />

      {!isReturn && (
        <FormButton label="반납하기" isActive={isActive} handleOpen={() => setIsOpenModal(true)} />
      )}

      {isOpenModal && (
        <FormModal height="380">
          <ReturnModal
            classificationName={classificationName}
            rentStoreName={rentStoreName}
            umbrellaUuid={umbrellaUuid}
            elapsedDay={elapsedDay}
            bank={bank}
            accountNumber={accountNumber}
            setIsOpenModal={setIsOpenModal}
            onClickPatchBtn={onClickPatchBtn}
          />
        </FormModal>
      )}
    </div>
  );
};

export default ReturnPage;
