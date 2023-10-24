import { useLogout } from "@/hooks/queries/userQueries";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";
import { Link } from "react-router-dom";

const HeaderMyPage = () => {
  const { mutate } = useLogout();

  const onClickLogout = () => {
    mutate();
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 border-solid shadow-md w-134 h-110 justify-evenly rounded-8 border-1">
      <Link
        to={LAYOUT_ROUTES_URL.myPageRent.path()}
        className="flex items-center justify-center flex-1 w-full transition-all hover:bg-gray-200"
      >
        <div className="w-full text-center text-black text-semibold text-16 leading-24">
          마이페이지
        </div>
      </Link>
      <div className="w-full border-t border-gray-200"></div>
      <div
        className="flex items-center justify-center flex-1 transition-all text-semibold text-16 leading-24 text-red hover:bg-gray-200"
        onClick={onClickLogout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default HeaderMyPage;
