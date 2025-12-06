import LoginForm from "@/components/organisms/LoginForm";

export type LoginTemplateProps = {
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
