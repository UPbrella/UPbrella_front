import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/styles/fonts/font.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Global, css } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <HelmetProvider>
              <Toaster
                position="top-center"
                toastOptions={{
                  style: { padding: "16px", color: "#fff", background: "#5DCF17" },
                  duration: 3000,
                  error: {
                    style: {
                      background: "#FF513E",
                    },
                  },
                }}
              />
              <Global styles={globalStyles} />
              <App />
            </HelmetProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>
);
