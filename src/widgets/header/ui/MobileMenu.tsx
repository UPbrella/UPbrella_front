import { BACKGROUND_IMAGE_ROUTES_URL, LAYOUT_ROUTES_URL } from "@/app/router/routes";
import CardFooter from "@/entities/store/ui/CardFooter";
import { useLogout } from "@/entities/user/api/user.queries";
import { TUserRes } from "@/entities/user/model/types";
import Logo from "@/shared/assets/main_logo.svg";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import { headerNavItems } from "@/widgets/header/ui/HeaderContainer";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";

type TMenu = {
  userRes: TUserRes | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<TMenu> = ({ userRes, setMenuOpen }) => {
  const { t } = useTranslation();
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
    <div className="flex relative flex-col justify-between w-full h-full">
      <div className="bg-white z-100">
        <div className="flex justify-between items-center py-16">
          <Link to={"/"}>
            <img
              className="p-2 w-32 h-32"
              src={Logo}
              alt="Logo"
              onError={(e) => {
                e.currentTarget.src = Logo;
              }}
            />
          </Link>
          <div className="flex gap-3 items-center">
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <div className="cursor-pointer" onClick={handleMenuClose}>
              <CloseSharpIcon />
            </div>
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
                className="flex justify-center items-center py-8 pr-6 pl-16 font-semibold transition-all text-primary-500 bg-primary-200 rounded-99 text-14"
                onClick={() => handleNavToUrl(LAYOUT_ROUTES_URL.myPageRent.path())}
              >
                {t("common.mobile.mypage")} <NavigateNextIcon fontSize="small" />
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="mb-16 font-semibold text-gray-700 text-20">
                {t("common.mobile.greeting")}
              </div>
              <button
                className="py-12 w-full font-semibold text-white rounded-8 bg-primary-500"
                onClick={() => handleNavToUrl(BACKGROUND_IMAGE_ROUTES_URL.login.path())}
              >
                {t("common.mobile.login")}
              </button>
            </div>
          )}
          {headerNavItems.map(({ nameKey, path, isAdmin }) => {
            // admin menu hide
            if (isAdmin) {
              if (!userRes || (userRes && !userRes.adminStatus)) return;
            }

            return (
              <Fragment key={nameKey}>
                <div className="my-16 w-full h-1 bg-gray-200"></div>
                <div>
                  <NavLink
                    onClick={() => handleMenuClose()}
                    key={nameKey}
                    to={path}
                    className="px-16 font-semibold text-gray-700 transition-all text-15 hover:text-primary-500"
                  >
                    {t(nameKey)}
                  </NavLink>
                </div>
              </Fragment>
            );
          })}
          <div className="my-16 w-full h-1 bg-gray-200"></div>
          {userRes && (
            <button
              className="flex mx-16 font-semibold transition-all text-14 hover:text-primary-500"
              onClick={onClickLogout}
            >
              {t("common.mobile.logout")}
            </button>
          )}
        </div>
      </div>
      <CardFooter />
    </div>
  );
};

export default MobileMenu;
