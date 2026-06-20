import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const API_BASE = "https://authtrackpro-backend.onrender.com";

const emptyForm = {
  patient_name: "",
  payer: "",
  procedure_name: "",
  cpt_code: "",
  status: "Pending",
  priority: "Normal",
  due_date: "",
  assigned_to: "",
  notes: "",
};

const statusOptions = [
  "Pending",
  "Approved",
  "Denied",
  "Awaiting Clinical",
  "Missing Docs",
  "Renewal Needed",
  "Not Started",
];

const priorityOptions = ["Normal", "High", "Urgent"];

function getToken() {
  return localStorage.getItem("authtrack_token") || localStorage.getItem("token");
}

function getUserName() {
  try {
    const storedUser = localStorage.getItem("authtrack_user");
    if (!storedUser) return "User";
    const user = JSON.parse(storedUser);
    return user.name || user.email?.split("@")[0] || "User";
  } catch {
    return "User";
  }
}

function formatDate(value) {
  return value ? value.slice(0, 10) : "";
}

function escapeCsv(value) {
  const str = String(value ?? "");
  return `"${str.replaceAll('"', '""')}"`;
}

function daysUntil(dateValue) {
  if (!dateValue) return null;
  const today = new Date();
  const due = new Date(dateValue);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
}

export default function Dashboard() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    denied: 0,
  });

  const [authorizations, setAuthorizations] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  const userName = getUserName();

  useEffect(() => {
    fetchDashboardData();
    fetchAuthorizations();
  }, []);

  const dueSoonList = useMemo(() => {
    return authorizations
      .filter((auth) => {
        const days = daysUntil(auth.due_date);
        return days !== null && days >= 0 && days <= 7;
      })
      .slice(0, 5);
  }, [authorizations]);

  const overdueList = useMemo(() => {
    return authorizations
      .filter((auth) => {
        const days = daysUntil(auth.due_date);
        return days !== null && days < 0 && auth.status !== "Approved";
      })
      .slice(0, 5);
  }, [authorizations]);

  const deniedList = useMemo(() => {
    return authorizations.filter((auth) => auth.status === "Denied").slice(0, 5);
  }, [authorizations]);

  const renewalList = useMemo(() => {
    return authorizations.filter((auth) => auth.status === "Renewal Needed").slice(0, 5);
  }, [authorizations]);

  async function fetchDashboardData() {
    try {
      const response = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = await response.json();

      setMetrics({
        total: data.total || 0,
        pending: data.pending || 0,
        approved: data.approved || 0,
        denied: data.denied || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  }

  async function fetchAuthorizations() {
    try {
      const response = await fetch(`${API_BASE}/authorizations`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = await response.json();
      setAuthorizations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Authorization fetch error:", error);
      setAuthorizations([]);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/authorizations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save authorization");

      setFormData(emptyForm);
      await fetchAuthorizations();
      await fetchDashboardData();
    } catch (error) {
      console.error("Add authorization error:", error);
      alert("Error adding authorization");
    }
  }

  function startEdit(auth) {
    setEditingId(auth.id);
    setEditForm({
      patient_name: auth.patient_name || "",
      payer: auth.payer || "",
      procedure_name: auth.procedure_name || "",
      cpt_code: auth.cpt_code || "",
      status: auth.status || "Pending",
      priority: auth.priority || "Normal",
      due_date: formatDate(auth.due_date),
      assigned_to: auth.assigned_to || "",
      notes: auth.notes || "",
    });
  }

  async function saveEdit(id) {
    try {
      const response = await fetch(`${API_BASE}/authorizations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Failed to update authorization");

      setEditingId(null);
      setEditForm({});
      await fetchAuthorizations();
      await fetchDashboardData();
    } catch (error) {
      console.error("Edit save error:", error);
      alert("Could not save edit.");
    }
  }

  async function deleteAuthorization(id) {
    if (!window.confirm("Delete this authorization?")) return;

    try {
      const response = await fetch(`${API_BASE}/authorizations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!response.ok) throw new Error("Delete failed");

      await fetchAuthorizations();
      await fetchDashboardData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete authorization.");
    }
  }

  function exportCsv() {
    const headers = [
      "patient_name",
      "payer",
      "procedure_name",
      "cpt_code",
      "status",
      "priority",
      "due_date",
      "assigned_to",
      "notes",
    ];

    const rows = authorizations.map((auth) =>
      headers.map((h) => escapeCsv(h === "due_date" ? formatDate(auth[h]) : auth[h])).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "authtrackpro-authorizations.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  async function importCsv(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/authorizations/import`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "CSV import failed.");
      }

      await fetchAuthorizations();
      await fetchDashboardData();

      alert("CSV import complete. " + data.importedCount + " records added.");
    } catch (error) {
      console.error("CSV import error:", error);
      alert(error.name + ": " + error.message);
    } finally {
      e.target.value = "";
    }
  }

  function logout() {
    localStorage.removeItem("authtrack_token");
    localStorage.removeItem("token");
    localStorage.removeItem("authtrack_user");
    navigate("/login");
  }

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>
          <img
  src={logo}
  alt="AuthTrack Pro"
  style={{
    width: "180px",
    height: "90px",
    objectFit: "contain"
  }}
/>
          <div>
            <h2 style={styles.logoText}>AuthTrack Pro</h2>
            <p style={styles.logoSub}>Prior Auth Command Center</p>
          </div>
        </div>

        <nav style={styles.nav}>
  <button style={styles.navActive} onClick={() => navigate("/dashboard")}>
    Dashboard
  </button>

  <button style={styles.navItem} onClick={() => navigate("/manager-dashboard")}>
    Manager Dashboard
  </button>

  <button style={styles.navItem} onClick={() => navigate("/")}>
    Home
  </button>

  <button style={styles.navItem} onClick={() => navigate("/pricing")}>
    Pricing
  </button>

  <button style={styles.navItem} onClick={logout}>
    Logout
  </button>
</nav>

        <div style={styles.sidebarFooter}>
          <p style={styles.sidebarSmall}>Pilot Mode</p>
          <strong>Reliant / Med-Metrix Ready</strong>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topBar}>
          <div>
            <p style={styles.eyebrow}>Welcome back, {userName}</p>
            <h1 style={styles.pageTitle}>Authorization Dashboard</h1>
            <p style={styles.subtitle}>Track pending, denied, overdue, and renewal authorization activity.</p>
          </div>

          <div style={styles.actions}>
            <button style={styles.secondaryBtn} onClick={() => fileRef.current.click()}>
              Import CSV
            </button>
            <button style={styles.secondaryBtn} onClick={exportCsv}>
              Export CSV
            </button>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>

            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              onChange={importCsv}
              style={{ display: "none" }}
            />
          </div>
        </header>

        <section style={styles.metrics}>
          <Metric label="Total Authorizations" value={metrics.total} accent="#2563eb" />
          <Metric label="Pending" value={metrics.pending} accent="#d97706" />
          <Metric label="Approved" value={metrics.approved} accent="#16a34a" />
          <Metric label="Denied" value={metrics.denied} accent="#dc2626" />
          <Metric label="Due in 7 Days" value={dueSoonList.length} accent="#7c3aed" />
          <Metric label="Overdue" value={overdueList.length} accent="#991b1b" />
        </section>

        <section style={styles.insightGrid}>
          <QueueCard title="Due Soon" subtitle="Next 7 days" items={dueSoonList} empty="No items due soon." />
          <QueueCard title="Overdue" subtitle="Needs follow-up" items={overdueList} empty="No overdue items." />
          <QueueCard title="Denial Tracking" subtitle="Denied authorizations" items={deniedList} empty="No denials found." />
          <QueueCard title="Renewal Tracking" subtitle="Renewals needed" items={renewalList} empty="No renewals pending." />
        </section>

        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Add New Authorization</h2>
              <p style={styles.cardSub}>Create a new authorization record for tracking and follow-up.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={styles.formGrid}>
            <input style={styles.input} name="patient_name" placeholder="Patient Name" value={formData.patient_name} onChange={handleChange} required />
            <input style={styles.input} name="payer" placeholder="Payer" value={formData.payer} onChange={handleChange} required />
            <input style={styles.input} name="procedure_name" placeholder="Procedure Name" value={formData.procedure_name} onChange={handleChange} required />
            <input style={styles.input} name="cpt_code" placeholder="CPT Code" value={formData.cpt_code} onChange={handleChange} required />

            <select style={styles.input} name="status" value={formData.status} onChange={handleChange}>
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select style={styles.input} name="priority" value={formData.priority} onChange={handleChange}>
              {priorityOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <input style={styles.input} type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            <input style={styles.input} name="assigned_to" placeholder="Assigned To" value={formData.assigned_to} onChange={handleChange} />

            <textarea
              name="notes"
              placeholder="Notes / payer follow-up / denial reason"
              value={formData.notes}
              onChange={handleChange}
              style={styles.notes}
            />

            <button type="submit" style={styles.primaryBtn}>
              Save Authorization
            </button>
          </form>
        </section>

        <section style={styles.card}>
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.cardTitle}>Live Authorizations</h2>
              <p style={styles.cardSub}>{authorizations.length} active records</p>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Payer</th>
                    <th>Procedure</th>
                    <th>CPT</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Assigned</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {authorizations.map((auth) => (
                    <tr key={auth.id}>
                      {editingId === auth.id ? (
                        <>
                          <td><input style={styles.tableInput} name="patient_name" value={editForm.patient_name} onChange={handleEditChange} /></td>
                          <td><input style={styles.tableInput} name="payer" value={editForm.payer} onChange={handleEditChange} /></td>
                          <td><input style={styles.tableInput} name="procedure_name" value={editForm.procedure_name} onChange={handleEditChange} /></td>
                          <td><input style={styles.tableInput} name="cpt_code" value={editForm.cpt_code} onChange={handleEditChange} /></td>
                          <td>
                            <select style={styles.tableInput} name="status" value={editForm.status} onChange={handleEditChange}>
                              {statusOptions.map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td>
                            <select style={styles.tableInput} name="priority" value={editForm.priority} onChange={handleEditChange}>
                              {priorityOptions.map((p) => <option key={p}>{p}</option>)}
                            </select>
                          </td>
                          <td><input style={styles.tableInput} type="date" name="due_date" value={editForm.due_date} onChange={handleEditChange} /></td>
                          <td><input style={styles.tableInput} name="assigned_to" value={editForm.assigned_to} onChange={handleEditChange} /></td>
                          <td><input style={styles.tableInput} name="notes" value={editForm.notes} onChange={handleEditChange} /></td>
                          <td>
                            <button style={styles.saveBtn} onClick={() => saveEdit(auth.id)}>Save</button>
                            <button style={styles.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{auth.patient_name}</td>
                          <td>{auth.payer}</td>
                          <td>{auth.procedure_name}</td>
                          <td>{auth.cpt_code}</td>
                          <td><span style={statusStyle(auth.status)}>{auth.status}</span></td>
                          <td>{auth.priority}</td>
                          <td>{formatDate(auth.due_date)}</td>
                          <td>{auth.assigned_to}</td>
                          <td>{auth.notes}</td>
                          <td>
                            <button style={styles.editBtn} onClick={() => startEdit(auth)}>Edit</button>
                            <button style={styles.deleteBtn} onClick={() => deleteAuthorization(auth.id)}>Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value, accent = "#0f172a" }) {
  return (
    <div style={styles.metricCard}>
      <p style={styles.metricLabel}>{label}</p>
      <h2 style={{ ...styles.metricValue, color: accent }}>{value}</h2>
    </div>
  );
}

function QueueCard({ title, subtitle, items, empty }) {
  return (
    <div style={styles.queueCard}>
      <div style={styles.queueHeader}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {items.length === 0 ? (
        <p style={styles.emptyText}>{empty}</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={styles.queueItem}>
            <strong>{item.patient_name || "Unknown Patient"}</strong>
            <span>{item.payer || "No payer"} • {formatDate(item.due_date) || "No due date"}</span>
          </div>
        ))
      )}
    </div>
  );
}

function statusStyle(status) {
  const color =
    status === "Approved" ? "#16a34a" :
    status === "Denied" ? "#dc2626" :
    status === "Missing Docs" ? "#7c3aed" :
    status === "Renewal Needed" ? "#2563eb" :
    "#d97706";

  return {
    color,
    background: `${color}18`,
    border: `1px solid ${color}33`,
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: 800,
    whiteSpace: "nowrap",
  };
}

const styles = {
  shell: {
    minHeight: "100vh",
    display: "flex",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "Inter, Arial, sans-serif",
  },
  sidebar: {
    width: "280px",
    background: "#0f172a",
    color: "white",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoBox: { display: "flex", gap: "12px", alignItems: "center" },
  logoIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "#2563eb",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },
  logoText: { margin: 0, fontSize: "22px" },
  logoSub: { margin: "4px 0 0", color: "#cbd5e1", fontSize: "13px" },
  nav: { display: "grid", gap: "10px", marginTop: "42px" },
  navActive: {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  textAlign: "left",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
},
  navItem: {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "none",
  background: "transparent",
  color: "#cbd5e1",
  textAlign: "left",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
},
  sidebarFooter: {
    background: "rgba(255,255,255,.08)",
    borderRadius: "16px",
    padding: "16px",
  },
  sidebarSmall: { margin: "0 0 6px", color: "#cbd5e1", fontSize: "13px" },
  main: { flex: 1, padding: "32px", overflowX: "hidden" },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "28px",
  },
  eyebrow: { color: "#2563eb", fontWeight: 900, margin: 0 },
  pageTitle: { margin: "6px 0 0", fontSize: "42px", fontWeight: 950 },
  subtitle: { margin: "8px 0 0", color: "#64748b", fontSize: "16px" },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap" },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(150px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  metricCard: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(15,23,42,.08)",
    border: "1px solid #e2e8f0",
  },
  metricLabel: { margin: 0, color: "#64748b", fontWeight: 800 },
  metricValue: { margin: "8px 0 0", fontSize: "36px" },
  insightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  queueCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "18px",
    boxShadow: "0 10px 30px rgba(15,23,42,.06)",
  },
  queueHeader: { marginBottom: "12px" },
  queueItem: {
    display: "grid",
    gap: "4px",
    padding: "10px 0",
    borderTop: "1px solid #e2e8f0",
  },
  emptyText: { color: "#64748b" },
  card: {
    background: "white",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(15,23,42,.08)",
    border: "1px solid #e2e8f0",
    marginBottom: "24px",
  },
  cardHeader: { marginBottom: "16px" },
  cardTitle: { margin: 0, fontSize: "24px", fontWeight: 900 },
  cardSub: { margin: "6px 0 0", color: "#64748b" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
  },
  input: {
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "13px",
    fontSize: "14px",
  },
  notes: {
    gridColumn: "span 3",
    minHeight: "52px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "13px",
    fontSize: "14px",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: 0,
    borderRadius: "12px",
    padding: "14px 18px",
    fontWeight: 900,
  },
  secondaryBtn: {
    background: "white",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "12px 16px",
    fontWeight: 900,
  },
  logoutBtn: {
    background: "#0f172a",
    color: "white",
    border: 0,
    borderRadius: "12px",
    padding: "12px 16px",
    fontWeight: 900,
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  tableWrap: {
    overflowX: "auto",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1100px",
  },
  tableInput: {
    width: "130px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "8px",
  },
  editBtn: {
    background: "#2563eb",
    color: "white",
    border: 0,
    borderRadius: "10px",
    padding: "8px 10px",
    marginRight: "6px",
  },
  deleteBtn: {
    background: "#fee2e2",
    color: "#991b1b",
    border: 0,
    borderRadius: "10px",
    padding: "8px 10px",
  },
  saveBtn: {
    background: "#16a34a",
    color: "white",
    border: 0,
    borderRadius: "10px",
    padding: "8px 10px",
    marginRight: "6px",
  },
  cancelBtn: {
    background: "#64748b",
    color: "white",
    border: 0,
    borderRadius: "10px",
    padding: "8px 10px",
  },
};
