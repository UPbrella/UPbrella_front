import LoginButton from "@/features/auth/ui/LoginButton";
import AppleLoginButton from "@/features/auth/ui/AppleLoginButton";
import LoginTitle from "@/features/auth/ui/LoginTitle";

type LoginFormProps = {
  onKakaoClick: () => void;
  onAppleClick: () => void;
};

const LoginForm = ({ onKakaoClick, onAppleClick }: LoginFormProps) => {
  return (
    <section className="flex flex-col items-center max-w-440 w-full px-20 py-56 ">
      <section className="mb-56">
        <LoginTitle label="로그인" />
      </section>
      <LoginButton onClick={onKakaoClick} label="카카오로 3초 만에 시작하기" />
      <div className="mt-16 w-full">
        <AppleLoginButton onClick={onAppleClick} label="Apple로 3초 만에 시작하기" />
      </div>
    </section>
  );
};

export default LoginForm;
