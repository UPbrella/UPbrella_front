import errorpage_img from "@/assets/errorpage_img.png";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import { useNavigate } from "react-router-dom";

export type TErrorComponent = {
  error: string;
  subError: string;
};

const ErrorComponent = ({ error, subError }: TErrorComponent) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <HeaderContainer />
      <div className="h-4/5 flex flex-col justify-center items-center px-20">
        <img src={errorpage_img} className="w-196 h-160" />
        <div className="text-18 font-semibold mt-16">{error}</div>
        <div className="text-gray-600 mt-8">{subError}</div>
        <button
          className="px-32 py-16 bg-primary-200 text-primary-500 text-18 font-semibold rounded-8 mt-32"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
