import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import AuditLog from "./pages/AuditLog";  
import Reports from "./pages/Reports";
import Authorizations from "./pages/Authorizations";
import About from "./pages/About";
import SessionTimeout from "./components/SessionTimeout";

function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("authtrack_token") ||
    localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
    useEffect(() => {
    const TIMEOUT = 15 * 60 * 1000;
    const WARNING_TIME = 14 * 60 * 1000;

    let logoutTimer;
    let warningTimer;

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("authtrack_token");
      window.location.href = "/#/login";
    };

    const resetTimers = () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);

      warningTimer = setTimeout(() => {
        alert("Your session will expire in 1 minute.");
      }, WARNING_TIME);

      logoutTimer = setTimeout(logout, TIMEOUT);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimers);
    });

    resetTimers();

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimers);
      });
    };
  }, []);
  return (
    <HashRouter>
      <SessionTimeout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/manager-dashboard"
  element={
    <ProtectedRoute>
      <ManagerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/audit-log"
  element={
    <ProtectedRoute>
      <AuditLog />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>

<Route
  path="/authorizations"
  element={
    <ProtectedRoute>
      <Authorizations />
    </ProtectedRoute>
  }
/>

</Routes>
    </HashRouter>
  );
}
