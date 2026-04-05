import LoginButton from "@/features/auth/ui/LoginButton";
import AppleLoginButton from "@/features/auth/ui/AppleLoginButton";
import LoginTitle from "@/features/auth/ui/LoginTitle";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
  onKakaoClick: () => void;
  onAppleClick: () => void;
};

const LoginForm = ({ onKakaoClick, onAppleClick }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center max-w-440 w-full px-20 py-56 ">
      <section className="mb-56">
        <LoginTitle label={t("auth.login.title")} />
      </section>
      <LoginButton onClick={onKakaoClick} label={t("auth.login.kakao")} />
      <div className="mt-16 w-full">
        <AppleLoginButton onClick={onAppleClick} label={t("auth.login.apple")} />
      </div>
    </section>
  );
};

export default LoginForm;
