"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Result = {
  date: string;
  total: number;
  correct: number;
  section: string;
};

export default function DashboardPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    try {
      setResults(JSON.parse(localStorage.getItem("aptiq-results") || "[]"));
    } catch {}
  }, []);

  const attempted = results.reduce((sum,r)=>sum+r.total,0);
  const correct = results.reduce((sum,r)=>sum+r.correct,0);
  const accuracy = attempted ? Math.round(correct/attempted*100) : 0;

  const card = {
    background:"white",
    border:"1px solid #e2e8f0",
    padding:22,
    borderRadius:16
  };

  return (
    <main style={{minHeight:"100vh",background:"#f5f7fb",color:"#172554",fontFamily:"Arial,sans-serif",padding:28}}>
      <div style={{maxWidth:1050,margin:"auto"}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
          <Link href="/" style={{fontSize:28,fontWeight:800,color:"#2563eb",textDecoration:"none"}}>AptIQ</Link>
          <Link href="/practice" style={{background:"#2563eb",color:"white",padding:"12px 18px",borderRadius:10,textDecoration:"none"}}>Start Practice →</Link>
        </header>

        <h1 style={{fontSize:36,marginTop:45}}>Your Dashboard</h1>
        <p style={{color:"#64748b"}}>Track your aptitude preparation and practice results.</p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:18,marginTop:28}}>
          <article style={card}><p style={{color:"#64748b"}}>Tests Completed</p><h2 style={{fontSize:34}}>{results.length}</h2></article>
          <article style={card}><p style={{color:"#64748b"}}>Questions Attempted</p><h2 style={{fontSize:34}}>{attempted}</h2></article>
          <article style={card}><p style={{color:"#64748b"}}>Correct Answers</p><h2 style={{fontSize:34}}>{correct}</h2></article>
          <article style={card}><p style={{color:"#64748b"}}>Overall Accuracy</p><h2 style={{fontSize:34}}>{accuracy}%</h2></article>
        </section>

        <section style={{...card,marginTop:25}}>
          <h2>Recent Practice</h2>
          {results.length===0 ? (
            <p style={{color:"#64748b",lineHeight:1.8}}>You haven't completed a practice test yet. Start your first test to see your scores here.</p>
          ) : [...results].reverse().map((r,i)=>(
            <article key={`${r.date}-${i}`} style={{padding:"16px 0",borderBottom:"1px solid #e2e8f0"}}>
              <strong>{new Date(r.date).toLocaleString()}</strong>
              <p>{r.section==="all"?"All Sections":r.section} · {r.correct}/{r.total} correct · {r.total?Math.round(r.correct/r.total*100):0}% accuracy</p>
            </article>
          ))}
          <Link href="/practice" style={{display:"inline-block",marginTop:20,color:"#2563eb"}}>Practice more questions →</Link>
        </section>
      </div>
    </main>
  );
}
