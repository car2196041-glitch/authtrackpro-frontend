
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function formatDate(value) {
  return value ? value.slice(0, 10) : "";
}

function escapeCsv(value) {
  const str = String(value ?? "");
  return `"${str.replaceAll('"', '""')}"`;
}

function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/);
  const headers = rows.shift().split(",").map((h) => h.trim().toLowerCase());

  return rows.map((row) => {
    const values = row.split(",").map((v) => v.replace(/^"|"$/g, "").trim());
    const record = {};
    headers.forEach((header, i) => {
      record[header] = values[i] || "";
    });
    return {
      patient_name: record.patient_name || record.patient || "",
      payer: record.payer || "",
      procedure_name: record.procedure_name || record.procedure || "",
      cpt_code: record.cpt_code || record.cpt || "",
      status: record.status || "Pending",
      priority: record.priority || "Normal",
      due_date: record.due_date || "",
      assigned_to: record.assigned_to || "",
      notes: record.notes || "",
    };
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [metrics, setMetrics] = useState({ total: 0, pending: 0, approved: 0, denied: 0 });
  const [authorizations, setAuthorizations] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchAuthorizations();
  }, []);

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
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows = parseCsv(text);

    if (!rows.length) {
      alert("No rows found in CSV.");
      return;
    }

    if (!window.confirm(`Import ${rows.length} authorization records?`)) return;

    try {
      for (const row of rows) {
        await fetch(`${API_BASE}/authorizations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(row),
        });
      }

      await fetchAuthorizations();
      await fetchDashboardData();
      alert("CSV import complete.");
    } catch (error) {
      console.error("CSV import error:", error);
      alert("CSV import failed.");
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

  const dueSoon = authorizations.filter((auth) => {
    if (!auth.due_date) return false;
    const today = new Date();
    const due = new Date(auth.due_date);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 3;
  }).length;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>AuthTrack Pro Dashboard</h1>
          <p style={styles.subtitle}>Prior authorization command center</p>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.secondaryBtn} onClick={() => fileRef.current.click()}>
            Import CSV
          </button>
          <button style={styles.secondaryBtn} onClick={exportCsv}>
            Export CSV
          </button>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
          <input ref={fileRef} type="file" accept=".csv" onChange={importCsv} style={{ display: "none" }} />
        </div>
      </header>

      <section style={styles.metrics}>
        <Metric label="Total" value={metrics.total} />
        <Metric label="Pending" value={metrics.pending} accent="#d97706" />
        <Metric label="Approved" value={metrics.approved} accent="#16a34a" />
        <Metric label="Denied" value={metrics.denied} accent="#dc2626" />
        <Metric label="Due in 3 Days" value={dueSoon} accent="#2563eb" />
      </section>

      <section style={styles.card}>
        <h2 style={styles.cardTitle}>Add New Authorization</h2>

        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <input name="patient_name" placeholder="Patient Name" value={formData.patient_name} onChange={handleChange} required />
          <input name="payer" placeholder="Payer" value={formData.payer} onChange={handleChange} required />
          <input name="procedure_name" placeholder="Procedure Name" value={formData.procedure_name} onChange={handleChange} required />
          <input name="cpt_code" placeholder="CPT Code" value={formData.cpt_code} onChange={handleChange} required />

          <select name="status" value={formData.status} onChange={handleChange}>
            {statusOptions.map((s) => <option key={s}>{s}</option>)}
          </select>

          <select name="priority" value={formData.priority} onChange={handleChange}>
            {priorityOptions.map((p) => <option key={p}>{p}</option>)}
          </select>

          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
          <input name="assigned_to" placeholder="Assigned To" value={formData.assigned_to} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes / payer follow-up / denial reason" value={formData.notes} onChange={handleChange} style={styles.notes} />

          <button type="submit" style={styles.primaryBtn}>Save Authorization</button>
        </form>
      </section>

      <section style={styles.card}>
        <div style={styles.tableHeader}>
          <h2 style={styles.cardTitle}>Live Authorizations</h2>
          <p style={styles.subtitle}>{authorizations.length} active records</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={styles.tableWrap}>
            <table>
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
                        <td><input name="patient_name" value={editForm.patient_name} onChange={handleEditChange} /></td>
                        <td><input name="payer" value={editForm.payer} onChange={handleEditChange} /></td>
                        <td><input name="procedure_name" value={editForm.procedure_name} onChange={handleEditChange} /></td>
                        <td><input name="cpt_code" value={editForm.cpt_code} onChange={handleEditChange} /></td>
                        <td><select name="status" value={editForm.status} onChange={handleEditChange}>{statusOptions.map((s) => <option key={s}>{s}</option>)}</select></td>
                        <td><select name="priority" value={editForm.priority} onChange={handleEditChange}>{priorityOptions.map((p) => <option key={p}>{p}</option>)}</select></td>
                        <td><input type="date" name="due_date" value={editForm.due_date} onChange={handleEditChange} /></td>
                        <td><input name="assigned_to" value={editForm.assigned_to} onChange={handleEditChange} /></td>
                        <td><input name="notes" value={editForm.notes} onChange={handleEditChange} /></td>
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
  page: { minHeight: "100vh", background: "#f8fafc", padding: "32px", color: "#0f172a" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" },
  title: { margin: 0, fontSize: "42px", fontWeight: 900 },
  subtitle: { margin: "6px 0 0", color: "#64748b" },
  headerActions: { display: "flex", gap: "12px", flexWrap: "wrap" },
  metrics: { display: "grid", gridTemplateColumns: "repeat(5, minmax(150px, 1fr))", gap: "16px", marginBottom: "24px" },
  metricCard: { background: "white", padding: "22px", borderRadius: "18px", boxShadow: "0 10px 30px rgba(15,23,42,.08)", border: "1px solid #e2e8f0" },
  metricLabel: { margin: 0, color: "#64748b", fontWeight: 800 },
  metricValue: { margin: "8px 0 0", fontSize: "36px" },
  card: { background: "white", borderRadius: "22px", padding: "24px", boxShadow: "0 10px 30px rgba(15,23,42,.08)", border: "1px solid #e2e8f0", marginBottom: "24px" },
  cardTitle: { margin: 0, fontSize: "24px", fontWeight: 900 },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "18px" },
  notes: { gridColumn: "span 3", minHeight: "52px" },
  primaryBtn: { background: "#2563eb", color: "white", border: 0, borderRadius: "12px", padding: "14px 18px", fontWeight: 900 },
  secondaryBtn: { background: "white", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "12px 16px", fontWeight: 900 },
  logoutBtn: { background: "#0f172a", color: "white", border: 0, borderRadius: "12px", padding: "12px 16px", fontWeight: 900 },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  tableWrap: { overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px" },
  editBtn: { background: "#2563eb", color: "white", border: 0, borderRadius: "10px", padding: "8px 10px", marginRight: "6px" },
  deleteBtn: { background: "#fee2e2", color: "#991b1b", border: 0, borderRadius: "10px", padding: "8px 10px" },
  saveBtn: { background: "#16a34a", color: "white", border: 0, borderRadius: "10px", padding: "8px 10px", marginRight: "6px" },
  cancelBtn: { background: "#64748b", color: "white", border: 0, borderRadius: "10px", padding: "8px 10px" },
};
