import { TRentInfo } from "@/components/atoms/Mypage/MypageRentSection";
import { TRentContentInfo } from "@/components/molecules/Mypage/MypageRentList";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import MypageRentCard from "@/components/organisms/Mypage/MypageRentCard";
import { $axios } from "@/lib/axios";
import { loginInfo, rentHistories } from "@/recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

const MypageRentPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [totalRentNum, setTotalRentNum] = useState<number>(0);
  const [profileRentInfo, setProfileRentInfo] = useState<TRentInfo>({
    umbrellaUuid: 0,
    rentedAt: "",
    rentedStore: "",
    returnedDue: "",
    returnAt: "",
    returned: false,
    refunded: false,
  });
  const [rentList, setRentList] = useState<TRentContentInfo[]>([]);
  const umbrellaHistories = useRecoilValueLoadable(rentHistories);
  const umbrellaNum = useRecoilValueLoadable(rentHistories);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);

  const navigate = useNavigate();

  useEffect(() => {
    // left card의 유저 이름, 빌린 우산 수 가져오는 함수
    const getUserInfo = async () => {
      switch (loginInfoValue.state) {
        case "hasValue":
          setUserName(loginInfoValue.contents.name);
          break;
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/login");
          break;
      }
      switch (umbrellaNum.state) {
        case "hasValue":
          setTotalRentNum(umbrellaNum.contents.length);
          break;
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/login");
          break;
      }
    };
    // left card의 대여중인 우산 가져오는 함수
    const getCurrentUmbrellaId = async () => {
      switch (umbrellaHistories.state) {
        case "hasValue": {
          const res = await $axios.get("/users/loggedIn/umbrella", { withCredentials: true }); // 가장 최근 우산 id 조회
          // 전체 우산 중에서 가장 최근 우산 정보 filter
          const profileRent: TRentInfo = umbrellaHistories.contents.filter(
            (history: TRentInfo) => history.umbrellaUuid === res.data.data.uuid
          )[0];
          setProfileRentInfo({ ...profileRent });
          // TODO:지금은 여기에 포함되어있지만 반드시 분리해줘야한다.
          setRentList(umbrellaHistories.contents);
          break;
        }
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/login");
          break;
      }
    };
    getUserInfo();
    getCurrentUmbrellaId();
  }, [loginInfoValue, umbrellaNum, umbrellaHistories, navigate]);

  return (
    <div className="flex justify-center w-[1280px] mt-24 px-40">
      <div className="flex flex-col w-full">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="flex">
          <div className="mr-32">
            <MypageLeftCard
              userName={userName}
              totalRentNum={totalRentNum}
              profileInfo={profileRentInfo}
              isReturned={profileRentInfo.returned}
            />
          </div>
          <MypageRentCard rentList={rentList} />
        </div>
      </div>
    </div>
  );
};
export default MypageRentPage;
