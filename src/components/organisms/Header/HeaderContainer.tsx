import HeaderContents from "@/components/molecules/Header/HeaderContents";
import { loginInfo, loginState } from "@/recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable, useRecoilState } from "recoil";

export const HeaderContainer = () => {
  const userLoginInfo = useRecoilValueLoadable(loginInfo);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      switch (userLoginInfo.state) {
        case "hasValue":
          break;
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          // TODO: 지금 timing 차이 때문에 로그인하고나서 다시 로그인페이지로 떨어지는 문제 해결해야함.
          if (userLoginInfo.contents.response.data.code === 401) {
            setIsLogin(false);
            alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/");
          }
          break;
      }
    }
  }, [isLogin, navigate, setIsLogin, userLoginInfo]);

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
