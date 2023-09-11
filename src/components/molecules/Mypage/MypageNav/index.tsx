import { NavLink } from "react-router-dom";

const MypageNav = () => {
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

  return (
    <section className="flex flex-col w-full">
      {navList.map((navInfo, index) => {
        if (index === navList.length - 1) {
          return (
            <NavLink
              key={navInfo.name}
              to={navInfo.path}
              className={({ isActive }) => {
                let defaultClassName = "h-56 px-32 flex items-center rounded-8";
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
        }
        return (
          <NavLink
            key={navInfo.name}
            to={navInfo.path}
            className={({ isActive }) => {
              let defaultClassName = "h-56 px-32 flex items-center rounded-8 mb-8";
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
  );
};
export default MypageNav;
