import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLogout } from "@/hooks/queries/userQueries";
import { TUserRes } from "@/types/admin/userTypes";
import { Fragment } from "react";
import CardFooter from "@/components/organisms/CardFooter";
import { headerNavItems } from "@/components/organisms/Header/HeaderContainer";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";
import { BACKGROUND_IMAGE_ROUTES_URL } from "@/routes/backgroundImageRouter";

export type TMenu = {
  userRes: TUserRes | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<TMenu> = ({ userRes, setMenuOpen }) => {
  const navigate = useNavigate();
  const { mutate } = useLogout();

  const onClickLogout = () => {
    mutate();
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleNavToUrl = (url: string) => {
    setMenuOpen(false);
    navigate(url);
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full">
      <div className="bg-white z-100">
        <div className="flex items-center justify-between py-16">
          <Link to={"/"}>
            <img
              className="w-32 h-32"
              src={Logo}
              alt="Logo"
              onError={(e) => {
                e.currentTarget.src = Logo;
              }}
            />
          </Link>
          <div className="cursor-pointer" onClick={handleMenuClose}>
            <CloseSharpIcon />
          </div>
        </div>

        <div className="flex flex-col py-20">
          {userRes ? (
            <div className="flex justify-between mb-4">
              <div className="flex items-center mr-12 font-semibold text-20">
                <PersonOutlineIcon />
                <span className="ml-8">{userRes.name}</span>
              </div>
              <button
                className="flex items-center justify-center py-8 pl-16 pr-6 font-semibold transition-all text-primary-500 bg-primary-200 rounded-99 text-14"
                onClick={() => handleNavToUrl(LAYOUT_ROUTES_URL.myPageRent.path())}
              >
                마이페이지 <NavigateNextIcon fontSize="small" />
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="mb-16 font-semibold text-gray-700 text-20">
                업브렐라를 찾아주셔서 감사해요!
              </div>
              <button
                className="w-full py-12 font-semibold text-white rounded-8 bg-primary-500"
                onClick={() => handleNavToUrl(BACKGROUND_IMAGE_ROUTES_URL.login.path())}
              >
                로그인
              </button>
            </div>
          )}
          {headerNavItems.map(({ name, path, isAdmin }) => {
            // admin menu hide
            if (isAdmin) {
              if (!userRes || (userRes && !userRes.adminStatus)) return;
            }

            return (
              <Fragment key={name}>
                <div className="w-full h-1 my-16 bg-gray-200"></div>
                <div>
                  <NavLink
                    onClick={() => handleMenuClose()}
                    key={name}
                    to={path}
                    className="px-16 font-semibold text-gray-700 transition-all text-15 hover:text-primary-500"
                  >
                    {name}
                  </NavLink>
                </div>
              </Fragment>
            );
          })}
          <div className="w-full h-1 my-16 bg-gray-200"></div>
          {userRes && (
            <button
              className="flex mx-16 font-semibold transition-all text-14 hover:text-primary-500"
              onClick={onClickLogout}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
      <CardFooter />
    </div>
  );
};

export default MobileMenu;
