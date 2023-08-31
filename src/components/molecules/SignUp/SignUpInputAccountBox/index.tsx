import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import SignUpFormInputBankName from "@/components/atoms/SignUp/SignUpFormInputBankName";
import SignUpFormInputTitle from "@/components/atoms/SignUp/SignUpFormInputTitle";
import { ChangeEvent } from "react";

export type SignUpInputAccountBoxProps = {
  labelTitle: string;
  labelInput: string;
  bank: string;
  accountNumber: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const SignUpInputAccountBox = ({
  labelTitle,
  labelInput,
  bank,
  accountNumber,
  onChangeValue,
  onClick,
  bankRef,
}: SignUpInputAccountBoxProps) => {
  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={true} />
      </div>
      <div className="flex">
        <div className="mr-4">
          <SignUpFormInputBankName
            label="은행명"
            name="bank"
            value={bank}
            onChange={onChangeValue}
            onClick={onClick}
            bankRef={bankRef}
          />
        </div>
        <div className="flex-1">
          <SignUpFormInput
            label={labelInput}
            name="accountNumber"
            value={accountNumber}
            onChange={onChangeValue}
          />
        </div>
      </div>
      <div className="text-gray-600 text-14 font-normal leading-20 mt-4">
        * ‘-’은 빼고 입력해주세요!
      </div>
    </section>
  );
};

export default SignUpInputAccountBox;
