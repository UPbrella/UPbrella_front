## Google Sheets 전환 가이드

### 이 문서를 Google Sheets로 옮기는 방법

1. **GitHub에서 이 Markdown 파일을 열기** → 테이블을 복사
2. **Google Sheets 새 시트 생성**
3. 각 섹션을 **별도 탭(시트)**으로 분리
   - 탭 1: 공통 UI
   - 탭 2: 홈/스토리
   - 탭 3: 이용안내
   - ... (문서 섹션 순서와 동일)
4. **English 컬럼**에 번역을 채움
5. 완성 후 **개발자를 시트에 초대** (편집 권한)

### 또는: CSV 자동 변환

개발자가 이 Markdown 파일에서 CSV를 자동 추출하는 스크립트를 제공할 수 있습니다.
필요하면 개발자에게 요청해주세요.

### 번역 완료 후 워크플로우

```
1. 기획자: Google Sheets에서 English 컬럼 채움
2. 기획자: 개발자를 시트에 초대
3. 개발자: 시트 → i18n JSON 파일로 변환 (자동화 스크립트)
4. 개발자: 코드에 i18n 적용
5. 양측: QA 진행
```

### i18n 키와 FSD 코드 구조 매핑 (개발자 참고)

번역 키의 **프리픽스**가 FSD 슬라이스와 1:1 매핑됩니다:

| 키 프리픽스        | i18n 네임스페이스 파일          | FSD 슬라이스                                |
| ------------------ | ------------------------------- | ------------------------------------------- |
| `common.*`         | `locales/{lang}/common.json`    | `shared/`                                   |
| `auth.*`           | `locales/{lang}/auth.json`      | `features/auth/`                            |
| `rent.*`           | `locales/{lang}/rent.json`      | `features/rent-form/`                       |
| `return.*`         | `locales/{lang}/return.json`    | `features/return-form/`                     |
| `mypage.*`         | `locales/{lang}/mypage.json`    | `pages/mypage/`                             |
| `story.*`          | `locales/{lang}/story.json`     | `pages/story/`                              |
| `info.*`           | `locales/{lang}/info.json`      | `pages/info/`                               |
| `contact.*`        | `locales/{lang}/contact.json`   | `features/contact/`                         |
| `store.*`          | `locales/{lang}/store.json`     | `entities/store/`                           |
| `seo.*`            | `locales/{lang}/seo.json`       | `shared/`                                   |
| `toast.*`          | `locales/{lang}/toast.json`     | `shared/`                                   |
| `constants.*`      | `locales/{lang}/constants.json` | `shared/config/`                            |
| `admin.common.*`   | `locales/{lang}/admin.json`     | `shared/` (관리자 공통)                     |
| `admin.user.*`     | `locales/{lang}/admin.json`     | `features/admin-user/`                      |
| `admin.store.*`    | `locales/{lang}/admin.json`     | `features/admin-store/`                     |
| `admin.umbrella.*` | `locales/{lang}/admin.json`     | `features/admin-umbrella/`                  |
| `admin.rent.*`     | `locales/{lang}/admin.json`     | `features/admin-rent/`                      |
| `admin.locker.*`   | `locales/{lang}/admin.json`     | `features/admin-locker/`                    |
| `admin.feedback.*` | `locales/{lang}/admin.json`     | `features/admin-feedback/`                  |
| `routes.*`         | `locales/{lang}/routes.json`    | 각 라우트 파일 (내부 식별용, 우선순위 낮음) |

---

## 부록: 코드-시트 정합성 검토 결과

> 마지막 검토일: 2026-03-25

### 검토 요약

| 항목                                                            | 상태                                  |
| --------------------------------------------------------------- | ------------------------------------- |
| 시트 커버리지 (코드의 사용자 노출 텍스트 중 시트에 포함된 비율) | **약 95%**                            |
| 코드 매칭률 (시트의 한국어가 코드에 정확히 존재하는 비율)       | **약 98%**                            |
| i18n 라이브러리                                                 | **미도입** (모든 문자열 하드코딩)     |
| 번역 JSON 파일                                                  | **미생성** (`locales/` 디렉터리 없음) |

### 수정 반영된 사항

| #   | 유형        | 내용                                            | 해당 키                                                             |
| --- | ----------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| 1   | 오타 수정   | `업브레라` → `업브렐라`                         | `contact.instagramBtn`                                              |
| 2   | 따옴표 통일 | ASCII `'` → 유니코드 `\u2018\u2019` (코드 기준) | `story.s4.line1`, `return.form.accountHint1`, `mypage.account.hint` |
| 3   | 비고 추가   | 모달 따옴표 조합 방식 주석                      | `rent.modal.confirmLine1/2`, `return.modal.confirmLine1/2`          |
| 4   | 비고 수정   | 404 미사용 명시                                 | `common.error.pageNotFound`                                         |
| 5   | 비고 추가   | 띄어쓰기 불일치 명시                            | `mypage.info.title`                                                 |
| 6   | 비고 추가   | 타임라인 연도 공백 명시                         | `story.s7.yearSuffix`                                               |
| 7   | 섹션 추가   | 라우트 메타 이름 (13-1)                         | `routes.*` 16개 항목                                                |
| 8   | 참고 강화   | 타임라인 `data.ts` 번역 대상 명시               | `story.s7` 참고 메모                                                |

### i18n 적용 전 필수 조치 사항

1. **띄어쓰기 통일**: `개인정보 조회` vs `개인정보조회` — 네비와 카드 제목 간 불일치 해소
2. **따옴표 문자 통일 방향 결정**: 코드는 유니코드 곱슬따옴표(`\u2018\u2019`) 사용 중. i18n JSON에서 어떤 형태로 통일할지 결정 필요
3. **404 페이지 제목**: `common.error.pageNotFound`가 실제 404에서 미사용. 별도 키 필요 여부 결정
4. **타임라인 데이터**: `story/data.ts`의 마케팅 콘텐츠 번역 범위 결정

### 시트에 미포함된 코드 내 한국어 (낮은 우선순위)

| 항목                 | 위치                     | 설명                                    |
| -------------------- | ------------------------ | --------------------------------------- |
| 라우트 메타 이름     | `routes/*.ts`            | 본 문서 섹션 13-1에 추가됨              |
| 타임라인 역사적 사실 | `story/data.ts`          | 개강 이벤트, 우산 제작 등 마케팅 콘텐츠 |
| 계좌 상수 데이터     | `constants/Account.ts`   | `ACCOUNT_NAME` 등 실제 운영 데이터      |
| 코드 주석 한국어     | `types/*.ts`, `api/*.ts` | 개발자용 주석으로 번역 불필요           |
