import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-20">
      <Typography variant="h5">접근할 수 없는 페이지거나, 아직 개발중인 페이지입니다.</Typography>

      <Button
        variant="contained"
        className="!bg-primary-500"
        onClick={() => {
          navigate(BASIC_ROUTES_URL.root.path());
        }}
      >
        메인 페이지로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
