export type SignUpFormButtonProps = {
  label: string;
  isDone?: boolean;
};

const SignUpFormButton = ({ label, isDone }: SignUpFormButtonProps) => {
  const isDoneColor = isDone ? "bg-primary-500" : "bg-primary-200";

  return (
    <div className={`flex w-full h-56 px-32 ${isDoneColor} justify-center item-center rounded-8 `}>
      <button className="text-white font-semibold text-18 leading-24">{label}</button>
    </div>
  );
};

export default SignUpFormButton;
