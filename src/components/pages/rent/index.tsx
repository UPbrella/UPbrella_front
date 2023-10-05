import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";
import { useEffect, useState } from "react";
import RentModalAccount from "@/components/atoms/Form/RentModalAccount";
import RentModalFinish from "@/components/atoms/Form/RentModalFinish";
import FormModal from "@/components/molecules/FormModal";
import { useGetRentFormData, useGetReturnUmbrella } from "@/hooks/queries/formQueries";
import { loginInfo, redirectUrl } from "@/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formatPhoneNumber } from "@/utils/utils";
import { useMutation } from "react-query";
import { postRent } from "@/api/formApi";
import RentModalStorageIssue from "@/components/atoms/Form/RentModalStorageIssue";
import { useParams } from "react-router-dom";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import ErrorComponent from "@/components/molecules/ErrorComponent";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";
import toast from "react-hot-toast";

const RentPage = () => {
  // 대여 전(false), 대여 후(true)
  const [isRent, setIsRent] = useState(false);
  const { id } = useParams();
  const umbrellaId = id ? parseInt(id, 10) : 0;
  const userInfo = useRecoilValue(loginInfo);

  // 대여폼
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [storeName, setStoreName] = useState("");
  const [umbrellaUuid, setUmbrellaUuid] = useState(0);
  const [conditionReport, setConditionReport] = useState("");
  const [storeId, setStoreId] = useState(0);
  const [lockNumber, setLockNumber] = useState(""); // TODO-Post Body
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false);
  const [isOpenLockPwModal, setIsOpenLockPwModal] = useState(false);
  const [isOpenStorageIssue, setIsOpenStorageIssue] = useState(false);
  const maxCharLimit = 400;

  // 에러메시지
  const [subError, setSubError] = useState("");

  // hook
  const { data, isError, isLoading: rentFormDataLoading } = useGetRentFormData(umbrellaId);
  const { data: umbrellaData, isLoading: umbrellaDataLoading } = useGetReturnUmbrella();
  const { mutate: createMutate } = useMutation(postRent);

  const setRedirectUrl = useSetRecoilState(redirectUrl);
  setRedirectUrl("/");

  // 로그인 유저 정보 조회 (name, phone)
  useEffect(() => {
    setName(userInfo.name);
    const formattedPhone = formatPhoneNumber(userInfo.phoneNumber);
    setPhone(formattedPhone);
  }, [userInfo]);

  useEffect(() => {
    if (data) {
      setRegion(data.classificationName);
      setStoreName(data.rentStoreName);
      setUmbrellaUuid(data.umbrellaUuid);
      setStoreId(data.storeMetaId);
    }
  }, [data]);

  if (rentFormDataLoading || umbrellaDataLoading) {
    return <></>;
  }

  if (umbrellaData) {
    // Error <1> 사용자가 이미 대여중인 우산이 있는 경우
    return (
      <div>
        <ErrorComponent
          error="죄송합니다. 페이지를 찾을 수 없어요:("
          subError="현재 회원님께서 이미 대여 중인 우산이 있는 경우 중복 대여가 불가능합니다!"
        />
      </div>
    );
  }

  if (isError) {
    // Error <2> 존재하지 않는 우산 고유 번호인 경우
    return (
      <div>
        <ErrorComponent
          error="죄송합니다. 페이지를 찾을 수 없어요:("
          subError="존재하지 않는 우산 고유 번호입니다."
        />
      </div>
    );
  }

  // POST 우산대여신청
  const onClickPostBtn = () => {
    createMutate(
      { region, storeId, umbrellaId, conditionReport },
      {
        onError: (err) => {
          const error = err as TCustomError;
          const errorMsg = getErrorMessage(error);
          setSubError(errorMsg);
          return;
        },
        onSuccess: () => {
          // setLockNumber("1111");

          if (lockNumber) {
            setIsOpenLockPwModal(true);
          } else {
            setIsRent(true);
            toast.success("대여 완료되었습니다.");
            return;
          }
        },
      }
    );
  };

  // 보증금 입금 안내 모달
  const handleOpenDepositModal = () => {
    setIsOpenDepositModal(true);
  };

  // 자물쇠 비밀번호 안내 모달
  const handleCloseDepositModal = () => setIsOpenDepositModal(false);

  // 보관함 모달
  const handleCloseLockPwModal = () => setIsOpenLockPwModal(false);

  return (
    <>
      {subError ? (
        <ErrorComponent error="죄송합니다. 페이지를 찾을 수 없어요:(" subError={subError} />
      ) : (
        <>
          <HeaderContainer />
          <div className="flex-col max-w-2xl mx-auto pb-50">
            <div className="mt-20 font-semibold text-black text-24 leading-32">
              {isRent ? "우산을 빌렸어요!" : "우산을 빌릴까요?"}
            </div>
            <div className="max-w-2xl p-16 mt-16 mb-32 border border-gray-200 rounded-12">
              <ul className="ml-16 list-disc text-8">
                <li className="text-14 leading-20 gray-700">
                  수집된 개인정보는 <p className="inline font-semibold">서비스 운영의 목적으로만</p>{" "}
                  사용됩니다.
                </li>
                <li className="text-14 leading-20 gray-700">
                  우산을 빌린 지점이 아니더라도{" "}
                  <p className="inline font-semibold">업브렐라 대여소 어디서나</p> 반납 가능합니다.
                </li>
              </ul>
            </div>
            <FormBasic label="이름" value={name} />
            <FormBasic label="전화번호" value={phone} />
            <FormLocationMolecules region={region} storeName={storeName} />
            <FormBasic label="우산번호" value={umbrellaUuid} />
            <FormStatus
              label="상태신고"
              placeholder={`우산이나 대여 환경에 문제가 있다면 ${maxCharLimit}자 이내로 작성해주세요`}
              setStatus={setConditionReport}
              status={conditionReport}
              isComplete={isRent}
              maxCharLimit={maxCharLimit}
            />
            {!isRent && (
              <FormButton label="대여하기" isActive={true} handleOpen={handleOpenDepositModal} />
            )}

            {isOpenDepositModal && (
              <FormModal height="286">
                <RentModalAccount
                  handleCloseDepositModal={handleCloseDepositModal}
                  umbrellaUuid={umbrellaUuid}
                  region={region}
                  storeName={storeName}
                  umbrellaId={umbrellaId}
                  conditionReport={conditionReport}
                  storeId={storeId}
                  onClickPostBtn={onClickPostBtn}
                  setLockNumber={setLockNumber}
                  lockNumber={lockNumber}
                  setIsOpenDepositModal={setIsOpenDepositModal}
                />
              </FormModal>
            )}

            {isOpenLockPwModal && (
              <FormModal height="266">
                <RentModalFinish
                  handleCloseLockPwModal={handleCloseLockPwModal}
                  lockNumber={lockNumber}
                  setIsOpenStorageIssue={setIsOpenStorageIssue}
                  setIsRent={setIsRent}
                />
              </FormModal>
            )}

            {isOpenStorageIssue && (
              <FormModal height="184">
                <RentModalStorageIssue
                  setIsOpenStorageIssue={setIsOpenStorageIssue}
                  setLockNumber={setLockNumber}
                  setIsOpenLockPwModal={setIsOpenLockPwModal}
                />
              </FormModal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RentPage;
