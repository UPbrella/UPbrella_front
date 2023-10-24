import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";
import { useNavigate } from "react-router-dom";

const FooterLabel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 text-sm text-gray-700">
      <button
        onClick={() => {
          navigate(LAYOUT_ROUTES_URL.infoTos.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        이용약관
      </button>
      <button
        onClick={() => {
          navigate(LAYOUT_ROUTES_URL.infoPp.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        개인정보처리방침
      </button>
      <button
        className="font-semibold"
        onClick={() => {
          navigate(BASIC_ROUTES_URL.contact.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        CONTACT_US
      </button>
    </div>
  );
};
export default FooterLabel;
