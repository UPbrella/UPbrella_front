import { BankIcon } from "@/constants/BankIcon";

const BankContent = () => {
  const banks = Object.entries(BankIcon);

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-20 leading-26 text-gray-700">은행을 선택해주세요</div>
      <div className="mt-24 mx-20 grid grid-cols-3 gap-4">
        {banks.map(([bankName, icon]) => (
          <div key={bankName} className="mb-12">
            <div className="mb-25 flex flex-col items-center justify-center">
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
