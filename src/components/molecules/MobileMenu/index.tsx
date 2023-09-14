import { TMobileMenu } from "@/types/commonTypes";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export type TMenu = {
  isLogin: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<TMenu> = ({ isLogin, setMenuOpen }) => {
  const navigate = useNavigate();

  const headerNavItems: TMobileMenu[] = [
    { name: "업브렐라 이야기", path: "/" },
    { name: "대여소 위치", path: "/" },
    { name: "협업 지점 소개", path: "/" },
    { name: "이용안내", path: "/" },
  ];

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleNavToUrl = (url: string) => {
    setMenuOpen(false);
    navigate(url);
  };

  return (
    <div className="relative w-full">
      <div className="bg-white z-100">
        <div className="flex justify-between items-center py-16">
          <Link to={"/"}>
            <img className="w-32 h-32" src={Logo} alt="Logo" />
          </Link>
          <div onClick={handleMenuClose}>
            <CloseSharpIcon />
          </div>
        </div>

        <div className="flex flex-col py-20">
          {isLogin ? (
            <div className="flex justify-between mb-4">
              <div className="flex items-center mr-12 font-semibold text-20">
                <PersonOutlineIcon />
                <span className="ml-8">홍길동님</span>
              </div>
              <button
                className="flex items-center justify-center text-primary-500 bg-primary-200 rounded-99 pl-16 pr-6 py-8 text-14 font-semibold"
                onClick={() => handleNavToUrl("/mypage")}
              >
                마이페이지 <NavigateNextIcon fontSize="small" />
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="font-semibold text-20 text-gray-700 mb-16">
                업브렐라를 찾아주셔서 감사해요!
              </div>
              <button
                className="rounded-8 font-semibold w-full py-12 text-white bg-primary-500"
                onClick={() => handleNavToUrl("/login")}
              >
                로그인
              </button>
            </div>
          )}
          {headerNavItems.map(({ name, path }) => (
            <>
              <div className="bg-gray-200 w-full h-1 my-16"></div>
              <div>
                <NavLink
                  key={name}
                  to={path}
                  className="px-16 text-15 text-gray-700 hover:text-primary-500 font-semibold"
                >
                  {name}
                </NavLink>
              </div>
            </>
          ))}
          <div className="bg-gray-200 w-full h-1 my-16"></div>
          {isLogin && (
            <button className="flex mx-16 text-14 text-gray-500 font-semibold">로그아웃</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
