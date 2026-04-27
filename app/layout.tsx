import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADHD Planner Copilot",
  description: "Landing pages for GTM validation sprint"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
