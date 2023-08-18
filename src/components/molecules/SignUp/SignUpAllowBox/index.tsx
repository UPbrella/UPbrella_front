import SignUpFormAllow from "@/components/atoms/SignUp/SignUpFormAllow";
import SignUpFormAllowChevron from "@/components/atoms/SignUp/SignUpFormAllowChevron";
import SignUpFormAllowText from "@/components/atoms/SignUp/SignUpFormAllowText";

export type SignUpAllowBoxProps = {
  isAllow?: boolean;
  label: string;
  isClicked?: boolean;
};

const SignUpAllowBox = ({ isAllow, label, isClicked }: SignUpAllowBoxProps) => {
  return (
    <section className="flex justify-between px-8 py-12 items-center">
      <div className="flex">
        <div className="mr-8">
          <SignUpFormAllow isAllow={isAllow} />
        </div>
        <SignUpFormAllowText label={label} />
      </div>
      <div>
        <SignUpFormAllowChevron isClicked={isClicked} />
      </div>
    </section>
  );
};

export default SignUpAllowBox;
