export type LoginButtonProps = {
  label: string;
};

const LoginButton = ({ label }: LoginButtonProps) => {
  return (
    <div className="max-w-xs">
      <button className="w-full h-48 bg-kakao rounded-12 text-kakaoblack text-15 leading-22 font-semibold">
        {label}
      </button>
    </div>
  );
};

export default LoginButton;
