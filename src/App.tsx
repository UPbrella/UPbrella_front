import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/templates/common/MainLayout";
import AdminWrapper from "@/components/templates/admin/AdminWrapper";
import { ADMIN_ROUTES } from "@/routes/adminRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";
import { NOT_LAYOUT_ROUTES } from "@/routes/notLayoutRouter";
import NotFound from "@/components/pages/not-found/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminRoutes from "@/utils/AdminRoutes";
import BackgroundLayout from "./components/templates/common/BackgroundLayout";
import { BACKGROUND_IMAGE_ROUTES } from "./routes/backgroundImageRouter";
import { BASIC_ROUTES } from "@/routes/basicRouter";
import SeoMetaTag from "@/utils/SeoMetaTag";

function App() {
  return (
    <>
      <SeoMetaTag />
      <div className="bg-cover">
        <Routes>
          {/* width full */}
          {BASIC_ROUTES.map((route) => {
            return <Route key={route.name} path={route.path()} element={<route.component />} />;
          })}

          {/* background basic */}
          <Route element={<BackgroundLayout />}>
            <>
              {BACKGROUND_IMAGE_ROUTES.map((route) => {
                return <Route key={route.name} path={route.path()} element={<route.component />} />;
              })}
              <Route path="/*" element={<NotFound />} />
            </>
          </Route>

          {/* width fix */}
          <Route element={<MainLayout />}>
            <>
              {LAYOUT_ROUTES.map((route) => {
                return <Route key={route.name} path={route.path()} element={<route.component />} />;
              })}
              <Route path="/*" element={<NotFound />} />
            </>
          </Route>

          {/* admin */}
          <Route element={<MainLayout />}>
            <Route element={<AdminRoutes />}>
              {ADMIN_ROUTES.map((route) => {
                return (
                  <Route
                    key={route.name}
                    path={route.path()}
                    element={
                      <AdminWrapper>
                        <route.component />
                      </AdminWrapper>
                    }
                  />
                );
              })}
            </Route>
          </Route>

          {/* login */}
          <Route element={<PrivateRoutes />}>
            {NOT_LAYOUT_ROUTES.map((route) => {
              return <Route key={route.name} path={route.path()} element={<route.component />} />;
            })}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
