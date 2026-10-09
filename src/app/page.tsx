export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f5f7ff",
      color: "#172554",
      fontFamily: "Arial, sans-serif",
      padding: "40px 20px"
    }}>
      <header style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{fontSize: "30px", color: "#2563eb"}}>
          AptIQ
        </h1>
        <span>Aptitude Skill Analyzer</span>
      </header>

      <section style={{
        maxWidth: "1000px",
        margin: "100px auto",
        textAlign: "center"
      }}>
        <h2 style={{fontSize: "48px", marginBottom: "20px"}}>
          Your Aptitude Success Partner
        </h2>

        <p style={{
          fontSize: "18px",
          lineHeight: 1.8,
          color: "#475569"
        }}>
          Discover your strengths, identify skill gaps, and prepare
          for engineering placements with AptIQ.
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "35px",
          flexWrap: "wrap"
        }}>
          <a href="/practice" style={{
            background: "#2563eb",
            color: "white",
            padding: "15px 25px",
            borderRadius: "10px",
            textDecoration: "none"
          }}>
            Start Practicing
          </a>

          <a href="/dashboard" style={{
            border: "1px solid #2563eb",
            color: "#2563eb",
            padding: "15px 25px",
            borderRadius: "10px",
            textDecoration: "none"
          }}>
            View Dashboard
          </a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "65px"
        }}>
          {[
            ["Quantitative Aptitude", "Improve numerical skills"],
            ["Logical Reasoning", "Develop problem-solving"],
            ["Verbal Ability", "Strengthen communication"],
            ["Performance Analysis", "Understand your progress"]
          ].map(([title, description]) => (
            <article key={title} style={{
              background: "white",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
            }}>
              <h3>{title}</h3>
              <p style={{color: "#64748b"}}>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
