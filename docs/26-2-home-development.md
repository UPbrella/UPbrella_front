# 홈 개발 환경 및 Vercel 미리보기

`pnpm build --mode home-dev`는 /upbrella-dev/ 하위 경로와 격리 API를 사용합니다. 지도 키는 Git 제외 .env.home-dev.local에 별도로 설정합니다. GA는 home-dev에서 로드하지 않으며 실제 API를 사용하고 mock은 켜지 않습니다. 개발용 접속키는 입력 화면 메모리에만 유지하고 저장하지 않습니다. 서버에는 UPbrella/UPbrella_back의 개발 환경 PR이 먼저 필요합니다.

운영 기본 빌드는 기존 GA 측정 ID와 소셜 로그인을 사용합니다. BASE_URL을 라우터·소개 배경 이미지와 PWA fallback에 적용하고 API/실제 정적 파일 경로가 SPA fallback으로 바뀌지 않게 합니다. 운영 API도 오래된 회원/재고 응답을 서비스 워커에 캐시하지 않습니다.

/scan은 기존 /qr-scan 화면의 호환 경로입니다. QR 스캐너와 분석 이벤트를 복제하지 않습니다. 기존 qr-scanner 라이브러리로 사진 인식도 제공하며 선택한 사진을 서버로 전송하지 않습니다. QR의 개발 하위 경로도 읽을 수 있도록 기존 parser에 base 경로를 선택적으로 전달합니다. 운영 QR 경로 계약은 그대로 유지합니다.

이 PR은 실행 중인 Vercel·홈 개발 서버를 자동 교체하거나 운영 환경에 배포하지 않습니다. 비밀값·지도 키 실제 값·덤프·회원 데이터는 포함하지 않습니다.
