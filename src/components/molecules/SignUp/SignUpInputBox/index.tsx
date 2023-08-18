import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import SignUpFormInputTitle from "@/components/atoms/SignUp/SignUpFormInputTitle";

export type SignUpInputBoxProps = {
  labelTitle: string;
  labelInput: string;
  name: string;
  isRequired?: boolean;
};

const SignUpInputBox = ({ labelTitle, labelInput, name, isRequired }: SignUpInputBoxProps) => {
  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={isRequired} />
      </div>
      <SignUpFormInput label={labelInput} name={name} />
      {isRequired && (
        <div className="text-gray-600 text-14 font-normal leading-20 mt-4">
          * ‘-’은 빼고 입력해주세요!
        </div>
      )}
    </section>
  );
};

export default SignUpInputBox;
