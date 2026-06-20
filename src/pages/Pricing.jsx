import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
  {
    name: "Clinic Starter",
    price: "$149",
    subtitle: "For small clinics starting prior auth tracking",
    features: [
      "Authorization tracking",
      "CSV import and export",
      "User dashboard",
      "Due soon and overdue tracking",
      "Denial and renewal tracking",
      "Email support",
    ],
    button: "Start Starter",
  },
  {
    name: "Professional",
    price: "$349",
    subtitle: "For growing teams needing manager visibility",
    features: [
      "Everything in Clinic Starter",
      "Manager dashboard",
      "Employee analytics",
      "Live KPI reporting",
      "Audit activity feed",
      "Multi-user workflow tracking",
      "Priority and status monitoring",
    ],
    button: "Start Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    subtitle: "For multi-facility healthcare organizations",
    features: [
      "Everything in Professional",
      "Multiple facility support",
      "Advanced audit history",
      "Enterprise reporting",
      "Role-based access planning",
      "Priority onboarding",
      "Future EHR integration support",
    ],
    button: "Request Enterprise Demo",
  },
];

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>AuthTrack Pro</h2>
        <div style={styles.navLinks}>
          <button style={styles.link} onClick={() => navigate("/")}>Home</button>
          <button style={styles.link} onClick={() => navigate("/login")}>Login</button>
          <button style={styles.primarySmall} onClick={() => navigate("/register")}>Request Demo</button>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.badge}>Simple pricing for healthcare teams</div>
        <h1 style={styles.title}>Choose the plan that fits your authorization workflow.</h1>
        <p style={styles.subtitle}>
          From small ambulatory clinics to enterprise revenue cycle teams, AuthTrack Pro helps
          organizations track prior authorizations, payer follow-up, denials, renewals, and manager visibility.
        </p>
      </section>

      <section style={styles.pricingGrid}>
        {plans.map((plan) => (
          <div key={plan.name} style={plan.featured ? styles.featuredCard : styles.card}>
            {plan.featured && <div style={styles.popular}>Most Popular</div>}

            <h2 style={styles.planName}>{plan.name}</h2>
            <p style={styles.planSubtitle}>{plan.subtitle}</p>

            <div style={styles.price}>
              {plan.price}
              {plan.price !== "Custom" && <span style={styles.month}>/month</span>}
            </div>

            <button
              style={plan.featured ? styles.primaryButton : styles.secondaryButton}
              onClick={() => navigate("/register")}
            >
              {plan.button}
            </button>

            <ul style={styles.featureList}>
              {plan.features.map((feature) => (
                <li key={feature} style={styles.featureItem}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={styles.compare}>
        <h2>Built for prior authorization teams ready to move beyond spreadsheets</h2>
        <div style={styles.compareGrid}>
          <div>CSV Import / Export</div>
          <div>User Dashboard</div>
          <div>Manager Dashboard</div>
          <div>Employee Analytics</div>
          <div>Audit Activity Feed</div>
          <div>Due Soon / Overdue Tracking</div>
        </div>
      </section>

      <section style={styles.enterprise}>
        <div>
          <h2>Need enterprise pricing or EHR integration?</h2>
          <p>
           AuthTrack Pro supports ambulatory clinics, specialty practices,
          imaging centers, skilled nursing facilities, and revenue cycle
          organizations. Enterprise plans include manager analytics,
          audit logging, multi-facility visibility, onboarding support,
          and future EHR integration options.
        </p>
        </div>
        <button style={styles.enterpriseButton} onClick={() => navigate("/register")}>
          Request Enterprise Demo
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
    boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
  },
  logo: {
    fontSize: "24px",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
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
  hero: {
    textAlign: "center",
    padding: "70px 56px 40px",
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
    fontSize: "46px",
    lineHeight: "1.08",
    margin: "0 auto",
    maxWidth: "900px",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#475569",
    lineHeight: "1.7",
    margin: "20px auto 0",
    maxWidth: "850px",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    padding: "30px 56px 56px",
  },
  card: {
    background: "white",
    borderRadius: "22px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
  },
  featuredCard: {
    background: "white",
    borderRadius: "22px",
    padding: "30px",
    boxShadow: "0 25px 60px rgba(37,99,235,0.22)",
    border: "2px solid #2563eb",
    position: "relative",
  },
  popular: {
    position: "absolute",
    top: "-14px",
    right: "24px",
    background: "#2563eb",
    color: "white",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
    fontSize: "13px",
  },
  planName: {
    fontSize: "26px",
    margin: 0,
  },
  planSubtitle: {
    color: "#64748b",
    minHeight: "48px",
  },
  price: {
    fontSize: "42px",
    fontWeight: "900",
    margin: "24px 0",
  },
  month: {
    fontSize: "16px",
    color: "#64748b",
    fontWeight: "700",
  },
  primaryButton: {
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    marginBottom: "22px",
  },
  secondaryButton: {
    width: "100%",
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    marginBottom: "22px",
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  featureItem: {
    padding: "10px 0",
    color: "#334155",
    fontWeight: "600",
  },
  compare: {
    margin: "0 56px 40px",
    background: "white",
    padding: "34px",
    borderRadius: "22px",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    marginTop: "20px",
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
  },
  enterpriseButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
  },
};