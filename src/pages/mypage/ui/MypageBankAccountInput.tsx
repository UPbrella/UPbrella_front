import MypageBankInput from "@/pages/mypage/ui/MypageBankInput";
import MypageFormTitle from "@/pages/mypage/ui/MypageFormTitle";
import SignUpFormInput from "@/features/auth/ui/SignUpFormInput";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type MypageBankAccountInputProps = {
  bank: string;
  accountNumber: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const MypageBankAccountInput = ({
  bank,
  accountNumber,
  onChangeValue,
  onClick,
  bankRef,
}: MypageBankAccountInputProps) => {
  const { t } = useTranslation();

  return (
    <section className="p-24 border border-solid border-gray-200 rounded-12">
      <div className="flex flex-col">
        <div className="flex mb-8 items-center">
          <div className="mr-40">
            <MypageFormTitle label={t("mypage.account.bank")} />
          </div>
          <div className="xl:w-224 lg:w-full">
            <MypageBankInput
              label={t("mypage.account.bankName")}
              name="bank"
              value={bank}
              onChange={onChangeValue}
              onClick={onClick}
              bankRef={bankRef}
            />
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <div className="mr-40">
            <MypageFormTitle label={t("mypage.account.accountNumber")} />
          </div>
          <div className="xl:w-224 lg:w-full">
            <SignUpFormInput
              label={t("mypage.account.accountNumber")}
              name="accountNumber"
              value={accountNumber}
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-40">
            <MypageFormTitle label="" />
          </div>
          <div className="text-gray-600 text-14 font-normal leading-20 mt-4">
            {t("mypage.account.hint")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MypageBankAccountInput;
