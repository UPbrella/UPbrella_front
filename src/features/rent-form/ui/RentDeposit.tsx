import { BANK_NAME, ACCOUNT_NUMBER, ACCOUNT_NAME } from "@/shared/constants/account";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const RentDeposit = () => {
  const { t } = useTranslation();

  const copyAccountToClipboard = () => {
    navigator.clipboard.writeText(BANK_NAME + " " + ACCOUNT_NUMBER);
    toast.success(t("toast.success.accountCopy"));
  };

  return (
    <div className="flex flex-col max-w-2xl p-5 mb-32">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 mr-4">
        {t("rent.deposit.title")}
      </div>
      <div className="w-full min-h-[48px] mt-4 rounded-8 p-12 gap-2.5 text-15 border border-gray-300 text-gray-700 leading-22 placeholder-gray-300">
        <div className="flex flex-col">
          <div className="ml-5 text-gray-700 text-14">
            <div>
              {t("rent.deposit.step1", {
                bankName: BANK_NAME,
                accountNumber: ACCOUNT_NUMBER,
                accountName: ACCOUNT_NAME,
              })}
            </div>
            <div>{t("rent.deposit.step2")}</div>
            <div>{t("rent.deposit.step3")}</div>
          </div>
          <div className="mt-16 ml-5  font-semibold text-primary-500 text-14 leading-20">
            {t("rent.deposit.refundNotice")}
          </div>

          <div className="flex justify-center">
            <div
              className="w-full mt-10 border font-semibold leading-24  mr-8 rounded-8 text-primary-500 py-12 text-center border-1 border-primary-500 cursor-pointer"
              onClick={copyAccountToClipboard}
            >
              {t("rent.deposit.copyBtn")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDeposit;
