import { usePatchRentLockerCount } from "@/hooks/queries/formQueries";
import { useState } from "react";
import toast from "react-hot-toast";

type RentModalStorageIssueProps = {
  setIsOpenStorageIssue: (value: boolean) => void;
  setLockNumber: (value: string) => void;
  setIsOpenLockPwModal: (value: boolean) => void;
  storeId: number;
};

// TODO: 새로운 비밀번호 요청 API ?
const RentModalStorageIssue = ({
  setIsOpenStorageIssue,
  setLockNumber,
  setIsOpenLockPwModal,
  storeId,
}: RentModalStorageIssueProps) => {
  // TODO: number 저장 시 전역으로 이동
  const [countInput, setCountInput] = useState("");

  const { mutate, isLoading } = usePatchRentLockerCount();

  // 4자리 숫자 입력
  const isNumberValid = () => {
    return countInput.length === 4 && /^\d+$/.test(countInput);
  };

  const onClickPatchCountBtn = () => {
    if (isNaN(Number(countInput))) {
      toast.error("4자리 숫자만 입력해주세요.");
      return;
    }

    mutate(
      {
        storeMetaId: storeId,
        count: Number(countInput),
      },
      {
        onSuccess: (password) => {
          setLockNumber(password);
          setIsOpenStorageIssue(false);
          setIsOpenLockPwModal(true);
        },
      }
    );
  };

  return (
    <div className="w-full p-10">
      <div className="mb-16 font-bold text-black text-18 leading-24">불편을 드려 죄송합니다 😢</div>
      <div className="mb-16 text-gray-700 text-14 leading-20">
        보관함 화면 좌측 상단에 표기된 4자리 숫자를 입력해주시면 다른 비밀번호를 안내드릴게요!
      </div>
      <div className="flex h-48">
        <input
          className="w-full pl-12 mr-4 text-black border border-gray-300 rounded-8 text-15 leading-22 placeholder:text-gray-400 focus:border-gray-600 focus:outline-none"
          maxLength={4}
          placeholder="4자리 숫자를 입력해주세요"
          onChange={(e) => setCountInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`w-68 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 px-10 ${
            isNumberValid() ? "" : "cursor-not-allowed opacity-25"
          }`}
          disabled={!isNumberValid() || isLoading}
          onClick={onClickPatchCountBtn}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default RentModalStorageIssue;
