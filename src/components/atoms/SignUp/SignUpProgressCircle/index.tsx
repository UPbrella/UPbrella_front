export type SignUpProgressCircleProps = {
  isInProgress?: boolean;
};

const SignUpProgressCircle = ({ isInProgress }: SignUpProgressCircleProps) => {
  const isInProgressColor = isInProgress ? "bg-primary-500" : "bg-gray-200";

  return <div className={`w-8 h-8 ${isInProgressColor} rounded-4`}></div>;
};

export default SignUpProgressCircle;
