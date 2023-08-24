import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import SignUpFormInputBankName from "@/components/atoms/SignUp/SignUpFormInputBankName";
import SignUpFormInputTitle from "@/components/atoms/SignUp/SignUpFormInputTitle";
import { ChangeEvent } from "react";

export type SignUpInputAccountBoxProps = {
  labelTitle: string;
  labelInput: string;
  bank: string;
  account: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SignUpInputAccountBox = ({
  labelTitle,
  labelInput,
  bank,
  account,
  onChangeValue,
}: SignUpInputAccountBoxProps) => {
  return (
    <section>
      <section className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={true} />
      </section>
      <section className="flex">
        <div className="mr-4">
          <SignUpFormInputBankName
            label="은행명"
            name="bank"
            value={bank}
            onChange={onChangeValue}
          />
        </div>
        <div className="flex-1">
          <SignUpFormInput
            label={labelInput}
            name="account"
            value={account}
            onChange={onChangeValue}
          />
        </div>
      </section>
      <section className="text-gray-600 text-14 font-normal leading-20 mt-4">
        * ‘-’은 빼고 입력해주세요!
      </section>
    </section>
  );
};

export default SignUpInputAccountBox;
