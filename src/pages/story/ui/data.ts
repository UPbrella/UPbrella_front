export const upbrellaHistories: THistorySteps[] = [
  {
    year: 2025,
    works: [
      {
        month: "03",
        details: [
          "개강 이벤트",
          "4차 우산 제작",
          "업브렐라 사업 소개 릴스 발행",
          "교외 협업 지점 확대 (트리클, 렛미얼론)",
          "협업 지점 소개 릴스 발행",
        ],
      },
      {
        month: "05",
        details: ["2025-1학기 스트리스부스 행사 참가", "[RC 교육원 협업] 폐우산 활용 활동 진행"],
      },
      { month: "06", details: ["환경 보호 릴스 발행"] },
    ],
  },
  {
    year: 2024,
    works: [
      {
        month: "03",
        details: [
          "2024 연세대학교 고등교육혁신원 워크스테이션 팀 선정",
          "각 지점별 3차 우산 배치",
          "개강 이벤트",
        ],
      },
      { month: "04", details: ["중간고사 이벤트", "송도 지점 우산 설치"] },
      {
        month: "05",
        details: [
          "[총동연 협업] 교내 우산 지점 확대 (학생회관, 대강당)",
          "교외 지점 철수 및 대체지점 설치",
          "교내 우산 지점 확대 (제1공학관)",
        ],
      },
      { month: "06", details: ["[UIC 협업] 학생회실 설치"] },
      {
        month: "07",
        details: ["[총동연 협업] 우산한입 공동발행", "여름방학 LEI 프로그램 진행 (8기)"],
      },
      { month: "09", details: ["크라우드펀딩 오프라인 행사", "사용자 만족도 조사 실행"] },
      { month: "10", details: ["2024-2학기 스트리트부스 리딩팀 선정"] },
      { month: "12", details: ["2024-2학기 IHEI FESTA 진행"] },
    ],
  },
  {
    year: 2023,
    works: [
      {
        month: "02",
        details: [
          "연세대학교 고등교육혁신원 워크스테이션 우수팀 선정",
          "신촌 버블티킹, 왓츠유얼컬러 지점 신설",
        ],
      },
      { month: "03", details: ["2023 연세대학교 고등교육혁신원 워크스테이션 팀 선정"] },
      { month: "04", details: ["WP커피, 아스터, 아지트커피 연대서문점 지점 신설"] },
    ],
  },
  {
    year: 2022,
    works: [
      { month: "02", details: ["연세대학교 고등교육혁신원 Peer Championship 수상"] },
      { month: "03", details: ["모티브 스터디카페 지점 신설"] },
      { month: "04", details: ["2022 연세대학교 고등교육혁신원 워크스테이션 팀 선정"] },
      { month: "06", details: ["연세대학교 중앙도서관 지점 신설"] },
      { month: "09", details: ["서울시 제로캠퍼스 동아리 선정"] },
      { month: "11", details: ["신촌 안다르커피, 엘피스카페 지점 신설"] },
    ],
  },
  {
    year: 2021,
    works: [
      { month: "04", details: ["2021 연세대학교 고등교육혁신원 워크스테이션 팀 선정"] },
      { month: "05", details: ["업사이클링 브랜드 큐클리프(CUECLYP)와 협업"] },
      { month: "06", details: ["2021 서대문구 그린프로젝트 공모전 당선"] },
      { month: "07", details: ["신촌 상점 5곳과 협약 체결, 베타 서비스 런칭"] },
      { month: "08", details: ["연세대학교 지점 확대"] },
      { month: "09", details: ["정식 서비스 런칭"] },
      { month: "11", details: ["서대문구 탄소중립 캠페인 '그린이음' 참여"] },
    ],
  },
];

type THistorySteps = {
  year: number;
  works: { month: string; details: string[] }[];
};
