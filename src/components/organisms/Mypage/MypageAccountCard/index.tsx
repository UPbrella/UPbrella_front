import MypageBankAccountInput from "@/components/molecules/Mypage/MypageBankAccountInput";
import BankModal from "@/components/organisms/BankModal";
import { BankIcon } from "@/constants/BankIcon";
import { ChangeEvent, MouseEvent } from "react";

export type MypageAccountCardProps = {
  bank: string;
  accountNumber: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickBankArrow: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
  isOpenModal: boolean;
  handleClose: () => void;
  handleClickBank: (event: MouseEvent<HTMLDivElement>) => void;
  hasBankAccountInfo: boolean;
  isInputCompleted: boolean;
};
const MypageAccountCard = ({
  bank,
  accountNumber,
  onChangeValue,
  onClickBankArrow,
  bankRef,
  isOpenModal,
  handleClose,
  handleClickBank,
  hasBankAccountInfo,
  isInputCompleted,
}: MypageAccountCardProps) => {
  const banks = Object.entries(BankIcon);
  return (
    <div className="py-24">
      <div className="text-black text-32 font-semibold leading-40 mb-24">환급계좌 등록/변경</div>
      <MypageBankAccountInput
        bank={bank}
        accountNumber={accountNumber}
        onChangeValue={onChangeValue}
        onClick={onClickBankArrow}
        bankRef={bankRef}
      />
      <BankModal
        titleText="은행을 선택해주세요"
        isOpen={isOpenModal}
        handleClose={handleClose}
        children={
          <div className="grid grid-cols-3 gap-4">
            {banks.map(([bankName, icon]) => (
              <div key={bankName}>
                <div
                  className="w-full mb-8 p-12 flex flex-col items-center justify-center  cursor-pointer"
                  onClick={handleClickBank}
                >
                  <div className="w-24 h-24">{icon}</div>
                  <div className={`mt-4 text-15 leading-22 text-gray-700`}>{bankName}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />
      <div className="flex justify-end mt-8">
        {hasBankAccountInfo ? (
          <button className="w-127 h-56 border border-solid border-gray-300 rounded-8 text-gray-700 text-18 font-semibold leadin-24 px-29 mr-8">
            계좌 삭제
          </button>
        ) : (
          <div></div>
        )}
        {hasBankAccountInfo
          ? (isInputCompleted && (
              <button className="w-127 h-56 border border-solid bg-primary-200 rounded-8 text-primary-500 text-18 font-semibold leadin-24 px-29">
                계좌 변경
              </button>
            )) ||
            (!isInputCompleted && (
              <button className="w-127 h-56 border border-solid bg-primary-100 rounded-8 text-primary-300 text-18 font-semibold leadin-24 px-29 disabled:hover">
                계좌 변경
              </button>
            ))
          : (isInputCompleted && (
              <button className="w-127 h-56 border border-solid bg-primary-200 rounded-8 text-primary-500 text-18 font-semibold leadin-24 px-29">
                계좌 등록
              </button>
            )) ||
            (!isInputCompleted && (
              <button className="w-127 h-56 border border-solid bg-primary-100 rounded-8 text-primary-300 text-18 font-semibold leadin-24 px-29 disabled:hover">
                계좌 등록
              </button>
            ))}
      </div>
    </div>
  );
}; //
export default MypageAccountCard;