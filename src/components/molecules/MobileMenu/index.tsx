import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { headerNavItems } from "@/components/molecules/Header/HeaderContents";
import { useLogout } from "@/hooks/queries/userQueries";
import { TUserRes } from "@/types/admin/userTypes";
import { Fragment } from "react";
import CardFooter from "@/components/organisms/CardFooter";

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
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="bg-white z-100">
        <div className="flex justify-between items-center py-16">
          <Link to={"/"}>
            <img className="w-32 h-32" src={Logo} alt="Logo" />
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
                className="flex items-center justify-center text-primary-500  transition-all bg-primary-200 rounded-99 pl-16 pr-6 py-8 text-14 font-semibold"
                onClick={() => handleNavToUrl("/members/mypage/rent")}
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
          {headerNavItems.map(({ name, path, isAdmin }) => {
            // admin menu hide
            if (isAdmin) {
              if (!userRes || (userRes && !userRes.adminStatus)) return;
            }

            return (
              <Fragment key={name}>
                <div className="bg-gray-200 w-full h-1 my-16"></div>
                <div>
                  <NavLink
                    onClick={() => handleMenuClose()}
                    key={name}
                    to={path}
                    className="px-16 text-15 text-gray-700 hover:text-primary-500  transition-all font-semibold"
                  >
                    {name}
                  </NavLink>
                </div>
              </Fragment>
            );
          })}
          <div className="bg-gray-200 w-full h-1 my-16"></div>
          {userRes && (
            <button
              className="flex mx-16 text-14 font-semibold hover:text-primary-500  transition-all"
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
