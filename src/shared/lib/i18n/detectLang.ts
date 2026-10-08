// 검색 봇(Googlebot, bingbot, 네이버 Yeti, Daumoa 등)은 en-US로 렌더링하므로
// 브라우저 언어를 따르면 영어 제목이 색인됨 → 봇이면 ko 고정
const BOT_UA = /bot|crawler|spider|yeti|daum/i;

export const detectLang = (userAgent: string, language: string): "ko" | "en" => {
  if (BOT_UA.test(userAgent)) {
    return "ko";
  }

  return language.startsWith("en") ? "en" : "ko";
};
