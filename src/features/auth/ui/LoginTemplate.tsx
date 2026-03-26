import LoginForm from "@/features/auth/ui/LoginForm";

type LoginTemplateProps = {
  onKakaoClick: () => void;
  onAppleClick: () => void;
};

const LoginTemplate = ({ onKakaoClick, onAppleClick }: LoginTemplateProps) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center flex-1">
        <LoginForm onKakaoClick={onKakaoClick} onAppleClick={onAppleClick} />
      </main>
    </>
  );
};
export default LoginTemplate;
