// 어드민에서 만드는 QR 형식 (실물에 인쇄돼 있어 바꾸지 않는 외부 계약)
//   우산:   https://upbrella.co.kr/rent/form/3                → 대여
//   대여소: https://upbrella.co.kr/return/form?storeId=5      → 반납
//   보관함: 대여소 + &salt=…&signature=…                      → 반납 (잠금 해제용 값이라 쿼리 그대로 전달)
const RENT_PATH = /^\/rent\/form\/(\d+)$/;
const RETURN_PATH = "/return/form";
const QR_HOST = "upbrella.co.kr";

export type TScanned =
  | { kind: "rent"; umbrellaId: string; path: string }
  | { kind: "return"; path: string };

// currentHost: 로컬·터널에서 어드민이 만든 QR도 받기 위해 현재 페이지 호스트 허용
export const parseQr = (data: string, currentHost: string, base = "/"): TScanned | null => {
  try {
    const { hostname, pathname: originalPath, search, searchParams } = new URL(data);
    const prefix = base.replace(/\/$/, "");
    const pathname =
      prefix && originalPath.startsWith(`${prefix}/`)
        ? originalPath.slice(prefix.length)
        : originalPath;
    const isOurHost =
      hostname === QR_HOST || hostname.endsWith(`.${QR_HOST}`) || hostname === currentHost;

    if (!isOurHost) {
      return null;
    }

    const umbrellaId = pathname.match(RENT_PATH)?.[1];
    if (umbrellaId) {
      return { kind: "rent", umbrellaId, path: pathname };
    }

    if (pathname === RETURN_PATH && searchParams.get("storeId")) {
      return { kind: "return", path: `${RETURN_PATH}${search}` };
    }

    return null;
  } catch {
    return null;
  }
};
