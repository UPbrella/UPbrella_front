import { Link } from "react-router-dom";
import Logo from "@/assets/main_logo.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import HeaderMyPage from "@/components/atoms/Header/HeaderMyPage";

export type HeaderContentsProps = {
  isLogin?: boolean;
  name?: string;
};

const HeaderContents = ({ isLogin, name }: HeaderContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMyPageOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center mt-8 relative">
      <Link to={"/"}>
        <img className="w-64 h-64" src={Logo} alt="Logo" />
      </Link>
      <div className="flex justify-between text-16 font-semibold leading-24 text-gray-700">
        {["업브렐라 이야기", "대여소 위치", "협업 지점 소개", "이용안내"].map((page) => (
          // TODO 추후에 위에 4페이지 만들어 NavLink로 연결 (focus 폐기)
          <button
            className="mr-32 p-8 focus:text-primary-500 focus:border-solid focus:border-b-2 focus:border-primary-500"
            key={page}
          >
            {page}
          </button>
        ))}
        {isLogin ? (
          <div className="flex items-center cursor-pointer relative" onClick={handleMyPageOpen}>
            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
            <div className="ml-4">{name}님</div>
            {isOpen && (
              <div className="absolute top-11 right-0">
                <HeaderMyPage />
              </div>
            )}
          </div>
        ) : (
          <button className="w-82 h-48 rounded-8 gap-8 bg-primary-500 font-semibold text-16 leading-24 text-white">
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderContents;
