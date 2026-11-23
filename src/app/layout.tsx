import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AptIQ - Aptitude Skill Analyzer",
  description: "Timed aptitude practice for campus placements: quantitative, logical and verbal.",
};

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-white">A</span>
          <span className="text-lg font-bold tracking-tight">Apt<span className="text-brand">IQ</span></span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-ink-soft">
          <Link href="/practice" className="rounded-lg px-3 py-2 hover:bg-white hover:text-ink">Practice</Link>
          <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-white hover:text-ink">Dashboard</Link>
          <Link href="/practice" className="btn-primary ml-2 hidden py-2 sm:inline-flex">Start test</Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer className="mt-24 border-t border-line py-8 text-center text-sm text-ink-mute">
          AptIQ · Built for placement preparation
        </footer>
      </body>
    </html>
  );
}
