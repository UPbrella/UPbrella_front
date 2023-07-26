import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HomeMainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* tailwind test */}
      <div className="flex flex-col items-center justify-center">
        <header className="text-xl font-bold">메인 페이지</header>
        <Button onClick={() => navigate("admin/rent-history")}>관리자 페이지</Button>
      </div>
    </div>
  );
};

export default HomeMainPage;
