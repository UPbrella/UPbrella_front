import kakao from "@/assets/kakao.svg";

export type LoginButtonProps = {
  label: string;
};

const LoginButton = ({ label }: LoginButtonProps) => {
  return (
    <div className="max-w-440">
      <button className="flex items-center w-full h-48 bg-kakao rounded-12 text-kakaoblack text-15 leading-22 font-semibold px-20">
        <img className="h-16 mr-8" alt="kakao" src={kakao} />
        <p className="w-full">{label}</p>
      </button>
    </div>
  );
};

export default LoginButton;
