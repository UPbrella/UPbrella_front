import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import SignUpFormInputTitle from "@/components/atoms/SignUp/SignUpFormInputTitle";
import { ChangeEvent } from "react";

export type SignUpInputBoxProps = {
  labelTitle: string;
  labelInput: string;
  name: string;
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SignUpInputBox = ({
  labelTitle,
  labelInput,
  name,
  value,
  onChangeValue,
}: SignUpInputBoxProps) => {
  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={false} />
      </div>
      <SignUpFormInput label={labelInput} name={name} value={value} onChange={onChangeValue} />
    </section>
  );
};

export default SignUpInputBox;
