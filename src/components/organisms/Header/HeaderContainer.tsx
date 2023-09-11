import HeaderContents from "@/components/molecules/Header/HeaderContents";
import { loginInfo } from "@/recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

export const HeaderContainer = () => {
  const userLoginInfo = useRecoilValueLoadable(loginInfo);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    switch (userLoginInfo.state) {
      case "hasValue":
        setIsLogin(true);
        break;
      case "loading":
        <div>Loading...</div>;
        break;
      case "hasError":
        // TODO: 지금 timing 차이 때문에 로그인하고나서 다시 로그인페이지로 떨어지는 문제 해결해야함.
        navigate("/login");
        setIsLogin(false);
        break;
    }
  }, [isLogin, navigate, userLoginInfo.state]);

  return (
    <div className="h-80">
      {isLogin ? (
        <HeaderContents isLogin={isLogin} name={userLoginInfo.contents.name} />
      ) : (
        <HeaderContents isLogin={isLogin} />
      )}
    </div>
  );
};
