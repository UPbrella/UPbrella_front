import { TRentContentInfo } from "@/components/molecules/Mypage/MypageRentList";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import MypageRentCard from "@/components/organisms/Mypage/MypageRentCard";
import { rentHistories } from "@/recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

const MypageRentPage = () => {
  const [rentList, setRentList] = useState<TRentContentInfo[]>([]);
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
  }, [umbrellaHistories, navigate]);

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="xl:flex ">
          <div className="xl:mr-32">
            <MypageLeftCard />
          </div>
          <MypageRentCard rentList={rentList} />
          {/*//TODO: 이부분의 components만 상황에 따라 바뀌도록 할 수 있으면 더 깔끔할텐데..? */}
        </div>
      </div>
    </div>
  );
};
export default MypageRentPage;
