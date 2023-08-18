import CardFooter from "@/components/organisms/CardFooter";
import LoginForm from "@/components/organisms/LoginForm";

export type LoginTemplateProps = {
  onClick: () => void;
};

const LoginTemplate = ({ onClick }: LoginTemplateProps) => {
  return (
    <div>
      <main className="flex flex-col items-center h-full ">
        <LoginForm onClick={onClick} />
      </main>
      <CardFooter />
    </div>
  );
};
export default LoginTemplate;
