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
import { toast } from "react-hot-toast";
import RentModalStorageIssue from "@/components/atoms/Form/RentModalStorageIssue";
import { useParams } from "react-router-dom";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import ErrorComponent from "@/components/molecules/ErrorComponent";

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

  // hook
  const { data, isError, isLoading: rentFormDataLoading } = useGetRentFormData(umbrellaId);
  const { data: umbrellaData, isLoading: umbrellaDataLoading } = useGetReturnUmbrella();
  const { mutate: createMutate } = useMutation(postRent);

  const setRediretcUrl = useSetRecoilState(redirectUrl);
  setRediretcUrl("/");

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

  // 대여 폼 데이터 조회 (location, storeName, umbrellaNo)
  if (rentFormDataLoading) {
    return <></>;
  }

  if (umbrellaDataLoading) {
    return <></>;
  }

  if (umbrellaData) {
    return (
      <div>
        <ErrorComponent
          error="죄송합니다. 페이지를 찾을 수 없어요:("
          subError="이미 대여중인 우산이 있습니다."
        />
      </div>
    );
  }

  if (isError) {
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
        onError: () => {
          toast.error("대여신청 실패");
          return;
        },
        onSuccess: () => {
          // setLockNumber("1111");

          if (lockNumber) {
            setIsOpenLockPwModal(true);
          } else {
            toast.success("대여신청 성공");
            setIsRent(true);
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
    <div className="flex-col max-w-2xl mx-auto">
      <HeaderContainer />
      <div className="mt-20 text-24 font-semibold leading-32 text-black">
        {isRent ? "우산을 빌렸어요!" : "우산을 빌릴까요?"}
      </div>
      <div className="mt-16 mb-32 max-w-2xl border border-gray-200 rounded-12 p-16">
        <ul className="list-disc text-8 ml-16">
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
        placeholder="우산이나 대여 환경에 문제가 있다면 작성해주세요!"
        setStatus={setConditionReport}
        status={conditionReport}
        isComplete={isRent}
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
  );
};

export default RentPage;
