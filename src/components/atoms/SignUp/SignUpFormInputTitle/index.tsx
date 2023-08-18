export type SignUpFormInputTitleProps = {
  label: string;
};
const SignUpFormInputTitle = ({ label }: SignUpFormInputTitleProps) => {
  return (
    <div className="flex items-center  text-gray-700 text-15 leading-22 font-normal">{label}</div>
  );
};

export default SignUpFormInputTitle;
