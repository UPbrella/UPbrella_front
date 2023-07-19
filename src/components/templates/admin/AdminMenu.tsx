import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import UmbrellaIcon from "@mui/icons-material/Umbrella";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
import StorageIcon from "@mui/icons-material/Storage";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";

const adminMenu = [
  {
    title: "대여 / 반납 조회",
    icon: () => <StorageIcon />,
    navToUrl: "/admin/rent-history",
  },
  // {
  //   title: "우산 관리",
  //   icon: () => <UmbrellaIcon />,
  //   navToUrl: "/admin/umbrella",
  // },
  // {
  //   title: "상태신고 / 개선사항 확인",
  //   icon: () => <AutorenewIcon />,
  //   navToUrl: "/admin/umbrella-status",
  // },
  {
    title: "협업 지점 관리",
    icon: () => <StoreIcon />,
    navToUrl: "/admin/stores",
  },
];

const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <List className="flex flex-col">
        {adminMenu.map(({ icon, navToUrl, title }) => (
          <ListItem key={title}>
            <ListItemButton onClick={() => navigate(navToUrl)}>
              <ListItemIcon>{icon()}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AdminMenu;
