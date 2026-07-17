import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SessionWarningModal from "./SessionWarningModal";

function SessionTimeout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(false);
  const resetTimerRef = useRef(null);
  const TIMEOUT_MINUTES = 15;
  const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000;
  const WARNING_MS = 60 * 1000;
  const WARNING_START_MS = TIMEOUT_MS - WARNING_MS;
  const publicPages = ["/", "/pricing", "/about", "/login", "/register"];
  const handleStayLoggedIn = () => {
  if (resetTimerRef.current) {
    resetTimerRef.current();
  }

  setShowWarning(false);
};

  useEffect(() => {
    if (publicPages.includes(location.pathname)) {
  return;
}
  let timeoutId;
  let warningTimeoutId;
  const events = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
];

  const logoutUser = () => {
  const token = localStorage.getItem("authtrack_token");

  if (!token) return;

  localStorage.removeItem("authtrack_token");
  localStorage.removeItem("authtrack_user");
  navigate("/login");
};

  const resetTimer = () => {
  clearTimeout(timeoutId);
  clearTimeout(warningTimeoutId);

  setShowWarning(false);

  warningTimeoutId = setTimeout(() => {
    setShowWarning(true);
  }, WARNING_START_MS);

  timeoutId = setTimeout(logoutUser, TIMEOUT_MS);
};
  resetTimerRef.current = resetTimer;

  events.forEach((event) => {
  window.addEventListener(event, resetTimer);
});

resetTimer();

return () => {
  clearTimeout(timeoutId);

  events.forEach((event) => {
    window.removeEventListener(event, resetTimer);
  });
};
}, [navigate, TIMEOUT_MS, location.pathname]);

  return showWarning ? (
  <SessionWarningModal
    onStayLoggedIn={handleStayLoggedIn}
    onLogout={() => {
      localStorage.removeItem("authtrack_token");
      localStorage.removeItem("authtrack_user");
      navigate("/login");
    }}
  />
) : null;
}

export default SessionTimeout;