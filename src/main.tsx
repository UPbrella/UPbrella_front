import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/styles/fonts/font.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Global, css } from "@emotion/react";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
