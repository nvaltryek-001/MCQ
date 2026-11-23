import Link from "next/link";
import { ALL_QUESTIONS } from "@/data/questions";
import { CURRICULUM, SECTION_LABEL, type Section } from "@/lib/curriculum";

const SECTION_META: Record<Section, { icon: string; blurb: string; tint: string }> = {
  quantitative: { icon: "∑", blurb: "Percentages, time & work, probability, data interpretation and more.", tint: "bg-blue-50 text-brand" },
  logical: { icon: "⌘", blurb: "Blood relations, seating, syllogisms, series and coding puzzles.", tint: "bg-teal-50 text-excel" },
  verbal: { icon: "Aa", blurb: "Grammar, sentence correction, para jumbles and comprehension.", tint: "bg-amber-50 text-weak" },
};

export default function Home() {
  const sections = Object.keys(CURRICULUM) as Section[];
  const modules = sections.reduce((n, s) => n + CURRICULUM[s].length, 0);
  const stats = [
    [ALL_QUESTIONS.length, "Questions"],
    [modules, "Modules"],
    [3, "Sections"],
    ["45–120s", "Per question"],
  ];

  return (
    <main className="mx-auto max-w-6xl px-5">
      <section className="relative pt-20 pb-16 text-center rise">
        <div className="pointer-events-none absolute inset-x-0 -top-10 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-brand/10 blur-3xl" />
        <span className="chip bg-brand-tint text-brand">● Placement-ready aptitude practice</span>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
          Find your weak spots <span className="text-brand">before</span> the recruiter does.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Timed MCQs across quantitative, logical and verbal sections — with instant explanations
          and a dashboard that tracks your accuracy over time.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/practice" className="btn-primary px-7 py-3.5 text-base">Start practicing →</Link>
          <Link href="/dashboard" className="btn-ghost px-7 py-3.5 text-base">View dashboard</Link>
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-white px-4 py-5">
              <dt className="text-2xl font-bold text-ink">{v}</dt>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-mute">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {sections.map((s) => (
          <Link key={s} href={`/practice?section=${s}`} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className={`grid h-12 w-12 place-items-center rounded-xl text-xl font-bold ${SECTION_META[s].tint}`}>{SECTION_META[s].icon}</div>
            <h3 className="mt-5 text-lg font-bold">{SECTION_LABEL[s]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{SECTION_META[s].blurb}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-ink-mute">
                {CURRICULUM[s].length} modules · {ALL_QUESTIONS.filter((q) => q.section === s).length} Qs
              </span>
              <span className="font-semibold text-brand transition group-hover:translate-x-1">Practice →</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          ["⏱", "Difficulty-based timers", "45s easy, 75s medium, 120s hard — the pressure of a real test."],
          ["💡", "Explanations for every answer", "Review what you missed with worked solutions right after the test."],
          ["📈", "Progress dashboard", "Accuracy trend, section breakdown and full attempt history."],
        ].map(([i, t, d]) => (
          <div key={t} className="flex gap-4 p-2">
            <span className="text-2xl">{i}</span>
            <div>
              <h4 className="font-semibold">{t}</h4>
              <p className="mt-1 text-sm text-ink-soft">{d}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
