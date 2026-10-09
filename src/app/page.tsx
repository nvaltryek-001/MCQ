
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
        MCQ Aptiq
      </h1>

      <p style={{ fontSize: "18px", color: "#cbd5e1" }}>
        Your smart MCQ practice platform
      </p>

      <button
        onClick={() => alert("Welcome to MCQ Aptiq!")}
        style={{
          marginTop: "24px",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          background: "#22c55e",
          color: "#052e16",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Start Practicing
      </button>
    </main>
  );
}
