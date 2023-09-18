import { useState } from "react";

type RentModalStorageIssueProps = {
  setIsOpenStorageIssue: (value: boolean) => void;
  setLockNumber: (value: string) => void;
  setIsOpenLockPwModal: (value: boolean) => void;
};

const RentModalStorageIssue = ({
  setIsOpenStorageIssue,
  setLockNumber,
  setIsOpenLockPwModal,
}: RentModalStorageIssueProps) => {
  // TODO: number 저장 시 전역으로 이동
  const [number, setNumber] = useState("");

  // 4자리 숫자 입력
  const isNumberValid = () => {
    return number.length === 4 && /^\d+$/.test(number);
  };

  return (
    <div className="w-full p-10">
      <div className="text-18 font-bold leading-24 text-black mb-16">불편을 드려 죄송합니다 😢</div>
      <div className="text-14 leading-20 text-gray-700 mb-16">
        보관함 화면 좌측 상단에 표기된 4자리 숫자를 입력해주시면 다른 비밀번호를 안내드릴게요!
      </div>
      <div className="flex h-48">
        <input
          className="w-full rounded-8 border border-gray-300 text-black text-15 leading-22 placeholder:text-gray-400 pl-12 mr-4 focus:border-gray-600 focus:outline-none"
          maxLength={4}
          placeholder="4자리 숫자를 입력해주세요"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          className={`w-68 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 px-10 ${
            isNumberValid() ? "" : "cursor-not-allowed opacity-25"
          }`}
          disabled={!isNumberValid()}
          onClick={() => {
            setIsOpenStorageIssue(false);
            setLockNumber("");
            setIsOpenLockPwModal(true);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default RentModalStorageIssue;
