import LoginButton from "@/components/atoms/Login/LoginButton";
import LoginTitle from "@/components/atoms/Login/LoginTitle";

export type LoginFormProps = {
  onClick: () => void;
};

const LoginForm = ({ onClick }: LoginFormProps) => {
  return (
    <section className="flex flex-col items-center max-w-440 w-full px-20 py-56 ">
      <section className="mb-56">
        <LoginTitle label="로그인" />
      </section>
      <LoginButton onClick={onClick} label="카카오로 3초 만에 시작하기" />
    </section>
  );
};

export default LoginForm;
