# i18n Google Sheets 자동 배포 파이프라인

Google Sheets에서 번역을 관리하고, 기획팀이 "번역 배포" 메뉴를 클릭하면 GitHub Actions가 자동으로 번역을 다운로드하여 빌드 및 배포하는 파이프라인입니다.

## 아키텍처

```
번역 담당자 → Google Sheets 수정 → "번역 배포" 클릭
                                        ↓
                              Google Apps Script
                                        ↓
                          GitHub Actions (repository_dispatch)
                                        ↓
                    release 브랜치 checkout → CSV 다운로드
                                        ↓
                          pnpm run i18n:generate
                                        ↓
                      translations.csv + JSON 커밋/푸시
                                        ↓
                              pnpm run build
                                        ↓
                      S3 업로드 + CloudFront 캐시 무효화
```

## 관련 파일

| 파일 | 역할 |
|---|---|
| `.github/workflows/sync-translations.yml` | Google Sheets → 빌드 → 배포 워크플로우 |
| `.github/workflows/release-production.yml` | 기존 프로덕션 배포 (release 브랜치 push 시) |
| `scripts/generate-i18n.ts` | CSV → JSON 변환 스크립트 |
| `translations.csv` | 번역 원본 CSV (repo에 커밋됨) |
| `src/shared/lib/i18n/locales/ko.json` | 생성된 한국어 번역 JSON |
| `src/shared/lib/i18n/locales/en.json` | 생성된 영어 번역 JSON |
| `src/shared/lib/i18n/index.ts` | i18next 초기화 (fallbackLng: "ko") |

## 트리거 방식

| 트리거 | 누가 사용 | 브랜치 | 배포 |
|---|---|---|---|
| Google Sheets "번역 배포" 버튼 (`repository_dispatch`) | 기획팀 | release (고정) | O |
| GitHub Actions UI 수동 실행 (`workflow_dispatch`) | 개발자 | 선택 가능 (기본 release) | 선택 가능 (기본 true) |

## 초기 셋업 가이드

### 1. Google Sheets 설정

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 현재 `translations.csv`의 내용을 시트에 붙여넣기 (A열: key, B열: ko, C열: en)
3. **파일 > 공유 > 웹에 게시** 클릭
4. 형식을 **CSV**로 선택 후 "게시" 클릭
5. 생성된 URL을 저장 (아래 형태):
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid=0
   ```

> "웹에 게시"와 "링크 공유"는 다릅니다. 반드시 "웹에 게시"로 CSV 내보내기를 활성화해야 합니다.

#### 시트 보호 설정 (권장)

기획팀이 실수로 헤더를 수정하는 것을 방지하려면:

1. 1행 (key, ko, en 헤더) 선택
2. **데이터 > 시트 및 범위 보호** 클릭
3. 해당 범위를 소유자만 수정 가능하게 설정

#### 기획팀 초대

- 공유 버튼 > 기획팀 멤버의 Google 계정 이메일 입력 > **편집자(Editor)** 권한으로 초대

### 2. Google Apps Script 설정

1. Google Sheets에서 **확장 프로그램 > Apps Script** 클릭
2. 아래 코드를 붙여넣기:

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("번역 배포")
    .addItem("프로덕션에 반영하기", "triggerGitHubAction")
    .addToUi();
}

function triggerGitHubAction() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "번역 배포",
    "현재 번역 내용을 프로덕션에 반영합니다.\n계속하시겠습니까?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  const GITHUB_TOKEN =
    PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");

  // {OWNER}와 {REPO}를 실제 값으로 교체하세요
  const url = "https://api.github.com/repos/{OWNER}/{REPO}/dispatches";

  UrlFetchApp.fetch(url, {
    method: "POST",
    headers: {
      Authorization: "token " + GITHUB_TOKEN,
      Accept: "application/vnd.github.v3+json",
    },
    payload: JSON.stringify({
      event_type: "translation-update",
    }),
  });

  ui.alert(
    "배포가 시작되었습니다!\nGitHub Actions에서 진행 상황을 확인할 수 있습니다."
  );
}
```

3. `{OWNER}`와 `{REPO}`를 실제 GitHub 저장소 정보로 교체
4. **프로젝트 설정 > 스크립트 속성**에서 `GITHUB_TOKEN`을 추가하고 GitHub PAT 값 입력

### 3. GitHub PAT 생성

1. GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens
2. **New token** 생성
3. Repository access: 해당 repo 선택
4. Permissions: **Contents** (Read and write) 필요
5. 생성된 토큰을 Apps Script 스크립트 속성에 `GITHUB_TOKEN`으로 저장

### 4. GitHub Repository Secrets 추가

Repository > Settings > Secrets and variables > Actions에서 추가:

| Secret 이름 | 값 | 설명 |
|---|---|---|
| `GOOGLE_SHEET_CSV_URL` | `https://docs.google.com/spreadsheets/d/{ID}/export?format=csv&gid=0` | Sheets CSV 내보내기 URL |

기존 시크릿(AWS, VITE_* 등)은 이미 설정되어 있으므로 이것만 추가하면 됩니다.

## 테스트 방법

### Phase 1: develop 브랜치에서 CI 검증

1. 워크플로우 파일이 포함된 브랜치를 push
2. GitHub Actions > **Sync Translations from Google Sheets** > **Run workflow** 클릭
3. 파라미터 설정:
   - `target_branch`: `develop` (또는 현재 테스트 브랜치)
   - `deploy`: `false` (배포 스킵)
4. CSV 다운로드 → i18n:generate → 빌드가 정상적으로 완료되는지 확인

### Phase 2: release 브랜치에서 실제 배포

1. Google Sheets + Apps Script 설정 완료 후
2. Sheets에서 **번역 배포 > 프로덕션에 반영하기** 클릭
3. GitHub Actions에서 release 브랜치 기반으로 빌드 및 배포가 실행되는지 확인

## 빈 번역 값 처리

`en` 컬럼이 비어있는 경우, `generate-i18n.ts`가 해당 키를 JSON에서 제외합니다.
i18next의 `fallbackLng: "ko"` 설정에 의해 **자동으로 한국어가 표시**됩니다.

```
Google Sheets:          화면 표시 (영어 모드):
key        | ko     | en       →
───────────┼────────┼──────    ─────────────────
nav.login  | 로그인  |          "로그인" (ko 폴백)
nav.logout | 로그아웃 | Logout   "Logout" (en 사용)
```

기획팀이 en 번역을 채워넣으면, 다음 배포 시 자동으로 반영됩니다.

## 두 가지 배포 경로

이 프로젝트는 독립적인 두 가지 배포 경로가 존재합니다:

```
[코드 변경]  develop → release (push) → release-production.yml → S3/CloudFront
[번역 변경]  Google Sheets → Apps Script → sync-translations.yml → S3/CloudFront
```

두 경로 모두 최종적으로 `release` 브랜치 기반으로 빌드하고 동일한 S3/CloudFront에 배포합니다.

## CSV 컬럼 규칙

| 컬럼 | 필수 | 설명 |
|---|---|---|
| `key` | O | 번역 키 (예: `common.nav.login`) |
| `ko` | O | 한국어 번역 |
| `en` | X | 영어 번역 (비어있으면 ko 폴백) |

- 키는 dot notation으로 작성 (예: `page.section.element`)
- 값에 쉼표가 포함되면 큰따옴표로 감싸기 (예: `"안녕하세요, 반갑습니다"`)
- i18next 보간 문법 사용 가능 (예: `{{name}}님`)

## 문제 해결

### CSV 다운로드 실패

- Google Sheets "웹에 게시" 설정이 활성화되어 있는지 확인
- `GOOGLE_SHEET_CSV_URL` secret 값이 올바른지 확인
- URL 형식: `https://docs.google.com/spreadsheets/d/{ID}/export?format=csv&gid=0`

### Apps Script에서 GitHub Action이 트리거되지 않음

- `GITHUB_TOKEN` 스크립트 속성이 설정되어 있는지 확인
- PAT의 권한에 해당 repo의 Contents (Read and write) 가 포함되어 있는지 확인
- Apps Script URL의 `{OWNER}/{REPO}`가 올바른지 확인

### 빌드 실패

- CSV 파일의 헤더가 `key,ko,en` 형식인지 확인
- 모든 행에 최소 3개 컬럼이 있는지 확인
- 큰따옴표가 올바르게 닫혀있는지 확인
