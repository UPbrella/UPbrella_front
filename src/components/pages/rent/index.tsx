import MobileHeader from "@/components/organisms/MobileHeader";
import FormBasic from "@/components/atoms/Form/FormBasic";
import FormStatus from "@/components/atoms/Form/FormStatus";
import FormButton from "@/components/atoms/Form/FormButton";
import FormLocationMolecules from "@/components/molecules/FormLocationMolecules";
import { useState } from "react";
import RentModalAccount from "@/components/atoms/Form/RentModalAccount";
import RentModalFinish from "@/components/atoms/Form/RentModalFinish";
import FormModal from "@/components/molecules/FormModal";

const RentPage = () => {
  // 대여 전(false), 대여 후(true)
  const [isRent, setIsRent] = useState(false);

  // 보증금 입금 안내 모달
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false); // 자물쇠 비밀번호 안내 모달
  const handleOpenDepositModal = () => setIsOpenDepositModal(true);
  const handleCloseDepositModal = () => setIsOpenDepositModal(false);

  // 자물쇠 비밀번호 안내 모달
  const [isOpenLockPwModal, setIsOpenLockPwModal] = useState(false); // 자물쇠 비밀번호 안내 모달
  const handleOpenLockPwModal = () => setIsOpenLockPwModal(true);
  const handleCloseLockPwModal = () => setIsOpenLockPwModal(false);

  return (
    <div className="flex-col max-w-2xl">
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
      <FormBasic label="이름" />
      <FormBasic label="전화번호" />
      <FormLocationMolecules label="대여지점" />
      <FormBasic label="우산번호" />
      <FormStatus label="상태신고" placeholder="우산이나 대여 환경에 문제가 있다면 작성해주세요!" />
      <FormButton label="대여하기" handleOpen={handleOpenDepositModal} />

      {isOpenDepositModal && (
        <FormModal height="286">
          <RentModalAccount
            handleCloseDepositModal={handleCloseDepositModal}
            handleOpenLockPwModal={handleOpenLockPwModal}
          />
        </FormModal>
      )}
      {isOpenLockPwModal && (
        <FormModal height="266">
          <RentModalFinish handleCloseLockPwModal={handleCloseLockPwModal} setIsRent={setIsRent} />
        </FormModal>
      )}
    </div>
  );
};

export default RentPage;
