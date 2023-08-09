import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import CardFooter from "@/components/organisms/CardFooter";
import LoginForm from "@/components/organisms/LoginForm";

const LoginTemplate = () => {
  return (
    <div>
      <HeaderContainer />
      <LoginForm onClick={() => alert("로그인버튼")} />
      <CardFooter />
    </div>
  );
};
export default LoginTemplate;
