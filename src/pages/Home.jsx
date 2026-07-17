import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>AuthTrack Pro</h2>

        <div style={styles.navLinks}>
          <button
            style={styles.link}
            onClick={() => navigate("/about")}
          >
            About
          </button>

          <button
            style={styles.link}
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </button>

          <button
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.secondarySmall}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

          <button
            style={styles.primarySmall}
            onClick={() => navigate("/register")}
          >
            Request Demo
          </button>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroText}>
          <div style={styles.badge}>
            Built for healthcare revenue cycle teams
          </div>

          <h1 style={styles.title}>
            Prior authorization tracking built for clinics, managers, and
            enterprise healthcare teams.
          </h1>

          <p style={styles.subtitle}>
            AuthTrack Pro helps teams monitor pending authorizations, denials,
            renewals, payer follow-up, due dates, and manager oversight in one
            professional workflow.
          </p>

          <div style={styles.actions}>
            <button
              style={styles.primary}
              onClick={() => navigate("/register")}
            >
              Start Free Trial
            </button>

            <button
              style={styles.secondary}
              onClick={() => navigate("/about")}
            >
              Learn About AuthTrack Pro
            </button>

            <button
              style={styles.textButton}
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </button>
          </div>
        </div>

        <div style={styles.mockup}>
          <div style={styles.mockupHeader}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h3>Authorization Command Center</h3>

          <div style={styles.metricGrid}>
            <div style={styles.metric}>
              <strong>42</strong>
              <small>Pending</small>
            </div>

            <div style={styles.metric}>
              <strong>18</strong>
              <small>Due Soon</small>
            </div>

            <div style={styles.metric}>
              <strong>7</strong>
              <small>Overdue</small>
            </div>
          </div>

          <div style={styles.tableLine}></div>
          <div style={styles.tableLine}></div>
          <div style={styles.tableLineShort}></div>
        </div>
      </section>

      <section style={styles.trusted}>
        <p>
          Designed for Skilled Nursing Facilities, Ambulatory Clinics, Revenue
          Cycle Leaders, and Enterprise Partners.
        </p>
      </section>

      <section style={styles.features}>
        <h2>Replace spreadsheets with authorization visibility.</h2>

        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3>Centralized Authorization Tracking</h3>
            <p>
              Track payer, CPT, status, due dates, assigned users, and follow-up
              activity.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>Manager Oversight</h3>
            <p>
              Give leaders visibility into overdue work, denials, productivity,
              and risk areas.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>Audit Logs</h3>
            <p>
              Support healthcare compliance workflows with activity history and
              user accountability.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>Reporting & Analytics</h3>
            <p>
              Review pending by payer, denials by payer, upcoming renewals, and
              team performance.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>CSV Import</h3>
            <p>
              Import authorization worklists quickly and reduce manual
              spreadsheet tracking.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>Future EHR Integrations</h3>
            <p>
              Built with a roadmap for integration opportunities with healthcare
              systems and EHR workflows.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.enterprise}>
        <div>
          <h2>Enterprise-ready for healthcare organizations.</h2>
          <p>
            Built for organizations managing high authorization volume across
            clinics, facilities, departments, or revenue cycle teams.
          </p>
        </div>

        <button
          style={styles.primary}
          onClick={() => navigate("/register")}
        >
          Start Enterprise Conversation
        </button>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 56px",
    background: "white",
    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
    flexWrap: "wrap",
    gap: "20px",
  },

  logo: {
    fontSize: "24px",
    margin: 0,
  },

  navLinks: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    background: "transparent",
    border: "none",
    color: "#334155",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "700",
  },

  primarySmall: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondarySmall: {
  background: "white",
  color: "#2563eb",
  border: "1px solid #2563eb",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
},

textButton: {
  background: "transparent",
  color: "#2563eb",
  border: "none",
  padding: "14px 8px",
  fontWeight: "800",
  cursor: "pointer",
  fontSize: "15px",
},

  hero: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "48px",
    padding: "76px 56px",
    alignItems: "center",
  },

  heroText: {
    width: "100%",
  },

  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#1e40af",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  title: {
    fontSize: "52px",
    lineHeight: "1.05",
    margin: 0,
    letterSpacing: "-1.5px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#475569",
    lineHeight: "1.7",
    marginTop: "22px",
  },

  actions: {
    display: "flex",
    gap: "14px",
    marginTop: "28px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  primary: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
  },

  secondary: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    padding: "14px 22px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
  },

  textButton: {
    background: "transparent",
    color: "#2563eb",
    border: "none",
    padding: "14px 8px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
  },

  mockup: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 25px 60px rgba(15, 23, 42, 0.18)",
    border: "1px solid #e2e8f0",
  },

  mockupHeader: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    margin: "22px 0",
  },

  metric: {
    background: "#f1f5f9",
    padding: "18px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  tableLine: {
    height: "18px",
    background: "#e2e8f0",
    borderRadius: "8px",
    marginBottom: "12px",
  },

  tableLineShort: {
    height: "18px",
    background: "#e2e8f0",
    borderRadius: "8px",
    width: "70%",
  },

  trusted: {
    textAlign: "center",
    background: "#0f172a",
    color: "white",
    padding: "22px",
    fontWeight: "700",
  },

  features: {
    padding: "70px 56px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
    marginTop: "28px",
  },

  featureCard: {
    background: "white",
    padding: "26px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },

  enterprise: {
    margin: "20px 56px 70px",
    background: "#0f172a",
    color: "white",
    padding: "42px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "28px",
    flexWrap: "wrap",
  },
};

export default Home;