import { useRegisterSW } from "virtual:pwa-register/react";

const PWAUpdatePrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
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
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {offlineReady ? (
              <p className="text-sm text-gray-700">
                앱이 오프라인에서 사용할 수 있도록 준비되었습니다!
              </p>
            ) : (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-900">새 버전이 있습니다</p>
                <p className="text-sm text-gray-600">업데이트하여 최신 기능을 사용하세요.</p>
              </div>
            )}
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

        {needRefresh && (
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
        )}

        {offlineReady && (
          <button
            onClick={close}
            className="mt-3 w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
