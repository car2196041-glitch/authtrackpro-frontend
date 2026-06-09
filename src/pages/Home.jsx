 
import { Link } from "react-router-dom";

export default function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>AuthTrack <strong>Pro</strong></div>

        <nav style={styles.nav}>
          <button style={styles.navBtn} onClick={() => scrollTo("product")}>Product</button>
          <button style={styles.navBtn} onClick={() => scrollTo("solutions")}>Solutions</button>
          <button style={styles.navBtn} onClick={() => scrollTo("pricing")}>Pricing</button>
          <button style={styles.navBtn} onClick={() => scrollTo("support")}>Support</button>
          <Link to="/login" style={styles.link}>Login</Link>
          <a
            href="mailto:support@authtrackpro.com?subject=AuthTrack%20Pro%20Demo%20Request"
            style={styles.cta}
          >
            Request Demo
          </a>
        </nav>
      </header>

      <section style={styles.hero}>
        <p style={styles.eyebrow}>Healthcare Prior Authorization Platform</p>
        <h1 style={styles.h1}>Track, manage, and prevent authorization delays before they become denials.</h1>
        <p style={styles.heroText}>
          AuthTrack Pro gives clinics one centralized dashboard for pending authorizations,
          payer follow-ups, denials, renewals, and team productivity.
        </p>

        <div style={styles.actions}>
          <Link to="/register" style={styles.primary}>Start Using AuthTrack Pro</Link>
          <a href="mailto:support@authtrackpro.com?subject=AuthTrack%20Pro%20Demo%20Request" style={styles.secondary}>
            Request Demo
          </a>
        </div>
      </section>

      <section id="product" style={styles.section}>
        <h2>Product</h2>
        <div style={styles.grid}>
          <Card title="Authorization Tracker" text="Track patient, payer, procedure, CPT, status, due date, assigned staff, and notes." />
          <Card title="Live Dashboard" text="View pending, approved, denied, and due-soon authorizations in one place." />
          <Card title="CSV Import / Export" text="Import worklists and export clean authorization reports for teams and managers." />
        </div>
      </section>

      <section id="solutions" style={styles.sectionAlt}>
        <h2>Solutions</h2>
        <div style={styles.grid}>
          <Card title="Clinic Teams" text="Reduce missed follow-ups, blank auth tabs, and scattered spreadsheets." />
          <Card title="Revenue Cycle" text="Improve visibility into delays that impact scheduling, care, and collections." />
          <Card title="Managers" text="Monitor productivity, denials, renewals, and pending authorization volume." />
        </div>
      </section>

      <section id="pricing" style={styles.section}>
        <h2>Pricing</h2>
        <div style={styles.grid}>
          <Price title="Starter" price="$99/mo" text="Basic auth tracking and dashboard visibility." />
          <Price title="Pro" price="$199/mo" text="Import/export, reminders, reporting, and audit-ready workflows." featured />
          <Price title="Clinic Plus" price="$399/mo" text="Multi-user teams, manager dashboard, and advanced reporting." />
        </div>
      </section>

      <section id="support" style={styles.sectionAlt}>
        <h2>Support</h2>
        <p style={styles.text}>
          For demo requests, onboarding, setup, or support, email:
          <br />
          <strong>support@authtrackpro.com</strong>
        </p>
      </section>

      <footer style={styles.footer}>
        <strong>AuthTrack Pro</strong>
        <p>Prior authorization workflow visibility for healthcare teams.</p>
        <p>support@authtrackpro.com</p>
      </footer>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Price({ title, price, text, featured }) {
  return (
    <div style={{ ...styles.card, border: featured ? "2px solid #2563eb" : "1px solid #e2e8f0" }}>
      <h3>{title}</h3>
      <h2>{price}</h2>
      <p>{text}</p>
      <Link to="/register" style={styles.primary}>Select Plan</Link>
    </div>
  );
}

const styles = {
  page: { fontFamily: "Arial, sans-serif", background: "#f8fafc", color: "#0f172a" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 60px", background: "white", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 12px rgba(15,23,42,.08)" },
  brand: { fontSize: "24px", fontWeight: 900 },
  nav: { display: "flex", gap: "18px", alignItems: "center" },
  navBtn: { background: "none", border: 0, color: "#0f172a", fontWeight: 700, cursor: "pointer" },
  link: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  cta: { background: "#2563eb", color: "white", padding: "12px 18px", borderRadius: "10px", textDecoration: "none", fontWeight: 800 },
  hero: { padding: "90px 60px", maxWidth: "1100px", margin: "0 auto" },
  eyebrow: { color: "#2563eb", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase" },
  h1: { fontSize: "58px", lineHeight: 1.05, maxWidth: "900px", margin: "18px 0" },
  heroText: { fontSize: "21px", color: "#475569", lineHeight: 1.6, maxWidth: "780px" },
  actions: { display: "flex", gap: "16px", marginTop: "30px" },
  primary: { display: "inline-block", background: "#2563eb", color: "white", padding: "13px 18px", borderRadius: "10px", textDecoration: "none", fontWeight: 800 },
  secondary: { display: "inline-block", border: "1px solid #cbd5e1", color: "#0f172a", padding: "13px 18px", borderRadius: "10px", textDecoration: "none", fontWeight: 800 },
  section: { padding: "70px 60px", maxWidth: "1100px", margin: "0 auto" },
  sectionAlt: { padding: "70px 60px", background: "#eef6ff" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px", marginTop: "24px" },
  card: { background: "white", padding: "26px", borderRadius: "18px", boxShadow: "0 10px 30px rgba(15,23,42,.08)", border: "1px solid #e2e8f0" },
  text: { fontSize: "18px", color: "#475569", lineHeight: 1.6 },
  footer: { background: "#0f172a", color: "white", padding: "36px 60px", marginTop: "40px" },
};
