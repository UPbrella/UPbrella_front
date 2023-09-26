import MypageInfoCard from "@/components/organisms/Mypage/MypageInfoCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { $axios } from "@/lib/axios";
import { loginInfo, loginState } from "@/recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

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
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);

  const navigate = useNavigate();

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
    if (!isLogin) {
      toast.error(`로그인 세션이 만료되었습니다. 
      다시 로그인해주세요.`);
      navigate("/");
    }
  }, [isLogin, loginInfoValue.contents, loginInfoValue.state, navigate]);
  const handleDeleteUser = async () => {
    try {
      await $axios.get("/users/loggedIn/umbrella", { withCredentials: true });
      alert("지금은 탈퇴가 불가능합니다. 대여중인 우산이 있습니다.");
    } catch {
      await axios
        .all([
          $axios.post("/users/logout", { withCredentials: true }),
          $axios.delete("/users/loggedIn", { withCredentials: true }),
        ])
        .then(() => {
          setIsLogin(false);
          navigate("/");
          location.reload();
          alert("회원탈퇴 완료했습니다!");
        })
        .catch(() => {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        });
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
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
