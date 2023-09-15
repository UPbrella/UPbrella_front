import { toast } from "react-hot-toast";

export type RentModalFinishProps = {
  handleCloseLockPwModal: () => void;
  lockNumber: string;
  setIsOpenStorageIssue: (value: boolean) => void;
  setIsRent: (value: boolean) => void;
};

const RentModalFinish = ({
  handleCloseLockPwModal,
  lockNumber,
  setIsOpenStorageIssue,
  setIsRent,
}: RentModalFinishProps) => {
  return (
    <div className="w-full flex flex-col justify-between m-10">
      <div className="flex flex-col">
        <p className="text-18 font-bold">대여완료!</p>
      </div>
      <div className="flex flex-col text-15 leading-22 text-gray-700 mt-16">
        <div>
          사물함 비밀번호: <p className="inline font-bold">{lockNumber}</p>
        </div>
        <div>
          <div>번호를 입력하면 우산함이 열릴 거예요!</div>
          <div>UPbrella 서비스를 이용해주셔서 감사합니다 :)</div>
          <div className="mt-16 text-primary-500 font-semibold text-14 leading-20">
            14일 이내 반납 시 보증금 전액 환급됩니다.
          </div>
        </div>
      </div>
      <div className="flex mt-16 h-48">
        <button
          className="w-192 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 mr-8"
          onClick={() => {
            setIsOpenStorageIssue(true);
            handleCloseLockPwModal();
          }}
        >
          보관함이 안 열려요:(
        </button>
        <button
          className="w-80 rounded-8 bg-primary-500 text-white font-semibold text-16 leading-24"
          onClick={() => {
            handleCloseLockPwModal();
            toast.success("대여신청 성공");
            setIsRent(true);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default RentModalFinish;
