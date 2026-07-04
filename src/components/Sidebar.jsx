import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  BarChart3,
  Info,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  border: "none",
  borderRadius: "12px",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  textAlign: "left",
  width: "100%",
};

const getNavButtonStyle = (path) => ({
  ...navButtonStyle,
  background: location.pathname === path ? "rgba(255, 255, 255, 0.16)" : "transparent",
});

  return (
  <aside
  className="sidebar"
  style={{
    width: "280px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0F172A 0%, #1E3A8A 100%)",
    color: "#fff",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  }}
>
    <div
  className="sidebar-header"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  }}
>
  <img
    src={logo}
    alt="AuthTrack Pro"
    style={{
      width: "160px",
      height: "80px",
      objectFit: "contain",
      marginBottom: "12px",
    }}
  />
  <p
  style={{
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.75)",
    margin: 0,
    fontWeight: "500",
  }}
>
  Authorization Made Simple
</p>
</div>

    <div className="sidebar-section-label">MAIN MENU</div>
    <nav
  className="sidebar-nav"
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px",
  }}
>
        <button
          onClick={() => navigate("/")}
          style={getNavButtonStyle("/")}
>
          <Home size={18} />
          <span>Home</span>
       </button>
       <button
  onClick={() => navigate("/pricing")}
  style={getNavButtonStyle("/pricing")}
>
  <BarChart3 size={18} />
  <span>Pricing</span>
</button>
       <button
        onClick={() => navigate("/dashboard")}
        style={getNavButtonStyle("/dashboard")}
>
         <LayoutDashboard size={18} />
         <span>User Dashboard</span>
       </button>
       <button
  onClick={() => navigate("/manager-dashboard")}
  style={getNavButtonStyle("/manager-dashboard")}
>
  <Users size={18} />
  <span>Manager Dashboard</span>
</button>
       <button
  onClick={() => navigate("/authorizations")}
  style={getNavButtonStyle("/authorizations")}
>
         <ClipboardList size={18} />
         <span>Authorizations</span>
       </button>
       <button
  onClick={() => navigate("/reports")}
  style={getNavButtonStyle("/reports")}
>
        <BarChart3 size={18} />
        <span>Reports</span>
       </button>
       <button
  onClick={() => navigate("/audit-log")}
  style={getNavButtonStyle("/audit-log")}
>
         <FileText size={18} />
         <span>Audit Log</span>
       </button>
       <button
  onClick={() => navigate("/about")}
  style={getNavButtonStyle("/about")}
>
         <Info size={18} />
         <span>About</span>
       </button>
       <button
  onClick={() => {
    localStorage.removeItem("authtrack_token");
    localStorage.removeItem("authtrack_user");
    navigate("/login");
  }}
  style={navButtonStyle}
>
  <LogOut size={18} />
  <span>Logout</span>
</button>
   </nav>
  </aside>
);
}

export default Sidebar;