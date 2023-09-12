export type ReturnModalProps = {
  classificationName: string;
  rentStoreName: string;
  umbrellaUuid: number;
  elapsedDay: number;
  bank: string;
  accountNumber: string;
  setIsReturn: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  onClickPatchBtn: () => void;
};

const ReturnModal = ({
  classificationName,
  rentStoreName,
  umbrellaUuid,
  elapsedDay,
  bank,
  accountNumber,
  setIsReturn,
  setIsOpenModal,
  onClickPatchBtn,
}: ReturnModalProps) => {
  return (
    // TODO: 모달창 UI
    <div className="w-full p-24 pl-0 ml-20 flex flex-col">
      <div>
        {rentStoreName}에서 {umbrellaUuid}번 우산을 반납할까요?
      </div>
      <div>
        <div>지역 {classificationName}</div>
        <div>대여지점 {rentStoreName}</div>
        <div>우산번호 {umbrellaUuid}</div>
        <div>대여일수 {elapsedDay}</div>
        <div>
          환급받을 계좌 {bank} {accountNumber}
        </div>
      </div>
      <div>해당 정보가 틀리다면 반드시 수정 부탁드려요</div>
      {elapsedDay > 14 ? (
        <div>대여일수가 14일이 넘어 보증금 환급이 어렵습니다.</div>
      ) : (
        <div>보증금 환급은 2-3일 이내로 이루어질 예정입니다. </div>
      )}
      <div>UPbrella 서비스를 이용해주셔서 감사합니다 :)</div>
      <div>
        <button className="border w-150" onClick={() => setIsOpenModal(false)}>
          수정
        </button>
        <button
          className="bg-primary-500 w-150"
          onClick={() => {
            setIsReturn(true);
            setIsOpenModal(false);
            onClickPatchBtn();
          }}
        >
          반납완료!
        </button>
      </div>
    </div>
  );
};

export default ReturnModal;
