import { ROUTES } from "@/routes/router";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Global Header */}

      {/* Route */}
      <Routes>
        {/* Not Found Page */}

        {ROUTES.map((route) => {
          return <Route key={route.name} path={route.path} element={<route.component />} />;
        })}
      </Routes>
      {/* Global footer */}
    </div>
  );
}

export default App;
/*
https://docs.google.com/presentation/d/17fncEhQqegrwfyPdS6wuoISsSGM0-scDEIq2JLwSYLU/edit?pli=1#slide=id.g22ef3d693d6_0_3

1. 대여 반납 현황 조회 : 엑셀 다운로드
2. 우산 관리
3. 대여폼 상태신고, 반납폼 개선사항
4. 협업 지점 관리
mui, atomic, storybook
협업지점 목록 조회 - 테이블
추가 및 수정 - 모달
*/
