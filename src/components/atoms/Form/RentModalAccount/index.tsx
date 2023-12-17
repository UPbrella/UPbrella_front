export type RentModalAccountProps = {
  handleCloseDepositModal: () => void;
  umbrellaUuid: number;
  region: string;
  storeName: string;
  umbrellaId: number;
  conditionReport?: string;
  storeId: number;
  onClickPostBtn: () => void;
  setLockNumber: (value: string) => void;
  lockNumber: string;
  setIsOpenDepositModal: (value: boolean) => void;
};

const RentModalAccount = ({
  handleCloseDepositModal,
  storeName,
  umbrellaUuid,
  onClickPostBtn,
  setLockNumber,
  lockNumber,
  setIsOpenDepositModal,
}: RentModalAccountProps) => {
  const BANK_NAME = "카카오뱅크";
  const ACCOUNT_NUMBER = "7979-86-64503";
  const ACCOUNT_NAME = "이지우";

  const copyAccountToClipboard = () => {
    onClickPostBtn(); // 보관함이 있는 경우 이 시점에 비밀번호 설정
    setLockNumber("1234"); // TODO 비밀번호 API 통신

    if (lockNumber) {
      setIsOpenDepositModal(true);
    }

    handleCloseDepositModal(); // (1) 보증금 입금 안내 모달 close
    navigator.clipboard.writeText(BANK_NAME + " " + ACCOUNT_NUMBER);
  };

  return (
    <div className="flex flex-col w-full m-10">
      <div className="flex flex-col">
        <div className="font-bold text-18">
          <p className="inline font-normal">'</p>
          {storeName}
          <p className="inline font-normal">'에서</p>
        </div>
        <div className="font-bold text-18">
          <p className="inline font-normal">'</p>
          {umbrellaUuid}
          <p className="inline font-normal">'번 우산을 빌릴까요?</p>
        </div>
      </div>
      <div className="flex flex-col">
        <ol className="mt-16 ml-20 text-gray-700 list-decimal text-14">
          <li>
            {BANK_NAME} {ACCOUNT_NUMBER} {ACCOUNT_NAME} 계좌복사
          </li>
          <li>보증금 10,000원 입금</li>
          <li>대여 완료!</li>
        </ol>
        <div className="mt-16 font-semibold text-primary-500 text-14 leading-20">
          14일 이내 반납 시 보증금 전액 환급됩니다.
        </div>
      </div>
      <div className="flex mt-16">
        <div
          className="py-12 mr-8 text-center text-gray-700 border border-gray-300 w-80 rounded-8"
          onClick={handleCloseDepositModal}
        >
          취소
        </div>
        <div
          className="w-[calc(100%-80px)] border font-semibold leading-24  mr-8 rounded-8 text-white py-12 text-center bg-primary-500 cursor-pointer"
          onClick={copyAccountToClipboard}
        >
          계좌 복사하기
        </div>
      </div>
    </div>
  );
};

export default RentModalAccount;
