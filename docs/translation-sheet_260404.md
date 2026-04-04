# UPbrella 다국어 번역 시트

## 사용 가이드

### 이 문서는 무엇인가요?

UPbrella 서비스에서 사용되는 모든 한국어 UI 텍스트를 정리한 번역 핸드오프 문서입니다.
기획자/번역자가 **English** 컬럼을 채워주시면, 개발자가 이를 코드에 적용합니다.

### 컬럼 설명

| 컬럼        | 설명                                                                        |
| ----------- | --------------------------------------------------------------------------- |
| **키**      | 개발자용 식별자. 기획자는 무시해도 됩니다.                                  |
| **한국어**  | 현재 서비스에 표시되는 텍스트                                               |
| **English** | 번역자가 채울 영어 번역                                                     |
| **위치**    | 해당 텍스트가 화면 어디에 표시되는지                                        |
| **유형**    | 텍스트의 종류 (버튼, 제목, 라벨, 알림, 플레이스홀더, 에러 등)               |
| **변수**    | `{중괄호}` 안의 값은 동적으로 바뀌는 값입니다. 번역 시 그대로 유지해주세요. |
| **비고**    | 추가 맥락이나 주의사항                                                      |

### 변수 표기법

- `{{name}}` → 사용자 이름 (예: 홍길동)
- `{{number}}` → 우산 번호 (예: 42)
- `{{storeName}}` → 협업 지점 이름 (예: WP커피)
- `{{count}}` → 숫자 (예: 5)
- `{{maxCharLimit}}` → 최대 글자수 (예: 400)
- `{{day}}` → 일수 (예: 14)

### 번역 시 주의사항

1. `{변수}`는 반드시 그대로 유지해주세요
2. **버튼** 텍스트는 가능한 짧게 (영어 기준 15자 이내 권장)
3. **제목**은 간결하고 명확하게
4. **안내 문구**는 자연스러운 영어 표현으로
5. UPbrella는 브랜드명이므로 번역하지 않습니다

---

## 1. 공통 UI (common)

> 모든 페이지에 공통으로 표시되는 요소: 상단 네비게이션, 하단 푸터, 공통 버튼, 에러 화면, PWA 배너

### 네비게이션 (헤더)

| 키                          | 한국어          | English           | 위치                        | 유형 | 변수                     | 비고 |
| --------------------------- | --------------- | ----------------- | --------------------------- | ---- | ------------------------ | ---- |
| `common.nav.story`          | 업브렐라 이야기 | UPbrella Story    | 상단 메뉴바                 | 네비 |                          |      |
| `common.nav.rentalLocation` | 대여소 위치     | Rental Locations  | 상단 메뉴바                 | 네비 |                          |      |
| `common.nav.rentalOffice`   | 협업 지점 소개  | Partner Locations | 상단 메뉴바                 | 네비 |                          |      |
| `common.nav.info`           | 이용안내        | Service Guide     | 상단 메뉴바                 | 네비 |                          |      |
| `common.nav.admin`          | 어드민          | Admin             | 상단 메뉴바 (관리자만 표시) | 네비 |                          |      |
| `common.nav.login`          | 로그인          | Login             | 상단 우측 (비로그인 시)     | 버튼 |                          |      |
| `common.nav.userName`       | {{name}}님      | {{name}}          | 상단 우측 (로그인 시)       | 라벨 | `{{name}}` = 사용자 이름 |      |
| `common.nav.mypage`         | 마이페이지      | My Page           | 상단 드롭다운 메뉴          | 링크 |                          |      |
| `common.nav.logout`         | 로그아웃        | Logout            | 상단 드롭다운 메뉴          | 링크 |                          |      |

### 모바일 메뉴

| 키                       | 한국어                          | English              | 위치                           | 유형   | 변수 | 비고 |
| ------------------------ | ------------------------------- | -------------------- | ------------------------------ | ------ | ---- | ---- |
| `common.mobile.greeting` | 업브렐라를 찾아주셔서 감사해요! | Welcome to UPbrella! | 모바일 메뉴 상단 (비로그인 시) | 인사말 |      |      |
| `common.mobile.mypage`   | 마이페이지                      | My Page              | 모바일 메뉴 (로그인 시)        | 버튼   |      |      |
| `common.mobile.login`    | 로그인                          | Login                | 모바일 메뉴 (비로그인 시)      | 버튼   |      |      |
| `common.mobile.logout`   | 로그아웃                        | Logout               | 모바일 메뉴 하단 (로그인 시)   | 버튼   |      |      |

### 푸터

| 키                      | 한국어           | English          | 위치      | 유형 | 변수 | 비고 |
| ----------------------- | ---------------- | ---------------- | --------- | ---- | ---- | ---- |
| `common.footer.tos`     | 이용약관         | Terms of Service | 하단 푸터 | 링크 |      |      |
| `common.footer.privacy` | 개인정보처리방침 | Privacy Policy   | 하단 푸터 | 링크 |      |      |

### 에러 / 빈 상태

| 키                          | 한국어                                                 | English                                               | 위치               | 유형 | 변수 | 비고                                                                                               |
| --------------------------- | ------------------------------------------------------ | ----------------------------------------------------- | ------------------ | ---- | ---- | -------------------------------------------------------------------------------------------------- |
| `common.error.pageNotFound` | 죄송합니다. 페이지를 찾을 수 없어요:(                  | Sorry, page not found :(                              | 에러 화면          | 제목 |      | ForbiddenPage, 대여/반납 에러에서 사용. **404 NotFound에서는 미사용** (별도 제목 없이 설명만 표시) |
| `common.error.notFoundDesc` | 접근할 수 없는 페이지거나, 아직 개발중인 페이지입니다. | This page is inaccessible or still under development. | 404 페이지         | 설명 |      |                                                                                                    |
| `common.error.forbidden`    | 접근 권한이 없습니다.                                  | Access denied.                                        | 접근 금지 페이지   | 설명 |      |                                                                                                    |
| `common.error.goHome`       | 홈으로 돌아가기                                        | Back to Home                                          | 에러 화면          | 버튼 |      |                                                                                                    |
| `common.error.goMain`       | 메인 페이지로 돌아가기                                 | Back to Main                                          | 404 페이지         | 버튼 |      |                                                                                                    |
| `common.error.defaultApi`   | 잘못된 요청이거나 서버 오류입니다.                     | Invalid request or server error.                      | 전체 (API 에러 시) | 알림 |      |                                                                                                    |

### PWA 업데이트 배너

| 키                      | 한국어                               | English                            | 위치           | 유형       | 변수 | 비고 |
| ----------------------- | ------------------------------------ | ---------------------------------- | -------------- | ---------- | ---- | ---- |
| `common.pwa.newVersion` | 새 버전이 있습니다                   | New Version Available              | 화면 하단 배너 | 제목       |      |      |
| `common.pwa.updateDesc` | 업데이트하여 최신 기능을 사용하세요. | Update to use the latest features. | 화면 하단 배너 | 설명       |      |      |
| `common.pwa.update`     | 업데이트                             | Update                             | 화면 하단 배너 | 버튼       |      |      |
| `common.pwa.later`      | 나중에                               | Later                              | 화면 하단 배너 | 버튼       |      |      |
| `common.pwa.close`      | 닫기                                 | Close                              | 화면 하단 배너 | aria-label |      |      |

### 오프라인 화면

| 키                     | 한국어                                      | English                                      | 위치                 | 유형 | 변수 | 비고 |
| ---------------------- | ------------------------------------------- | -------------------------------------------- | -------------------- | ---- | ---- | ---- |
| `common.offline.title` | 인터넷 연결이 끊어졌습니다                  | No Internet Connection                       | 오프라인 전용 페이지 | 제목 |      |      |
| `common.offline.desc`  | 네트워크 연결을 확인하고 다시 시도해주세요. | Check your network connection and try again. | 오프라인 전용 페이지 | 설명 |      |      |
| `common.offline.retry` | 다시 시도                                   | Retry                                        | 오프라인 전용 페이지 | 버튼 |      |      |

### 공통 버튼 / 라벨

| 키                      | 한국어 | English    | 위치                    | 유형 | 변수 | 비고                |
| ----------------------- | ------ | ---------- | ----------------------- | ---- | ---- | ------------------- |
| `common.btn.confirm`    | 확인   | Confirm    | 여러 모달에서 공통 사용 | 버튼 |      |                     |
| `common.btn.cancel`     | 취소   | Cancel     | 여러 모달에서 공통 사용 | 버튼 |      |                     |
| `common.label.optional` | (선택) | (Optional) | 폼 필드 옆              | 라벨 |      | 선택 입력 항목 표시 |

---

## 2. 홈 / 업브렐라 스토리 (story)

> 서비스 소개 랜딩 페이지 (URL: `/`, `/about`)

### 섹션 1: 인트로

| 키                   | 한국어                     | English                 | 위치               | 유형 | 변수 | 비고 |
| -------------------- | -------------------------- | ----------------------- | ------------------ | ---- | ---- | ---- |
| `story.s1.line1`     | 갑작스럽게 내리는 비에     | Have you ever bought    | 메인 히어로        | 본문 |      |      |
| `story.s1.highlight` | 비닐 우산                  | a plastic umbrella      | 메인 히어로 (강조) | 본문 |      |      |
| `story.s1.line2`     | 을 구매하셨던 적이 있나요? | because of sudden rain? | 메인 히어로        | 본문 |      |      |

### 섹션 2: 환경 문제

| 키                     | 한국어                                      | English                                         | 위치             | 유형 | 변수 | 비고 |
| ---------------------- | ------------------------------------------- | ----------------------------------------------- | ---------------- | ---- | ---- | ---- |
| `story.s2.line1`       | 쉽게 판매되고 쉽게 망가지는                 | Cheap plastic umbrellas                         | 소개 영역        | 본문 |      |      |
| `story.s2.highlight1`  | 비닐 우산은                                 | are mostly landfilled                           | 소개 영역 (강조) | 본문 |      |      |
| `story.s2.line2`       | 대부분 매립·소각돼                          | or incinerated,                                 | 소개 영역        | 본문 |      |      |
| `story.s2.highlight2`  | 온실가스                                    | releasing greenhouse                            | 소개 영역 (강조) | 본문 |      |      |
| `story.s2.line3`       | 를 발생시켜요.                              | gases.                                          | 소개 영역        | 본문 |      |      |
| `story.s2.card1.title` | 국내 연간 우산 판매량                       | Annual Umbrella Sales in Korea                  | 통계 카드        | 제목 |      |      |
| `story.s2.card1.value` | 약 5,000만 개                               | approx. 50 million                              | 통계 카드        | 수치 |      |      |
| `story.s2.card2.title` | 서울시 1개 구 기준 1주간 버려지는 우산의 양 | Umbrellas Discarded per Week (1 Seoul District) | 통계 카드        | 제목 |      |      |
| `story.s2.card2.value` | 약 1톤                                      | approx. 1 ton                                   | 통계 카드        | 수치 |      |      |

### 섹션 3: 환경 임팩트

| 키                | 한국어                                                    | English                                                           | 위치   | 유형       | 변수 | 비고                    |
| ----------------- | --------------------------------------------------------- | ----------------------------------------------------------------- | ------ | ---------- | ---- | ----------------------- |
| `story.s3.header` | 환경적 임팩트 창출                                        | Creating Positive Environmental Impact                            | 소제목 | 제목       |      |                         |
| `story.s3.line1`  | 업브렐라는 The Better Choice,                             | UPbrella is The Better Choice,                                    | 본문   | 설명       |      |                         |
| `story.s3.line2`  | 더 나은 선택을 지향합니다.                                | committed to a better alternative.                                | 본문   | 설명       |      |                         |
| `story.s3.line3`  | 업브렐라 이용으로 비닐우산 1개를 구매하지 않음으로써,     | Every time you use UPbrella instead of buying a plastic umbrella, | 본문   | 설명       |      |                         |
| `story.s3.line4`  | 우리는 비닐우산이 썩는데 걸리는 100년을 줄일 수 있습니다. | we shorten the 100-year decomposition cycle of plastic umbrellas. | 본문   | 설명       |      |                         |
| `story.s3.line5`  | 비가 오는 날, 누구나 쉽게 할 수 있는 작은 행동이 모여     | On rainy days, small actions that anyone can take                 | 본문   | 설명       |      |                         |
| `story.s3.line6`  | 더 나은 세상을 만들 수 있다고 여깁니다.                   | add up to make a better world.                                    | 본문   | 설명       |      |                         |
| `story.s3.imgAlt` | 업브렐라 이미지                                           |                                                                   | 본문   | 이미지 alt |      | 환경 임팩트 섹션 이미지 |

### 섹션 4: 지역 공동체

| 키                | 한국어                                              | English                                                                               | 위치   | 유형       | 변수                      | 비고                                            |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ | ---------- | ------------------------- | ----------------------------------------------- |
| `story.s4.header` | 지역 공동체 의식 강화                               | Strengthening Community Bonds                                                         | 소제목 | 제목       |                           |                                                 |
| `story.s4.line1`  | \u2018공유 우산\u2019을 매개로                      | Through \u2018shared umbrellas\u2019                                                  | 본문   | 설명       |                           | 코드에서 유니코드 곱슬따옴표(\u2018\u2019) 사용 |
| `story.s4.line2`  | 학생과 지역 공동체가                                | students and the local community                                                      | 본문   | 설명       |                           |                                                 |
| `story.s4.line3`  | 긴밀히 협업하는 플랫폼                              | collaborate on our platform.                                                          | 본문   | 설명       |                           |                                                 |
| `story.s4.line4`  | 현재 신촌, 한양대 인근 협업 지점의 인지도를 높이고, | We aim to raise recognition of partner locations near Sinchon and Hanyang University, | 본문   | 설명       |                           |                                                 |
| `story.s4.line5`  | 업브렐라와 협업 지점 간 시너지를 창출하여           | create synergy between UPbrella and partner locations,                                | 본문   | 설명       |                           |                                                 |
| `story.s4.line6`  | 지역 상권을 활성화하고자 합니다.                    | and revitalize the local businesses.                                                  | 본문   | 설명       |                           |                                                 |
| `story.s4.imgAlt` | 업브렐라\_이미지\_section4\_{{index}}               |                                                                                       | 본문   | 이미지 alt | `{{index}}` = 이미지 순번 |                                                 |

### 섹션 5: 팀 소개

| 키               | 한국어                                                                     | English                                                                     | 위치        | 유형 | 변수 | 비고 |
| ---------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- | ---- | ---- | ---- |
| `story.s5.label` | 업브렐라 팀                                                                | Teams at UPbrella                                                           | 소제목 라벨 | 라벨 |      |      |
| `story.s5.title` | 업브렐라 팀을 소개합니다!                                                  | Meet the Teams at UPbrella!                                                 | 제목        | 제목 |      |      |
| `story.s5.desc`  | 더 지속가능한 플랫폼, 더 편리한 플랫폼을 만들기 위해 저희 팀은 모였습니다. | Our team came together to build a more sustainable and convenient platform. | 본문        | 설명 |      |      |

### 섹션 6: 팀 상세

| 키                    | 한국어                                                                                                                                                             | English                                                                                                                                                                                                   | 위치    | 유형 | 변수 | 비고 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- | ---- | ---- |
| `story.s6.team1.name` | 서비스고도화팀                                                                                                                                                     | Service Enhancement Team                                                                                                                                                                                  | 팀 카드 | 제목 |      |      |
| `story.s6.team1.desc` | 서비스고도화팀은 사용자 경험을 조사하고, 대여/반납 데이터를 분석하여 서비스 운영을 위한 최적의 정책을 수립함으로써 업브렐라 이용자의 만족도를 높이고자 노력합니다. | The Service Enhancement Team researches user experience and analyzes rental/return data to establish optimal service policies, striving to elevate user satisfaction.                                     | 팀 카드 | 설명 |      |      |
| `story.s6.team2.name` | 대외협력팀                                                                                                                                                         | External Relations Team                                                                                                                                                                                   | 팀 카드 | 제목 |      |      |
| `story.s6.team2.desc` | 대외협력팀은 신촌 상권과 제휴를 맺어 공유 우산을 보급하고, 마케팅으로 서비스 인지도를 높입니다. 나아가 새로운 사업을 모색해 서비스의 확장에 힘쓰고 있습니다.       | The External Relations Team partners with Sinchon businesses to distribute shared umbrellas and raise service awareness through marketing, while also exploring new business opportunities for expansion. | 팀 카드 | 설명 |      |      |

### 섹션 7: 발자취

| 키                     | 한국어                                                           | English                                                                      | 위치          | 유형   | 변수 | 비고                                                            |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------- | ------ | ---- | --------------------------------------------------------------- |
| `story.s7.title`       | 업브렐라 발자취                                                  | Journey of UPbrella                                                          | 타임라인 섹션 | 제목   |      |                                                                 |
| `story.s7.desc1`       | 업브렐라는 연세대학교 학부생으로 구성된 팀으로,                  | UPbrella is a team of Yonsei University undergraduates                       | 타임라인 섹션 | 설명   |      |                                                                 |
| `story.s7.desc2`       | 신촌 기반 우산 공유 플랫폼으로서 2021년 4월 12일 출범하였습니다. | that launched on April 12, 2021 as a Sinchon-based shared umbrella platform. | 타임라인 섹션 | 설명   |      |                                                                 |
| `story.s7.yearSuffix`  | 년                                                               |                                                                              | 타임라인      | 접미사 |      | 코드: `{{year}} 년` (숫자와 '년' 사이 공백 있음). 예: "2024 년" |
| `story.s7.monthSuffix` | 월                                                               |                                                                              | 타임라인      | 접미사 |      | 예: "03월"                                                      |

> **참고**: 타임라인 항목은 기존 `src/components/pages/story/data.ts`에 정의되었으나, i18n 적용을 위해 번역 키가 추가되었습니다.

### 섹션 7-1: 타임라인 히스토리 항목

| 키                        | 한국어                                               | English | 위치     | 유형   | 변수 | 비고 |
| ------------------------- | ---------------------------------------------------- | ------- | -------- | ------ | ---- | ---- |
| `story.history.2025.06.0` | 환경 보호 릴스 발행                                  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.05.0` | 2025-1학기 스트리스부스 행사 참가                    |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.05.1` | [RC 교육원 협업] 폐우산 활용 활동 진행               |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.03.0` | 개강 이벤트                                          |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.03.1` | 4차 우산 제작                                        |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.03.2` | 업브렐라 사업 소개 릴스 발행                         |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.03.3` | 교외 협업 지점 확대 (트리클, 렛미얼론)               |         | 타임라인 | 이벤트 |      |      |
| `story.history.2025.03.4` | 협업 지점 소개 릴스 발행                             |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.12.0` | 2024-2학기 IHEI FESTA 진행                           |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.10.0` | 2024-2학기 스트리트부스 리딩팀 선정                  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.09.0` | 크라우드펀딩 오프라인 행사                           |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.09.1` | 사용자 만족도 조사 실행                              |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.07.0` | [총동연 협업] 우산한입 공동발행                      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.07.1` | 여름방학 LEI 프로그램 진행 (8기)                     |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.06.0` | [UIC 협업] 학생회실 설치                             |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.05.0` | [총동연 협업] 교내 우산 지점 확대 (학생회관, 대강당) |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.05.1` | 교외 지점 철수 및 대체지점 설치                      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.05.2` | 교내 우산 지점 확대 (제1공학관)                      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.04.0` | 중간고사 이벤트                                      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.04.1` | 송도 지점 우산 설치                                  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.03.0` | 2024 연세대학교 고등교육혁신원 워크스테이션 팀 선정  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.03.1` | 각 지점별 3차 우산 배치                              |         | 타임라인 | 이벤트 |      |      |
| `story.history.2024.03.2` | 개강 이벤트                                          |         | 타임라인 | 이벤트 |      |      |
| `story.history.2023.04.0` | WP커피, 아스터, 아지트커피 연대서문점 지점 신설      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2023.03.0` | 2023 연세대학교 고등교육혁신원 워크스테이션 팀 선정  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2023.02.0` | 연세대학교 고등교육혁신원 워크스테이션 우수팀 선정   |         | 타임라인 | 이벤트 |      |      |
| `story.history.2023.02.1` | 신촌 버블티킹, 왓츠유얼컬러 지점 신설                |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.11.0` | 신촌 안다르커피, 엘피스카페 지점 신설                |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.09.0` | 서울시 제로캠퍼스 동아리 선정                        |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.06.0` | 연세대학교 중앙도서관 지점 신설                      |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.04.0` | 2022 연세대학교 고등교육혁신원 워크스테이션 팀 선정  |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.03.0` | 모티브 스터디카페 지점 신설                          |         | 타임라인 | 이벤트 |      |      |
| `story.history.2022.02.0` | 연세대학교 고등교육혁신원 Peer Championship 수상     |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.11.0` | 서대문구 탄소중립 캠페인 '그린이음' 참여             |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.09.0` | 정식 서비스 런칭                                     |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.08.0` | 연세대학교 지점 확대                                 |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.07.0` | 신촌 상점 5곳과 협약 체결, 베타 서비스 런칭          |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.06.0` | 2021 서대문구 그린프로젝트 공모전 당선               |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.05.0` | 업사이클링 브랜드 큐클리프(CUECLYP)와 협업           |         | 타임라인 | 이벤트 |      |      |
| `story.history.2021.04.0` | 2021 연세대학교 고등교육혁신원 워크스테이션 팀 선정  |         | 타임라인 | 이벤트 |      |      |

### 섹션 8: CTA

| 키               | 한국어                   | English                                 | 위치        | 유형 | 변수 | 비고                   |
| ---------------- | ------------------------ | --------------------------------------- | ----------- | ---- | ---- | ---------------------- |
| `story.s8.line1` | 지구를 지키는 작은 우산, | A small umbrella protecting the Earth — | 마지막 섹션 | 제목 |      |                        |
| `story.s8.line2` | 업브렐라를 펼쳐주세요!   | Open UPbrella!                          | 마지막 섹션 | 제목 |      |                        |
| `story.s8.cta`   | 대여방법 알아보기        | How to Rent                             | 마지막 섹션 | 버튼 |      | 이용안내 페이지로 이동 |

---

## 3. 이용안내 (info)

> 대여방법, 반납방법, FAQ (URL: `/information`)

### 메뉴 / 탭

| 키                   | 한국어         | English                   | 위치        | 유형 | 변수 | 비고 |
| -------------------- | -------------- | ------------------------- | ----------- | ---- | ---- | ---- |
| `info.pageTitle`     | 이용안내       | Service Guide             | 페이지 상단 | 제목 |      |      |
| `info.tab.howRent`   | 우산 대여 방법 | How to Borrow an Umbrella | 탭 버튼     | 탭   |      |      |
| `info.tab.howReturn` | 우산 반납 방법 | How to Return an Umbrella | 탭 버튼     | 탭   |      |      |
| `info.tab.faq`       | 자주 묻는 질문 | FAQ                       | 탭 버튼     | 탭   |      |      |

### 대여 방법 (STEP 1~5)

| 키                      | 한국어                                                                                                            | English                                                                                                                                          | 위치      | 유형 | 변수 | 비고 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- | ---- | ---- |
| `info.rent.step1.title` | 가까운 협업 지점 방문하기                                                                                         | Visit the Nearest Partner Location                                                                                                               | 스텝 카드 | 제목 |      |      |
| `info.rent.step1.desc`  | 홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 ※ 교외 지점의 경우 반드시 영업시간을 확인해주세요! | Visit the nearest partner location via the 'Rental Locations' page on our website. ※ For off-campus locations, please check the operating hours! | 스텝 카드 | 설명 |      |      |
| `info.rent.step2.title` | 우산 손잡이 상단 혹은 측면의 QR코드 스캔                                                                          | Scan the QR code on the top or side of the umbrella handle                                                                                       | 스텝 카드 | 제목 |      |      |
| `info.rent.step3.title` | 카카오 로그인 & 대여폼 자동완성                                                                                   | Kakao Login & Auto-fill Rental Info                                                                                                              | 스텝 카드 | 제목 |      |      |
| `info.rent.step3.desc`  | 카카오 로그인하면, 대여할 우산 정보가 자동완성됩니다 :)                                                           | Once you log in with Kakao, the umbrella rental info will be auto-filled :)                                                                      | 스텝 카드 | 설명 |      |      |
| `info.rent.step4.title` | 업브렐라 계좌 복사 후 보증금 1만원 이체!                                                                          | Copy the UPbrella account number and transfer a ₩10,000 deposit!                                                                                 | 스텝 카드 | 제목 |      |      |
| `info.rent.step4.desc1` | 2주 이내에 정상적으로 반납해주시면 보증금을 다시 돌려드려요!                                                      | If you return umbrella normally within two weeks, we will return the deposit back to you!                                                        | 스텝 카드 | 설명 |      |      |
| `info.rent.step4.desc2` | 무료로 공유 우산 대여하며 지갑도 지키고, 환경도 지키고!                                                           | Rent UPbrella for free, protect your wallet, and protect the environment!                                                                        | 스텝 카드 | 설명 |      |      |
| `info.rent.step5.title` | 우산 대여 완료!                                                                                                   | Umbrella rental complete!                                                                                                                        | 스텝 카드 | 제목 |      |      |
| `info.rent.step5.desc1` | 다음 이용자분들을 위해 사용 후 빠르게 반납 부탁드립니다 😊                                                        | Please return it quickly after using it for the next users 😊                                                                                    | 스텝 카드 | 설명 |      |      |
| `info.rent.step5.desc2` | 원활한 서비스 운영을 위해 최대 대여 기간은 14일로 한정하고 있습니다.                                              | For smooth service operation, the maximum rental period is limited to 14 days.                                                                   | 스텝 카드 | 설명 |      |      |

### 반납 방법 (STEP 1~5)

| 키                        | 한국어                                                                                                             | English                                                                                                                                                                 | 위치      | 유형 | 변수 | 비고 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- | ---- | ---- |
| `info.return.step1.title` | 가까운 협업 지점 방문하기                                                                                          | Visit the Nearest Partner Location                                                                                                                                      | 스텝 카드 | 제목 |      |      |
| `info.return.step1.desc`  | 홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 ※ 대여한 지점이 아닌 다른 지점에서도 반납 가능해요! | Visit the nearest partner location via the 'Rental Locations' page on our website. ※ You can return the umbrella at any partner location, not just where you rented it! | 스텝 카드 | 설명 |      |      |
| `info.return.step2.title` | 우산 반납                                                                                                          | Umbrella Return                                                                                                                                                         | 스텝 카드 | 제목 |      |      |
| `info.return.step2.desc`  | 우산을 먼저 우산 보관함에 반납해주세요!                                                                            | Please return the umbrella to the umbrella storage box first!                                                                                                           | 스텝 카드 | 설명 |      |      |
| `info.return.step3.title` | 우산 보관함 혹은 보관대 옆 가판대 QR 스캔                                                                          | Scan the QR code of the umbrella storage box or rack                                                                                                                    | 스텝 카드 | 제목 |      |      |
| `info.return.step3.desc`  | 반납폼 제출까지 완료해주셔야 보증급 환급이 가능해요!                                                               | You must complete the return form submission to receive your deposit refund!                                                                                            | 스텝 카드 | 설명 |      |      |
| `info.return.step4.title` | 카카오 로그인 & 반납폼 자동완성                                                                                    | Kakao Login & Auto-fill Return Info                                                                                                                                     | 스텝 카드 | 제목 |      |      |
| `info.return.step4.desc1` | 카카오 로그인을 하면, 반납할 우산 정보가 자동완성됩니다 :)                                                         | If you log in to Kakao, the umbrella information to return will be automatically completed :)                                                                           | 스텝 카드 | 설명 |      |      |
| `info.return.step4.desc2` | 환급받을 계좌는 한 번 더 확인해주세요!                                                                             | Please double-check your refund account details!                                                                                                                        | 스텝 카드 | 설명 |      |      |
| `info.return.step5.title` | 담당자 확인 후 보증급 환급 완료!                                                                                   | Deposit refunded after staff confirmation!                                                                                                                              | 스텝 카드 | 제목 |      |      |
| `info.return.step5.desc1` | 보증금 환급은 평균적으로 2 ~ 3일이 소요됩니다 😊                                                                   | Deposit refunds typically take 2–3 business days 😊                                                                                                                     | 스텝 카드 | 설명 |      |      |
| `info.return.step5.desc2` | 갑작스러운 우천 시엔 대여-반납량이 많아 조금 더 소요될 수 있는 점 양해 부탁드려요!                                 | During sudden rainy weather, high volume may cause slight delays — thank you for your patience!                                                                         | 스텝 카드 | 설명 |      |      |

### 자주 묻는 질문 (FAQ)

| 키            | 한국어                                                                                                                                                                                                                                                                                                                                | English                                                                                                                                                                                                                                                                        | 위치 | 유형 | 변수 | 비고                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ---- | ---- | ------------------------------------------------------------ |
| `info.faq.q1` | 우산 대여와 반납 지점이 일치해야 하나요?                                                                                                                                                                                                                                                                                              | Should the umbrella rental and return points match?                                                                                                                                                                                                                            | FAQ  | 질문 |      |                                                              |
| `info.faq.a1` | 대여 지점과 반납 지점이 일치하지 않아도 됩니다! 이용자분의 현 위치에서 갖아 가까운 협업 지점에 대여, 반납해주시면 됩니다!                                                                                                                                                                                                             | Rental and return locations do not need to match! Simply use the nearest partner location to you.                                                                                                                                                                              | FAQ  | 답변 |      | **코드 오타**: "갖아"는 "가장"의 오타로 추정. 코드 수정 필요 |
| `info.faq.q2` | 영업시간은 어떻게 확인하나요?                                                                                                                                                                                                                                                                                                         | How do I check the opening hours?                                                                                                                                                                                                                                              | FAQ  | 질문 |      |                                                              |
| `info.faq.a2` | 연세대학교 교내의 경우 24시간 동안 대여, 반납 가능하며 교외 지점(카페)의 경우 협업 지점의 '영업시간'내 방문해주셔야 대여, 반납이 가능합니다! 협업 지점의 영업시간은 '대여소 위치'페이지 내 해당 지점을 클릭하시면 확인하실 수 있습니다!                                                                                               | On-campus locations at Yonsei University are available 24/7. For off-campus locations (cafes), you must visit during their operating hours. You can check hours by clicking on the location in the 'Rental Locations' page.                                                    | FAQ  | 답변 |      |                                                              |
| `info.faq.q3` | 보증급 환급은 언제 이루어지나요?                                                                                                                                                                                                                                                                                                      | When will the guarantee payment be refunded?                                                                                                                                                                                                                                   | FAQ  | 질문 |      |                                                              |
| `info.faq.a3` | 평균적으로 2~3일이 소요됩니다. 갑작스러운 우천 시 대여-반납량이 많아 조금 더 소요될 수 있는 점 양해부탁드립니다! 더욱 편리하면서도 이용자분의 지갑과 환경 모두를 지킬 수 있는 업브렐라가 되도록 노력하겠습니다. 즉각적인 문의가 필요하신 경우, UPbrella 카카오 플러스 친구로 문의주세요!(카카오 통합검색창에 영문으로 'upbrella'검색) | It typically takes 2–3 business days. During sudden rainy weather, high rental/return volume may cause slight delays — we appreciate your understanding. For urgent inquiries, please reach out via UPbrella's Kakao Plus channel (search 'upbrella' in the Kakao search bar). | FAQ  | 답변 |      |                                                              |

---

## 4. 로그인 / 회원가입 (auth)

> 로그인, 소셜 로그인, 회원가입 플로우 (URL: `/login`, `/members/signup/info`)

### 로그인

| 키                   | 한국어                     | English          | 위치                  | 유형        | 변수 | 비고 |
| -------------------- | -------------------------- | ---------------- | --------------------- | ----------- | ---- | ---- |
| `auth.login.title`   | 로그인                     | Login            | 로그인 페이지 중앙    | 제목        |      |      |
| `auth.login.kakao`   | 카카오로 3초 만에 시작하기 | Start with Kakao | 로그인 페이지         | 버튼        |      |      |
| `auth.login.apple`   | Apple로 3초 만에 시작하기  | Start with Apple | 로그인 페이지         | 버튼        |      |      |
| `auth.login.loading` | 로그인 중...               | Logging in...    | Apple 리다이렉트 화면 | 로딩 텍스트 |      |      |

### 회원가입 (STEP 1)

| 키                                    | 한국어                           | English                                                    | 위치                    | 유형         | 변수 | 비고 |
| ------------------------------------- | -------------------------------- | ---------------------------------------------------------- | ----------------------- | ------------ | ---- | ---- |
| `auth.signup.step1.title`             | 전화번호를 입력해주세요!         | Please enter your phone number!                            | 회원가입 1단계 상단     | 제목         |      |      |
| `auth.signup.step1.privacyNotice1`    | 수집된 개인정보는                | Your personal information                                  | 회원가입 1단계          | 안내         |      |      |
| `auth.signup.step1.privacyNoticeBold` | 서비스 운영의 목적으로만         | is used solely for                                         | 회원가입 1단계 (강조)   | 안내         |      |      |
| `auth.signup.step1.privacyNotice2`    | 사용됩니다.                      | operating this service.                                    | 회원가입 1단계          | 안내         |      |      |
| `auth.signup.step1.name`              | 이름                             | Name                                                       | 이름 입력 필드 라벨     | 라벨         |      |      |
| `auth.signup.step1.namePlaceholder`   | 이름입력                         | Enter Name                                                 | 이름 입력 필드          | 플레이스홀더 |      |      |
| `auth.signup.step1.phone`             | 전화번호                         | Phone Number                                               | 전화번호 입력 필드 라벨 | 라벨         |      |      |
| `auth.signup.step1.agreeAll`          | 전체동의                         | Agree to All                                               | 약관 동의 영역          | 체크박스     |      |      |
| `auth.signup.step1.agreeTos`          | (필수) 업브렐라 이용약관         | (Required) UPbrella Terms and Conditions                   | 약관 동의 영역          | 체크박스     |      |      |
| `auth.signup.step1.agreePp`           | (필수) 개인정보 수집 및 이용동의 | (Required) Consent to collect and use personal information | 약관 동의 영역          | 체크박스     |      |      |
| `auth.signup.step1.next`              | 다음                             | Next                                                       | 회원가입 1단계 하단     | 버튼         |      |      |

### 회원가입 (STEP 2)

| 키                                     | 한국어                                             | English                                                                          | 위치                | 유형         | 변수 | 비고 |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------- | ------------ | ---- | ---- |
| `auth.signup.step2.title`              | 환급받을 계좌를 입력해주세요!                      | Please enter the account number for your refund!                                 | 회원가입 2단계 상단 | 제목         |      |      |
| `auth.signup.step2.desc1`              | 지금 한 번 입력해두면 반납할 땐 자동 입력됩니다 :) | If you enter it once now, it will be automatically entered when you return it :) | 회원가입 2단계      | 안내         |      |      |
| `auth.signup.step2.desc2`              | 선택사항이니 그냥 넘어가도 좋아요!                 | It's an option, so you can just move on!                                         | 회원가입 2단계      | 안내         |      |      |
| `auth.signup.step2.accountLabel`       | 환급받을 계좌                                      | Refund Account                                                                   | 계좌 입력 라벨      | 라벨         |      |      |
| `auth.signup.step2.accountPlaceholder` | 계좌번호                                           | Account No.                                                                      | 계좌번호 입력 필드  | 플레이스홀더 |      |      |
| `auth.signup.step2.selectBank`         | 은행을 선택해주세요                                | Please select a bank                                                             | 은행 선택 모달 제목 | 제목         |      |      |
| `auth.signup.step2.submit`             | 가입하기!                                          | Sign up!                                                                         | 회원가입 2단계 하단 | 버튼         |      |      |

### 유효성 검증 메시지

| 키                              | 한국어                         | English                                | 위치               | 유형 | 변수 | 비고 |
| ------------------------------- | ------------------------------ | -------------------------------------- | ------------------ | ---- | ---- | ---- |
| `auth.validation.nameMin`       | 최소 2자 이상 입력해주세요.    | Please enter at least 2 characters.    | 이름 필드 하단     | 에러 |      |      |
| `auth.validation.nameMax`       | 최대 20자까지 입력 가능합니다. | You can enter up to 20 characters.     | 이름 필드 하단     | 에러 |      |      |
| `auth.validation.nameFormat`    | 국문, 영문만 입력 가능합니다.  | You can enter only Korean and English. | 이름 필드 하단     | 에러 |      |      |
| `auth.validation.phoneFormat`   | 010 뒤 8자리를 입력해주세요.   | Please enter 8 digits after 010.       | 전화번호 필드 하단 | 에러 |      |      |
| `auth.validation.termsRequired` | 필수 동의 항목입니다.          | This is a mandatory consent item.      | 약관 체크박스 하단 | 에러 |      |      |

---

## 5. 대여 흐름 (rent)

> 우산 대여 신청 화면 (URL: `/rent/form/:id`, 로그인 필요)

### 대여 폼

| 키                               | 한국어                                                                    | English                                                                                                        | 위치                  | 유형         | 변수                     | 비고                       |
| -------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------- | ------------ | ------------------------ | -------------------------- |
| `rent.form.titleBefore`          | 우산을 빌릴까요?                                                          | Would you like to borrow an umbrella?                                                                          | 페이지 상단 (대여 전) | 제목         |                          |                            |
| `rent.form.titleAfter`           | 우산을 빌렸어요!                                                          | You've borrowed an umbrella!                                                                                   | 페이지 상단 (대여 후) | 제목         |                          |                            |
| `rent.form.privacyNotice`        | 수집된 개인정보는 서비스 운영의 목적으로만 사용됩니다.                    | Your personal information is used solely for operating this service.                                           | 상단 안내 박스        | 안내         |                          |                            |
| `rent.form.anywhereReturn`       | 우산을 빌린 지점이 아니더라도 업브렐라 대여소 어디서나 반납 가능합니다.   | You can return the umbrella at any UPbrella rental location, even if it differs from where you rented.         | 상단 안내 박스        | 안내         |                          |                            |
| `rent.form.name`                 | 이름                                                                      | Name                                                                                                           | 폼 필드 라벨          | 라벨         |                          |                            |
| `rent.form.phone`                | 전화번호                                                                  | Phone Number                                                                                                   | 폼 필드 라벨          | 라벨         |                          |                            |
| `rent.form.region`               | 지역                                                                      | Region                                                                                                         | 폼 필드 라벨          | 라벨         |                          | FormLocationMolecules 공통 |
| `rent.form.rentStore`            | 대여지점                                                                  | Rental Point                                                                                                   | 폼 필드 라벨          | 라벨         |                          | FormLocationMolecules 공통 |
| `rent.form.umbrellaNo`           | 우산번호                                                                  | Umbrella No.                                                                                                   | 폼 필드 라벨          | 라벨         |                          |                            |
| `rent.form.conditionReport`      | 상태신고                                                                  | Condition Report                                                                                               | 폼 필드 라벨          | 라벨         |                          |                            |
| `rent.form.conditionPlaceholder` | 우산이나 대여 환경에 문제가 있다면 {{maxCharLimit}}자 이내로 작성해주세요 | If there is a problem with the umbrella or rental environment, please write within {{maxCharLimit}} characters | 상태신고 입력란       | 플레이스홀더 | `{{maxCharLimit}}` = 400 |                            |
| `rent.form.submit`               | 대여하기                                                                  | Rent                                                                                                           | 페이지 하단           | 버튼         |                          |                            |

### 보증금 안내

| 키                          | 한국어                                                     | English                                                              | 위치             | 유형 | 변수                                                   | 비고 |
| --------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- | ---------------- | ---- | ------------------------------------------------------ | ---- |
| `rent.deposit.title`        | 보증금 입금                                                | Deposit Payment                                                      | 보증금 영역 제목 | 라벨 |                                                        |      |
| `rent.deposit.step1`        | 1. {{bankName}} {{accountNumber}} {{accountName}} 계좌복사 | 1. Copy bank info                                                    | 보증금 안내      | 안내 | `{{bankName}}`, `{{accountNumber}}`, `{{accountName}}` |      |
| `rent.deposit.step2`        | 2. 보증금 10,000원 입금                                    | 2. Transfer ₩10,000 deposit                                          | 보증금 안내      | 안내 |                                                        |      |
| `rent.deposit.step3`        | 3. 대여 완료!                                              | 3. Rental Complete!                                                  | 보증금 안내      | 안내 |                                                        |      |
| `rent.deposit.refundNotice` | 14일 이내 반납 시 보증금 전액 환급됩니다.                  | If you return it within 14 days, the deposit will be fully refunded. | 보증금 안내 하단 | 안내 |                                                        |      |
| `rent.deposit.copyBtn`      | 계좌 복사하기                                              | Copy Account                                                         | 보증금 영역      | 버튼 |                                                        |      |

### 대여 확인 모달

| 키                                   | 한국어                               | English                                                          | 위치      | 유형   | 변수                     | 비고                                                                                                                 |
| ------------------------------------ | ------------------------------------ | ---------------------------------------------------------------- | --------- | ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `rent.modal.confirmLine1`            | '{{storeName}}'에서                  | From '{{storeName}}'                                             | 확인 모달 | 제목   | `{{storeName}}` = 지점명 | 코드에서 따옴표를 별도 `<p>`로 조합. **ASCII 직선따옴표(`'`) 사용** (다른 곳은 유니코드 곱슬따옴표 사용 — 통일 필요) |
| `rent.modal.confirmLine2`            | '{{number}}'번 우산을 빌릴까요?      | Would you like to borrow the umbrella '{{number}}'?              | 확인 모달 | 제목   | `{{number}}` = 우산 번호 | 코드에서 따옴표를 별도 `<p>`로 조합. **ASCII 직선따옴표(`'`) 사용**                                                  |
| `rent.modal.blacklistWarning1`       | 우산 미반납 시 블랙리스트로 등록되어 | Failure to return the umbrella will result in being blacklisted, | 확인 모달 | 경고   |                          |                                                                                                                      |
| `rent.modal.blacklistWarning2`       | 영구적으로 우산 대여가 불가능합니다. | permanently preventing future rentals.                           | 확인 모달 | 경고   |                          |                                                                                                                      |
| `rent.modal.afterQuotedStore`        | 에서                                 |                                                                  | 확인 모달 | 접미사 |                          | `confirmLine1` 따옴표 뒤 텍스트                                                                                      |
| `rent.modal.afterQuotedUmbrellaRent` | 번 우산을 빌릴까요?                  |                                                                  | 확인 모달 | 접미사 |                          | `confirmLine2` 따옴표 뒤 텍스트                                                                                      |

### 대여 완료 모달 (보관함 있는 지점)

| 키                         | 한국어                                       | English                                                              | 위치      | 유형 | 변수 | 비고                                                                |
| -------------------------- | -------------------------------------------- | -------------------------------------------------------------------- | --------- | ---- | ---- | ------------------------------------------------------------------- |
| `rent.finish.title`        | 대여완료!                                    | Rental Complete!                                                     | 완료 모달 | 제목 |      |                                                                     |
| `rent.finish.lockPassword` | 사물함 비밀번호:                             | Locker password:                                                     | 완료 모달 | 라벨 |      |                                                                     |
| `rent.finish.lockGuide`    | 번호를 입력하면 우산함이 열릴 거예요!        | Enter the password to open the umbrella locker!                      | 완료 모달 | 안내 |      |                                                                     |
| `rent.finish.thanks`       | UPbrella 서비스를 이용해주셔서 감사합니다 :) | Thank you for using UPbrella service :)                              | 완료 모달 | 안내 |      |                                                                     |
| `rent.finish.refundNotice` | 14일 이내 반납 시 보증금 전액 환급됩니다.    | If you return it within 14 days, the deposit will be fully refunded. | 완료 모달 | 안내 |      | `rent.deposit.refundNotice`와 동일 문구가 완료 모달에도 중복 표시됨 |
| `rent.finish.storageIssue` | 보관함이 안 열려요:(                         | The storage box won't open:(                                         | 완료 모달 | 버튼 |      | 문제 발생 시                                                        |

### 보관함 문제 모달

| 키                         | 한국어                                                                                 | English                                                                                                     | 위치             | 유형         | 변수 | 비고                                                  |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------- | ------------ | ---- | ----------------------------------------------------- | --- | --- | ---------------- | ---- | --- | --- |
| `rent.storage.title`       | 불편을 드려 죄송합니다 😢                                                              | Sorry for the inconvenience 😢                                                                              | 보관함 이슈 모달 | 제목         |      |                                                       |
| `rent.storage.desc`        | 보관함 화면 좌측 상단에 표기된 4자리 숫자를 입력해주시면 다른 비밀번호를 안내드릴게요! | If you enter the 4 digits marked at the top left of the storage box screen, I'll give you another password! | 보관함 이슈 모달 | 안내         |      |                                                       |
| `rent.storage.placeholder` | 4자리 숫자를 입력해주세요                                                              | Please enter a 4-digit number                                                                               | 숫자 입력란      | 플레이스홀더 |      |                                                       |
| `rent.storage.error`       | 4자리 숫자만 입력해주세요.                                                             | Please enter only 4 digits.                                                                                 | 토스트 (toast)   | 에러         |      | 코드에서 필드 하단 UI가 아닌 `toast.error()`로 표시됨 |     |     | 숫자 입력란 하단 | 에러 |     |     |

### 대여 에러 상태

| 키                         | 한국어                                                                    | English                                                               | 위치        | 유형 | 변수 | 비고 |
| -------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------- | ---- | ---- | ---- |
| `rent.error.alreadyRented` | 현재 회원님께서 이미 대여 중인 우산이 있는 경우 중복 대여가 불가능합니다! | You already have an active rental. Duplicate rentals are not allowed. | 에러 페이지 | 설명 |      |      |
| `rent.error.unavailable`   | [ERROR] 해당 우산은 대여 불가능한 우산입니다.                             | [ERROR] The umbrella is not available for rent.                       | 에러 페이지 | 설명 |      |      |

---

## 6. 반납 흐름 (return)

> 우산 반납 신청 화면 (URL: `/return/form`, 로그인 필요)

### 반납 폼

| 키                                   | 한국어                                                                                           | English                                                                                                    | 위치                  | 유형         | 변수                     | 비고                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | --------------------- | ------------ | ------------------------ | ----------------------------------------------- |
| `return.form.titleBefore`            | 우산을 반납할까요?                                                                               | Return the Umbrella?                                                                                       | 페이지 상단 (반납 전) | 제목         |                          |                                                 |
| `return.form.titleAfter`             | 우산을 반납했어요!                                                                               | Umbrella Returned!                                                                                         | 페이지 상단 (반납 후) | 제목         |                          |                                                 |
| `return.form.privacyNotice`          | 수집된 개인정보는 서비스 운영의 목적으로만 사용됩니다.                                           | Your personal information is used solely for operating this service.                                       | 상단 안내 박스        | 안내         |                          |                                                 |
| `return.form.accurateInfo1`          | 대여 신청 시 정보를                                                                              | Please ensure your information                                                                             | 상단 안내 박스        | 안내         |                          |                                                 |
| `return.form.accurateInfo2`          | 정확히 입력해주셔야 원활한 보증금 환급이 가능합니다.                                             | is accurate so your deposit can be refunded smoothly.                                                      | 상단 안내 박스 (강조) | 안내         |                          |                                                 |
| `return.form.name`                   | 이름                                                                                             | Name                                                                                                       | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.phone`                  | 전화번호                                                                                         | Phone Number                                                                                               | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.umbrellaNo`             | 우산번호                                                                                         | Umbrella No.                                                                                               | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.region`                 | 지역                                                                                             | Region                                                                                                     | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.rentStore`              | 대여지점                                                                                         | Rental Point                                                                                               | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.refundAccount`          | 환급받을 계좌                                                                                    | Refund Account                                                                                             | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.bankName`               | 은행명                                                                                           | Bank Name                                                                                                  | 은행 선택 기본값      | 플레이스홀더 |                          |                                                 |
| `return.form.accountNumber`          | 계좌번호                                                                                         | Account No.                                                                                                | 계좌번호 입력란       | 플레이스홀더 |                          |                                                 |
| `return.form.accountHint1`           | \* \u2018-\u2019은 빼고 입력해주세요!                                                            | \* Please enter without \u2018-\u2019!                                                                     | 계좌 입력 안내        | 안내         |                          | 코드에서 유니코드 곱슬따옴표(\u2018\u2019) 사용 |
| `return.form.accountHint2`           | \* 현재 '반납 페이지'에서 입력하신 은행, 계좌번호 정보는 보증금 환급이 완료됨에 따라 파기됩니다. | \* Your bank account information entered on this page will be deleted once the deposit refund is complete. | 계좌 입력 안내        | 안내         |                          |                                                 |
| `return.form.accountHint3`           | \* MYPAGE를 통해 정보를 저장하면 빠른 반납이 가능합니다.                                         | \* Save your info via MYPAGE for faster returns.                                                           | 계좌 입력 안내        | 안내         |                          |                                                 |
| `return.form.improvement`            | 개선 요청 사항                                                                                   | Improvement Requests                                                                                       | 폼 필드 라벨          | 라벨         |                          |                                                 |
| `return.form.improvementPlaceholder` | 개선이 필요하다고 느낀 점이 있다면 {{maxCharLimit}}자 이내로 작성해주세요                        | Please describe any improvements within {{maxCharLimit}} characters                                        | 개선사항 입력란       | 플레이스홀더 | `{{maxCharLimit}}` = 400 |                                                 |
| `return.form.submit`                 | 반납하기                                                                                         | Return                                                                                                     | 페이지 하단           | 버튼         |                          |                                                 |

### 반납 확인 모달

| 키                                       | 한국어                                           | English                                                              | 위치                  | 유형   | 변수                     | 비고                                                                                                        |
| ---------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- | --------------------- | ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `return.modal.confirmLine1`              | '{{storeName}}'에서                              | From '{{storeName}}'                                                 | 확인 모달             | 제목   | `{{storeName}}` = 지점명 | 코드에서 `<span>`으로 조합. **ASCII 직선따옴표(`'`) 사용** (다른 곳은 유니코드 곱슬따옴표 사용 — 통일 필요) |
| `return.modal.confirmLine2`              | '{{number}}'번 우산을 반납할까요?                | Return umbrella '{{number}}'?                                        | 확인 모달             | 제목   | `{{number}}` = 우산 번호 | 코드에서 `<span>`으로 조합. **ASCII 직선따옴표(`'`) 사용**                                                  |
| `return.modal.region`                    | 지역                                             | Region                                                               | 확인 모달 테이블      | 라벨   |                          |                                                                                                             |
| `return.modal.rentStore`                 | 대여지점                                         | Rental Point                                                         | 확인 모달 테이블      | 라벨   |                          |                                                                                                             |
| `return.modal.umbrellaNo`                | 우산번호                                         | Umbrella No.                                                         | 확인 모달 테이블      | 라벨   |                          |                                                                                                             |
| `return.modal.rentDays`                  | 대여일수                                         | Rental Days                                                          | 확인 모달 테이블      | 라벨   |                          |                                                                                                             |
| `return.modal.refundAccount`             | 환급받을 계좌                                    | Refund Account                                                       | 확인 모달 테이블      | 라벨   |                          |                                                                                                             |
| `return.modal.numberSuffix`              | 번                                               | #                                                                    | 우산번호 뒤 접미사    | 접미사 |                          |                                                                                                             |
| `return.modal.daySuffix`                 | 일                                               | day(s)                                                               | 대여일수 뒤 접미사    | 접미사 |                          |                                                                                                             |
| `return.modal.editNotice`                | 해당 정보가 틀리다면 반드시 수정 부탁드려요!     | Please correct any incorrect information!                            | 확인 모달             | 안내   |                          |                                                                                                             |
| `return.modal.refundNormal`              | 보증금 환급은 2-3일 이내로 이루어질 예정입니다.  | Your deposit will be refunded within 2–3 business days.              | 확인 모달 (14일 이내) | 안내   |                          |                                                                                                             |
| `return.modal.refundOverdue`             | 대여일수가 14일이 넘어 보증금 환급이 어렵습니다. | Deposit refund is unavailable as the rental period exceeded 14 days. | 확인 모달 (14일 초과) | 안내   |                          |                                                                                                             |
| `return.modal.thanks`                    | UPbrella 서비스를 이용해주셔서 감사합니다 :)     | Thank you for using UPbrella :)                                      | 확인 모달             | 안내   |                          |                                                                                                             |
| `return.modal.edit`                      | 수정                                             | Edit                                                                 | 확인 모달             | 버튼   |                          |                                                                                                             |
| `return.modal.complete`                  | 반납 완료!                                       | Return Done!                                                         | 확인 모달             | 버튼   |                          |                                                                                                             |
| `return.modal.afterQuotedStore`          | 에서                                             |                                                                      | 확인 모달             | 접미사 |                          | `confirmLine1` 따옴표 뒤 텍스트                                                                             |
| `return.modal.afterQuotedUmbrellaReturn` | 번 우산을 반납할까요?                            |                                                                      | 확인 모달             | 접미사 |                          | `confirmLine2` 따옴표 뒤 텍스트                                                                             |

---

## 7. 마이페이지 (mypage)

> 마이페이지 하위 4개 탭 (URL: `/members/mypage/*`, 로그인 필요)

### 페이지 레벨

| 키                   | 한국어                                        | English | 위치            | 유형 | 변수 | 비고 |
| -------------------- | --------------------------------------------- | ------- | --------------- | ---- | ---- | ---- |
| `mypage.title`       | 마이페이지                                    |         | 마이페이지 상단 | 제목 |      |      |
| `mypage.loading`     | 우산 대여 내역을 불러오는 중...               |         | 마이페이지 로딩 | 안내 |      |      |
| `mypage.error.title` | 죄송합니다. 마이페이지를 불러오지 못했어요 :) |         | 마이페이지 에러 | 제목 |      |      |
| `mypage.error.retry` | 잠시 후에 다시 시도해주세요.                  |         | 마이페이지 에러 | 안내 |      |      |

### 사이드 네비게이션

| 키                   | 한국어             | English        | 위치                 | 유형 | 변수 | 비고 |
| -------------------- | ------------------ | -------------- | -------------------- | ---- | ---- | ---- |
| `mypage.nav.rent`    | 이용내역           | History        | 마이페이지 좌측 메뉴 | 네비 |      |      |
| `mypage.nav.account` | 환급계좌 등록/변경 | Refund Account | 마이페이지 좌측 메뉴 | 네비 |      |      |
| `mypage.nav.info`    | 개인정보 조회      | My Info        | 마이페이지 좌측 메뉴 | 네비 |      |      |
| `mypage.nav.contact` | 문의하기           | Contact Us     | 마이페이지 좌측 메뉴 | 네비 |      |      |

### 프로필 영역

| 키                           | 한국어                           | English                                    | 위치               | 유형   | 변수                           | 비고 |
| ---------------------------- | -------------------------------- | ------------------------------------------ | ------------------ | ------ | ------------------------------ | ---- |
| `mypage.profile.nameSuffix`  | 님                               |                                            | 프로필 상단        | 접미사 |                                |      |
| `mypage.profile.impact1`     | {{name}}님은 비닐우산이 썩는     | You have saved the Earth from              | 프로필 환경 영향   | 설명   | `{{name}}` = 이름 마지막 2글자 |      |
| `mypage.profile.impact2`     | {{count}}년의 세월을 줄였습니다. | {{count}} years of plastic umbrella waste. | 프로필 환경 영향   | 설명   | `{{count}}` = 대여횟수 × 100   |      |
| `mypage.profile.currentRent` | 대여 중인 우산                   | Active Rentals                             | 프로필             | 라벨   |                                |      |
| `mypage.profile.noRent`      | 대여 중인 우산이 없습니다.       | No umbrella currently rented.              | 프로필 (미대여 시) | 안내   |                                |      |
| `mypage.profile.noRentDesc1` | 지구를 지키는 작은 우산,         | A small umbrella protecting the Earth,     | 프로필 (미대여 시) | 설명   |                                |      |
| `mypage.profile.noRentDesc2` | 업브렐라와 함께 펼쳐주세요!      | open it with UPbrella!                     | 프로필 (미대여 시) | 설명   |                                |      |

### 이용내역 탭

| 키                         | 한국어                   | English                | 위치          | 유형 | 변수 | 비고 |
| -------------------------- | ------------------------ | ---------------------- | ------------- | ---- | ---- | ---- |
| `mypage.rent.title`        | 이용 내역                | Rental History         | 탭 제목       | 제목 |      |      |
| `mypage.rent.empty`        | 이용 내역이 아직 없어요! | No rental history yet! | 빈 상태       | 안내 |      |      |
| `mypage.rent.umbrellaNo`   | 우산 번호                | Umbrella No.           | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.rentDate`     | 대여 일자                | Rental Date            | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.rentStore`    | 대여 지점                | Rental Point           | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.returnDue`    | 반납 기한                | Return Due             | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.returnDate`   | 반납 일자                | Return Date            | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.returnStatus` | 반납 여부                | Return Status          | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.returned`     | 반납 완료                | Returned               | 상태값        | 상태 |      |      |
| `mypage.rent.notReturned`  | 반납 전                  | Not Returned           | 상태값        | 상태 |      |      |
| `mypage.rent.refundStatus` | 환급 여부                | Refund Status          | 이용내역 카드 | 라벨 |      |      |
| `mypage.rent.refunded`     | 환급 완료                | Refunded               | 상태값        | 상태 |      |      |
| `mypage.rent.notRefunded`  | 환급 전                  | Pending                | 상태값        | 상태 |      |      |

### 환급계좌 탭

| 키                                | 한국어                                | English                             | 위치                 | 유형 | 변수 | 비고                                            |
| --------------------------------- | ------------------------------------- | ----------------------------------- | -------------------- | ---- | ---- | ----------------------------------------------- |
| `mypage.account.title`            | 환급계좌 등록/변경                    | Refund Account                      | 탭 제목              | 제목 |      |                                                 |
| `mypage.account.bank`             | 은행                                  | Bank                                | 입력 영역 라벨       | 라벨 |      |                                                 |
| `mypage.account.bankName`         | 은행명                                | Bank Name                           | 은행 선택 기본값     | 라벨 |      |                                                 |
| `mypage.account.accountNumber`    | 계좌번호                              | Account No.                         | 계좌번호 입력란 라벨 | 라벨 |      |                                                 |
| `mypage.account.hint`             | \* \u2018-\u2019은 빼고 입력해주세요! | \* Please enter without '-'!        | 계좌 입력 안내       | 안내 |      | 코드에서 유니코드 곱슬따옴표(\u2018\u2019) 사용 |
| `mypage.account.selectBank`       | 은행을 선택해주세요                   | Select a bank                       | 은행 선택 모달 제목  | 제목 |      |                                                 |
| `mypage.account.delete`           | 계좌 삭제                             | Delete Account                      | 계좌 관리            | 버튼 |      |                                                 |
| `mypage.account.change`           | 계좌 변경                             | Change Account                      | 계좌 관리            | 버튼 |      |                                                 |
| `mypage.account.register`         | 계좌 등록                             | Add Account                         | 계좌 관리            | 버튼 |      |                                                 |
| `mypage.account.deleteConfirm`    | 계좌를 삭제하시겠어요?                | Do you want to delete this account? | 삭제 확인 모달       | 제목 |      |                                                 |
| `mypage.account.deleteBtn`        | 삭제                                  | Delete                              | 삭제 확인 모달       | 버튼 |      |                                                 |
| `mypage.account.changeComplete`   | 계좌 변경 완료!                       | Account Updated!                    | 변경 완료 모달       | 제목 |      |                                                 |
| `mypage.account.registerComplete` | 계좌 등록 완료!                       | Account Registered!                 | 등록 완료 모달       | 제목 |      |                                                 |

### 개인정보 탭

| 키                                   | 한국어                                                                     | English                                                                                          | 위치           | 유형 | 변수 | 비고                                                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- | ---- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `mypage.info.title`                  | 개인정보조회                                                               | Personal Info                                                                                    | 탭 제목        | 제목 |      | **코드 불일치**: 네비(`MypageNav`)에서는 `개인정보 조회`(띄어쓰기), 카드(`MypageInfoCard`)에서는 `개인정보조회`(붙여쓰기). 코드 통일 필요 |
| `mypage.info.name`                   | 이름                                                                       | Name                                                                                             | 정보 라벨      | 라벨 |      |                                                                                                                                           |
| `mypage.info.phone`                  | 전화번호                                                                   | Phone Number                                                                                     | 정보 라벨      | 라벨 |      |                                                                                                                                           |
| `mypage.info.email`                  | 이메일                                                                     | Email                                                                                            | 정보 라벨      | 라벨 |      |                                                                                                                                           |
| `mypage.info.withdraw`               | 회원 탈퇴                                                                  | Delete Account                                                                                   | 탭 하단        | 버튼 |      |                                                                                                                                           |
| `mypage.info.withdrawConfirm`        | 정말 탈퇴하시겠어요?                                                       | Are you sure you want to delete this account?                                                    | 탈퇴 확인 모달 | 제목 |      |                                                                                                                                           |
| `mypage.info.withdrawDesc1`          | 그동안 업브렐라를 이용해주셔서 감사합니다.                                 | Thank you for using UPbrella.                                                                    | 탈퇴 확인 모달 | 설명 |      |                                                                                                                                           |
| `mypage.info.withdrawDesc2`          | 회원탈퇴를 하실 경우, 아래와 같이 회원정보가 처리됩니다.                   | If you delete your account, your account information will be handled as follows.                 | 탈퇴 확인 모달 | 설명 |      |                                                                                                                                           |
| `mypage.info.withdrawDesc3`          | 탈퇴 신청 즉시 회원 탈퇴 처리되며, 회원 정보는 삭제 처리됩니다.            | Your account will be deleted immediately, and all your information will be permanently removed." | 탈퇴 확인 모달 | 설명 |      |                                                                                                                                           |
| `mypage.info.withdrawDesc4`          | 대여 중인 우산이 남아있는 경우, 즉시 탈퇴가 불가하니 문의 바랍니다.        | If you have an active rental, you cannot delete your account. Please contact us.                 | 탈퇴 확인 모달 | 설명 |      |                                                                                                                                           |
| `mypage.info.withdrawBtn`            | 탈퇴                                                                       | Delete Account                                                                                   | 탈퇴 확인 모달 | 버튼 |      |                                                                                                                                           |
| `mypage.info.withdrawNotAllowed`     | 지금은 탈퇴가 불가합니다                                                   | Deletion Unavailable                                                                             | 탈퇴 불가 모달 | 제목 |      |                                                                                                                                           |
| `mypage.info.withdrawNotAllowedDesc` | 현재 대여 중인 우산이 있어 탈퇴가 불가하오니, 인스타그램 DM 문의 바랍니다. | You have an active rental. Deletion is unavailable. Please contact us via Instagram DM.          | 탈퇴 불가 모달 | 설명 |      |                                                                                                                                           |

### 문의하기 탭

| 키                           | 한국어                                   | English                             | 위치                 | 유형 | 변수 | 비고                                                                                     |
| ---------------------------- | ---------------------------------------- | ----------------------------------- | -------------------- | ---- | ---- | ---------------------------------------------------------------------------------------- |
| `mypage.contact.title`       | 문의하기                                 | Inquiry                             | 탭 제목              | 제목 |      |                                                                                          |
| `mypage.contact.urgentDesc1` | 업브렐라 이용 관련 및 급한 문의는        | For urgent UPbrella inquiries,      | 인스타그램 문의 카드 | 설명 |      | Contact 페이지(`contact.instagramDesc1`)에서는 "이용 **안내** 관련"으로 다름 — 통일 필요 |
| `mypage.contact.urgentDesc2` | 업브렐라 인스타그램 계정으로 부탁드려요! | please reach out via our Instagram! | 인스타그램 문의 카드 | 설명 |      |                                                                                          |
| `mypage.contact.dmBtn`       | 업브렐라 DM으로 문의하기                 | DM Us on IG                         | 인스타그램 문의 카드 | 버튼 |      |                                                                                          |
| `mypage.contact.bizDesc1`    | 업브렐라와의 사업 제휴 관련 문의는       | For business partnership inquiries, | 비즈니스 문의 카드   | 설명 |      |                                                                                          |
| `mypage.contact.bizDesc2`    | Contact Us에서 부탁드려요!               | please visit Contact Us!            | 비즈니스 문의 카드   | 설명 |      |                                                                                          |
| `mypage.contact.contactBtn`  | CONTACT US에서 문의하기                  | Contact Us                          | 비즈니스 문의 카드   | 버튼 |      |                                                                                          |

---

## 8. 대여소 / 협업지점 (store)

> 대여소 위치 지도, 협업 지점 상세 (URL: `/rentalLocation`, `/rentalOffice`, `/rentalOffice/:id`)

| 키                        | 한국어             | English             | 위치                       | 유형         | 변수 | 비고 |
| ------------------------- | ------------------ | ------------------- | -------------------------- | ------------ | ---- | ---- |
| `store.availableUmbrella` | 대여가능 우산      | Available Umbrellas | 지도 카드, 지점 상세       | 라벨         |      |      |
| `store.countSuffix`       | 개                 | available           | 우산 수량 뒤               | 접미사       |      |      |
| `store.naverDirection`    | 네이버 길찾기      | Get Directions      | 지점 상세                  | 버튼         |      |      |
| `store.currentLocation`   | 현재위치           | Current Location    | 네이버 길찾기 URL 파라미터 | 라벨         |      |      |
| `store.map.searchCurrent` | 현재 위치 검색     | Search My Location  | 지도 컨트롤                | 아이콘 title |      |      |
| `store.map.refreshInfo`   | 정보 다시 가져오기 | Refresh Info        | 지도 컨트롤                | 아이콘 title |      |      |
| `store.map.viewGuide`     | 이용안내 확인      | View Guide          | 지도 컨트롤                | 아이콘 title |      |      |
| `store.detail.title`      | 소개 더보기        | Learn More          | 지점 상세 카드             | 버튼         |      |      |

---

## 9. 문의하기 (contact)

> 사업 제휴 문의 페이지 (URL: `/contact`)

| 키                           | 한국어                                                           | English                                                      | 위치             | 유형         | 변수 | 비고                                                                                         |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ | ---------------- | ------------ | ---- | -------------------------------------------------------------------------------------------- |
| `contact.pageDesc`           | 업브렐라와의 사업 제휴 관련 문의하시고 싶은 내용을 작성해주세요. | Please write your business partnership inquiry for UPbrella. | 페이지 상단 설명 | 설명         |      |                                                                                              |
| `contact.instagramDesc1`     | 업브렐라 이용 안내 관련 및 급한 문의는                           | For service-related or urgent inquiries,                     | 인스타그램 안내  | 설명         |      | 마이페이지(`mypage.contact.urgentDesc1`)에서는 "이용 관련"("안내" 없음)으로 다름 — 통일 필요 |
| `contact.instagramDesc2`     | 업브렐라 인스타그램 계정으로 부탁드려요!                         | please contact us via our Instagram account!                 | 인스타그램 안내  | 설명         |      |                                                                                              |
| `contact.instagramBtn`       | 업브렐라 DM으로 문의하기                                         | DM Us on Instagram                                           | 인스타그램 안내  | 버튼         |      | ~~시트 오타 수정: 업브레라 → 업브렐라~~                                                      |
| `contact.name`               | 이름                                                             | Name                                                         | 폼 필드 라벨     | 라벨         |      |                                                                                              |
| `contact.namePlaceholder`    | 이름 입력                                                        | Enter your name                                              | 이름 필드        | 플레이스홀더 |      |                                                                                              |
| `contact.phone`              | 연락처                                                           | Phone                                                        | 폼 필드 라벨     | 라벨         |      |                                                                                              |
| `contact.email`              | 이메일                                                           | Email                                                        | 폼 필드 라벨     | 라벨         |      |                                                                                              |
| `contact.subject`            | 제목                                                             | Subject                                                      | 폼 필드 라벨     | 라벨         |      |                                                                                              |
| `contact.subjectPlaceholder` | 제목 입력                                                        | Enter subject                                                | 제목 필드        | 플레이스홀더 |      |                                                                                              |
| `contact.message`            | 문의 사항                                                        | Message                                                      | 폼 필드 라벨     | 라벨         |      |                                                                                              |
| `contact.messagePlaceholder` | 문의 사항을 작성해주세요!                                        | Please write your message!                                   | 문의사항 필드    | 플레이스홀더 |      |                                                                                              |
| `contact.submit`             | 문의하기                                                         | Submit                                                       | 폼 하단          | 버튼         |      |                                                                                              |
| `contact.success`            | 문의 접수 완료!                                                  | Inquiry Submitted!                                           | 제출 완료 배너   | 알림         |      | 코드에서 `toast`가 아닌 화면 하단 고정 오버레이로 표시됨                                     |

---

## 10. 시스템 메시지 (common.toast / common.error)

> Toast 알림, API 에러, 유효성 검증 등 코드 전체에 분산된 메시지

### Toast 성공 메시지

| 키                                  | 한국어                       | English                    | 위치                       | 유형   | 변수 | 비고 |
| ----------------------------------- | ---------------------------- | -------------------------- | -------------------------- | ------ | ---- | ---- |
| `toast.success.rentComplete`        | 우산 대여 완료!              | Rental Complete!           | 대여 성공 시               | 토스트 |      |      |
| `toast.success.rentSubmit`          | 대여신청 성공                | Rental Applied!            | 보관함 지점 대여 완료 시   | 토스트 |      |      |
| `toast.success.returnComplete`      | 우산 반납 완료!              | Return Complete!           | 반납 성공 시               | 토스트 |      |      |
| `toast.success.accountCopy`         | 계좌 복사 완료!              | Account Copied!            | 계좌 복사 시               | 토스트 |      |      |
| `toast.success.signupComplete`      | 회원가입이 완료되었습니다.   | Registration complete.     | 회원가입 성공 시           | 토스트 |      |      |
| `toast.success.logoutComplete`      | 로그아웃 되었습니다.         | You have been logged out.  | 로그아웃 시                | 토스트 |      |      |
| `toast.success.withdrawComplete`    | 회원탈퇴 완료했습니다!       | Account deleted!           | 회원탈퇴 시                | 토스트 |      |      |
| `toast.success.blacklistRegistered` | 블랙리스트로 등록되었습니다. | Registered as blacklisted. | 관리자: 블랙리스트 등록 시 | 토스트 |      |      |
| `toast.success.withdrawn`           | 탈퇴되었습니다.              | Account removed.           | 관리자: 완전 탈퇴 시       | 토스트 |      |      |
| `toast.success.changed`             | 변경되었습니다.              | Changes saved.             | 관리자: 권한 변경 시       | 토스트 |      |      |

### Toast 에러 메시지

| 키                               | 한국어                                                         | English                                          | 위치                    | 유형   | 변수 | 비고                                                                |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------ | ----------------------- | ------ | ---- | ------------------------------------------------------------------- |
| `toast.error.appleLoginFailed`   | Apple 로그인에 실패했습니다.                                   | Failed to receive Apple ID token.                | Apple 로그인 실패 시    | 토스트 |      |                                                                     |
| `toast.error.noIdToken`          | Apple ID 토큰을 받지 못했습니다.                               | A server error occurred.                         | Apple 토큰 에러 시      | 토스트 |      |                                                                     |
| `toast.error.serverError`        | 서버 오류가 발생했습니다.                                      | Login failed.                                    | 서버 에러 시            | 토스트 |      |                                                                     |
| `toast.error.loginFailed`        | 로그인에 실패했습니다.                                         | Apple login successful!                          | 로그인 실패 시          | 토스트 |      |                                                                     |
| `toast.success.appleLogin`       | Apple 로그인 성공!                                             | Apple login failed.                              | Apple 로그인 성공 시    | 토스트 |      | **분류 오류**: 성공 메시지이므로 위 Toast 성공 섹션에 포함되어야 함 |
| `toast.error.sessionExpired`     | 로그인 세션이 만료되었습니다. 다시 로그인해주세요.             | Your session has expired. Please log in again.   | 세션 만료 시            | 토스트 |      |                                                                     |
| `toast.error.retryError`         | 오류가 발생했습니다. 다시 시도해주세요.                        | An error occurred. Please try again.             | 회원탈퇴 에러 시        | 토스트 |      |                                                                     |
| `toast.error.defaultApi`         | 잘못된 요청이거나 서버 오류입니다.                             | Invalid request or server error.                 | API 에러 기본값         | 토스트 |      |                                                                     |
| `toast.error.kakaoAccount`       | 카카오 계정을 확인해주세요.                                    | Please check your Kakao account.                 | 카카오 로그인 실패 시   | 토스트 |      |                                                                     |
| `toast.error.userInfoFailed`     | 회원 정보를 가져오지 못했습니다.                               | Failed to retrieve user info.                    | 유저 정보 조회 실패 시  | 토스트 |      |                                                                     |
| `toast.error.badRequest`         | 잘못된 요청입니다. 다시 로그인 해주세요.                       | Invalid request. Please log in again.            | 잘못된 요청 시          | 토스트 |      |                                                                     |
| `toast.error.serverErrorShort`   | 서버 에러입니다.                                               | Server error.                                    | 로그아웃/스토어 에러 시 | 토스트 |      |                                                                     |
| `toast.error.storeImageRequired` | 지점 이미지가 존재하지 않으면 영업지점을 활성화할 수 없습니다. | A location cannot be activated without an image. | 관리자: 지점 활성화 시  | 토스트 |      |                                                                     |

---

## 11. SEO 메타데이터 (seo)

> 각 페이지의 `<title>`, `<meta description>`, `<meta keywords>`

| 키                            | 한국어                                                                                                                          | English                                                                                                     | 위치                     | 유형  | 변수 | 비고                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ | ----- | ---- | ---------------------- |
| `seo.default.prefix`          | 업브렐라(UPbrella) \| UPbrella \                                                                                                |                                                                                                             | 모든 페이지 title 접두사 | title |      |                        |
| `seo.default.suffix`          | 공유 우산 플랫폼                                                                                                                | Shared Umbrella Platform                                                                                    | title 기본 접미사        | title |      |                        |
| `seo.default.desc`            | 지구를 지키는 작은 우산, 업브렐라를 펼쳐주세요! A Better Choice, UPbrella                                                       | A small umbrella protecting the Earth. Open UPbrella! A Better Choice, UPbrella                             | 기본 description         | meta  |      |                        |
| `seo.default.keywords`        | 업브렐라, UPbrella, upbrella, Upbrella, 공유 우산 플랫폼, 우산 공유 플랫폼, 공유 우산, 우산, 공유 우산 서비스, 신촌, 연세대학교 | UPbrella, upbrella, shared umbrella platform, umbrella sharing, umbrella rental, Sinchon, Yonsei University | 기본 keywords            | meta  |      |                        |
| `seo.login.title`             | 로그인                                                                                                                          | Login                                                                                                       | /login                   | title |      |                        |
| `seo.login.desc`              | 업브렐라 서비스 이용을 위한 로그인 페이지입니다.                                                                                | Login page to use the UPbrella service.                                                                     | /login                   | meta  |      |                        |
| `seo.login.keywords`          | , 로그인, login                                                                                                                 |                                                                                                             | /login                   | meta  |      | 기본 keywords에 추가됨 |
| `seo.signup.title`            | 회원가입                                                                                                                        | Sign Up                                                                                                     | /members/signup/info     | title |      |                        |
| `seo.signup.desc`             | 업브렐라 서비스 이용을 위한 회원가입 페이지입니다.                                                                              | Sign up page to use the UPbrella service.                                                                   | /members/signup/info     | meta  |      |                        |
| `seo.signup.keywords`         | , 회원가입, sign up                                                                                                             |                                                                                                             | /members/signup/info     | meta  |      | 기본 keywords에 추가됨 |
| `seo.info.title`              | 이용안내                                                                                                                        | Service Guide                                                                                               | /information             | title |      |                        |
| `seo.info.desc`               | 지구를 지키는 작은 우산, 업브렐라 서비스의 이용방법 안내입니다.                                                                 | How to use UPbrella, the shared umbrella service protecting the Earth.                                      | /information             | meta  |      |                        |
| `seo.info.keywords`           | , 이용 안내, 이용 방법                                                                                                          |                                                                                                             | /information             | meta  |      | 기본 keywords에 추가됨 |
| `seo.contact.title`           | contact us                                                                                                                      | Contact Us                                                                                                  | /contact                 | title |      | 영문 유지 가능         |
| `seo.contact.desc`            | 업브렐라와 함께하고 싶으신가요?                                                                                                 | Want to partner with UPbrella?                                                                              | /contact                 | meta  |      |                        |
| `seo.rentalLocation.title`    | 대여소 위치                                                                                                                     | Rental Locations                                                                                            | /rentalLocation          | title |      |                        |
| `seo.rentalLocation.desc`     | 업브렐라와 함께하는 대여소 위치를 지도로 안내하는 페이지입니다.                                                                 | Find UPbrella rental locations on the map.                                                                  | /rentalLocation          | meta  |      |                        |
| `seo.rentalLocation.keywords` | , 대여소, 위치, 지도                                                                                                            |                                                                                                             | /rentalLocation          | meta  |      | 기본 keywords에 추가됨 |
| `seo.officeDetail.title`      | 협업 지점 소개                                                                                                                  | Partner Location Info                                                                                       | /rentalOffice/:id        | title |      |                        |
| `seo.officeDetail.desc`       | 업브렐라와 함께하는 협업 지점 소개 페이지입니다.                                                                                | Introducing partner locations collaborating with UPbrella.                                                  | /rentalOffice/:id        | meta  |      |                        |
| `seo.officeDetail.keywords`   | , 대여소, 지점, 소개                                                                                                            |                                                                                                             | /rentalOffice/:id        | meta  |      | 기본 keywords에 추가됨 |
| `seo.tos.title`               | 이용 약관                                                                                                                       | Terms of Service                                                                                            | /info/tos                | title |      |                        |
| `seo.tos.desc`                | 업브렐라 서비스 이용 약관 페이지입니다.                                                                                         | UPbrella Terms of Service page.                                                                             | /info/tos                | meta  |      |                        |
| `seo.pp.title`                | 개인정보처리방침                                                                                                                | Privacy Policy                                                                                              | /info/pp                 | title |      |                        |
| `seo.pp.desc`                 | 업브렐라 개인정보처리방침 페이지입니다.                                                                                         | UPbrella Privacy Policy page.                                                                               | /info/pp                 | meta  |      |                        |

---

## 12. 상수 데이터 (constants)

> 코드에 상수로 정의된 한국어 데이터

### 은행 이름

| 키                         | 한국어     | English      | 위치           | 유형   | 변수 | 비고 |
| -------------------------- | ---------- | ------------ | -------------- | ------ | ---- | ---- |
| `constants.bank.NH`        | NH농협     | NH Nonghyup  | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.kakao`     | 카카오뱅크 | KakaoBank    | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.KB`        | KB국민     | KB Kookmin   | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.shinhan`   | 신한       | Shinhan      | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.woori`     | 우리       | Woori        | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.toss`      | 토스뱅크   | Toss Bank    | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.IBK`       | IBK기업    | IBK          | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.hana`      | 하나       | KEB Hana     | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.saemaeul`  | 새마을     | MG Saemaul   | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.busan`     | 부산       | Busan        | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.daegu`     | 대구       | Daegu        | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.kbank`     | 케이뱅크   | K bank       | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.shinhyup`  | 신협       | Shinhyup     | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.epost`     | 우체국     | Korea Post   | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.SC`        | SC제일     | SC First     | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.gyeongnam` | 경남       | Gyeongnam    | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.gwangju`   | 광주       | Gwangju      | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.suhyup`    | 수협       | Suhyup       | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.jeonbuk`   | 전북       | Jeonbuk      | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.fsb`       | 저축은행   | Savings Bank | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.jeju`      | 제주       | Jeju         | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.citi`      | 씨티       | Citi         | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.KDB`       | KDB산업    | KDB          | 은행 선택 목록 | 은행명 |      |      |
| `constants.bank.nfcf`      | 산림조합   | NFCF         | 은행 선택 목록 | 은행명 |      |      |

### 요일

| 키                        | 한국어 | English   | 위치          | 유형 | 변수 | 비고 |
| ------------------------- | ------ | --------- | ------------- | ---- | ---- | ---- |
| `constants.day.monday`    | 월요일 | Monday    | 영업시간 표시 | 요일 |      |      |
| `constants.day.tuesday`   | 화요일 | Tuesday   | 영업시간 표시 | 요일 |      |      |
| `constants.day.wednesday` | 수요일 | Wednesday | 영업시간 표시 | 요일 |      |      |
| `constants.day.thursday`  | 목요일 | Thursday  | 영업시간 표시 | 요일 |      |      |
| `constants.day.friday`    | 금요일 | Friday    | 영업시간 표시 | 요일 |      |      |
| `constants.day.saturday`  | 토요일 | Saturday  | 영업시간 표시 | 요일 |      |      |
| `constants.day.sunday`    | 일요일 | Sunday    | 영업시간 표시 | 요일 |      |      |

---

## 13. 법률 문서 (legal)

> 이용약관과 개인정보처리방침은 분량이 크고 법률 번역이 필요하므로 별도 처리합니다.

| 문서             | 소스 파일                            | 비고                            |
| ---------------- | ------------------------------------ | ------------------------------- |
| 이용약관         | `src/components/pages/tos/index.tsx` | 제1조~전문. 법률 전문 번역 필요 |
| 개인정보처리방침 | `src/components/pages/pp/index.tsx`  | 1~전체항. 법률 전문 번역 필요   |

법률 문서는 본 시트에 포함하지 않습니다. 별도 Word/Google Docs 문서로 원문-번역 병렬 배치를 권장합니다.

---

## 13-1. 라우트 메타 이름 (routes)

> 라우트 정의 파일(`routes/*.ts`)에서 `name` 필드로 사용되는 내부 식별용 한국어. 사용자에게 직접 노출되지 않으나, i18n 일관성을 위해 기록합니다. 번역 우선순위: **낮음**

| 키                             | 한국어                    | English              | 위치                       | 유형        | 변수 | 비고 |
| ------------------------------ | ------------------------- | -------------------- | -------------------------- | ----------- | ---- | ---- |
| `routes.basic.main`            | 메인                      | Main                 | `basicRouter.ts`           | 라우트 메타 |      |      |
| `routes.basic.story`           | 업브렐라 이야기           | UPbrella Story       | `basicRouter.ts`           | 라우트 메타 |      |      |
| `routes.basic.info`            | 이용안내                  | Service Guide        | `basicRouter.ts`           | 라우트 메타 |      |      |
| `routes.basic.forbidden`       | 접근 금지 페이지          | Forbidden Page       | `basicRouter.ts`           | 라우트 메타 |      |      |
| `routes.layout.rentalLocation` | 대여소 위치 페이지        | Rental Locations     | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.layout.rentalOffice`   | 협업지점 소개 페이지      | Partner Locations    | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.layout.mypage.rent`    | 마이페이지\_이용내역      | Mypage_History       | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.layout.mypage.account` | 마이페이지\_환급계좌      | Mypage_RefundAccount | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.layout.mypage.info`    | 마이페이지\_개인정보      | Mypage_PersonalInfo  | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.layout.mypage.contact` | 마이페이지\_문의하기      | Mypage_Contact       | `layoutRouter.ts`          | 라우트 메타 |      |      |
| `routes.bgImage.login`         | 로그인 페이지             | Login Page           | `backgroundImageRouter.ts` | 라우트 메타 |      |      |
| `routes.bgImage.signup`        | 회원가입 정보 입력 페이지 | Sign Up Page         | `backgroundImageRouter.ts` | 라우트 메타 |      |      |
| `routes.notLayout.rentForm`    | 대여폼 페이지             | Rental Form Page     | `notLayoutRouter.ts`       | 라우트 메타 |      |      |
| `routes.notLayout.returnForm`  | 반납폼 페이지             | Return Form Page     | `notLayoutRouter.ts`       | 라우트 메타 |      |      |
| `routes.admin.rent`            | 대여/반납 현황 테이블     | Rental/Return Table  | `adminRouter.ts`           | 라우트 메타 |      |      |
| `routes.admin.feedback`        | 상태신고 / 개선사항 확인  | Reports / Feedback   | `adminRouter.ts`           | 라우트 메타 |      |      |

---

## 14. 관리자 (admin)

> 관리자 페이지 텍스트는 일반 사용자에게 노출되지 않습니다. 다국어 적용 우선순위가 낮으므로 필요 시 별도 문서화합니다.

### 관리자 공통

| 키                               | 한국어                                                       | English | 위치             | 유형        | 변수 | 비고                                                                                       |
| -------------------------------- | ------------------------------------------------------------ | ------- | ---------------- | ----------- | ---- | ------------------------------------------------------------------------------------------ |
| `admin.common.emptyResult`       | 결과가 없습니다.                                             |         | 테이블 빈 상태   | 안내        |      |                                                                                            |
| `admin.common.serverError`       | 서버 에러입니다.                                             |         | 테이블/에러      | 안내        |      |                                                                                            |
| `admin.common.loading`           | 데이터를 불러오는 중입니다.                                  |         | 로딩 상태        | 안내        |      |                                                                                            |
| `admin.common.loadError`         | 데이터를 불러오던 중 에러가 발생했습니다. 다시 요청해주세요. |         | 에러 상태        | 안내        |      |                                                                                            |
| `admin.common.add`               | 추가                                                         |         | 여러 관리 페이지 | 버튼        |      |                                                                                            |
| `admin.common.edit`              | 수정                                                         |         | 여러 모달        | 버튼        |      |                                                                                            |
| `admin.common.delete`            | 삭제                                                         |         | 여러 모달        | 버튼        |      |                                                                                            |
| `admin.common.save`              | 저장                                                         |         | 여러 모달        | 버튼        |      |                                                                                            |
| `admin.common.cancel`            | 취소                                                         |         | 여러 모달        | 버튼        |      |                                                                                            |
| `admin.common.confirm`           | 확인                                                         |         | 여러 모달        | 버튼        |      |                                                                                            |
| `admin.common.download`          | 데이터 다운로드                                              |         | 여러 관리 페이지 | 버튼        |      |                                                                                            |
| `admin.common.deleteConfirm`     | 정말 삭제하시겠습니까 ?                                      |         | 삭제 확인        | confirm     |      | **주의**: `LockerModal`에서는 "삭제하시겠습니까?"("정말" 없음, 물음표 앞 공백 없음)로 다름 |
| `admin.common.discardConfirm`    | 작성중인 내용이 모두 사라집니다.                             |         | 모달 닫기 시     | confirm     |      | **주의**: `UmbrellaModal`에서는 "작성하고 있는 내용이 사라집니다."("모두" 없음)로 다름     |
| `admin.common.requiredError`     | 필수값을 입력해주세요.                                       |         | 폼 제출 시       | 토스트 에러 |      |                                                                                            |
| `admin.common.requiredAllError`  | 필수값을 모두 입력해주세요.                                  |         | 폼 제출 시       | 토스트 에러 |      |                                                                                            |
| `admin.common.clientError`       | 클라이언트 에러가 발생했습니다.                              |         | API 에러 시      | 토스트 에러 |      |                                                                                            |
| `admin.common.serverErrorToast`  | 서버 에러가 발생했습니다.                                    |         | API 에러 시      | 토스트 에러 |      |                                                                                            |
| `admin.common.changeSuccess`     | 성공적으로 변경되었습니다.                                   |         | 변경 성공 시     | 토스트      |      |                                                                                            |
| `admin.common.deleteSuccess`     | 성공적으로 삭제하였습니다.                                   |         | 삭제 성공 시     | 토스트      |      |                                                                                            |
| `admin.common.cancelConfirm`     | 취소하시겠습니까?                                            |         | 취소 확인        | confirm     |      |                                                                                            |
| `admin.common.discardConfirmAlt` | 작성하고 있는 내용이 사라집니다.                             |         | 모달 닫기 시     | confirm     |      | `discardConfirm`의 대체 문구 (`UmbrellaModal` 등에서 사용)                                 |
| `admin.common.retry`             | 재시도                                                       |         | 에러 상태        | 버튼        |      |                                                                                            |

### 관리자 사이드 메뉴

| 키                     | 한국어                        | English | 위치                | 유형 | 변수 | 비고 |
| ---------------------- | ----------------------------- | ------- | ------------------- | ---- | ---- | ---- |
| `admin.menu.rent`      | 대여/반납 현황                |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.store`     | 협업지점 관리                 |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.umbrella`  | 우산 관리                     |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.user`      | 회원 관리                     |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.locker`    | 보관함 관리                   |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.feedback`  | 상태신고/개선사항             |         | 관리자 좌측 메뉴    | 네비 |      |      |
| `admin.menu.wrongPath` | 잘못된 경로로 들어오셨습니다. |         | 잘못된 경로 접근 시 | 안내 |      |      |

### 회원 관리

| 키                             | 한국어                                          | English | 위치               | 유형         | 변수                | 비고                      |
| ------------------------------ | ----------------------------------------------- | ------- | ------------------ | ------------ | ------------------- | ------------------------- |
| `admin.user.title`             | 유저 조회                                       |         | 회원 관리 페이지   | 제목         |                     |                           |
| `admin.user.count`             | 사용자 수 :                                     |         | 회원 관리          | 라벨         |                     |                           |
| `admin.user.searchPlaceholder` | 회원이름을 입력하세요                           |         | 회원 검색          | 플레이스홀더 |                     |                           |
| `admin.user.search`            | 검색                                            |         | 회원 검색          | 버튼         |                     |                           |
| `admin.user.reset`             | 초기화                                          |         | 회원 검색          | 버튼         |                     |                           |
| `admin.user.blacklistBtn`      | 블랙리스트 등록                                 |         | 회원 관리          | 버튼         |                     |                           |
| `admin.user.blacklistTitle`    | 블랙 리스트 유저 조회                           |         | 회원 관리          | 제목         |                     |                           |
| `admin.user.fullWithdraw`      | 완전 탈퇴                                       |         | 블랙리스트 관리    | 버튼         |                     |                           |
| `admin.user.blacklistConfirm`  | "{{name}}" 유저를 블랙리스트 등록하시겠습니까 ? |         | 블랙리스트 등록 시 | confirm      | `{{name}}` = 유저명 |                           |
| `admin.user.withdrawConfirm`   | {{id}} 유저를 완전 탈퇴시키겠습니까 ?           |         | 완전 탈퇴 시       | confirm      | `{{id}}` = 유저 ID  |                           |
| `admin.user.roleConfirm`       | {{name}} 의 권한을 변경하시겠습니까?            |         | 권한 변경 시       | confirm      | `{{name}}` = 유저명 |                           |
| `admin.user.col.id`            | 사용자 고유번호                                 |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.name`          | 사용자 이름                                     |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.phone`         | 전화번호                                        |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.bank`          | 은행                                            |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.account`       | 계좌번호                                        |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.email`         | 이메일                                          |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.admin`         | 관리자 여부                                     |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.createdAt`     | 가입 날짜                                       |         | 회원 테이블        | 컬럼 헤더    |                     |                           |
| `admin.user.col.blockedAt`     | 블랙리스트 등재 시간                            |         | 블랙리스트 테이블  | 컬럼 헤더    |                     |                           |
| `admin.user.excelFileName`     | 회원\_조회\_                                    |         | 엑셀 다운로드      | 파일명       |                     | 다운로드 시 파일명 접두사 |

### 지점 관리

| 키                                          | 한국어                                                         | English | 위치               | 유형         | 변수                      | 비고                                                                                                                                 |
| ------------------------------------------- | -------------------------------------------------------------- | ------- | ------------------ | ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `admin.store.listTitle`                     | 협업지점 목록                                                  |         | 지점 관리          | 제목         |                           |                                                                                                                                      |
| `admin.store.columns.name`                  | 협업 지점명                                                    |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.address`               | 주소                                                           |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.image`                 | 이미지                                                         |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.active`                | 활성여부                                                       |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.category`              | 분류                                                           |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.location`              | 우산위치                                                       |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.hours`                 | 영업시간                                                       |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.contact`               | 연락처                                                         |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.instagram`             | 인스타                                                         |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.columns.intro`                 | 소개                                                           |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.qr`                            | QR 코드                                                        |         | 지점 관리 테이블   | 컬럼 헤더    |                           |                                                                                                                                      |
| `admin.store.imageUpload`                   | 이미지 업로드 및 확인                                          |         | 지점 관리          | 버튼         |                           |                                                                                                                                      |
| `admin.store.qrDownload`                    | QR 이미지 다운로드                                             |         | QR 코드 모달       | 버튼         |                           |                                                                                                                                      |
| `admin.store.activeConfirm`                 | {{name}} 의 활성여부를 변경하시겠어요?                         |         | 활성화 토글 시     | confirm      | `{{name}}` = 지점명       |                                                                                                                                      |
| `admin.store.modalAdd`                      | 협업지점 추가                                                  |         | 지점 생성 모달     | 제목         |                           |                                                                                                                                      |
| `admin.store.modalEdit`                     | 협업지점 수정                                                  |         | 지점 수정 모달     | 제목         |                           |                                                                                                                                      |
| `admin.store.form.name`                     | 협업 지점명                                                    |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.namePlaceholder`          | 업브렐라 1호점                                                 |         | 지점 폼            | 플레이스홀더 |                           |                                                                                                                                      |
| `admin.store.form.category`                 | 지점 분류                                                      |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.categoryPlaceholder`      | 카페, 디저트                                                   |         | 지점 폼            | 플레이스홀더 |                           |                                                                                                                                      |
| `admin.store.form.majorClassification`      | 대분류                                                         |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.subClassification`        | 소분류                                                         |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.regionTag`                | 대여소 위치 내 지역 태그                                       |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.officeTag`                | 협업지점 소개페이지 내 지역 태그                               |         | 지점 폼            | 라벨         |                           | **코드 불일치**: `StoreModalBody`에서는 붙여쓰기, `SubClassificationTagList` 제목에서는 "협업 지점 소개 페이지"(띄어쓰기). 통일 필요 |
| `admin.store.form.hoursDisplay`             | 영업 시간(화면 출력용)                                         |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.hoursMarker`              | 영업 시간(마커 활성화 여부용)                                  |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.defaultBusinessHour`           | 매일 12:30 ~ 23:00                                             |         | 지점 폼            | 기본값       |                           | 영업시간 기본값                                                                                                                      |
| `admin.store.form.address`                  | 주소                                                           |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.addressSearchPlaceholder` | 주소 검색 후 선택해주세요.                                     |         | 지점 폼            | 플레이스홀더 |                           |                                                                                                                                      |
| `admin.store.form.detailAddress`            | 상세 주소                                                      |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.detailAddressPlaceholder` | 상세 주소를 입력해주세요.                                      |         | 지점 폼            | 플레이스홀더 |                           |                                                                                                                                      |
| `admin.store.form.latitude`                 | 위도                                                           |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.longitude`                | 경도                                                           |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.umbrellaLocation`         | 우산 위치 설명                                                 |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.contact`                  | 연락처                                                         |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.numberPlaceholder`        | 숫자만 입력해주세요.                                           |         | 지점 폼            | 플레이스홀더 |                           | 연락처 등 숫자 필드                                                                                                                  |
| `admin.store.form.instagram`                | 인스타그램 계정                                                |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.content`                  | 소개글                                                         |         | 지점 폼            | 라벨         |                           |                                                                                                                                      |
| `admin.store.form.contentCharCount`         | {{count}} / 200자 입력 가능                                    |         | 지점 폼            | 안내         | `{{count}}` = 현재 글자수 |                                                                                                                                      |
| `admin.store.form.dayLabel`                 | 요일                                                           |         | 영업시간 설정      | 라벨         |                           |                                                                                                                                      |
| `admin.store.toast.editSuccess`             | 지점이 수정 되었습니다.                                        |         | 지점 수정 성공     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.createSuccess`           | 지점이 생성 되었습니다.                                        |         | 지점 생성 성공     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.deleteSuccess`           | 지점이 삭제 되었습니다.                                        |         | 지점 삭제 성공     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.editFail`                | 수정에 실패했어요.                                             |         | 지점 수정 실패     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.createFail`              | 생성에 실패했어요.                                             |         | 지점 생성 실패     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.deleteFail`              | 삭제에 실패했어요.                                             |         | 지점 삭제 실패     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.coordError`              | 위도, 경도 정보를 못 받아왔습니다. 다시 주소를 입력해주세요.   |         | 주소 검색 실패     | 토스트       |                           |                                                                                                                                      |
| `admin.store.toast.imageRequired`           | 지점 이미지가 존재하지 않으면 영업지점을 활성화할 수 없습니다. |         | 지점 활성화 실패   | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.title`                   | 협업지점 이미지 업로드 및 조회                                 |         | 이미지 모달        | 제목         |                           |                                                                                                                                      |
| `admin.store.image.upload`                  | 이미지 업로드                                                  |         | 이미지 모달        | 버튼         |                           |                                                                                                                                      |
| `admin.store.image.thumbnail`               | 썸네일                                                         |         | 이미지 목록        | 라벨         |                           |                                                                                                                                      |
| `admin.store.image.maxSize`                 | 이미지 업로드 용량은 최대 10MB 입니다.                         |         | 이미지 업로드 시   | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.uploadSuccess`           | 이미지 업로드 성공 !                                           |         | 이미지 업로드 성공 | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.uploadFail`              | 이미지 업로드에 실패했어요.                                    |         | 이미지 업로드 실패 | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.deleteSuccess`           | 이미지 삭제 성공 !                                             |         | 이미지 삭제 성공   | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.deleteFail`              | 이미지 삭제에 실패했어요.                                      |         | 이미지 삭제 실패   | 토스트       |                           |                                                                                                                                      |
| `admin.store.image.empty`                   | 이미지를 업로드 해주세요.                                      |         | 이미지 빈 상태     | 안내         |                           |                                                                                                                                      |
| `admin.store.tag.regionTitle`               | 대여소 위치 페이지 내 지역 태그                                |         | 태그 관리          | 제목         |                           |                                                                                                                                      |
| `admin.store.tag.regionAddTitle`            | 대여소 위치 페이지 내 지역 태그 추가                           |         | 태그 추가 모달     | 제목         |                           |                                                                                                                                      |
| `admin.store.tag.regionViewTitle`           | 대여소 위치 페이지 내 지역 태그 조회                           |         | 태그 조회          | 제목         |                           |                                                                                                                                      |
| `admin.store.tag.officeTitle`               | 협업 지점 소개 페이지 내 지역 태그                             |         | 태그 관리          | 제목         |                           |                                                                                                                                      |
| `admin.store.tag.officeAddTitle`            | 협업 지점 소개 페이지 내 지역 태그 추가                        |         | 태그 추가 모달     | 제목         |                           |                                                                                                                                      |
| `admin.store.tag.nameLabel`                 | 태그 이름 :                                                    |         | 태그 추가 모달     | 라벨         |                           |                                                                                                                                      |
| `admin.store.tag.nameError`                 | 이름을 입력해주세요.                                           |         | 태그 추가 시       | 토스트       |                           |                                                                                                                                      |
| `admin.store.tag.createSuccess`             | 태그 생성이 되었습니다.                                        |         | 태그 생성 성공     | 토스트       |                           |                                                                                                                                      |
| `admin.store.tag.deleteSuccess`             | 태그가 삭제 되었습니다.                                        |         | 태그 삭제 성공     | 토스트       |                           |                                                                                                                                      |

### 우산 관리

| 키                                   | 한국어                             | English | 위치             | 유형         | 변수                     | 비고               |
| ------------------------------------ | ---------------------------------- | ------- | ---------------- | ------------ | ------------------------ | ------------------ |
| `admin.umbrella.addNew`              | 우산 새로 추가                     |         | 우산 관리        | 버튼         |                          |                    |
| `admin.umbrella.rentInfo`            | "{{name}}" 우산 대여 정보          |         | 우산 대여 현황   | 제목         | `{{name}}` = 지점명/전체 |                    |
| `admin.umbrella.tableTitle`          | 우산 관리 테이블                   |         | 우산 관리        | 제목         |                          |                    |
| `admin.umbrella.storeFilter`         | 지점 필터                          |         | 필터 드롭다운    | 라벨         |                          |                    |
| `admin.umbrella.all`                 | 전체                               |         | 필터 옵션        | 옵션         |                          |                    |
| `admin.umbrella.downloadList`        | 우산 목록 다운로드                 |         | 엑셀 다운로드    | 버튼         |                          |                    |
| `admin.umbrella.deleteConfirm`       | {{id}} 번 우산을 삭제하시겠습니까? |         | 우산 삭제 시     | confirm      | `{{id}}` = 우산 번호     |                    |
| `admin.umbrella.deleteBtn`           | 우산 삭제                          |         | 우산 관리 테이블 | 버튼         |                          |                    |
| `admin.umbrella.modalAdd`            | 우산 추가                          |         | 우산 추가 모달   | 제목         |                          |                    |
| `admin.umbrella.modalEdit`           | 우산 수정                          |         | 우산 수정 모달   | 제목         |                          |                    |
| `admin.umbrella.form.uuid`           | 우산 관리번호                      |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.location`       | 현위치                             |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.storeLabel`     | 지점                               |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.rentable`       | 대여 가능 여부                     |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.rentableYes`    | 대여 가능                          |         | 라디오 버튼      | 옵션         |                          |                    |
| `admin.umbrella.form.rentableNo`     | 대여 불가능                        |         | 라디오 버튼      | 옵션         |                          |                    |
| `admin.umbrella.form.missing`        | 분실 여부                          |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.etc`            | 비고                               |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.form.qr`             | QR코드                             |         | 우산 폼          | 라벨         |                          |                    |
| `admin.umbrella.status.rentable`     | 대여 가능                          |         | 테이블 상태값    | 상태         |                          |                    |
| `admin.umbrella.status.rented`       | 대여 불가능(대여 중)               |         | 테이블 상태값    | 상태         |                          |                    |
| `admin.umbrella.col.totalRent`       | 전체 대여 건수                     |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.totalCount`      | 전체 우산 개수                     |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.rentableCount`   | 대여 가능한 우산 개수              |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.rentedCount`     | 대여 중인 우산 개수                |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.missingCount`    | 분실 우산 개수                     |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.missingRate`     | 분실률(%)                          |         | 통계 테이블      | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.id`              | id                                 |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.uuid`            | 우산 관리번호                      |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.historyId`       | 현재 대여 일련번호(NO)             |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.storeMetaId`     | 현위치(지점번호)                   |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.rentableLabel`   | 가용 여부                          |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.col.etc`             | 비고                               |         | 우산 관리 테이블 | 컬럼 헤더    |                          |                    |
| `admin.umbrella.excelFileName`       | {{storeName}}\_우산\_조회          |         | 엑셀 다운로드    | 파일명       | `{{storeName}}` = 지점명 | 다운로드 시 파일명 |
| `admin.umbrella.form.etcPlaceholder` | 기타 사항을 작성해주세요.          |         | 우산 폼          | 플레이스홀더 |                          |                    |
| `admin.umbrella.toast.createSuccess` | 우산 생성이 완료되었습니다.        |         | 우산 생성 성공   | 토스트       |                          |                    |
| `admin.umbrella.toast.editSuccess`   | 우산 수정이 완료되었습니다.        |         | 우산 수정 성공   | 토스트       |                          |                    |
| `admin.umbrella.toast.deleteSuccess` | 우산이 삭제 되었습니다.            |         | 우산 삭제 성공   | 토스트       |                          |                    |

### 대여/반납 현황 관리

| 키                                | 한국어                            | English | 위치             | 유형      | 변수 | 비고                      |
| --------------------------------- | --------------------------------- | ------- | ---------------- | --------- | ---- | ------------------------- |
| `admin.rent.title`                | 대여, 반납 현황 조회              |         | 대여 현황 페이지 | 제목      |      |                           |
| `admin.rent.refundFilter`         | 보증금 환급 여부                  |         | 필터 드롭다운    | 라벨      |      |                           |
| `admin.rent.filterAll`            | 전체                              |         | 필터 옵션        | 옵션      |      |                           |
| `admin.rent.filterIncomplete`     | 미완료                            |         | 필터 옵션        | 옵션      |      |                           |
| `admin.rent.filterComplete`       | 환급 완료                         |         | 필터 옵션        | 옵션      |      |                           |
| `admin.rent.deleteAccountBtn`     | 계좌 정보 삭제                    |         | 대여 현황 테이블 | 버튼      |      |                           |
| `admin.rent.deleteAccountConfirm` | 계좌정보를 삭제하시겠습니까 ?     |         | 계좌 삭제 시     | confirm   |      |                           |
| `admin.rent.deleteAfterRefund`    | 보증금 환급 후에 삭제 가능합니다. |         | 미환급 상태      | 안내      |      |                           |
| `admin.rent.col.id`               | 일련 번호                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.name`             | 이름                              |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.phone`            | 전화번호                          |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.rentStore`        | 대여 지점                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.rentAt`           | 대여 날짜                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.umbrellaUuid`     | 우산 고유 번호                    |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.elapsedDay`       | 대여 경과 일수                    |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.depositPaid`      | 보증금 입금 여부                  |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.depositPaidYes`   | 입금                              |         | 입금 상태값      | 옵션      |      |                           |
| `admin.rent.col.depositPaidNo`    | 미입금                            |         | 미입금 상태값    | 옵션      |      |                           |
| `admin.rent.col.refunded`         | 보증금 환급 여부                  |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.bank`             | 환급 은행                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.accountNumber`    | 환급 계좌 번호                    |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.returnAt`         | 반납 날짜                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.returnStore`      | 반납 지점                         |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.totalRentalDay`   | 총 대여 기간                      |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.col.etc`              | 비고                              |         | 대여 현황 테이블 | 컬럼 헤더 |      |                           |
| `admin.rent.excelFileName`        | 대여\_반납\_조회\_                |         | 엑셀 다운로드    | 파일명    |      | 다운로드 시 파일명 접두사 |

> **참고**: 입금/환급 변경 및 계좌 삭제 성공 토스트는 `admin.common.changeSuccess`, `admin.common.deleteSuccess`를 사용합니다.

### 보관함 관리

| 키                                 | 한국어                                      | English | 위치               | 유형      | 변수                      | 비고 |
| ---------------------------------- | ------------------------------------------- | ------- | ------------------ | --------- | ------------------------- | ---- |
| `admin.locker.title`               | 보관함 목록                                 |         | 보관함 관리        | 제목      |                           |      |
| `admin.locker.empty`               | 생성한 보관함이 없습니다.                   |         | 보관함 빈 상태     | 안내      |                           |      |
| `admin.locker.storeColumn`         | 협업 지점                                   |         | 보관함 테이블      | 컬럼 헤더 |                           |      |
| `admin.locker.invalidStore`        | 잘못된 지점입니다.                          |         | 보관함 테이블 폴백 | 안내      |                           |      |
| `admin.locker.secretKey`           | 비밀키                                      |         | 보관함 테이블      | 컬럼 헤더 |                           |      |
| `admin.locker.modalAdd`            | 보관함 추가                                 |         | 보관함 추가 모달   | 제목      |                           |      |
| `admin.locker.modalEdit`           | 보관함 수정 및 삭제                         |         | 보관함 수정 모달   | 제목      |                           |      |
| `admin.locker.form.store`          | 협업 지점                                   |         | 보관함 폼          | 라벨      |                           |      |
| `admin.locker.form.secretKey`      | 보관함 비밀키                               |         | 보관함 폼          | 라벨      |                           |      |
| `admin.locker.form.storeLabel`     | 지점                                        |         | 보관함 폼 드롭다운 | 라벨      |                           |      |
| `admin.locker.form.secretLabel`    | 비밀키                                      |         | 보관함 폼 입력란   | 라벨      |                           |      |
| `admin.locker.form.secretMinError` | 비밀키는 최소 {{count}}자 이상이여야합니다. |         | 보관함 폼          | 에러      | `{{count}}` = 최소 글자수 |      |
| `admin.locker.deleteConfirm`       | 삭제하시겠습니까?                           |         | 보관함 삭제 시     | confirm   |                           |      |
| `admin.locker.toast.createSuccess` | 보관함 정보가 생성되었습니다.               |         | 보관함 생성 성공   | 토스트    |                           |      |
| `admin.locker.toast.editSuccess`   | 보관함 정보가 수정되었습니다.               |         | 보관함 수정 성공   | 토스트    |                           |      |
| `admin.locker.toast.deleteSuccess` | 보관함 정보가 삭제되었습니다.               |         | 보관함 삭제 성공   | 토스트    |                           |      |

### 피드백/상태신고 관리

| 키                                | 한국어                       | English | 위치          | 유형      | 변수 | 비고 |
| --------------------------------- | ---------------------------- | ------- | ------------- | --------- | ---- | ---- |
| `admin.feedback.reportTitle`      | 신고 내역 조회 - 대여폼      |         | 피드백 관리   | 제목      |      |      |
| `admin.feedback.improvementTitle` | 개선 요청 내역 조회 - 반납폼 |         | 피드백 관리   | 제목      |      |      |
| `admin.feedback.col.umbrellaUuid` | 우산 고유번호                |         | 피드백 테이블 | 컬럼 헤더 |      |      |
| `admin.feedback.col.content`      | 내용                         |         | 피드백 테이블 | 컬럼 헤더 |      |
