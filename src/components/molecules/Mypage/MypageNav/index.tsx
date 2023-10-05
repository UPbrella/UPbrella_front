import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const MypageNav = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const location = useLocation();
  const navList = [
    {
      name: "이용내역",
      path: "/members/mypage/rent",
    },
    {
      name: "환급계좌 등록/변경",
      path: "/members/mypage/account",
    },
    {
      name: "개인정보 조회",
      path: "/members/mypage/info",
    },
    {
      name: "문의하기",
      path: "/members/mypage/contact",
    },
  ] as const;
  const navRepresent = navList.find((nav) => nav.path === location.pathname);
  const navDropDown = navList.filter((nav) => {
    if (nav.path !== location.pathname) {
      return true;
    } else {
      return false;
    }
  });

  const onClickExpandButton = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="w-full">
      <section className="flex flex-col w-full lg:hidden">
        {navList.map((navInfo, index) => {
          let defaultClassName = "h-56 px-32 flex items-center rounded-8";
          if (index !== navList.length - 1) {
            defaultClassName += " mb-8";
          }
          return (
            <NavLink
              key={navInfo.name}
              to={navInfo.path}
              className={({ isActive }) => {
                if (isActive) {
                  defaultClassName += " bg-primary-300";
                } else {
                  defaultClassName += " bg-white";
                }
                return defaultClassName;
              }}
            >
              <p className="text-black text-18 font-semibold leading-24">{navInfo.name}</p>
            </NavLink>
          );
        })}
      </section>
      <section className="flex flex-col w-full xl:hidden">
        <div
          className="h-48 px-20 flex justify-between items-center rounded-8 bg-primary-300 mb-8"
          onClick={onClickExpandButton}
        >
          <p className="text-black text-18 font-semibold leading-24">{navRepresent?.name}</p>
          {isExpanded ? (
            <ExpandLess className="text-gray-700" />
          ) : (
            <ExpandMore className="text-gray-700" />
          )}
        </div>
        <div className="relative">
          {isExpanded ? (
            <div className="border border-solid border-gray-200 rounded-8 shadow-md absolute left-0 right-0">
              {navDropDown.map((navInfo) => {
                return (
                  <div>
                    {isExpanded ? (
                      <NavLink
                        key={navInfo.name}
                        to={navInfo.path}
                        className="w-full h-48 px-20 flex items-center bg-white rounded-8"
                      >
                        <p className="text-black text-18 font-semibold leading-24">
                          {navInfo.name}
                        </p>
                      </NavLink>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </section>
  );
};
export default MypageNav;
