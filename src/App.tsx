import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "@/components/templates/common/MainLayout";
import AdminWrapper from "@/components/templates/admin/AdminWrapper";
import { ADMIN_ROUTES } from "@/routes/adminRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";
import { NOT_LAYOUT_ROUTES } from "@/routes/notLayoutRouter";

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
      <div className="max-w-[1440px] px-40 mx-auto">
        <Routes>
          {/* Not Found Page */}

          {/* Route */}
          <Route element={<MainLayout />}>
            {LAYOUT_ROUTES.map((route) => {
              return <Route key={route.name} path={route.path} element={<route.component />} />;
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
    </QueryClientProvider>
  );
}

export default App;
