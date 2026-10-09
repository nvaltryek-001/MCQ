import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AptIQ - Aptitude Skill Analyzer",
  description: "Improve your aptitude and prepare for placements with AptIQ."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
