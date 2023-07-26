import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/assets/main_logo.svg";

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-center max-w-2xl mx-20">
      <div className="absolute left-5">
        <MenuIcon style={{ width: "28px", height: "28px" }} />
      </div>
      <div>
        <img className="w-48 h-48" src={Logo} />
      </div>
    </div>
  );
};

export default MobileHeader;
