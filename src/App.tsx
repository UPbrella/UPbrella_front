import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "@/components/templates/common/MainLayout";
import AdminWrapper from "@/components/templates/admin/AdminWrapper";
import { ADMIN_ROUTES } from "@/routes/adminRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";
import { NOT_LAYOUT_ROUTES } from "@/routes/notLayoutRouter";
import NotFound from "@/components/pages/not-found/NotFound";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Suspense } from "react";
import UpbrellaStoryPage from "@/components/pages/story/UpbrellaStoryPage";
import AdminRoutes from "@/utils/AdminRoutes";
import InfoPage from "@/components/pages/Info/InfoPage";
import BackgroundLayout from "./components/templates/common/BackgroundLayout";
import { BACKGROUND_IMAGE_ROUTES } from "./routes/backgroundImageRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: "always",
      retryOnMount: false,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-center"
            toastOptions={{
              style: { padding: "16px", color: "#fff", background: "#5DCF17" },
              duration: 3000,
              error: {
                style: {
                  background: "#FF513E",
                },
              },
            }}
          />

          <div className="bg-cover">
            <Routes>
              {/* width full */}
              <Route path={"/"} element={<UpbrellaStoryPage />} />
              <Route path={"/about"} element={<UpbrellaStoryPage />} />
              <Route path="/information" element={<InfoPage />} />

              {/* background basic */}
              <Route element={<BackgroundLayout />}>
                <>
                  {BACKGROUND_IMAGE_ROUTES.map((route) => {
                    return (
                      <Route key={route.name} path={route.path} element={<route.component />} />
                    );
                  })}
                  <Route path="/*" element={<NotFound />} />
                </>
              </Route>

              {/* width fix */}
              <Route element={<MainLayout />}>
                <>
                  {LAYOUT_ROUTES.map((route) => {
                    return (
                      <Route key={route.name} path={route.path} element={<route.component />} />
                    );
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
                        path={route.path}
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
                  return <Route key={route.name} path={route.path} element={<route.component />} />;
                })}
              </Route>
            </Routes>
          </div>
        </QueryClientProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
