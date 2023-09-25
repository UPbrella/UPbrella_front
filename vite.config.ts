import { loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoKey: env.VITE_KAKAO_MAP_API_KEY,
            naverKey: env.VITE_NAVER_MAP_API_KEY,
          },
        },
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: "http://upbrella-dev.site:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
