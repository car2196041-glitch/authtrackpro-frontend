function SessionWarningModal({ onStayLoggedIn, onLogout }) {
  return (
    <div>
      <h3>Session Expiring</h3>
      <p>Your session will expire soon due to inactivity.</p>

      <button onClick={onStayLoggedIn}>Stay Logged In</button>
      <button onClick={onLogout}>Log Out Now</button>
    </div>
  );
}

export default SessionWarningModal;