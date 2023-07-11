import MainLayout from "@/components/templates/common/MainLayout";
import { Route, Routes } from "react-router-dom";
import { NOT_LAYOUT_ROUTES } from "./routes/notLayoutRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";

function App() {
  return (
    <div>
      <Routes>
        {/* Not Found Page */}

        {/* Route */}
        <Route element={<MainLayout />}>
          {LAYOUT_ROUTES.map((route) => {
            return <Route key={route.name} path={route.path} element={<route.component />} />;
          })}
        </Route>

        {NOT_LAYOUT_ROUTES.map((route) => {
          return <Route key={route.name} path={route.path} element={<route.component />} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
