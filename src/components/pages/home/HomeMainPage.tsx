import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    name: "대여폼",
    path: "/rent",
  },
  {
    name: "반납폼",
    path: "/return",
  },
  {
    name: "로그인",
    path: "/login",
  },
  {
    name: "회원가입",
    path: "/members/signup/info",
  },
  {
    name: "어드민(권한분리 예정)",
    path: "/admin/stores",
  },
] as const;

const HomeMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10">
      <Typography variant="h5">헤더 메뉴에 없는 개발중인 페이지입니다.</Typography>

      {navItems.map(({ name, path }) => (
        <Button
          key={name}
          variant="contained"
          className="!bg-primary-500"
          onClick={() => {
            navigate(path);
          }}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeMainPage;
