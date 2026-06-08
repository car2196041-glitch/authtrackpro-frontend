import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 60px", background: "white" }}>
  <h2 style={{ margin: 0, color: "#0f172a" }}>AuthTrack Pro</h2>

  <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
    <a href="#product">Product</a>
    <a href="#solutions">Solutions</a>
    <Link to="/pricing">Pricing</Link>
    <a href="#demo">Demo</a>
    <a href="#support">Support</a>
    <Link to="/login">Login</Link>
    <Link to="/register" style={{ background: "#2563eb", color: "white", padding: "12px 18px", borderRadius: "8px", textDecoration: "none" }}>
      Request Demo
    </Link>
  </div>
</nav>

      <section style={{ padding: "90px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ color: "#2563eb", fontWeight: "700", letterSpacing: "2px" }}>
          HEALTHCARE PRIOR AUTHORIZATION PLATFORM
        </p>

        <h1 style={{ fontSize: "64px", lineHeight: "1.05", margin: "20px 0", color: "#0f172a" }}>
          Track, manage, and prevent authorization delays.
        </h1>

        <p style={{ fontSize: "22px", lineHeight: "1.6", maxWidth: "760px", color: "#475569" }}>
          AuthTrack Pro helps healthcare teams organize prior authorization workflows, monitor pending requests, and reduce missed follow-ups.
        </p>

        <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
          <Link to="/register" style={{ background: "#2563eb", color: "white", padding: "14px 22px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>
            Start Demo
          </Link>
          <Link to="/login" style={{ border: "1px solid #cbd5e1", color: "#0f172a", padding: "14px 22px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>
            Login
          </Link>
        </div>

        <div style={{ marginTop: "70px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            ["Live Dashboard", "View pending, approved, and denied authorizations in one place."],
            ["Follow-Up Tracking", "Keep payer follow-ups, due dates, and assigned staff visible."],
            ["Clinic Workflow", "Built for healthcare operations teams that manage prior auth volume."]
          ].map(([title, text]) => (
            <div key={title} style={{ background: "white", padding: "28px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
              <h3 style={{ marginTop: 0, color: "#0f172a" }}>{title}</h3>
              <p style={{ color: "#475569", lineHeight: "1.5" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}