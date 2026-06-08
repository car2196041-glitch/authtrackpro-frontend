import { useEffect, useState } from "react";

const API_BASE = "https://authtrackpro-backend.onrender.com";
const token = localStorage.getItem("token");

function Dashboard() {
  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    denied: 0,
  });

  const [authorizations, setAuthorizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    patient_name: "",
    payer: "",
    procedure_name: "",
    cpt_code: "",
    status: "Pending",
    priority: "Normal",
    due_date: "",
    assigned_to: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchDashboardData();
    fetchAuthorizations();
  }, []);

  async function fetchDashboardData() {
  try {
    const token =
      localStorage.getItem("authtrack_token") ||
      localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("DASHBOARD RESPONSE:", data);

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
    const token =
      localStorage.getItem("authtrack_token") ||
      localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/authorizations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("AUTH RESPONSE:", data);

    setAuthorizations(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Authorization fetch error:", error);
    setAuthorizations([]);
  } finally {
    setLoading(false);
  }
}

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token =
      localStorage.getItem("authtrack_token") ||
      localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE}/authorizations`, {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save authorization");
      }

      setFormData({
        patient_name: "",
        payer: "",
        procedure_name: "",
        cpt_code: "",
        status: "Pending",
        priority: "Normal",
        due_date: "",
        assigned_to: "",
        notes: "",
      });

      await fetchAuthorizations();
      await fetchDashboardData();

      alert("Authorization added successfully!");
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
      due_date: auth.due_date ? auth.due_date.slice(0, 10) : "",
      assigned_to: auth.assigned_to || "",
      notes: auth.notes || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function handleEditChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  async function saveEdit(id) {
  const token =
    localStorage.getItem("authtrack_token") ||
    localStorage.getItem("token");

  try {
      const response = await fetch(`${API_BASE}/authorizations/${id}`, {
        method: "PUT",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Failed to update authorization");
      }

      await fetchAuthorizations();
      await fetchDashboardData();

      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error("Edit save error:", error);
      alert("There was an error saving the updated authorization.");
    }
  }

  async function deleteAuthorization(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this authorization?"
  );

  if (!confirmed) return;

 const token =
   localStorage.getItem("authtrack_token") ||
   localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE}/authorizations/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    await fetchAuthorizations();
    await fetchDashboardData();

  } catch (error) {
    console.error("Delete error:", error);
    alert("Could not delete authorization.");
  }
}

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AuthTrack Pro Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow">
            <p>Total</p>
            <h2 className="text-3xl font-bold">{metrics.total}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p>Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {metrics.pending}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p>Approved</p>
            <h2 className="text-3xl font-bold text-green-600">
              {metrics.approved}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p>Denied</p>
            <h2 className="text-3xl font-bold text-red-600">
              {metrics.denied}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Authorization</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="patient_name"
              placeholder="Patient Name"
              value={formData.patient_name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="payer"
              placeholder="Payer"
              value={formData.payer}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="procedure_name"
              placeholder="Procedure Name"
              value={formData.procedure_name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="cpt_code"
              placeholder="CPT Code"
              value={formData.cpt_code}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Denied</option>
              <option>Awaiting Clinical</option>
              <option>Not Started</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option>Normal</option>
              <option>High</option>
            </select>

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="assigned_to"
              placeholder="Assigned To"
              value={formData.assigned_to}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg md:col-span-2"
            >
              Save Authorization
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold">Live Authorizations</h2>
          </div>

          {loading ? (
            <div className="p-6">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Payer</th>
                    <th className="p-3">Procedure</th>
                    <th className="p-3">CPT</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Assigned To</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {authorizations.map((auth) => (
                    <tr key={auth.id} className="border-b">
                      {editingId === auth.id ? (
                        <>
                          <td className="p-2">
                            <input
                              name="patient_name"
                              value={editForm.patient_name || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              name="payer"
                              value={editForm.payer || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              name="procedure_name"
                              value={editForm.procedure_name || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              name="cpt_code"
                              value={editForm.cpt_code || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <select
                              name="status"
                              value={editForm.status || "Pending"}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            >
                              <option>Pending</option>
                              <option>Approved</option>
                              <option>Denied</option>
                              <option>Awaiting Clinical</option>
                              <option>Not Started</option>
                            </select>
                          </td>

                          <td className="p-2">
                            <select
                              name="priority"
                              value={editForm.priority || "Normal"}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            >
                              <option>Normal</option>
                              <option>High</option>
                            </select>
                          </td>

                          <td className="p-2">
                            <input
                              type="date"
                              name="due_date"
                              value={editForm.due_date || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              name="assigned_to"
                              value={editForm.assigned_to || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              name="notes"
                              value={editForm.notes || ""}
                              onChange={handleEditChange}
                              className="border p-1 rounded w-full"
                            />
                          </td>

                          <td className="p-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveEdit(auth.id)}
                                className="bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Save
                              </button>

                              <button
                                onClick={cancelEdit}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-2">{auth.patient_name}</td>
                          <td className="p-2">{auth.payer}</td>
                          <td className="p-2">{auth.procedure_name}</td>
                          <td className="p-2">{auth.cpt_code}</td>
                          <td className="p-2">{auth.status}</td>
                          <td className="p-2">{auth.priority}</td>
                          <td className="p-2">
                            {auth.due_date
                              ? auth.due_date.slice(0, 10)
                              : ""}
                          </td>
                          <td className="p-2">{auth.assigned_to}</td>
                          <td className="p-2">{auth.notes}</td>

                          <td className="p-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEdit(auth)}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => deleteAuthorization(auth.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;