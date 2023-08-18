import MainLayout from "@/components/templates/common/MainLayout";
import { Route, Routes } from "react-router-dom";
import { NOT_LAYOUT_ROUTES } from "./routes/notLayoutRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

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

          {NOT_LAYOUT_ROUTES.map((route) => {
            return <Route key={route.name} path={route.path} element={<route.component />} />;
          })}
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
