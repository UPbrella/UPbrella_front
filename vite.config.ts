import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

// index.html의 %VITE_*% 치환은 Vite 기본 기능이라 별도 플러그인이 필요 없다.
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  const base = env.VITE_BASE_PATH || "/";
  // CI/Vercel 빌드에서만 소스맵 업로드 (로컬 개발은 토큰 없음 → 플러그인 비활성)
  const hasSentryAuthToken = Boolean(process.env.SENTRY_AUTH_TOKEN);

  return {
    base,
    resolve: {
      // tsconfig paths(@/*)를 Vite 8 내장 기능으로 처리 (vite-tsconfig-paths 불필요, TS 7 peer 충돌 회피)
      tsconfigPaths: true,
    },
    plugins: [
      {
        name: "upbrella-optional-integrations",
        transformIndexHtml: {
          order: "pre" as const,
          handler(html: string) {
            const measurementId = env.VITE_GA_MEASUREMENT_ID ?? "G-EERPMHC989";
            const ga = /^G-[A-Z0-9]+$/.test(measurementId)
              ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
                 <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${measurementId}");</script>`
              : "";
            let result = html.replace(
              /<!-- Google tag[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/,
              ga
            );
            if (!env.VITE_NAVER_MAP_API_KEY)
              result = result.replace(
                /<script\b[^>]*src="[^"]*oapi\.map\.naver\.com[^"]*"[^>]*>\s*<\/script>/g,
                ""
              );
            if (!env.VITE_KAKAO_MAP_API_KEY)
              result = result.replace(
                /<script\b[^>]*src="[^"]*dapi\.kakao\.com[^"]*"[^>]*>\s*<\/script>/g,
                ""
              );
            return result;
          },
        },
      },
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["icons/*.png"],
        manifest: false, // Use existing manifest.json
        workbox: {
          // 이미지는 runtimeCaching(image-cache)이 방문 시 캐시 → precache는 앱 셸만. woff2만으로 충분(지원 브라우저 전체 커버)해 woff는 뺀다
          globPatterns: ["**/*.{js,css,html,ico,woff2}"],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.upbrella\.co\.kr\/.*/i,
              handler: "NetworkOnly",
            },
            {
              urlPattern: /^https:\/\/[^/]+\.map\.naver\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "naver-map-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
              },
            },
            {
              urlPattern: /^https:\/\/dapi\.kakao\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "kakao-map-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
              },
            },
            {
              urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
          ],
          navigateFallback: `${base}index.html`,
          // 확장자 있는 경로(og-image.png, robots.txt 등)는 SPA로 돌리지 않고 실제 파일을 받게 한다
          navigateFallbackDenylist: [/^\/api/, /^\/upbrella-dev\/api(?:\/|$)/, /\/[^/]+\.[^/]+$/],
        },
        devOptions: {
          enabled: false, // Enable in dev if you want to test SW
        },
      }),
      ...(hasSentryAuthToken
        ? [
            sentryVitePlugin({
              org: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
              sourcemaps: {
                filesToDeleteAfterUpload: ["./dist/**/*.map"],
              },
            }),
          ]
        : []),
    ],
    build: {
      sourcemap: hasSentryAuthToken ? "hidden" : undefined,
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "https://api.upbrella.co.kr",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // Vite 8 CJS interop 변경으로 @mui/icons-material 등 CJS default import가
    // 객체로 들어와 렌더가 깨짐 → 이전 동작 유지
    legacy: {
      inconsistentCjsInterop: true,
    },
  };
};
