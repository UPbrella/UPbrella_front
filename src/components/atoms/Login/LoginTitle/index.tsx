import Logo from "@/assets/main_logo.svg";

export type LoginTitleProps = {
  label: string;
};

const LoginTitle = ({ label }: LoginTitleProps) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-80 h-68 mb-16" src={Logo} />
      <button className="w-full h-48 rounded-12 text-gray-700 text-24 leading-32 font-bold">
        {label}
      </button>
    </div>
  );
};

export default LoginTitle;
