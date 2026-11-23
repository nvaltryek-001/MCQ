"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ALL_QUESTIONS } from "@/data/questions";
import { SECTION_LABEL, type Section } from "@/lib/curriculum";
import type { Question } from "@/lib/types";

type Answer = { question: Question; selected: number | null; time: number };
const SECTIONS: { value: "all" | Section; label: string; icon: string }[] = [
  { value: "all", label: "All sections", icon: "★" },
  { value: "quantitative", label: "Quantitative", icon: "∑" },
  { value: "logical", label: "Logical", icon: "⌘" },
  { value: "verbal", label: "Verbal", icon: "Aa" },
];
const LENGTHS = [5, 10, 20];
const DIFF_CHIP = { easy: "bg-green-50 text-strong", medium: "bg-amber-50 text-weak", hard: "bg-red-50 text-crit" };

function shuffle<T>(a: T[]) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export default function PracticePage() {
  const [section, setSection] = useState<"all" | Section>("all");
  const [length, setLength] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [phase, setPhase] = useState<"setup" | "test" | "done">("setup");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [left, setLeft] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("section");
    if (s && s in SECTION_LABEL) setSection(s as Section);
  }, []);

  const pool = useMemo(() => ALL_QUESTIONS.filter((q) => q.active && (section === "all" || q.section === section)), [section]);
  const question = questions[index];

  function start() {
    const qs = shuffle(pool).slice(0, length);
    setQuestions(qs); setIndex(0); setSelected(null); setAnswers([]); setPhase("test");
  }

  useEffect(() => {
    if (phase !== "test" || !question) return;
    setLeft(question.time_limit); startRef.current = Date.now();
  }, [phase, question]);

  const next = useCallback((choice: number | null) => {
    const updated = [...answers, { question, selected: choice, time: Math.round((Date.now() - startRef.current) / 1000) }];
    setAnswers(updated); setSelected(null);
    if (index + 1 < questions.length) { setIndex(index + 1); return; }
    setPhase("done");
    const bySection: Record<string, { total: number; correct: number }> = {};
    updated.forEach((a) => {
      const b = (bySection[a.question.section] ??= { total: 0, correct: 0 });
      b.total++; if (a.selected === a.question.correct_answer) b.correct++;
    });
    try {
      const prev = JSON.parse(localStorage.getItem("aptiq-results") || "[]");
      prev.push({
        date: new Date().toISOString(), section, total: updated.length,
        correct: updated.filter((a) => a.selected === a.question.correct_answer).length,
        time: updated.reduce((s, a) => s + a.time, 0), bySection,
      });
      localStorage.setItem("aptiq-results", JSON.stringify(prev));
    } catch {}
  }, [answers, question, index, questions.length, section]);

  useEffect(() => {
    if (phase !== "test") return;
    if (left <= 0 && question) { next(selected); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const score = answers.filter((a) => a.selected === a.question.correct_answer).length;
  const pct = answers.length ? Math.round((score / answers.length) * 100) : 0;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      {phase === "setup" && (
        <section className="card p-8 rise sm:p-10">
          <p className="eyebrow">Aptitude practice</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Set up your test</h1>
          <p className="mt-3 text-ink-soft">Pick a section and length. Each question is timed by difficulty and auto-submits when time runs out.</p>

          <h2 className="mt-8 text-sm font-semibold text-ink-soft">Section</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SECTIONS.map((s) => (
              <button key={s.value} onClick={() => setSection(s.value)}
                className={`rounded-xl border p-4 text-left transition ${section === s.value ? "border-brand bg-brand-tint ring-2 ring-brand/20" : "border-line hover:border-brand/50"}`}>
                <span className="text-lg font-bold text-brand">{s.icon}</span>
                <span className="mt-2 block text-sm font-semibold">{s.label}</span>
              </button>
            ))}
          </div>

          <h2 className="mt-7 text-sm font-semibold text-ink-soft">Questions</h2>
          <div className="mt-3 inline-flex rounded-xl border border-line bg-paper p-1">
            {LENGTHS.map((n) => (
              <button key={n} onClick={() => setLength(n)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${length === n ? "bg-white text-brand shadow-sm" : "text-ink-soft"}`}>{n}</button>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-ink-mute">{pool.length} questions available</p>
            <button onClick={start} disabled={!pool.length} className="btn-primary px-7">Start test →</button>
          </div>
        </section>
      )}

      {phase === "test" && question && (
        <section key={question.id} className="card p-7 rise sm:p-9">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink-soft">Question <b className="text-ink">{index + 1}</b> / {questions.length}</span>
            <span className={`chip tabular-nums ${left <= 10 ? "bg-red-50 text-crit" : "bg-brand-tint text-brand"}`}>⏱ {left}s</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip bg-paper text-ink-soft">{SECTION_LABEL[question.section]}</span>
            <span className="chip bg-paper text-ink-soft">{question.module}</span>
            <span className={`chip capitalize ${DIFF_CHIP[question.difficulty]}`}>{question.difficulty}</span>
          </div>
          <h2 className="mt-5 text-xl font-semibold leading-relaxed sm:text-2xl">{question.question}</h2>
          <div className="mt-7 grid gap-3">
            {question.options.map((o, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${selected === i ? "border-brand bg-brand-tint ring-2 ring-brand/20" : "border-line hover:border-brand/50 hover:bg-paper"}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${selected === i ? "bg-brand text-white" : "bg-paper text-ink-soft"}`}>{String.fromCharCode(65 + i)}</span>
                <span>{o}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => next(null)} className="text-sm font-medium text-ink-mute hover:text-ink">Skip</button>
            <button disabled={selected === null} onClick={() => next(selected)} className="btn-primary px-7">
              {index === questions.length - 1 ? "Finish test" : "Next →"}
            </button>
          </div>
        </section>
      )}

      {phase === "done" && (
        <section className="rise">
          <div className="card flex flex-col items-center p-10 text-center">
            <p className="eyebrow">Test complete</p>
            <div className="relative mt-6 h-36 w-36">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-line" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeLinecap="round"
                  className={pct >= 75 ? "stroke-strong" : pct >= 50 ? "stroke-avg" : "stroke-crit"} strokeDasharray={`${pct} 100`} />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-3xl font-bold">{pct}%</span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold">{score} of {answers.length} correct</h1>
            <p className="mt-2 text-ink-soft">Total time {answers.reduce((s, a) => s + a.time, 0)}s · {pct >= 75 ? "Excellent work!" : pct >= 50 ? "Good — keep practicing." : "Review the explanations below."}</p>
            <div className="mt-7 flex gap-3">
              <button onClick={() => setPhase("setup")} className="btn-primary">Practice again</button>
              <Link href="/dashboard" className="btn-ghost">View dashboard</Link>
            </div>
          </div>

          <h2 className="mt-10 mb-4 text-lg font-bold">Review answers</h2>
          <div className="grid gap-3">
            {answers.map((a, i) => {
              const ok = a.selected === a.question.correct_answer;
              return (
                <article key={a.question.id} className={`card border-l-4 p-5 ${ok ? "border-l-strong" : "border-l-crit"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold">{i + 1}. {a.question.question}</p>
                    <span className={`chip shrink-0 ${ok ? "bg-green-50 text-strong" : "bg-red-50 text-crit"}`}>{ok ? "Correct" : a.selected === null ? "Skipped" : "Wrong"}</span>
                  </div>
                  {!ok && a.selected !== null && <p className="mt-3 text-sm text-crit">Your answer: {a.question.options[a.selected]}</p>}
                  <p className="mt-2 text-sm"><b>Correct:</b> {a.question.options[a.question.correct_answer]}</p>
                  <p className="mt-2 rounded-lg bg-paper p-3 text-sm text-ink-soft">💡 {a.question.explanation}</p>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
