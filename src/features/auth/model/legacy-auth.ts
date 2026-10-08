// recoil-persist 기본 키. 값 예: {"loginState":true,"redirectUrl":"/rent/form/3"}
export const LEGACY_AUTH_KEY = "recoil-persist";

const LOGGED_OUT = { isLogin: false, redirectUrl: "/" };

export const readLegacyAuth = (raw: string | null) => {
  if (!raw) {
    return LOGGED_OUT;
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      isLogin: parsed.loginState === true,
      redirectUrl: typeof parsed.redirectUrl === "string" ? parsed.redirectUrl : "/",
    };
  } catch {
    return LOGGED_OUT;
  }
};
