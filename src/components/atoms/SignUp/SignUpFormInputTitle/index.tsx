export type SignUpFormInputTitleProps = {
  label: string;
  isRequired?: boolean;
};
const SignUpFormInputTitle = ({ label, isRequired }: SignUpFormInputTitleProps) => {
  return (
    <div className="flex items-center	">
      <p className="mr-4 text-gray-700 text-15 leading-22 font-normal">{label}</p>
      {isRequired && <p className="text-gray-500 text-13 leading-16 font-normal">(선택)</p>}
    </div>
  );
};

export default SignUpFormInputTitle;
