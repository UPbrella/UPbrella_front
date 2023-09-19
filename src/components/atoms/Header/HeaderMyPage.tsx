import { useLogout } from "@/hooks/queries/userQueries";
import { Link } from "react-router-dom";

const HeaderMyPage = () => {
  const { mutate } = useLogout();

  const onClickLogout = () => {
    mutate();
  };

  return (
    <div className="flex flex-col w-134 h-110 justify-evenly rounded-8 bg-white border border-solid border-1 border-gray-200 shadow-md">
      <Link
        to="/members/mypage/rent"
        className="w-full flex-1 flex justify-center items-center hover:bg-gray-200 transition-all"
      >
        <div className="text-semibold text-16 leading-24 text-black w-full text-center">
          마이페이지
        </div>
      </Link>
      <div className="w-full border-t border-gray-200"></div>
      <div
        className="text-semibold text-16 leading-24 text-red hover:bg-gray-200 transition-all flex-1 flex justify-center items-center"
        onClick={onClickLogout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default HeaderMyPage;
