import {
  ADMIN_ROUTES_URL,
  BACKGROUND_IMAGE_ROUTES_URL,
  BASIC_ROUTES_URL,
  LAYOUT_ROUTES_URL,
} from "@/app/router/routes";
import { useGetUserStatus } from "@/entities/user/api/user.queries";
import { TUserRes } from "@/entities/user/model/types";
import Logo from "@/shared/assets/main_logo.svg";
import { FixWidthWrapper } from "@/shared/ui/FixWidthWrapper";
import HeaderMyPage from "@/widgets/header/ui/HeaderMyPage";
import MobileMenu from "@/widgets/header/ui/MobileMenu";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

type THeaderProps = {
  isLoading: boolean;
  userRes: TUserRes | null;
};

export const headerNavItems = [
  {
    nameKey: "common.nav.story",
    path: BASIC_ROUTES_URL.story.path(),
    isAdmin: false,
  },
  {
    nameKey: "common.nav.rentalLocation",
    path: LAYOUT_ROUTES_URL.rentalLocation.path(),
    isAdmin: false,
  },
  {
    nameKey: "common.nav.rentalOffice",
    path: LAYOUT_ROUTES_URL.rentalOffice.path(),
    isAdmin: false,
  },
  {
    nameKey: "common.nav.info",
    path: BASIC_ROUTES_URL.information.path(),
    isAdmin: false,
  },
  {
    nameKey: "common.nav.admin",
    path: ADMIN_ROUTES_URL.rent.path(),
    isAdmin: true,
  },
] as const;

export const HeaderContainer = () => {
  const { data: userRes, isLoading, isError } = useGetUserStatus();

  return (
    <header className="sticky top-0 z-50 bg-white xl:h-80">
      <FixWidthWrapper>
        {/* PC Header */}
        <DesktopHeader
          isLoading={isLoading}
          userRes={isError || !userRes ? null : userRes.data.data}
        />

        {/* Mobile, Tablet Header */}
        <MobileHeader
          isLoading={isLoading}
          userRes={isError || !userRes ? null : userRes.data.data}
        />
      </FixWidthWrapper>
    </header>
  );
};

const DesktopHeader = ({ isLoading, userRes }: THeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [infoBubbleOpen, setInfoBubbleOpen] = useState(false);

  return (
    <div className="hidden relative justify-between items-center py-8 w-full xl:flex">
      <Link to={"/"}>
        <img
          className="p-8 w-64 h-64"
          src={Logo}
          alt="Logo"
          onError={(e) => {
            e.currentTarget.src = Logo;
          }}
        />
      </Link>
      <div className="flex justify-between font-semibold text-gray-700 text-16 leading-24">
        {headerNavItems.map(({ nameKey, path, isAdmin }) => {
          // admin menu hide
          if (isAdmin) {
            if (!userRes || (userRes && !userRes.adminStatus)) return;
          }

          return (
            <NavLink
              key={nameKey}
              to={path}
              className={({ isActive }) => {
                let defaultClassName = "transition-all mr-32 p-8 flex items-center";
                if (isActive) {
                  defaultClassName +=
                    " text-primary-500 border-solid border-b-2 border-primary-500";
                }

                return defaultClassName;
              }}
            >
              {t(nameKey)}
            </NavLink>
          );
        })}

        {userRes ? (
          <div
            className="flex relative items-center cursor-pointer"
            onClick={() => setInfoBubbleOpen((prev) => !prev)}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
            <div className="ml-4">{t("common.nav.userName", { name: userRes.name })}</div>
            {infoBubbleOpen && (
              <div className="absolute right-0 top-11">
                <HeaderMyPage />
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div className="w-80"></div>
        ) : (
          <button
            onClick={() => navigate(BACKGROUND_IMAGE_ROUTES_URL.login.path())}
            className="gap-8 h-48 font-semibold text-white w-82 rounded-8 bg-primary-500 text-16 leading-24"
          >
            {t("common.nav.login")}
          </button>
        )}
      </div>
    </div>
  );
};

const MobileHeader = ({ userRes }: THeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDetailPage, setIsDetailPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const url = location.pathname;
    const pattern = /^\/rentalOffice\/\d+$/; // 정규식을 사용하여 "/rentalOffice/:id" 패턴 확인

    if (pattern.test(url)) {
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, [location]);

  return (
    <>
      <div className="flex relative justify-center items-center cursor-pointer xl:hidden">
        <div
          className="absolute left-0 cursor-pointer"
          onClick={() => {
            if (isDetailPage) {
              navigate(-1);
            } else {
              setMenuOpen(true);
            }
          }}
        >
          {isDetailPage ? (
            <ArrowBackIosNewSharpIcon style={{ width: "28px", height: "28px" }} />
          ) : (
            <MenuIcon style={{ width: "28px", height: "28px" }} />
          )}
        </div>
        <Link to={"/"} className="p-8">
          <img
            className="w-48 h-48"
            src={Logo}
            alt="Logo"
            onError={(e) => {
              e.currentTarget.src = Logo;
            }}
          />
        </Link>
      </div>

      {createPortal(
        <>
          {/* Drawer overlay */}
          <div
            className={`fixed inset-0 z-[9998] bg-black/40 xl:hidden transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className={`fixed inset-y-0 left-0 z-[9999] w-4/5 max-w-[360px] bg-white p-20 xl:hidden transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <MobileMenu userRes={userRes} setMenuOpen={setMenuOpen} />
          </div>
        </>,
        document.body
      )}
    </>
  );
};
