function SessionWarningModal({ onStayLoggedIn, onLogout }) {
  return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "32px",
        width: "420px",
        maxWidth: "90%",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        ⚠️ Session Expiring
      </h2>

      <p style={{ color: "#555", lineHeight: 1.6 }}>
        Your AuthTrack Pro session will expire in
        <strong> 60 seconds </strong>
        due to inactivity.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "24px",
          justifyContent: "center",
        }}
      >
        <button onClick={onStayLoggedIn}>
          Stay Logged In
        </button>

        <button onClick={onLogout}>
          Log Out Now
        </button>
      </div>
    </div>
  </div>
);
}

export default SessionWarningModal;