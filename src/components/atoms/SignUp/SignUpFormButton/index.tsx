export type SignUpFormButtonProps = {
  label: string;
  isDone?: boolean;
  onClick?: () => void;
};

const SignUpFormButton = ({ label, isDone, onClick }: SignUpFormButtonProps) => {
  const isDoneColor = isDone ? "bg-primary-500" : "bg-primary-200";

  return (
    <div
      className={`flex justify-center px-32 w-full h-56 transition-all cursor-pointer ${isDoneColor} item-center rounded-8`}
      onClick={onClick}
    >
      <button className="font-semibold text-white text-18 leading-24">{label}</button>
    </div>
  );
};

export default SignUpFormButton;
