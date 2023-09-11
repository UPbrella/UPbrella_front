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
