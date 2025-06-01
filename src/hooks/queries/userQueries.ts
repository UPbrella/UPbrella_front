import {
  deleteBlackUsers,
  deleteUsers,
  getBlackUsers,
  getUsers,
  patchAdminUsers,
} from "@/api/userApi";
import { TInputs } from "@/types/signup/SignupTypes";
import { $axios } from "@/lib/axios";
import { loginState, redirectUrl } from "@/recoil";
import { BACKGROUND_IMAGE_ROUTES_URL } from "@/routes/backgroundImageRouter";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { TUserRes } from "@/types/admin/userTypes";
import { TApiResponse, TCustomError } from "@/types/commonTypes";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getErrorMessage } from "@/utils/error";
import dayjs from "dayjs";

export const USER_QUERY_KEYS = {
  userStatus: () => ["userStatus"],
  users: () => ["users"],
  blackUsers: () => ["black-users"],
} as const;

//
// client
//
// 업브렐라 로그인
const useUpbrellaLogin = () => {
  const path = useRecoilValue(redirectUrl);
  const { refetch: getUserStatus } = useGetUserStatus();
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);

  return useMutation({
    mutationFn: async () => await $axios.post("/users/login"),
    onSuccess: () => {
      // 유저 정보 요청
      getUserStatus().then((e) => {
        if (e.data?.status === 200) {
          navigate(path);
          setIsLogin(true);
          return;
        }

        navigate(BACKGROUND_IMAGE_ROUTES_URL.login.path());
        toast.error("회원 정보를 가져오지 못했습니다.");
      });
    },
    onError: (err: TCustomError) => {
      if (err.response?.data.code === 400) {
        // signup
        navigate(BACKGROUND_IMAGE_ROUTES_URL.signup.path());
        return;
      }

      toast.error("잘못된 요청입니다. 다시 로그인 해주세요.");
      navigate(BACKGROUND_IMAGE_ROUTES_URL.login.path());
      setIsLogin(false);

      return;
    },
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const { mutate: upbrellaLogin } = useUpbrellaLogin();
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);

  return useMutation({
    mutationFn: async () => await $axios.post("/users/oauth/login", { code }),
    onSuccess: () => {
      // 성공 시, 업브렐라 로그인
      upbrellaLogin();
    },
    onError: () => {
      toast.error("카카오 계정을 확인해주세요.");
      navigate(BACKGROUND_IMAGE_ROUTES_URL.login.path());
      setIsLogin(false);
    },
  });
};

// 회원가입
export const useUpbrellaSignUp = () => {
  const path = useRecoilValue(redirectUrl);
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inputs: TInputs) => await $axios.post("/users/join", { ...inputs }),
    onSuccess: () => {
      setIsLogin(true);
      navigate(path);
      toast.success("회원가입이 완료되었습니다.");
      queryClient.invalidateQueries(USER_QUERY_KEYS.userStatus());
      return;
    },
    onError: (err: TCustomError) => {
      toast.error(getErrorMessage(err));
      setIsLogin(false);
      return;
    },
  });
};

// 유저 정보 확인
export const useGetUserStatus = () => {
  const setIsLogin = useSetRecoilState(loginState);

  return useQuery({
    queryKey: USER_QUERY_KEYS.userStatus(),
    queryFn: async () => await $axios.get<TApiResponse<TUserRes>>("/users/loggedIn"),
    retry: 0,
    keepPreviousData: true,
    onError: () => {
      setIsLogin(false);
    },
  });
};

// 로그아웃
export const useLogout = () => {
  const setRedirectUrl = useSetRecoilState(redirectUrl);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await $axios.post("/users/logout"),
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
      queryClient.invalidateQueries([...USER_QUERY_KEYS.userStatus()]);
      navigate(BASIC_ROUTES_URL.root.path());
      setRedirectUrl("/");
    },
    onError: () => {
      toast.error("서버 에러입니다.");
    },
  });
};

//
// admin
//
export const useGetUsers = () => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.users()],
    queryFn: () => getUsers(),
    select: (res) =>
      res.data.users.map((data) => ({
        ...data,
        createdAt: data.createdAt ? dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss") : "-",
      })),
  });
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => deleteUsers(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEYS.users());
      toast.success("블랙리스트로 등록되었습니다.");
    },
  });
};

export const useGetBlackUsers = () => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.blackUsers()],
    queryFn: () => getBlackUsers(),
    select: (res) => res.data.blackList,
  });
};

export const useDeleteBlackUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blackUserId: number) => deleteBlackUsers(blackUserId),
    onSuccess: () => {
      queryClient.invalidateQueries([...USER_QUERY_KEYS.blackUsers()]);
      toast.success("탈퇴되었습니다.");
    },
  });
};

export const usePatchAdminUsers = () => {
  return useMutation({
    mutationFn: (userId: number) => patchAdminUsers(userId),
    onSuccess: () => {
      toast.success("변경되었습니다.");
    },
  });
};
