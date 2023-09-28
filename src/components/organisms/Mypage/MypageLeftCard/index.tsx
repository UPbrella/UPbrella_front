import { TRentInfo } from "@/components/atoms/Mypage/MypageRentSection";
import ProfileName from "@/components/atoms/Mypage/ProfileName";
import ProfileRent from "@/components/atoms/Mypage/ProfileRent";
import MypageNav from "@/components/molecules/Mypage/MypageNav";
import { loginInfo, rentHistories } from "@/recoil";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";

const MypageLeftCard = () => {
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
  const [isReturned, setIsReturned] = useState<boolean>(true);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);
  const umbrellaHistories = useRecoilValueLoadable(rentHistories);
  const umbrellaNum = useRecoilValueLoadable(rentHistories);

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
          break;
      }
    };
    // left card의 대여중인 우산 가져오는 함수
    const getCurrentUmbrellaId = async () => {
      switch (umbrellaHistories.state) {
        case "hasValue": {
          const profileRent: TRentInfo = umbrellaHistories.contents.find(
            (history: TRentInfo) => !history.returned
          );
          if (profileRent) {
            setProfileRentInfo({ ...profileRent });
            setIsReturned(false);
          }
          break;
        }
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          break;
      }
    };
    getUserInfo();
    getCurrentUmbrellaId();
  }, [loginInfoValue, umbrellaNum, umbrellaHistories]);
  return (
    <section className="flex flex-col items-center w-320 lg:w-full">
      <section className="flex flex-col items-center w-full px-24 pt-32 pb-24 mb-24 border border-solid border-gray-200 rounded-12">
        <div className="mb-24 w-full">
          <ProfileName userName={userName} totalRentNum={totalRentNum} />
        </div>
        <ProfileRent profileInfo={profileRentInfo} isReturned={isReturned} />
      </section>
      <MypageNav />
    </section>
  );
};
export default MypageLeftCard;
