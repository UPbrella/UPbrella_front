export type SignUpFormTitleProps = {
  label: string;
};

const SignUpFormTitle = ({ label }: SignUpFormTitleProps) => {
  return <div className="text-black text-24 font-semibold leading-32">{label}</div>;
};
export default SignUpFormTitle;
