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
        <div className="bg-cover bg-basic">
          <div className="max-w-[1440px] min-h-[100vh] px-40 mx-auto flex flex-col sm:px-0">
            <Routes>
              {/* Not Found Page */}
              {/* Route */}
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
              <Route element={<MainLayout />}>
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
              <Route element={<PrivateRoutes />}>
                {NOT_LAYOUT_ROUTES.map((route) => {
                  return <Route key={route.name} path={route.path} element={<route.component />} />;
                })}
              </Route>
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
