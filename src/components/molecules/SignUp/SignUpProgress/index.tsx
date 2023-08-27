import SignUpProgressCircle from "@/components/atoms/SignUp/SignUpProgressCircle";

export type SignUpProgressProps = {
  isInProgress1: boolean;
  isInProgress2: boolean;
};

const SignUpProgress = ({ isInProgress1, isInProgress2 }: SignUpProgressProps) => {
  return (
    <div className="flex justify-between w-24">
      <div className="mr-8">
        <SignUpProgressCircle isInProgress={isInProgress1} />
      </div>
      <div>
        <SignUpProgressCircle isInProgress={isInProgress2} />
      </div>
    </div>
  );
};

export default SignUpProgress;
