export type ReturnModalProps = {
  classificationName: string;
  rentStoreName: string;
  umbrellaUuid: number;
  elapsedDay: number;
  bank: string;
  accountNumber: string;
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
  setIsOpenModal,
  onClickPatchBtn,
}: ReturnModalProps) => {
  const RETURN_MODAL_TABLE: Record<
    keyof Omit<ReturnModalProps, "accountNumber" | "setIsOpenModal" | "onClickPatchBtn">,
    { label: string; value: string | number }
  > = {
    classificationName: { label: "지역", value: classificationName },
    rentStoreName: { label: "대여지점", value: rentStoreName },
    umbrellaUuid: { label: "우산번호", value: `${umbrellaUuid}번` },
    elapsedDay: { label: "대여일수", value: `${elapsedDay}일` },
    bank: { label: "환급받을 계좌", value: `${bank} ${accountNumber}` },
  };

  return (
    <div className="flex flex-col max-w-2xl px-20 pt-10 pb-5 w-320">
      <div className="mb-16 text-black text-18 leading-24">
        '<span className="font-bold">{rentStoreName}</span>'에서 <br /> '
        <span className="font-bold">{umbrellaUuid}</span>'번 우산을 반납할까요?
      </div>

      <div>
        <div>
          {Object.keys(RETURN_MODAL_TABLE).map((key) => {
            const column = key as keyof Omit<
              ReturnModalProps,
              "accountNumber" | "setIsOpenModal" | "onClickPatchBtn"
            >;
            return (
              <div key={column}>
                <div className="flex text-gray-700 text-14 leading-20">
                  <div className="font-semibold w-100">{RETURN_MODAL_TABLE[column].label}</div>
                  <span>{RETURN_MODAL_TABLE[column].value}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-16 text-gray-600 text-14 leading-20">
          해당 정보가 틀리다면 반드시 수정 부탁드려요! <br />
          {elapsedDay > 14 ? (
            <span>대여일수가 14일이 넘어 보증금 환급이 어렵습니다.</span>
          ) : (
            <span>보증금 환급은 2-3일 이내로 이루어질 예정입니다. </span>
          )}
        </div>
        <div className="mb-16 text-gray-600 text-14 leading-20">
          UPbrella 서비스를 이용해주셔서 감사합니다 :)
        </div>
      </div>

      <div className="flex justify-between h-48">
        <button
          className="w-1/2 mr-8 font-semibold text-gray-700 bg-white border border-gray-300 border-1 rounded-8 text-16 leading-24"
          onClick={() => setIsOpenModal(false)}
        >
          수정
        </button>
        <button
          className="w-1/2 font-semibold text-white rounded-8 bg-primary-500 text-16 leading-24"
          onClick={() => {
            setIsOpenModal(false);
            onClickPatchBtn();
          }}
        >
          반납 완료!
        </button>
      </div>
    </div>
  );
};

export default ReturnModal;
