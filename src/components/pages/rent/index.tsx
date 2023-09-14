import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";
import { useEffect, useState } from "react";
import RentModalAccount from "@/components/atoms/Form/RentModalAccount";
import RentModalFinish from "@/components/atoms/Form/RentModalFinish";
import FormModal from "@/components/molecules/FormModal";
import { useGetRentFormData } from "@/hooks/queries/formQueries";
import { loginInfo } from "@/recoil";
import { useRecoilValue } from "recoil";
import { formatPhoneNumber } from "@/utils/utils";
import { useMutation } from "react-query";
import { postRent } from "@/api/formApi";
import { toast } from "react-hot-toast";

const RentPage = () => {
  // 대여 전(false), 대여 후(true)
  const [isRent, setIsRent] = useState(false);

  // url에서 UmbrellaId 가져옴
  const umbrellaId = 1; // TODO: 일단 고정값으로 두었는데, qr코드 url 협의후에 수정

  // 대여폼
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [storeName, setStoreName] = useState("");
  const [umbrellaUuid, setUmbrellaUuid] = useState(0);
  const [conditionReport, setConditionReport] = useState("");
  const [storeId, setStoreId] = useState(0);
  // const [pw, setPw] = useState("");

  // 로그인 유저 정보 조회 (name, phone)
  const userInfo = useRecoilValue(loginInfo);
  useEffect(() => {
    setName(userInfo.name);
    const formattedPhone = formatPhoneNumber(userInfo.phoneNumber);
    setPhone(formattedPhone);
  }, [userInfo]);

  // 대여 폼 데이터 조회 (location, storeName, umbrellaNo)
  const { data } = useGetRentFormData(umbrellaId);

  useEffect(() => {
    if (data) {
      setRegion(data.classificationName);
      setStoreName(data.rentStoreName);
      setUmbrellaUuid(data.umbrellaUuid);
      setStoreId(data.storeMetaId);
    }
  }, [data]);

  // POST 우산대여신청
  const { mutate: createMutate } = useMutation(postRent);
  const onClickPostBtn = () => {
    createMutate(
      { region, storeId, umbrellaId, conditionReport },
      {
        onError: () => {
          toast.error("대여신청 실패");
          return;
        },
        onSuccess: () => {
          toast.success("대여신청 성공");
          setIsRent(true);
          setIsOpenLockPwModal(true);
          return;
        },
      }
    );
  };

  // 보증금 입금 안내 모달
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false); // 자물쇠 비밀번호 안내 모달
  const handleOpenDepositModal = () => {
    setIsOpenDepositModal(true);
  };
  const handleCloseDepositModal = () => setIsOpenDepositModal(false);

  // 자물쇠 비밀번호 안내 모달
  const [isOpenLockPwModal, setIsOpenLockPwModal] = useState(false); // 자물쇠 비밀번호 안내 모달
  const handleCloseLockPwModal = () => setIsOpenLockPwModal(false);

  return (
    <div className="flex-col max-w-2xl mx-auto">
      <MobileHeader />
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
          />
        </FormModal>
      )}
      {isOpenLockPwModal && (
        <FormModal height="266">
          <RentModalFinish handleCloseLockPwModal={handleCloseLockPwModal} />
        </FormModal>
      )}
    </div>
  );
};

export default RentPage;
