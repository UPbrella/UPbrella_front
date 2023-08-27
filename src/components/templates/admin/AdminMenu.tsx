import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

const adminMenu = [
  {
    title: "협업 지점 관리",
    navToUrl: "/admin/stores",
    disabled: false,
  },
  {
    title: "대여 / 반납 조회",
    navToUrl: "/admin/rent-history",
    disabled: false,
  },
  {
    title: "우산 관리",
    navToUrl: "/admin/umbrella",
    disabled: true,
  },
  {
    title: "상태신고 / 개선사항 확인",
    navToUrl: "/admin/umbrella-status",
    disabled: true,
  },
];

const AdminMenu = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    navigate(adminMenu[newValue].navToUrl);
    return;
  };

  return (
    <>
      <Tabs value={value} onChange={(_, value) => handleChange(value)}>
        {adminMenu.map(({ title, disabled }) => (
          <Tab key={title} label={title} disabled={disabled} />
        ))}
      </Tabs>
    </>
  );
};

export default AdminMenu;
