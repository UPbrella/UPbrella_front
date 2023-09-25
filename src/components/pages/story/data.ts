export const upbrellaHistories: THistorySteps[] = [
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
];

type THistorySteps = {
  year: number;
  works: { month: string; details: string[] }[];
};
