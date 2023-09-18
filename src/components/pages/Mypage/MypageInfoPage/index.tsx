import MypageInfoCard from "@/components/organisms/Mypage/MypageInfoCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
// import { $axios } from "@/lib/axios";
import { loginInfo } from "@/recoil";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

type TInfos = {
  name: string;
  phoneNumber: string;
  email: string;
};

const MypageInfoPage = () => {
  const [infos, setInfos] = useState<TInfos>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  // const setIsLogin = useSetRecoilState<boolean>(loginState);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);

  // const navigate = useNavigate();

  useEffect(() => {
    const getInfos = async () => {
      switch (loginInfoValue.state) {
        case "hasValue": {
          const data = {
            name: loginInfoValue.contents.name,
            phoneNumber: loginInfoValue.contents.phoneNumber,
            email: loginInfoValue.contents.email,
          };
          setInfos({ ...data });
          break;
        }
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          break;
      }
    };
    getInfos();
  }, [loginInfoValue.contents, loginInfoValue.state]);
  const handleDeleteUser = async () => {
    alert("회원탈퇴 로직 구현되었지만, 현재 탈퇴후 재가입시 문제 있어서 비활성화.");
    // try {
    //   await $axios.get("/users/loggedIn/umbrella", { withCredentials: true });
    //   alert("지금은 탈퇴가 불가능합니다. 대여중인 우산이 있습니다.");
    // } catch {
    //   await $axios
    //     .delete("/users/loggedIn", { withCredentials: true })
    //     .then(() => {
    //       setIsLogin(false);
    //       navigate("/");
    //       alert("회원탈퇴 완료했습니다!");
    //     })
    //     .catch(() => {
    //       alert("오류가 발생했습니다. 다시 시도해주세요.");
    //     });
    // }
  };
  return (
    <div className="flex justify-center w-[1280px] mt-24 px-40">
      <div className="flex flex-col w-full">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="flex">
          <div className="mr-32">
            <MypageLeftCard />
          </div>
          <MypageInfoCard
            name={infos.name}
            phoneNumber={infos.phoneNumber}
            email={infos.email}
            onClickButton={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};
export default MypageInfoPage;
