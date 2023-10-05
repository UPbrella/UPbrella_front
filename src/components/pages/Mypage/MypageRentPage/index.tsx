import { TRentContentInfo } from "@/components/molecules/Mypage/MypageRentList";
import Footer from "@/components/organisms/Footer";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import MypageRentCard from "@/components/organisms/Mypage/MypageRentCard";
import { loginState, rentHistories } from "@/recoil";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

const MypageRentPage = () => {
  const [rentList, setRentList] = useState<TRentContentInfo[]>([]);
  const [isLogin] = useRecoilState<boolean>(loginState);
  const umbrellaHistories = useRecoilValueLoadable(rentHistories);

  const navigate = useNavigate();

  useEffect(() => {
    // rent list 가져오는 함수
    const getRentList = async () => {
      switch (umbrellaHistories.state) {
        case "hasValue": {
          setRentList(umbrellaHistories.contents);
          break;
        }
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          break;
      }
    };
    getRentList();
    if (!isLogin) {
      toast.error(`로그인 세션이 만료되었습니다. 
      다시 로그인해주세요.`);
      navigate("/");
    }
  }, [umbrellaHistories, navigate, isLogin]);

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
            <MypageLeftCard />
          </div>
          <MypageRentCard rentList={rentList} />
          {/*//TODO: 이부분의 components만 상황에 따라 바뀌도록 할 수 있으면 더 깔끔할텐데..? */}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MypageRentPage;
