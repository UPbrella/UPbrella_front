import { useRegisterSW } from "virtual:pwa-register/react";

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const isPWA = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorStandalone).standalone === true ||
    document.referrer.includes("android-app://")
  );
};

const PWAUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered() {
      // Service Worker registered successfully
    },
    onRegisterError() {
      // Service Worker registration error
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  // PWA 환경이 아니거나 업데이트가 필요없으면 표시하지 않음
  if (!isPWA() || !needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-2 text-sm font-medium text-gray-900">새 버전이 있습니다</p>
            <p className="text-sm text-gray-600">업데이트하여 최신 기능을 사용하세요.</p>
          </div>

          <button
            onClick={close}
            className="ml-4 text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            업데이트
          </button>
          <button
            onClick={close}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            나중에
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
