import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HeaderMyPage from "@/components/atoms/Header/HeaderMyPage";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import { ADMIN_ROUTES_URL } from "@/routes/adminRouter";
import { TUserRes } from "@/types/admin/userTypes";

export type HeaderContentsProps = {
  isLoading: boolean;
  userRes: TUserRes | null;
};

export const headerNavItems = [
  {
    name: "업브렐라 이야기",
    path: "/about",
    isAdmin: false,
  },
  {
    name: "대여소 위치",
    path: "/rentalLocation",
    isAdmin: false,
  },
  {
    name: "협업 지점 소개",
    path: "/rentalOffice",
    isAdmin: false,
  },
  {
    name: "이용안내",
    path: "/information",
    isAdmin: false,
  },
  {
    name: "어드민",
    path: ADMIN_ROUTES_URL.rent.path,
    isAdmin: true,
  },
  {
    name: "대여폼테스트(어드민)",
    path: "/rent/form/3",
    isAdmin: true,
  },
  {
    name: "반납폼테스트(어드민)",
    path: "/return/form?storeId=1",
    isAdmin: true,
  },
] as const;

const HeaderContents = ({ isLoading, userRes }: HeaderContentsProps) => {
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
      <div className="flex justify-between items-center w-full my-8 relative lg:hidden">
        <Link to={"/"}>
          <img className="w-64 h-64 p-8" src={Logo} alt="Logo" />
        </Link>
        <div className="flex justify-between text-16 font-semibold leading-24 text-gray-700">
          {headerNavItems.map(({ name, path, isAdmin }) => {
            // admin menu hide
            if (isAdmin) {
              if (!userRes || (userRes && !userRes.adminStatus)) return;
            }

            return (
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
            );
          })}

          {userRes ? (
            <div className="flex items-center cursor-pointer relative" onClick={handleMyPageOpen}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
              <div className="ml-4">{userRes.name}님</div>
              {infoBubbleOpen && (
                <div className="absolute top-11 right-0">
                  <HeaderMyPage />
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className="w-80"></div>
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
        <div className="absolute left-0 mt-18 cursor-pointer" onClick={handleMenuOpen}>
          <MenuIcon style={{ width: "28px", height: "28px" }} />
        </div>
        <Link to={"/"} className="mt-8">
          <img className="w-48 h-48" src={Logo} alt="Logo" />
        </Link>
      </div>
      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center bg-white p-20 xl:hidden">
          <div className="xl:hidden lg:w-full lg:max-w-640 sm:w-full sm:max-w-360">
            <MobileMenu userRes={userRes} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderContents;
