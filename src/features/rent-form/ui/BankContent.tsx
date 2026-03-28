import { MouseEventHandler } from "react";
import { BankIcon } from "@/shared/constants/bank-icons";
import { useTranslation } from "react-i18next";

type BankContentProps = {
  setBank: (value: string) => void;
  setIsBottomSheetOpen: (value: boolean) => void;
};

const BankContent = ({ setBank, setIsBottomSheetOpen }: BankContentProps) => {
  const { t } = useTranslation();
  const banks = Object.entries(BankIcon);

  const handleClickBank: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const bankName = event.currentTarget.textContent || "";
    setBank(bankName);
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-1 font-semibold text-20 leading-26 text-gray-700 ml-20 pb-24 bg-white">
        {t("auth.signup.step2.selectBank")}
      </div>
      <div className="mt-24 mx-20 grid grid-cols-3 gap-4">
        {banks.map(([bankName, icon]) => (
          <div key={bankName} className="mb-12">
            <div
              className="mb-25 flex flex-col items-center justify-center cursor-pointer !pointer-events-auto"
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
