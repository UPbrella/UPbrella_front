import { NavLink, useLocation } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import QrCodeScannerOutlined from "@mui/icons-material/QrCodeScannerOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import StarsOutlined from "@mui/icons-material/StarsOutlined";
export default function QuickNavigation() {
  const { pathname } = useLocation();
  const navigationRef = useRef<HTMLElement>(null);
  const [navigationHeight, setNavigationHeight] = useState(0);
  useLayoutEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return;
    const updateHeight = () => setNavigationHeight(navigation.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(navigation);
    return () => observer.disconnect();
  }, [pathname]);
  if (/^\/(admin|login|auth|members\/signup|rent\/form|return\/form)/.test(pathname)) return null;
  const items = [
    { path: "/rentalLocation", label: "대여소", icon: MapOutlined },
    { path: "/qr-scan", label: "QR 스캔", icon: QrCodeScannerOutlined },
    { path: "/stamp", label: "스탬프", icon: StarsOutlined },
  ];
  return (
    <>
      <nav
        ref={navigationRef}
        aria-label="주요 기능"
        className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t bg-white pt-8 pb-[max(8px,env(safe-area-inset-bottom))] xl:hidden"
      >
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-4 py-8 px-20 ${
                isActive ? "text-primary-500" : "text-gray-600"
              }`
            }
          >
            <item.icon />
            <span className="text-12 font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div aria-hidden="true" style={{ height: navigationHeight }} className="xl:hidden" />
    </>
  );
}
