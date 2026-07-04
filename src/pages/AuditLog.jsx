import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AuditLog() {
  const navigate = useNavigate();

  const auditLogs = [
    {
      date: "06/15/2026 9:42 AM",
      user: "Sarah M.",
      action: "Updated Authorization",
      authorization: "MRI Lumbar Spine - Aetna",
      status: "Pending",
    },
    {
      date: "06/15/2026 8:18 AM",
      user: "James R.",
      action: "Approved Authorization",
      authorization: "PT Evaluation - UnitedHealthcare",
      status: "Approved",
    },
    {
      date: "06/14/2026 4:55 PM",
      user: "Maria L.",
      action: "Added Note",
      authorization: "CT Abdomen - Medicare",
      status: "In Review",
    },
    {
      date: "06/14/2026 2:30 PM",
      user: "Clinic Manager",
      action: "Reviewed Denial",
      authorization: "Specialist Visit - Blue Cross",
      status: "Denied",
    },
    {
      date: "06/13/2026 11:05 AM",
      user: "Anthony P.",
      action: "Created Authorization",
      authorization: "Cardiology Referral - Medicaid",
      status: "Submitted",
    },
  ];

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={styles.page}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Audit Log</h1>
            <p style={styles.subtitle}>
              Compliance activity tracking for authorization changes, reviews, and user actions.
            </p>
          </div>
          <div style={styles.badge}>HIPAA-Ready Workflow</div>
        </div>

        <section style={styles.cards}>
          <div style={styles.card}>
            <h3>Today’s Activity</h3>
            <p>18</p>
          </div>
          <div style={styles.card}>
            <h3>Authorization Updates</h3>
            <p>9</p>
          </div>
          <div style={styles.card}>
            <h3>Denial Reviews</h3>
            <p>4</p>
          </div>
          <div style={styles.card}>
            <h3>Manager Reviews</h3>
            <p>6</p>
          </div>
        </section>

        <section style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <h2>Recent Compliance Activity</h2>
            <span>Demo-ready audit history</span>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>Authorization</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, index) => (
                <tr key={index}>
                  <td style={styles.td}>{log.date}</td>
                  <td style={styles.td}>{log.user}</td>
                  <td style={styles.td}>{log.action}</td>
                  <td style={styles.td}>{log.authorization}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(log.status)}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function getStatusStyle(status) {
  const base = {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
  };

  if (status === "Approved") {
    return { ...base, background: "#dcfce7", color: "#166534" };
  }

  if (status === "Denied") {
    return { ...base, background: "#fee2e2", color: "#991b1b" };
  }

  if (status === "Pending" || status === "Submitted") {
    return { ...base, background: "#fef3c7", color: "#92400e" };
  }

  return { ...base, background: "#dbeafe", color: "#1e40af" };
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    background: "#0f172a",
    color: "white",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: {
    fontSize: "22px",
    marginBottom: "24px",
  },
  navButton: {
    background: "transparent",
    color: "#cbd5e1",
    border: "none",
    textAlign: "left",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
  },
  activeButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    textAlign: "left",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: "auto",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },
  main: {
    flex: 1,
    padding: "36px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "34px",
    color: "#0f172a",
    margin: 0,
  },
  subtitle: {
    color: "#64748b",
    marginTop: "8px",
  },
  badge: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: "700",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "28px",
  },
  card: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  tableContainer: {
    background: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    color: "#475569",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "14px",
    background: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
  },
};

export default AuditLog;