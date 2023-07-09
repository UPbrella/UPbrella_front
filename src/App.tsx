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
