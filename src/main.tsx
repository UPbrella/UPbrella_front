import "./index.css";
import "@/styles/fonts/font.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Global, css } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastPosition, Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { isMobile } from "react-device-detect";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
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
    </RecoilRoot>
  </BrowserRouter>
);
