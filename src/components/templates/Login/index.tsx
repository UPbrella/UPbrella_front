import CardFooter from "@/components/organisms/CardFooter";
import LoginForm from "@/components/organisms/LoginForm";

export type LoginTemplateProps = {
  onClick: () => void;
};

const LoginTemplate = ({ onClick }: LoginTemplateProps) => {
  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <LoginForm onClick={onClick} />
      </main>
      <CardFooter />
    </>
  );
};
export default LoginTemplate;
