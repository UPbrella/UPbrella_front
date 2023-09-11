import { ADMIN_ROUTES_URL } from "@/routes/adminRouter";
import { Typography } from "@mui/material";
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
    path: ADMIN_ROUTES_URL.rent.path,
  },
  {
    name: "마이페이지",
    path: "/members/mypage/rent",
  },
] as const;

const HomeMainPage = () => {
  const navigate = useNavigate();

  // mui component의 default z-index에 의한 모바일 메뉴 요소 겹침문제로 인해 mui 대신 기본 버튼을 썼습니다
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10">
      <Typography variant="h5">헤더 메뉴에 없는 개발중인 페이지입니다.</Typography>

      {navItems.map(({ name, path }) => (
        <button
          key={name}
          className="bg-primary-500 text-white rounded-10 px-10 py-10 shadow-md"
          onClick={() => {
            navigate(path);
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default HomeMainPage;
