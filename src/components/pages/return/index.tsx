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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginInfo, redirectUrl } from "@/recoil";
import { formatPhoneNumber } from "@/utils/utils";
import { useMutation } from "react-query";
import { patchReturn } from "@/api/formApi";
import { useLocation } from "react-router-dom";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import ErrorComponent from "@/components/molecules/ErrorComponent";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";

const ReturnPage = () => {
  // 반납전(false), 반납후(true)
  const [isReturn, setIsReturn] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();
  const storeId = new URLSearchParams(location.search).get("storeId");
  const returnStoreId = storeId ? parseInt(storeId, 10) : 0;

  const userInfo = useRecoilValue(loginInfo);

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
  const maxCharLimit = 400;

  // 에러메시지
  const [subError, setSubError] = useState("");

  const setRedirectUrl = useSetRecoilState(redirectUrl);
  setRedirectUrl("/");

  // 로그인 유저 정보 조회 (이름, 전화번호, 은행명, 계좌번호)
  useEffect(() => {
    setName(userInfo.name);
    const formattedPhone = formatPhoneNumber(userInfo.phoneNumber);
    setPhone(formattedPhone);
  }, [userInfo]);

  // hook
  const {
    data: umbrellaData,
    isError: getUmbrellaError,
    isLoading: umbrellaDataLoading,
  } = useGetReturnUmbrella();

  const {
    data: formData,
    isError: getReturnFormError,
    isLoading: returnFormLoading,
  } = useGetReturnFormData(returnStoreId);

  const { mutate: updateRent } = useMutation(patchReturn);

  useEffect(() => {
    if (formData) {
      setClassificationName(formData.classificationName);
      setRentStoreName(formData.rentStoreName);
    }
  }, [formData]);

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

  if (umbrellaDataLoading || returnFormLoading) {
    return <></>;
  }

  // 사용자가 빌린 우산 조회 (umbrellaUuid, 대여일수)
  if (getUmbrellaError) {
    return (
      <div>
        <ErrorComponent
          error="죄송합니다. 페이지를 찾을 수 없어요:("
          subError="사용자가 빌린 우산이 없습니다."
        />
      </div>
    );
  }

  // 반납 폼 데이터 조회 (classificationName, rentStoreName)
  if (getReturnFormError) {
    return (
      <div>
        <ErrorComponent
          error="죄송합니다. 페이지를 찾을 수 없어요:("
          subError="존재하지 않는 협업 지점 고유번호입니다."
        />
      </div>
    );
  }

  // POST 우산반납신청
  const onClickPatchBtn = () => {
    updateRent(
      {
        returnStoreId,
        bank,
        accountNumber,
        improvementReportContent,
      },
      {
        onError: (err) => {
          const error = err as TCustomError;
          const errorMsg = getErrorMessage(error);
          setSubError(errorMsg);
          return;
        },
        onSuccess: () => {
          setIsReturn(true);
          return;
        },
      }
    );
  };

  return (
    <>
      {subError ? (
        <ErrorComponent error="죄송합니다. 페이지를 찾을 수 없어요:(" subError={subError} />
      ) : (
        <>
          <HeaderContainer />
          <div className="flex-col max-w-2xl mx-auto pb-50">
            <div className="mt-20 mb-32 font-semibold text-black text-24 leading-32">
              {!isReturn ? "우산을 반납할까요?" : "우산을 반납했어요!"}
            </div>
            <div className="max-w-2xl p-16 mt-16 mb-32 border border-gray-200 rounded-12">
              <ul className="ml-16 list-disc text-8">
                <li className="text-14 leading-20 gray-700">
                  수집된 개인정보는{" "}
                  <span className="inline font-semibold">서비스 운영의 목적으로만</span> 사용됩니다.
                </li>
                <li className="text-14 leading-20 gray-700">
                  대여 신청 시 정보를{" "}
                  <span className="inline text-red">
                    정확히 입력해주셔야{" "}
                    <span className="inline font-semibold text-14">원활한 보증금 환급</span>
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
              <div className="mb-8 text-gray-700 text-15 leading-22">환급받을 계좌</div>
              <div className="flex justify-between w-full">
                {isReturn ? (
                  <div className="relative flex items-center p-12 text-gray-500 bg-gray-100 w-120 rounded-8 text-15 leading-22">
                    <div className="cursor-pointer w-120 text-15 leading-22 focus:outline-none">
                      {bank}
                    </div>
                    <ExpandMoreIcon
                      style={{
                        position: "absolute",
                        right: "3",
                        fontSize: "20px",
                        color: "#999999",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`relative w-120 flex items-center rounded-8 p-12 border border-gray-300 bg-white ${
                      bank !== "은행명" ? "text-gray-700" : "text-gray-500"
                    }`}
                    onClick={() => setIsBottomSheetOpen(true)}
                  >
                    <div className="cursor-pointer w-120 text-15 leading-22 focus:outline-none">
                      {bank}
                    </div>
                    <ExpandMoreIcon
                      style={{
                        position: "absolute",
                        right: "3",
                        fontSize: "20px",
                        color: "#1C1B1F",
                      }}
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
                  <div className="w-full p-12 ml-4 text-gray-500 bg-gray-100 rounded-8 text-15 leading-22">
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
              <div className="mt-4 text-gray-600 text-14 leading-20">
                * ‘-’은 빼고 입력해주세요! <br /> * 현재 ‘반납 페이지’에서 입력하신 은행, 계좌번호
                정보는 보증금 환급이 완료됨에 따라 파기됩니다. <br /> * MYPAGE를 통해 정보를
                저장하면 빠른 반납이 가능합니다.
              </div>
            </div>

            <FormStatus
              label="개선 요청 사항"
              placeholder="개선이 필요하다고 느낀 점이 있다면 작성해주세요!"
              setStatus={setImprovementReportContent}
              status={improvementReportContent}
              isComplete={isReturn}
              maxCharLimit={maxCharLimit}
            />

            {!isReturn && (
              <FormButton
                label="반납하기"
                isActive={isActive}
                handleOpen={() => setIsOpenModal(true)}
              />
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
        </>
      )}
    </>
  );
};

export default ReturnPage;
