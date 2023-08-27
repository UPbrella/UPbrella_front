export type SignUpFormAllAllowTextProps = {
  label: string;
};

const SignUpFormAllAllowText = ({ label }: SignUpFormAllAllowTextProps) => {
  return <div className="text-black text-16 font-semibold leading-24">{label}</div>;
};
export default SignUpFormAllAllowText;
