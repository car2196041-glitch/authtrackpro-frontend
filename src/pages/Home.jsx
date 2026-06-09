import { Link } from "react-router-dom";

export default function Home() {
  const cardStyle = {
    background: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 60px", background: "white", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 1px 8px rgba(15,23,42,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.jpg" alt="AuthTrack Pro logo" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          <h2 style={{ margin: 0 }}>AuthTrack Pro</h2>
        </div>

        <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Demo</a>
          <a href="#support">Support</a>
          <Link to="/login">Login</Link>
          <Link to="/register" style={{ background: "#2563eb", color: "white", padding: "12px 18px", borderRadius: "8px" }}>
            Request Demo
          </Link>
        </div>
      </nav>

      <section style={{ padding: "90px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <p style={{ color: "#2563eb", fontWeight: "700", letterSpacing: "2px" }}>
          HEALTHCARE PRIOR AUTHORIZATION PLATFORM
        </p>

        <h1 style={{ fontSize: "62px", lineHeight: "1.05", margin: "18px 0", maxWidth: "850px" }}>
          Track, manage, and prevent authorization delays.
        </h1>

        <p style={{ fontSize: "22px", lineHeight: "1.6", maxWidth: "780px", color: "#475569" }}>
          AuthTrack Pro helps healthcare teams organize prior authorization workflows, monitor pending requests, and reduce missed follow-ups.
        </p>

        <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
          <Link to="/register" style={{ background: "#2563eb", color: "white", padding: "14px 22px", borderRadius: "8px", fontWeight: "700" }}>
            Start Demo
          </Link>
          <Link to="/login" style={{ border: "1px solid #cbd5e1", color: "#0f172a", padding: "14px 22px", borderRadius: "8px", fontWeight: "700" }}>
            Login
          </Link>
        </div>
      </section>

      <section id="product" style={{ padding: "50px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <h2>Product</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <div style={cardStyle}><h3>Live Dashboard</h3><p>View pending, approved, and denied authorizations in one place.</p></div>
          <div style={cardStyle}><h3>Follow-Up Tracking</h3><p>Keep payer follow-ups, due dates, and assigned staff visible.</p></div>
          <div style={cardStyle}><h3>Authorization List</h3><p>Add, edit, delete, and manage authorization records from a secure dashboard.</p></div>
        </div>
      </section>

      <section id="solutions" style={{ padding: "50px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <h2>Solutions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <div style={cardStyle}><h3>Clinic Teams</h3><p>Designed for teams handling daily prior authorization volume.</p></div>
          <div style={cardStyle}><h3>Revenue Cycle</h3><p>Improve visibility into delays that impact scheduling, care, and collections.</p></div>
          <div style={cardStyle}><h3>Managers</h3><p>Quickly see workload status, pending items, and team follow-up needs.</p></div>
        </div>
      </section>

      <section id="pricing" style={{ padding: "50px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <h2>Pricing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <div style={cardStyle}><h3>Starter</h3><h2>$49/mo</h2><p>For small teams starting authorization tracking.</p></div>
          <div style={{ ...cardStyle, border: "2px solid #2563eb" }}><h3>Pro</h3><h2>$149/mo</h2><p>For growing clinics needing dashboard visibility.</p></div>
          <div style={cardStyle}><h3>Enterprise</h3><h2>Custom</h2><p>For larger organizations needing custom workflows.</p></div>
        </div>
      </section>

      <section id="demo" style={{ padding: "50px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <div style={{ ...cardStyle, background: "#eff6ff" }}>
          <h2>Demo</h2>
          <p style={{ fontSize: "18px", color: "#475569" }}>
            See how AuthTrack Pro helps teams track authorization status, due dates, payer follow-ups, and assigned staff.
          </p>
          <Link to="/register" style={{ display: "inline-block", marginTop: "18px", background: "#2563eb", color: "white", padding: "14px 22px", borderRadius: "8px", fontWeight: "700" }}>
            Request Demo Access
          </Link>
        </div>
      </section>

      <section id="support" style={{ padding: "50px 60px", maxWidth: "1150px", margin: "0 auto" }}>
        <h2>Support</h2>
        <div style={cardStyle}>
          <p><strong>Email:</strong> support@authtrackpro.com</p>
          <p><strong>Use case:</strong> Prior authorization workflow visibility for healthcare teams.</p>
          <p><strong>Note:</strong> This demo does not store PHI. Production use requires HIPAA safeguards, BAAs, encryption, access controls, and audit logging.</p>
        </div>
      </section>

      <footer style={{ background: "#0f172a", color: "white", padding: "40px 60px", marginTop: "60px" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src="/logo.jpg" alt="AuthTrack Pro logo" style={{ width: "54px", height: "54px", objectFit: "contain", background: "white", borderRadius: "8px" }} />
              <h2 style={{ margin: 0 }}>AuthTrack Pro</h2>
            </div>
            <p style={{ color: "#cbd5e1", maxWidth: "420px" }}>
              Prior authorization workflow visibility for healthcare teams.
            </p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>support@authtrackpro.com</p>
            <p>www.authtrackpro.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}