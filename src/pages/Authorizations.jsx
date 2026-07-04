import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Authorizations() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Due Date");

  const authorizations = [
    { patient: "Linda Carter", payer: "Aetna", cpt: "72148", procedure: "MRI Lumbar Spine", status: "Pending", due: "06/20/2026", assigned: "Sarah M." },
    { patient: "Robert James", payer: "UnitedHealthcare", cpt: "97161", procedure: "PT Evaluation", status: "Approved", due: "06/18/2026", assigned: "James R." },
    { patient: "Angela Morris", payer: "Blue Cross", cpt: "99214", procedure: "Specialist Visit", status: "Denied", due: "06/17/2026", assigned: "Maria L." },
    { patient: "David Kim", payer: "Medicare", cpt: "74177", procedure: "CT Abdomen", status: "In Review", due: "06/22/2026", assigned: "Anthony P." },
    { patient: "Patricia Green", payer: "Medicaid", cpt: "93000", procedure: "Cardiology Referral", status: "Submitted", due: "06/25/2026", assigned: "Sarah M." },
  ];

  const filtered = authorizations
    .filter((auth) => {
      const text = `${auth.patient} ${auth.payer} ${auth.cpt} ${auth.assigned}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || auth.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Patient Name") return a.patient.localeCompare(b.patient);
      if (sortBy === "Payer") return a.payer.localeCompare(b.payer);
      if (sortBy === "Status") return a.status.localeCompare(b.status);
      return new Date(a.due) - new Date(b.due);
    });

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authtrack_token");
    navigate("/login");
  }

  return (
    <div style={styles.page}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Authorization Management</h1>
            <p style={styles.subtitle}>
              Search, filter, sort, and manage prior authorization work queues.
            </p>
          </div>

          <button style={styles.exportButton}>Export CSV Soon</button>
        </div>

        <section style={styles.controls}>
          <input
            style={styles.search}
            placeholder="Search patient, payer, CPT, or assigned user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Denied</option>
            <option>Submitted</option>
            <option>In Review</option>
          </select>

          <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Due Date</option>
            <option>Patient Name</option>
            <option>Payer</option>
            <option>Status</option>
          </select>
        </section>

        <section style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Payer</th>
                <th style={styles.th}>Procedure</th>
                <th style={styles.th}>CPT</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((auth, index) => (
                <tr key={index}>
                  <td style={styles.td}>{auth.patient}</td>
                  <td style={styles.td}>{auth.payer}</td>
                  <td style={styles.td}>{auth.procedure}</td>
                  <td style={styles.td}>{auth.cpt}</td>
                  <td style={styles.td}><span style={getStatusStyle(auth.status)}>{auth.status}</span></td>
                  <td style={styles.td}>{auth.due}</td>
                  <td style={styles.td}>{auth.assigned}</td>
                  <td style={styles.td}>
                    <button style={styles.smallButton}>View</button>
                    <button style={styles.smallButton}>Edit</button>
                    <button style={styles.deleteButton}>Delete</button>
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

  if (status === "Approved") return { ...base, background: "#dcfce7", color: "#166534" };
  if (status === "Denied") return { ...base, background: "#fee2e2", color: "#991b1b" };
  if (status === "Pending") return { ...base, background: "#fef3c7", color: "#92400e" };
  if (status === "Submitted") return { ...base, background: "#e0f2fe", color: "#0369a1" };

  return { ...base, background: "#dbeafe", color: "#1e40af" };
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Arial, sans-serif" },
  sidebar: { width: "250px", background: "#0f172a", color: "white", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" },
  logo: { fontSize: "22px", marginBottom: "24px" },
  navButton: { background: "transparent", color: "#cbd5e1", border: "none", textAlign: "left", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px" },
  activeButton: { background: "#2563eb", color: "white", border: "none", textAlign: "left", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "700" },
  logoutButton: { marginTop: "auto", background: "#dc2626", color: "white", border: "none", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "700" },
  main: { flex: 1, padding: "36px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  title: { fontSize: "34px", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", marginTop: "8px" },
  exportButton: { background: "#0f172a", color: "white", border: "none", padding: "12px 18px", borderRadius: "12px", fontWeight: "700" },
  controls: { display: "flex", gap: "14px", marginBottom: "24px" },
  search: { flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px" },
  select: { padding: "14px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px" },
  tableContainer: { background: "white", borderRadius: "18px", padding: "24px", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "14px", background: "#f1f5f9", color: "#334155", fontSize: "14px" },
  td: { padding: "14px", borderBottom: "1px solid #e2e8f0", color: "#334155" },
  smallButton: { marginRight: "6px", background: "#e0f2fe", color: "#0369a1", border: "none", padding: "7px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: "700" },
  deleteButton: { background: "#fee2e2", color: "#991b1b", border: "none", padding: "7px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: "700" },
};

export default Authorizations;