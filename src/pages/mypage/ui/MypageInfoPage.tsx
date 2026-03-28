import MypageModal from "@/pages/mypage/ui/MypageModal";
import MypageModalNotAllowedChildren from "@/pages/mypage/ui/MypageModalNotAllowedChildren";
import MypageModalTwoBtnChildren from "@/pages/mypage/ui/MypageModalTwoBtnChildren";
import MypageInfoCard from "@/pages/mypage/ui/MypageInfoCard";
import MypageLayout from "@/pages/mypage/ui/MypageLayout";
import { $axios } from "@/shared/api";
import { loginInfo, loginState } from "@/features/auth";
import { BASIC_ROUTES_URL } from "@/app/router/routes";
import { TInfos } from "@/entities/user/model/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useTranslation } from "react-i18next";

const MypageInfoPage = () => {
  const { t } = useTranslation();
  const [infos, setInfos] = useState<TInfos>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isDeleteAllowed, setIsDeleteAllowed] = useState<boolean>(true);
  const [, setIsLogin] = useRecoilState<boolean>(loginState);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const getInfos = async () => {
      switch (loginInfoValue.state) {
        case "hasValue": {
          const data = {
            name: loginInfoValue.contents.name,
            phoneNumber: loginInfoValue.contents.phoneNumber ?? "",
            email: loginInfoValue.contents.email,
          };
          setInfos({ ...data });
          break;
        }
        case "loading":
          return;
        case "hasError":
          toast.error(t("toast.error.sessionExpired"));
          navigate(BASIC_ROUTES_URL.root.path());
          return;
      }
    };
    getInfos();
  }, [loginInfoValue.contents, loginInfoValue.state, navigate, t]);
  const handleDeleteUser = async () => {
    try {
      await $axios.get("/users/loggedIn/umbrella", { withCredentials: true });
      setIsDeleted(false);
      setIsDeleteAllowed(false);
    } catch {
      try {
        await $axios.delete("/users/loggedIn", { withCredentials: true });
        await $axios.post("/users/logout", { withCredentials: true });
        setIsDeleted(false);
        setIsLogin(false);
        navigate(BASIC_ROUTES_URL.root.path());
        location.reload();
        toast.success(t("toast.success.withdrawComplete"));
      } catch {
        setIsDeleted(false);
        toast.error(t("toast.error.retryError"));
      }
    }
  };

  return (
    <MypageLayout
      renderChildren={() => (
        <>
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
                label={t("mypage.info.withdrawConfirm")}
                content={[
                  t("mypage.info.withdrawDesc1"),
                  t("mypage.info.withdrawDesc2"),
                  t("mypage.info.withdrawDesc3"),
                  t("mypage.info.withdrawDesc4"),
                ]}
                btnLabel={t("mypage.info.withdrawBtn")}
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
                label={t("mypage.info.withdrawNotAllowed")}
                notAllowedMessage={t("mypage.info.withdrawNotAllowedDesc")}
                onClickBtn={() => {
                  setIsDeleteAllowed(true);
                }}
              />
            </MypageModal>
          )}
        </>
      )}
    />
  );
};
export default MypageInfoPage;
