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
import React from "react";

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
      <React.Suspense fallback={<div>Loading...</div>}>
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
            <div className="max-w-[1440px] min-h-[100vh] px-40 mx-auto flex flex-col">
              <Routes>
                {/* Not Found Page */}
                <Route path="/*" element={<NotFound />} />

                {/* Route */}
                <Route element={<MainLayout />}>
                  {LAYOUT_ROUTES.map((route) => {
                    return (
                      <Route key={route.name} path={route.path} element={<route.component />} />
                    );
                  })}
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
                {NOT_LAYOUT_ROUTES.map((route) => {
                  return <Route key={route.name} path={route.path} element={<route.component />} />;
                })}
              </Routes>
            </div>
          </div>
        </QueryClientProvider>
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
