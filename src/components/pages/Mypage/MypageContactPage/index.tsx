import Footer from "@/components/organisms/Footer";
import MypageContactCard from "@/components/organisms/Mypage/MypageContactCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { loginState } from "@/recoil";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const MypageContactPage = () => {
  const [isLogin] = useRecoilState<boolean>(loginState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      toast.error(`로그인 세션이 만료되었습니다. 
      다시 로그인해주세요.`);
      navigate(BASIC_ROUTES_URL.root.path());
    }
  }, [isLogin, navigate]);

  return (
    <div className="flex flex-col items-center justify-between flex-1">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="mb-32 font-semibold text-black text-24 leading-32">MYPAGE</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
            <MypageLeftCard />
          </div>
          <MypageContactCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MypageContactPage;
