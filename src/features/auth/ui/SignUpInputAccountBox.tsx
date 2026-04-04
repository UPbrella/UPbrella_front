import SignUpFormInput from "@/features/auth/ui/SignUpFormInput";
import SignUpFormInputBankName from "@/features/auth/ui/SignUpFormInputBankName";
import SignUpFormInputTitle from "@/features/auth/ui/SignUpFormInputTitle";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type SignUpInputAccountBoxProps = {
  labelTitle: string;
  labelInput: string;
  bank: string;
  accountNumberRegistration: UseFormRegisterReturn;
  accountNumber: string;
  onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const SignUpInputAccountBox = ({
  labelTitle,
  labelInput,
  bank,
  accountNumberRegistration,
  accountNumber,
  onChangeValue,
  onClick,
  bankRef,
}: SignUpInputAccountBoxProps) => {
  const { t } = useTranslation();

  const handleAccountNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    accountNumberRegistration.onChange(e);
    onChangeValue?.(e);
  };

  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={false} />
      </div>
      <div className="flex">
        <div className="mr-4">
          <SignUpFormInputBankName
            label={t("return.form.bankName")}
            name="bank"
            value={bank}
            onChange={() => undefined}
            onClick={onClick}
            bankRef={bankRef}
          />
        </div>
        <div className="flex-1">
          <SignUpFormInput
            ref={accountNumberRegistration.ref}
            label={labelInput}
            name={accountNumberRegistration.name}
            value={accountNumber}
            onChange={handleAccountNumberChange}
            onBlur={accountNumberRegistration.onBlur}
          />
        </div>
      </div>
      <div className="mt-4 font-normal text-gray-600 text-14 leading-20">
        {t("return.form.accountHint1")}
      </div>
    </section>
  );
};

export default SignUpInputAccountBox;
