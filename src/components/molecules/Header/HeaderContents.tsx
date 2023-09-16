import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HeaderMyPage from "@/components/atoms/Header/HeaderMyPage";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu";

export type HeaderContentsProps = {
  isLogin: boolean;
  name?: string;
};

const headerNavItems = [
  {
    name: "업브렐라 이야기",
    path: "/about",
  },
  {
    name: "대여소 위치",
    path: "/rentalLocation",
  },
  {
    name: "협업 지점 소개",
    path: "/rentalOffice",
  },
  {
    name: "이용안내",
    path: "/information",
  },
] as const;

const HeaderContents = ({ isLogin, name }: HeaderContentsProps) => {
  const navigate = useNavigate();
  const [infoBubbleOpen, setInfoBubbleOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMyPageOpen = () => {
    setInfoBubbleOpen(!infoBubbleOpen);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-40 my-8 relative lg:hidden">
        <Link to={"/"}>
          <img className="w-64 h-64 p-8" src={Logo} alt="Logo" />
        </Link>
        <div className="flex justify-between text-16 font-semibold leading-24 text-gray-700">
          {headerNavItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => {
                let defaultClassName = "transition-all mr-32 p-8";
                if (isActive) {
                  defaultClassName +=
                    " text-primary-500 border-solid border-b-2 border-primary-500";
                }

                return defaultClassName;
              }}
            >
              {name}
            </NavLink>
          ))}

          {isLogin ? (
            <div className="flex items-center cursor-pointer relative" onClick={handleMyPageOpen}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
              <div className="ml-4">{name}님</div>
              {infoBubbleOpen && (
                <div className="absolute top-11 right-0">
                  <HeaderMyPage />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-82 h-48 rounded-8 gap-8 bg-primary-500 font-semibold text-16 leading-24 text-white"
            >
              로그인
            </button>
          )}
        </div>
      </div>

      <div
        className={menuOpen ? "hidden" : "flex justify-center items-center mt-8 relative xl:hidden"}
      >
        <div className="absolute left-0 mt-18 sm:pl-20" onClick={handleMenuOpen}>
          <MenuIcon style={{ width: "28px", height: "28px" }} />
        </div>
        <Link to={"/"} className="mt-8">
          <img className="w-48 h-48" src={Logo} alt="Logo" />
        </Link>
      </div>
      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center bg-white p-20">
          <div className="xl:hidden lg:w-full lg:max-w-640 sm:w-full sm:max-w-360">
            <MobileMenu isLogin={isLogin} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderContents;
