import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "@/routes/adminRouter";
import { Tab, Tabs } from "@mui/material";

const AdminMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idx = ADMIN_ROUTES.findIndex((e) => e.path === location.pathname);

  if (idx === -1) {
    navigate("/");
    alert("잘못된 경로로 들어오셨습니다.");
  }

  const [value, setValue] = useState(idx);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    navigate(ADMIN_ROUTES[newValue].path);
    return;
  };

  useEffect(() => {
    setValue(idx);
  }, [idx]);

  return (
    <>
      <Tabs
        variant="scrollable"
        className="mt-16"
        value={value}
        onChange={(_, value) => handleChange(value)}
      >
        {ADMIN_ROUTES.map(({ name }) => (
          <Tab key={name} label={name} />
        ))}
      </Tabs>
    </>
  );
};

export default AdminMenu;
