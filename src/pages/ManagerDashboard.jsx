import { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "../components/Sidebar";

export default function ManagerDashboard() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [authorizations, setAuthorizations] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

useEffect(() => {
  async function loadAuthorizations() {
    try {
      const token = localStorage.getItem("authtrack_token") || localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/authorizations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const auditResponse = await fetch(`${API_BASE}/audit-logs`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const auditData = await auditResponse.json();
setAuditLogs(auditData);

      const data = await response.json();
console.log("Manager authorizations:", data);
console.log("Statuses:", data.map((a) => a.status));
console.log("First record:", data[0]);

if (Array.isArray(data)) {
  setAuthorizations(data);
} else {
  setAuthorizations([]);
}
    } catch (error) {
      console.error("Error loading manager authorizations:", error);
    }
  }

  loadAuthorizations();
}, []);

  const analytics = {
    total: authorizations.length,
    pending: authorizations.filter((a) =>
  [
    "Not Started",
    "Pending",
    "Awaiting Clinical",
    "Renewal Needed",
    "Missing Docs",
  ].includes(a.status)
).length,
    approved: authorizations.filter(
  (a) => a.status === "Approved"
).length,
    denied: authorizations.filter(
  (a) => a.status === "Denied"
).length,
    urgent: authorizations.filter(
  (a) => a.priority === "Urgent"
).length,
    overdue: authorizations.filter((a) => {
  if (!a.due_date) return false;

  const dueDate = new Date(a.due_date);
  const today = new Date();

  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return dueDate < today;
}).length,
    approvalRate:
  authorizations.length > 0
    ? Math.round(
        (authorizations.filter(
          (a) => a.status === "Approved"
        ).length /
          authorizations.length) *
          100
      ) + "%"
    : "0%",
    avgTurnaround: "2.4 days",
  };

const employees = [
  {
    name: "Sarah Martinez",
    role: "Authorization Specialist",
    assigned: 35,
    completed: 28,
    pending: 7,
    denied: 3,
  },
  {
    name: "John Lee",
    role: "Senior Auth Specialist",
    assigned: 42,
    completed: 36,
    pending: 6,
    denied: 2,
  },
  {
    name: "Emily Carter",
    role: "Authorization Coordinator",
    assigned: 31,
    completed: 24,
    pending: 7,
    denied: 4,
  },
  {
    name: "Michael Brown",
    role: "Authorization Specialist",
    assigned: 40,
    completed: 35,
    pending: 5,
    denied: 2,
  },
];

  return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />

    <div className="manager-page" style={{ flex: 1 }}>
      <div className="manager-header">
        <div>
          <p className="manager-eyebrow">Enterprise Operations</p>
          <h1>Manager Dashboard</h1>
          <p className="manager-subtitle">
            Monitor authorization volume, risk, team workload, and payer follow-up activity.
          </p>
        </div>

        <button className="manager-primary-button">
          Export Manager Report
        </button>
      </div>

      <div className="manager-kpi-row">
        <div className="manager-kpi-card">
          <p>Total Authorizations</p>
          <h2>{analytics.total}</h2>
          <span>All active records</span>
        </div>

        <div className="manager-kpi-card warning">
          <p>Pending Review</p>
          <h2>{analytics.pending}</h2>
          <span>Needs payer follow-up</span>
        </div>

        <div className="manager-kpi-card success">
          <p>Approved</p>
          <h2>{analytics.approved}</h2>
          <span>{analytics.approvalRate} approval rate</span>
        </div>

        <div className="manager-kpi-card danger">
          <p>Denied</p>
          <h2>{analytics.denied}</h2>
          <span>Requires action</span>
        </div>
      </div>

      <div className="manager-panel">
  <div className="panel-header">
    <div>
      <h2>Recent Audit Activity</h2>
      <p>Latest authorization changes and user actions</p>
    </div>
  </div>

  <div className="audit-list">
    {auditLogs.length === 0 ? (
      <p>No audit activity yet.</p>
    ) : (
      auditLogs.slice(0, 10).map((log) => (
        <div className="audit-item" key={log.id}>
          <strong>{log.action}</strong>
          <span>{log.details}</span>
          <small>
            {log.email || "Unknown user"} •{" "}
            {new Date(log.created_at).toLocaleString()}
          </small>
        </div>
      ))
    )}
  </div>
</div>

      <div className="manager-content-grid">
        <div className="manager-panel large">
          <div className="panel-header">
            <div>
              <h2>Authorization Oversight</h2>
              <p>Filter records by status and priority.</p>
            </div>
          </div>

          <div className="manager-filters">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Denied</option>
            </select>

            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option>All</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="manager-mini-grid">
            <div>
              <p>Urgent Cases</p>
              <h3>{analytics.urgent}</h3>
            </div>

            <div>
              <p>Overdue Cases</p>
              <h3>{analytics.overdue}</h3>
            </div>

            <div>
              <p>Avg Turnaround</p>
              <h3>{analytics.avgTurnaround}</h3>
            </div>
          </div>

          <p className="filter-summary">
            Current View: {statusFilter} authorizations | Priority: {priorityFilter}
          </p>
        </div>

        <div className="manager-panel">
          <div className="panel-header">
            <div>
              <h2>Risk Snapshot</h2>
              <p>Items that need manager attention.</p>
            </div>
          </div>

          <div className="risk-list">
            <div>
              <strong>7 overdue</strong>
              <span>Authorization records past due date</span>
            </div>

<div className="manager-panel">
  <div className="panel-header">
    <div>
      <h2>Employee Analytics</h2>
      <p>Productivity and workload monitoring.</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Employee</th>
        <th>Assigned</th>
        <th>Completed</th>
        <th>Pending</th>
        <th>Completion %</th>
        <th>Denial %</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
  {employees.map((employee) => {
    const completionRate = Math.round(
      (employee.completed / employee.assigned) * 100
    );

    const denialRate = Math.round(
      (employee.denied / employee.assigned) * 100
    );

    return (
      <tr
        key={employee.name}
        className="clickable-row"
        onClick={() => setSelectedEmployee(employee)}
>
        <td>
          <strong>{employee.name}</strong>
          <br />
          <small>{employee.role}</small>
        </td>

        <td>{employee.assigned}</td>

        <td>{employee.completed}</td>

        <td>{employee.pending}</td>

        <td>{completionRate}%</td>

        <td>{denialRate}%</td>

        <td>
          {completionRate >= 85
            ? "🟢 On Target"
            : "🟡 Needs Review"}
        </td>
      </tr>
    );
  })}
</tbody>
  </table>
</div>

{selectedEmployee && (
  <div className="manager-panel employee-detail-panel">
    <div className="panel-header">
      <div>
        <h2>{selectedEmployee.name}</h2>
        <p>{selectedEmployee.role}</p>
      </div>

      <button
        className="manager-secondary-button"
        onClick={() => setSelectedEmployee(null)}
      >
        Close
      </button>
    </div>

    <div className="manager-mini-grid">
      <div>
        <p>Assigned</p>
        <h3>{selectedEmployee.assigned}</h3>
      </div>

      <div>
        <p>Completed</p>
        <h3>{selectedEmployee.completed}</h3>
      </div>

      <div>
        <p>Pending</p>
        <h3>{selectedEmployee.pending}</h3>
      </div>
    </div>
  </div>
)}

            <div>
              <strong>12 urgent</strong>
              <span>High priority cases assigned to staff</span>
            </div>

            <div>
              <strong>23 denied</strong>
              <span>Denials requiring appeal or review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
