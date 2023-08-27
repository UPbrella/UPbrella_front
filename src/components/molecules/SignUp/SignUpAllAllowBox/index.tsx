import SignUpFormAllow from "@/components/atoms/SignUp/SignUpFormAllow";
import SignUpFormAllAllowText from "@/components/atoms/SignUp/SignUpFormAllAllowText";

export type SignUpAllAllowBoxProps = {
  isAllow?: boolean;
  label: string;
  onClickAllow: () => void;
};

const SignUpAllAllowBox = ({ isAllow, label, onClickAllow }: SignUpAllAllowBoxProps) => {
  return (
    <section className="flex px-8 py-12 items-center rounded-5 bg-gray-100">
      <div className="mr-8">
        <SignUpFormAllow isAllow={isAllow} onClick={onClickAllow} />
      </div>
      <SignUpFormAllAllowText label={label} />
    </section>
  );
};

export default SignUpAllAllowBox;
