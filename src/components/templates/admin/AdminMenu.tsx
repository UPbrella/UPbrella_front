import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { ADMIN_ROUTES_URL } from "@/routes/adminRouter";

const adminMenu = [
  {
    title: "대여/반납 현황 테이블",
    navToUrl: ADMIN_ROUTES_URL.rent.path,
    disabled: false,
  },
  {
    title: "우산 관리",
    navToUrl: "/admin/umbrella",
    disabled: true,
  },
  {
    title: "회원 관리",
    navToUrl: ADMIN_ROUTES_URL.user.path,
    disabled: false,
  },
  {
    title: "상태신고 / 개선사항 확인",
    navToUrl: "/admin/umbrella-status",
    disabled: true,
  },
  {
    title: "협업 지점 관리",
    navToUrl: ADMIN_ROUTES_URL.store.path,
    disabled: false,
  },
];

const AdminMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idx = adminMenu.findIndex((e) => e.navToUrl === location.pathname);

  if (idx === -1) {
    navigate("/");
    alert("잘못된 경로로 들어오셨습니다.");
  }

  const [value, setValue] = useState(idx);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    navigate(adminMenu[newValue].navToUrl);
    return;
  };

  useEffect(() => {
    setValue(idx);
  }, [idx]);

  return (
    <>
      <Tabs className="mt-16" value={value} onChange={(_, value) => handleChange(value)}>
        {adminMenu.map(({ title, disabled }) => (
          <Tab key={title} label={title} disabled={disabled} />
        ))}
      </Tabs>
    </>
  );
};

export default AdminMenu;
