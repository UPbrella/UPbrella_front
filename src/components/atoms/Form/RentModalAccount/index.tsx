export type RentModalAccountProps = {
  handleCloseDepositModal: () => void;
  umbrellaUuid: number;
  region: string;
  storeName: string;
  umbrellaId: number;
  conditionReport?: string;
  storeId: number;
  onClickPostBtn: () => void;
};

const RentModalAccount = ({
  handleCloseDepositModal,
  storeName,
  umbrellaUuid,
  onClickPostBtn,
}: RentModalAccountProps) => {
  const copyAccountToClipboard = () => {
    onClickPostBtn();
    handleCloseDepositModal(); // (1) 보증금 입금 안내 모달 close
    navigator.clipboard.writeText(bankName + " " + accountNumber);
  };

  // TODO: 계좌 어떻게 처리할지 논의
  const bankName = "카카오뱅크";
  const accountNumber = "7979-82-98201";
  const accountName = "이연우";

  return (
    <div className="w-full p-24 pl-0 ml-20 flex flex-col">
      <div className="flex flex-col">
        <div className="text-18 font-bold">
          <p className="inline font-normal">'</p>
          {storeName}
          <p className="inline font-normal">'에서</p>
        </div>
        <div className="text-18 font-bold">
          <p className="inline font-normal">'</p>
          {umbrellaUuid}
          <p className="inline font-normal">'번 우산을 빌릴까요?</p>
        </div>
      </div>
      <div className="flex flex-col">
        <ol className="list-decimal mt-16 ml-20 text-gray-700">
          <li>
            {bankName} {accountNumber} {accountName} 계좌복사
          </li>
          <li>보증금 10,000원 입금</li>
          <li>대여 완료!</li>
        </ol>
        <div className="mt-16 text-primary-500 font-semibold text-14 leading-20">
          14일 이내 반납 시 보증금 전액 환급됩니다.
        </div>
      </div>
      <div className="flex mt-16">
        <div
          className="w-80 border border-gray-300 mr-8 rounded-8 text-gray-700 py-12 text-center"
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
