import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/app/layouts";
import { AdminWrapper } from "@/app/layouts";
import {
  ADMIN_ROUTES,
  LAYOUT_ROUTES,
  NOT_LAYOUT_ROUTES,
  BACKGROUND_IMAGE_ROUTES,
  BASIC_ROUTES,
} from "@/app/router/routes";
import NotFound from "@/pages/not-found/ui/NotFound";
import PrivateRoutes from "@/app/router/guards/PrivateRoute";
import AdminRoutes from "@/app/router/guards/AdminRoute";
import { BackgroundLayout } from "@/app/layouts";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import PWAUpdatePrompt from "@/widgets/pwa-prompt/ui/PWAUpdatePrompt";

function App() {
  return (
    <>
      <SeoMetaTag />
      <PWAUpdatePrompt />
      <div className="bg-cover">
        <Routes>
          {BASIC_ROUTES.map((route) => {
            return <Route key={route.name} path={route.path()} element={<route.component />} />;
          })}

          <Route element={<BackgroundLayout />}>
            <>
              {BACKGROUND_IMAGE_ROUTES.map((route) => {
                return <Route key={route.name} path={route.path()} element={<route.component />} />;
              })}
              <Route path="/*" element={<NotFound />} />
            </>
          </Route>

          <Route element={<MainLayout />}>
            <>
              {LAYOUT_ROUTES.map((route) => {
                return <Route key={route.name} path={route.path()} element={<route.component />} />;
              })}
              <Route path="/*" element={<NotFound />} />
            </>
          </Route>

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
