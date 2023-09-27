import { useNavigate } from "react-router-dom";

const FooterLabel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 text-sm text-gray-700">
      <button onClick={() => navigate("/info/tos")}>이용약관</button>
      <button onClick={() => navigate("/info/pp")}>개인정보처리방침</button>
      <button className="font-semibold" onClick={() => navigate("/contact")}>
        CONTACT_US
      </button>
    </div>
  );
};
export default FooterLabel;
