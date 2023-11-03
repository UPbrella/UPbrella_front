import MypageModal from "@/components/molecules/Mypage/MypageModal";
import MypageModalNotAllowedChildren from "@/components/molecules/Mypage/MypageModalNotAllowedChildren";
import MypageModalTwoBtnChildren from "@/components/molecules/Mypage/MypageModalTwoBtnChildren";
import Footer from "@/components/organisms/Footer";
import MypageInfoCard from "@/components/organisms/Mypage/MypageInfoCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { $axios } from "@/lib/axios";
import { loginInfo, loginState } from "@/recoil";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { TInfos } from "@/types/mypage/MypageTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

const MypageInfoPage = () => {
  const [infos, setInfos] = useState<TInfos>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isDeleteAllowed, setIsDeleteAllowed] = useState<boolean>(true);
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
      navigate(BASIC_ROUTES_URL.root.path());
    }
  }, [isLogin, loginInfoValue.contents, loginInfoValue.state, navigate]);
  const handleDeleteUser = async () => {
    try {
      await $axios.get("/users/loggedIn/umbrella", { withCredentials: true });
      setIsDeleted(false);
      setIsDeleteAllowed(false);
    } catch {
      await axios
        .all([
          $axios.post("/users/logout", { withCredentials: true }),
          $axios.delete("/users/loggedIn", { withCredentials: true }),
        ])
        .then(() => {
          setIsDeleted(false);
          setIsLogin(false);
          navigate(BASIC_ROUTES_URL.root.path());
          location.reload();
          toast.success("회원탈퇴 완료했습니다!");
        })
        .catch(() => {
          setIsDeleted(false);
          toast.error("오류가 발생했습니다. 다시 시도해주세요.");
        });
    }
  };
  return (
    <div className="flex flex-col items-center justify-between flex-1">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="mb-32 font-semibold text-black text-24 leading-32">MYPAGE</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
            <MypageLeftCard />
          </div>
          <MypageInfoCard
            name={infos.name}
            phoneNumber={infos.phoneNumber}
            email={infos.email}
            onClickButton={() => {
              setIsDeleted(true);
            }}
          />
          {isDeleted ? (
            <MypageModal width="520">
              <MypageModalTwoBtnChildren
                label="정말 탈퇴하시겠어요?"
                content={[
                  "그동안 업브렐라를 이용해주셔서 감사합니다.",
                  "회원탈퇴를 하실 경우, 아래와 같이 회원정보가 처리됩니다.",
                  "탈퇴 신청 즉시 회원 탈퇴 처리되며, 회원 정보는 삭제 처리됩니다.",
                  "대여 중인 우산이 남아있는 경우, 즉시 탈퇴가 불가하니 문의 바랍니다.",
                ]}
                btnLabel="탈퇴"
                onClickCancel={() => {
                  setIsDeleted(false);
                }}
                onClickOkay={handleDeleteUser}
              />
            </MypageModal>
          ) : null}
          {isDeleteAllowed ? null : (
            <MypageModal width="320">
              <MypageModalNotAllowedChildren
                label="지금은 탈퇴가 불가합니다"
                notAllowedMessage="현재 대여 중인 우산이 있어 탈퇴가 불가하오니, 인스타그램 DM 문의 바랍니다."
                onClickBtn={() => {
                  setIsDeleteAllowed(true);
                }}
              />
            </MypageModal>
          )}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MypageInfoPage;
