import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import SignUpFormInputTitle from "@/components/atoms/SignUp/SignUpFormInputTitle";
import { ChangeEvent } from "react";

export type SignUpInputBoxProps = {
  labelTitle: string;
  labelInput: string;
  name: string;
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  validLabel: string;
};

const SignUpInputBox = ({
  labelTitle,
  labelInput,
  name,
  value,
  onChangeValue,
  isValid,
  validLabel,
}: SignUpInputBoxProps) => {
  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={false} />
      </div>
      <SignUpFormInput label={labelInput} name={name} value={value} onChange={onChangeValue} />
      {!isValid && <div className="mt-4 text-red text-14 text-normal leading-20">{validLabel}</div>}
    </section>
  );
};

export default SignUpInputBox;
