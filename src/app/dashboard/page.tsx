"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SECTION_LABEL, type Section } from "@/lib/curriculum";

type Result = {
  date: string; total: number; correct: number; section: string; time?: number;
  bySection?: Record<string, { total: number; correct: number }>;
};
const pct = (c: number, t: number) => (t ? Math.round((c / t) * 100) : 0);
const label = (s: string) => (s === "all" ? "All sections" : SECTION_LABEL[s as Section] ?? s);

export default function DashboardPage() {
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    try { setResults(JSON.parse(localStorage.getItem("aptiq-results") || "[]")); } catch {}
  }, []);

  const attempted = results.reduce((s, r) => s + r.total, 0);
  const correct = results.reduce((s, r) => s + r.correct, 0);
  const best = results.reduce((m, r) => Math.max(m, pct(r.correct, r.total)), 0);
  const trend = results.slice(-12).map((r, i) => ({ n: `#${results.length - Math.min(12, results.length) + i + 1}`, accuracy: pct(r.correct, r.total) }));

  const sections: Record<Section, { total: number; correct: number }> = {
    quantitative: { total: 0, correct: 0 }, logical: { total: 0, correct: 0 }, verbal: { total: 0, correct: 0 },
  };
  results.forEach((r) => {
    if (r.bySection) Object.entries(r.bySection).forEach(([k, v]) => { if (k in sections) { sections[k as Section].total += v.total; sections[k as Section].correct += v.correct; } });
    else if (r.section in sections) { sections[r.section as Section].total += r.total; sections[r.section as Section].correct += r.correct; }
  });

  const stats = [
    ["Tests completed", results.length, "📝"],
    ["Questions attempted", attempted, "❓"],
    ["Overall accuracy", `${pct(correct, attempted)}%`, "🎯"],
    ["Best score", `${best}%`, "🏆"],
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 rise">
        <div>
          <p className="eyebrow">Your progress</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-ink-soft">Track accuracy, spot weak sections and keep improving.</p>
        </div>
        <Link href="/practice" className="btn-primary">New practice test →</Link>
      </div>

      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([l, v, i]) => (
          <article key={l} className="card p-5">
            <div className="flex items-center justify-between text-sm text-ink-soft">{l}<span>{i}</span></div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{v}</p>
          </article>
        ))}
      </section>

      {results.length === 0 ? (
        <section className="card mt-6 grid place-items-center p-14 text-center">
          <span className="text-5xl">📊</span>
          <h2 className="mt-4 text-xl font-bold">No tests yet</h2>
          <p className="mt-2 max-w-sm text-ink-soft">Complete your first practice test and your accuracy trend and section breakdown will appear here.</p>
          <Link href="/practice" className="btn-primary mt-6">Take your first test</Link>
        </section>
      ) : (
        <>
          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <article className="card p-6 lg:col-span-2">
              <h2 className="font-bold">Accuracy trend</h2>
              <p className="text-sm text-ink-mute">Last {trend.length} tests</p>
              <div className="mt-4 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#E4E7EC" vertical={false} />
                    <XAxis dataKey="n" tick={{ fontSize: 12, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#98A2B3" }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip formatter={(v) => [`${v}%`, "Accuracy"]} />
                    <Area type="monotone" dataKey="accuracy" stroke="#1D4ED8" strokeWidth={2.5} fill="url(#g)" dot={{ r: 3, fill: "#1D4ED8" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="card p-6">
              <h2 className="font-bold">By section</h2>
              <p className="text-sm text-ink-mute">Accuracy across all tests</p>
              <div className="mt-6 grid gap-6">
                {(Object.keys(sections) as Section[]).map((s) => {
                  const p = pct(sections[s].correct, sections[s].total);
                  const color = !sections[s].total ? "bg-line" : p >= 75 ? "bg-strong" : p >= 50 ? "bg-avg" : "bg-crit";
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-sm"><span className="font-medium">{SECTION_LABEL[s]}</span><span className="font-semibold">{sections[s].total ? `${p}%` : "—"}</span></div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper"><div className={`h-full rounded-full ${color}`} style={{ width: `${p}%` }} /></div>
                      <p className="mt-1 text-xs text-ink-mute">{sections[s].correct}/{sections[s].total} correct</p>
                    </div>
                  );
                })}
              </div>
            </article>
          </section>

          <section className="card mt-6 overflow-hidden">
            <h2 className="p-6 pb-3 font-bold">Recent tests</h2>
            <table className="w-full text-sm">
              <thead className="bg-paper text-left text-xs uppercase tracking-wider text-ink-mute">
                <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Section</th><th className="px-6 py-3">Score</th><th className="px-6 py-3">Accuracy</th></tr>
              </thead>
              <tbody>
                {[...results].reverse().slice(0, 10).map((r, i) => {
                  const p = pct(r.correct, r.total);
                  return (
                    <tr key={`${r.date}-${i}`} className="border-t border-line">
                      <td className="px-6 py-3.5 text-ink-soft">{new Date(r.date).toLocaleString()}</td>
                      <td className="px-6 py-3.5 font-medium">{label(r.section)}</td>
                      <td className="px-6 py-3.5">{r.correct}/{r.total}</td>
                      <td className="px-6 py-3.5"><span className={`chip ${p >= 75 ? "bg-green-50 text-strong" : p >= 50 ? "bg-amber-50 text-weak" : "bg-red-50 text-crit"}`}>{p}%</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </>
      )}
    </main>
  );
}
