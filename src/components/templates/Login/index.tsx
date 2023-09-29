import LoginForm from "@/components/organisms/LoginForm";

export type LoginTemplateProps = {
  onClick: () => void;
};

const LoginTemplate = ({ onClick }: LoginTemplateProps) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center flex-1">
        <LoginForm onClick={onClick} />
      </main>
    </>
  );
};
export default LoginTemplate;
