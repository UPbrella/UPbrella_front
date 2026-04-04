import SignUpFormInput from "@/features/auth/ui/SignUpFormInput";
import SignUpFormInputTitle from "@/features/auth/ui/SignUpFormInputTitle";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SignUpInputBoxProps = {
  labelTitle: string;
  labelInput: string;
  registration: UseFormRegisterReturn;
  value?: string;
  error?: string;
  isRequired?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SignUpInputBox = ({
  labelTitle,
  labelInput,
  registration,
  value,
  error,
  isRequired = false,
  onChange,
}: SignUpInputBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    registration.onChange(e);
    onChange?.(e);
  };

  return (
    <section>
      <div className="mb-8">
        <SignUpFormInputTitle label={labelTitle} isRequired={isRequired} />
      </div>
      <SignUpFormInput
        label={labelInput}
        name={registration.name}
        value={value}
        onChange={handleChange}
        onBlur={registration.onBlur}
        ref={registration.ref}
      />
      {error && <div className="mt-4 text-red text-14 text-normal leading-20">{error}</div>}
    </section>
  );
};

export default SignUpInputBox;
