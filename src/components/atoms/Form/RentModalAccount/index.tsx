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
  const handleFinishDepositModal = () => {
    onClickPostBtn(); // 보관함이 있는 경우 이 시점에 비밀번호 설정
    // 모달 닫기는 onSuccess에서 처리
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
      <div className="flex flex-col mt-20 text-primary-500 ">
        <div>우산 미반납 시 블랙리스트로 등록되어</div>
        <div>영구적으로 우산 대여가 불가능합니다.</div>
      </div>
      <div className="flex mt-20">
        <div
          className="py-12 mr-8 text-center text-gray-700 border border-gray-300 w-80 rounded-8"
          onClick={handleCloseDepositModal}
        >
          취소
        </div>
        <div
          className="w-[calc(100%-80px)] font-semibold leading-24  mr-8 rounded-8 text-white py-12 text-center bg-primary-500 cursor-pointer"
          onClick={handleFinishDepositModal}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default RentModalAccount;
