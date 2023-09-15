import { useState } from "react";

const RentModalNotOpen = () => {
  const [number, setNumber] = useState("");

  // 4자리 숫자 입력
  const isNumberValid = () => {
    return number.length === 4 && /^\d+$/.test(number);
  };

  return (
    <div className="w-full">
      <div className="text-18 font-bold leading-24 text-black mb-16">불편을 드려 죄송합니다 😢</div>
      <div className="text-14 leading-20 text-gray-700 mb-16">
        보관함 화면 좌측 상단에 표기된 4자리 숫자를 입력해주시면 다른 비밀번호를 안내드릴게요!
      </div>
      <div className="flex h-48">
        <input
          className="w-208 rounded-8 border border-gray-300 text-black text-15 leading-22 placeholder:text-gray-400 pl-12 mr-4"
          maxLength={4}
          placeholder="4자리 숫자를 입력해주세요"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          className={`w-68 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 ${
            isNumberValid() ? "" : "cursor-not-allowed opacity-25"
          }`}
          disabled={!isNumberValid()}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default RentModalNotOpen;
