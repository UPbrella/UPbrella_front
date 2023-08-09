import Logo from "@/assets/main_logo.svg";

export type LoginTitleProps = {
  label: string;
};

const LoginTitle = ({ label }: LoginTitleProps) => {
  return (
    <div className="flex flex-col items-center w-68">
      <img className="w-full h-68 mb-16" src={Logo} />
      <div className="w-full h-32 text-gray-700 text-24 leading-32 font-bold">{label}</div>
    </div>
  );
};

export default LoginTitle;
