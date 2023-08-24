import { MouseEventHandler } from "react";
import { BankIcon } from "@/constants/BankIcon";

export type BankContentProps = {
  setBankName: (value: string) => void;
  setIsBottomSheetOpen: (value: boolean) => void;
};

const BankContent = ({ setBankName, setIsBottomSheetOpen }: BankContentProps) => {
  const banks = Object.entries(BankIcon);

  const handleClickBank: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation(); // 이벤트버블링
    const bankName = event.currentTarget.textContent || ""; // 선택한 은행의 이름을 가져옴
    setBankName(bankName);
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-1 font-semibold text-20 leading-26 text-gray-700 ml-20 pb-24 bg-white">
        은행을 선택해주세요
      </div>
      <div className="mt-24 mx-20 grid grid-cols-3 gap-4">
        {banks.map(([bankName, icon]) => (
          <div key={bankName} className="mb-12">
            <div
              className="mb-25 flex flex-col items-center justify-center  cursor-pointer"
              onClick={handleClickBank}
            >
              <div className="w-24 h-24">{icon}</div>
              <div className={`mt-4 text-15 leading-22 text-gray-700`}>{bankName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankContent;
