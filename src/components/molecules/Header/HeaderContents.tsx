import { Link } from "react-router-dom";
import { HeaderLogo } from "@/components/atoms/Header/HeaderLogo";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

export const HeaderContents = () => {
  return (
    <>
      <AppBar color="default">
        <Container disableGutters maxWidth="lg" className="px-40">
          <Toolbar disableGutters>
            <Link to={"/"}>
              <HeaderLogo />
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              {["업브렐라 이야기", "대여소 위치", "협업 지점 소개", "이용안내"].map((page) => (
                <Button
                  key={page}
                  // 페이지 라우팅
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              <Button className="flex items-center" sx={{ my: 2 }} variant="outlined">
                로그인
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
