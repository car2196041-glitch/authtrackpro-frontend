import { useState } from "react";

const API_BASE = "https://authtrackpro-backend.onrender.com";
export default function Register() {
  const [form, setForm] = useState({
  organization: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
  alert("Passwords do not match.");
  return;
}

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  email: form.email,
  password: form.password,
}),
});

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registration successful! Please log in.");
      window.location.href = "/#/login";
    } catch (error) {
      console.error(error);
      alert("Registration error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
  <p className="text-blue-600 font-semibold">
    Step 1 of 2
  </p>

  <h1 className="text-4xl font-bold mt-2">
    Create Your Account
  </h1>

  <p className="text-slate-500 mt-3">
    Let's get your organization set up before calculating your potential ROI.
  </p>
</div>

        <input
  type="text"
  name="organization"
  placeholder="Organization / Practice Name"
  value={form.organization}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-4"
  required
/>

<input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={form.firstName}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-4"
  required
/>

<input
  type="text"
  name="lastName"
  placeholder="Last Name"
  value={form.lastName}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-4"
  required
/>

<input
  type="email"
  name="email"
  placeholder="Work Email Address"
  value={form.email}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-4"
  required
/>

        <input
  type="password"
  name="password"
  placeholder="Create Password"
  value={form.password}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-4"
  required
/>

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  value={form.confirmPassword}
  onChange={handleChange}
  className="w-full border p-4 rounded-lg mb-6"
  required
/>

        <button
  type="submit"
  className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl border border-slate-200"
>
  Continue to ROI Calculator →
</button>

<div className="text-center mt-6">
  <p className="text-slate-600">
    Already have an account?{" "}
    <a
      href="/#/login"
      className="text-blue-600 font-semibold hover:underline"
    >
      Sign In
    </a>
  </p>
</div>

<div className="mt-8 text-center text-sm text-slate-500 border-t pt-6">
  🔒 Your information is securely encrypted and protected.
</div>

      </form>
    </div>
  );
}