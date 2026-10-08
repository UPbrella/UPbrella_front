import "@/app/styles/index.css";
import "@/app/styles/fonts/font.css";
import "@/shared/lib/i18n";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastPosition, Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { isMobile } from "react-device-detect";
import { trackVisitOnce } from "@/shared/lib/analytics";
import { initSentry, sentryRootOptions } from "@/shared/lib/sentry";

const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Pretendard JP";
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard JP",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1440,
      xl: 1500,
    },
  },
});

// 배포로 이전 청크 해시가 사라지면 lazy import가 실패 → 새로고침으로 최신 index.html 로드
// 짧은 시간 내 재시도만 막는 루프 가드. 이후 배포가 또 발생해도 탭이 영구히 막히지 않도록
// "새로고침 여부" 대신 "새로고침 시각"을 저장한다.
const CHUNK_RELOAD_FLAG = "upbrella-chunk-reload";
const CHUNK_RELOAD_WINDOW_MS = 10_000;

window.addEventListener("vite:preloadError", (event) => {
  const lastReloadedAt = Number(sessionStorage.getItem(CHUNK_RELOAD_FLAG));
  const withinGuardWindow = Date.now() - lastReloadedAt < CHUNK_RELOAD_WINDOW_MS;

  if (withinGuardWindow) {
    return;
  }

  sessionStorage.setItem(CHUNK_RELOAD_FLAG, String(Date.now()));
  event.preventDefault();
  window.location.reload();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: "always",
      retryOnMount: false,
    },
  },
});

const toastProps = {
  position: (isMobile ? "bottom-center" : "top-center") as ToastPosition,
  options: {
    icon: null,
    style: {
      padding: "12px 16px",
      color: "#fff",
      background: "#111111",
      fontSize: "15px",
      fontWeight: "400",
      width: "320px",
    },
    duration: 3000,
    error: {
      style: {
        background: "#E05938",
      },
    },
  },
};

initSentry();
trackVisitOnce();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement, sentryRootOptions).render(
  <BrowserRouter>
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <Toaster position={toastProps.position} toastOptions={toastProps.options} />
            <Global styles={globalStyles} />
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  </BrowserRouter>
);
