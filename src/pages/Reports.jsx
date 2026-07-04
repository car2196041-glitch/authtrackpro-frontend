import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Reports() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authtrack_token");
    navigate("/login");
  }

  return (
    <div style={styles.page}>
      <Sidebar />

      <main style={styles.main}>
        <h1 style={styles.title}>Reports & Analytics</h1>
        <p style={styles.subtitle}>
          Enterprise visibility into pending authorizations, payer trends, denials, renewals, and team productivity.
        </p>

        <section style={styles.kpiGrid}>
          <div style={styles.card}><span>Pending</span><strong>42</strong><p>Active authorization queue</p></div>
          <div style={styles.card}><span>Due in 7 Days</span><strong>18</strong><p>Upcoming follow-up risk</p></div>
          <div style={styles.card}><span>Overdue</span><strong>7</strong><p>Needs immediate review</p></div>
          <div style={styles.card}><span>Renewals</span><strong>11</strong><p>Upcoming service renewals</p></div>
        </section>

        <section style={styles.reportGrid}>
          <div style={styles.panel}>
            <h2>Pending by Payer</h2>
            {["UnitedHealthcare - 14", "Aetna - 9", "Blue Cross - 8", "Medicare - 6", "Medicaid - 5"].map((item) => (
              <div style={styles.row} key={item}>{item}</div>
            ))}
          </div>

          <div style={styles.panel}>
            <h2>Denials by Payer</h2>
            {["Blue Cross - 5", "UnitedHealthcare - 4", "Aetna - 3", "Medicaid - 2", "Medicare - 1"].map((item) => (
              <div style={styles.row} key={item}>{item}</div>
            ))}
          </div>

          <div style={styles.panel}>
            <h2>Team Productivity</h2>
            {["Sarah M. - 28 completed", "James R. - 24 completed", "Maria L. - 21 completed", "Anthony P. - 17 completed"].map((item) => (
              <div style={styles.row} key={item}>{item}</div>
            ))}
          </div>

          <div style={styles.panel}>
            <h2>Workflow Insights</h2>
            <div style={styles.alert}>Highest risk area: overdue authorizations</div>
            <div style={styles.alert}>Top denial trend: missing clinical documentation</div>
            <div style={styles.alert}>Manager review recommended for Blue Cross denials</div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Arial, sans-serif" },
  sidebar: { width: "250px", background: "#0f172a", color: "white", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" },
  logo: { fontSize: "22px", marginBottom: "24px" },
  navButton: { background: "transparent", color: "#cbd5e1", border: "none", textAlign: "left", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px" },
  activeButton: { background: "#2563eb", color: "white", border: "none", textAlign: "left", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "700" },
  logoutButton: { marginTop: "auto", background: "#dc2626", color: "white", border: "none", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "700" },
  main: { flex: 1, padding: "36px" },
  title: { fontSize: "34px", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", marginTop: "8px", marginBottom: "28px" },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "28px" },
  card: { background: "white", padding: "22px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
  reportGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "22px" },
  panel: { background: "white", padding: "24px", borderRadius: "18px", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
  row: { padding: "12px", borderBottom: "1px solid #e2e8f0", color: "#334155" },
  alert: { background: "#eff6ff", color: "#1e40af", padding: "12px", borderRadius: "12px", marginBottom: "10px", fontWeight: "700" },
};

export default Reports;