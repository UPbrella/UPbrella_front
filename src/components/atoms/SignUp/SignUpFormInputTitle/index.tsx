export type SignUpFormInputTitleProps = {
  label: string;
  isRequired?: boolean;
};
const SignUpFormInputTitle = ({ label, isRequired }: SignUpFormInputTitleProps) => {
  return (
    <div className="flex items-center">
      <p className="mr-4 font-normal text-gray-700 text-15 leading-22">
        {label}
        {isRequired && <span className="ml-1 text-red"> *</span>}
      </p>
    </div>
  );
};

export default SignUpFormInputTitle;
