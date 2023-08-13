export type RentModalAccountProps = {
  handleClose: () => void;
  modalOpen: () => void;
};

const RentModalAccount = ({ handleClose, modalOpen }: RentModalAccountProps) => {
  const copyAccountToClipboard = () => {
    handleClose();
    modalOpen();
    navigator.clipboard.writeText(account);
  };

  const account = "카카오뱅크 7979-82-98201";

  return (
    <div className="w-full p-24 pl-0 ml-20 flex flex-col">
      <div className="flex flex-col">
        <p className="text-18 font-bold">
          <p className="inline font-normal">'</p>
          모티브 스터디카페<p className="inline font-normal">'에서</p>
        </p>
        {"\n"}
        <p className="text-18 font-bold">
          <p className="inline font-normal">'</p>
          24<p className="inline font-normal">'번 우산을 빌릴까요?</p>
        </p>
      </div>
      <div className="flex flex-col">
        <ol className="list-decimal mt-16 ml-20 text-gray-700">
          <li>{account} 이연우 계좌복사</li>
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
          onClick={handleClose}
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
