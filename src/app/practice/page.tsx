"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALL_QUESTIONS } from "@/data/questions";
import { SECTION_LABEL } from "@/lib/curriculum";
import type { Question } from "@/lib/types";

export default function PracticePage() {
  const [section, setSection] = useState("all");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ question: Question; selected: number | null }[]>([]);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    const filtered = ALL_QUESTIONS.filter(
      (q) => q.active && (section === "all" || q.section === section)
    );
    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [section, started]);

  const question = questions[index];

  function startTest() {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setStarted(true);
  }

  function nextQuestion() {
    const updated = [...answers, { question, selected }];
    setAnswers(updated);
    setSelected(null);

    if (index + 1 >= questions.length) {
      setAnswers(updated);
      setFinished(true);

      const correct = updated.filter(
        (a) => a.selected === a.question.correct_answer
      ).length;

      try {
        const previous = JSON.parse(localStorage.getItem("aptiq-results") || "[]");
        previous.push({
          date: new Date().toISOString(),
          total: updated.length,
          correct,
          section
        });
        localStorage.setItem("aptiq-results", JSON.stringify(previous));
      } catch {}
    } else {
      setIndex(index + 1);
    }
  }

  const score = answers.filter(
    (a) => a.selected === a.question.correct_answer
  ).length;

  return (
    <main style={{minHeight:"100vh",background:"#f5f7fb",color:"#172554",fontFamily:"Arial,sans-serif",padding:"28px 18px"}}>
      <div style={{maxWidth:900,margin:"auto"}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <Link href="/" style={{fontSize:28,fontWeight:800,color:"#2563eb",textDecoration:"none"}}>AptIQ</Link>
          <Link href="/dashboard" style={{color:"#2563eb"}}>My Dashboard →</Link>
        </header>

        <section style={{background:"white",padding:30,borderRadius:20,marginTop:30,boxShadow:"0 8px 30px #1725540b"}}>
          {!started ? (
            <>
              <p style={{color:"#2563eb",fontWeight:700}}>APTITUDE PRACTICE</p>
              <h1 style={{fontSize:36,marginBottom:10}}>Test your skills.</h1>
              <p style={{color:"#64748b",lineHeight:1.7}}>Practice questions from your AptIQ question bank and review your score when you finish.</p>

              <label style={{display:"block",marginTop:25,fontWeight:700}}>Choose a section</label>
              <select value={section} onChange={e=>setSection(e.target.value)} style={{width:"100%",padding:14,marginTop:10,border:"1px solid #cbd5e1",borderRadius:10,fontSize:16}}>
                <option value="all">All sections</option>
                <option value="quantitative">Quantitative Aptitude</option>
                <option value="logical">Logical Reasoning</option>
                <option value="verbal">Verbal Ability</option>
              </select>

              <p style={{color:"#64748b",marginTop:15}}>{ALL_QUESTIONS.filter(q=>q.active && (section==="all" || q.section===section)).length} available questions</p>

              <button onClick={startTest} style={{marginTop:20,background:"#2563eb",color:"white",padding:"15px 24px",border:0,borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer"}}>Start Practice →</button>
            </>
          ) : finished ? (
            <>
              <p style={{color:"#16a34a",fontWeight:700}}>PRACTICE COMPLETED</p>
              <h1 style={{fontSize:38}}>Your score: {score}/{answers.length}</h1>
              <p style={{fontSize:20}}>Accuracy: {answers.length ? Math.round(score/answers.length*100) : 0}%</p>
              <div style={{marginTop:25}}>
                {answers.map((a,i)=>(
                  <article key={a.question.id} style={{padding:18,marginBottom:12,border:"1px solid #e2e8f0",borderRadius:12}}>
                    <strong>{i+1}. {a.question.question}</strong>
                    <p style={{color:a.selected===a.question.correct_answer?"#16a34a":"#dc2626"}}>
                      Your answer: {a.selected===null?"Not answered":a.question.options[a.selected]}
                    </p>
                    <p><strong>Correct answer:</strong> {a.question.options[a.question.correct_answer]}</p>
                    <p style={{color:"#64748b"}}>{a.question.explanation}</p>
                  </article>
                ))}
              </div>
              <button onClick={()=>{setStarted(false);setFinished(false)}} style={{background:"#2563eb",color:"white",padding:14,border:0,borderRadius:10,cursor:"pointer"}}>Practice Again</button>
              {" "}<Link href="/dashboard">View Dashboard →</Link>
            </>
          ) : question ? (
            <>
              <div style={{display:"flex",justifyContent:"space-between",gap:10,color:"#64748b",fontSize:14}}>
                <span>{SECTION_LABEL[question.section]}</span>
                <span>Question {index+1} of {questions.length}</span>
              </div>
              <div style={{height:7,background:"#e2e8f0",borderRadius:9,marginTop:16,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${((index+1)/questions.length)*100}%`,background:"#2563eb"}}/>
              </div>
              <p style={{color:"#64748b",marginTop:24}}>{question.module} · {question.difficulty}</p>
              <h2 style={{fontSize:25,lineHeight:1.5}}>{question.question}</h2>
              <div style={{display:"grid",gap:12,marginTop:25}}>
                {question.options.map((option,i)=>(
                  <button key={i} onClick={()=>setSelected(i)} style={{textAlign:"left",padding:17,borderRadius:12,border:selected===i?"2px solid #2563eb":"1px solid #cbd5e1",background:selected===i?"#eff6ff":"white",color:"#172554",fontSize:16,cursor:"pointer"}}>
                    <strong>{String.fromCharCode(65+i)}.</strong> {option}
                  </button>
                ))}
              </div>
              <button disabled={selected===null} onClick={nextQuestion} style={{marginTop:25,background:selected===null?"#94a3b8":"#2563eb",color:"white",padding:"14px 24px",border:0,borderRadius:10,fontSize:16,cursor:selected===null?"not-allowed":"pointer"}}>
                {index===questions.length-1?"Finish Test":"Next Question →"}
              </button>
            </>
          ) : (
            <>
              <h2>No questions available in this section yet.</h2>
              <button onClick={()=>setStarted(false)}>Go Back</button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
