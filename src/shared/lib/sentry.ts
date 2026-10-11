import * as Sentry from "@sentry/react";
import { getPlatform } from "@/shared/lib/platform";

// 트랜잭션 샘플링 비율 — 전체 트레이스 중 10%만 수집
const TRACES_SAMPLE_RATE = 0.1;

// DSN 없으면 로컬/dev 등 env var 설정 전까지 Sentry를 끈 상태로 둔다
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    ...(import.meta.env.VITE_SENTRY_RELEASE
      ? { release: import.meta.env.VITE_SENTRY_RELEASE }
      : {}),
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: TRACES_SAMPLE_RATE,
  });

  // 웹/iOS 앱/Android 앱별로 에러를 나눠 보기 위한 공통 태그
  Sentry.setTag("platform", getPlatform());
};

// 화면에서 잡은 에러를 태그와 함께 전송. Sentry 미초기화 시 no-op
export const reportError = (error: unknown, tags: Record<string, string>) => {
  Sentry.captureException(error, { tags });
};

// React 19 root 에러 훅 — Sentry 미초기화 시에도 안전한 no-op
export const sentryRootOptions = {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
};
