import apple from "@/shared/assets/apple.svg";

type AppleLoginButtonProps = {
  label: string;
  onClick: () => void;
};

const AppleLoginButton = ({ label, onClick }: AppleLoginButtonProps) => {
  return (
    <button
      className="flex items-center w-full h-48 bg-black rounded-12 text-white text-15 leading-22 font-semibold px-20"
      onClick={onClick}
    >
      <img className="h-16 mr-8" alt="apple" src={apple} />
      <p className="w-full">{label}</p>
    </button>
  );
};

export default AppleLoginButton;
