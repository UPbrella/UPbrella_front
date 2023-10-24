import errorpage_img from "@/assets/errorpage_img.png";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { useNavigate } from "react-router-dom";

export type TErrorComponent = {
  error: string;
  subError: string;
};

const ErrorComponent = ({ error, subError }: TErrorComponent) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <HeaderContainer />
      <div className="flex flex-col items-center justify-center px-20 h-4/5">
        <img src={errorpage_img} className="w-196 h-160" />
        <div className="mt-16 font-semibold text-18">{error}</div>
        <div className="mt-8 text-gray-600">{subError}</div>
        <button
          className="px-32 py-16 mt-32 font-semibold bg-primary-200 text-primary-500 text-18 rounded-8"
          onClick={() => navigate(BASIC_ROUTES_URL.root.path())}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
