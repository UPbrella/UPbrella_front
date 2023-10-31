import Logo from "@/assets/main_logo.svg";

export type LoginTitleProps = {
  label: string;
};

const LoginTitle = ({ label }: LoginTitleProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-full mb-16 h-68"
        src={Logo}
        onError={(e) => {
          e.currentTarget.src = Logo;
        }}
      />
      <div className="w-full h-32 font-bold text-gray-700 text-24 leading-32">{label}</div>
    </div>
  );
};

export default LoginTitle;
