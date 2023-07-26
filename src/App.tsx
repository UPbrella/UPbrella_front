import MainLayout from "@/components/templates/common/MainLayout";
import { Route, Routes } from "react-router-dom";
import { NOT_LAYOUT_ROUTES } from "./routes/notLayoutRouter";
import { LAYOUT_ROUTES } from "@/routes/layoutRouter";
import { QueryClient, QueryClientProvider } from "react-query";

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
    </QueryClientProvider>
  );
}

export default App;
