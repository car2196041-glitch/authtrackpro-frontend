import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";

function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("authtrack_token") ||
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />

  <Route path="/pricing" element={<Pricing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
    </HashRouter>
  );
}
