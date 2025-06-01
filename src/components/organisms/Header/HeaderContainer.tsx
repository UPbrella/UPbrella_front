import { useState, useEffect } from "react";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { useGetUserStatus } from "@/hooks/queries/userQueries";
import { TUserRes } from "@/types/admin/userTypes";
import { ADMIN_ROUTES_URL } from "@/routes/adminRouter";
import Logo from "@/assets/main_logo.svg";
import HeaderMyPage from "@/components/atoms/Header/HeaderMyPage";
import MobileMenu from "@/components/molecules/MobileMenu";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";
import { BACKGROUND_IMAGE_ROUTES_URL } from "@/routes/backgroundImageRouter";
import { FixWidthWrapper } from "@/components/pages/story/UpbrellaStoryPage";

type THeaderProps = {
  isLoading: boolean;
  userRes: TUserRes | null;
};

export const headerNavItems = [
  {
    name: "업브렐라 이야기",
    path: BASIC_ROUTES_URL.story.path(),
    isAdmin: false,
  },
  {
    name: "대여소 위치",
    path: LAYOUT_ROUTES_URL.rentalLocation.path(),
    isAdmin: false,
  },
  {
    name: "협업 지점 소개",
    path: LAYOUT_ROUTES_URL.rentalOffice.path(),
    isAdmin: false,
  },
  {
    name: "이용안내",
    path: BASIC_ROUTES_URL.information.path(),
    isAdmin: false,
  },
  {
    name: "어드민",
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
  const navigate = useNavigate();
  const [infoBubbleOpen, setInfoBubbleOpen] = useState(false);

  return (
    <div className="relative items-center justify-between hidden w-full py-8 xl:flex">
      <Link to={"/"}>
        <img
          className="w-64 h-64 p-8"
          src={Logo}
          alt="Logo"
          onError={(e) => {
            e.currentTarget.src = Logo;
          }}
        />
      </Link>
      <div className="flex justify-between font-semibold text-gray-700 text-16 leading-24">
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
                let defaultClassName = "transition-all mr-32 p-8 flex items-center";
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
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setInfoBubbleOpen((prev) => !prev)}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
            <div className="ml-4">{userRes.name}님</div>
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
            className="h-48 gap-8 font-semibold text-white w-82 rounded-8 bg-primary-500 text-16 leading-24"
          >
            로그인
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
      <div
        className={
          menuOpen ? "hidden" : "flex justify-center items-center cursor-pointer relative xl:hidden"
        }
      >
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

      {/* openMenu */}
      {menuOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center p-20 bg-white xl:hidden">
          <div className="xl:hidden smMaxLg:w-full smMaxLg:max-w-640">
            <MobileMenu userRes={userRes} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      )}
    </>
  );
};
