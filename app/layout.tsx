import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TriviqTech — Innovate. Integrate. Elevate.",
  description:
    "TriviqTech is a service-based technology studio delivering Full Stack, AI, and Cloud engineering — built to scale, secure by design.",
  keywords: [
    "TriviqTech",
    "Full Stack Development",
    "AI Services",
    "Cloud Services",
    "DevOps",
    "Software Consulting",
  ],
  openGraph: {
    title: "TriviqTech — Innovate. Integrate. Elevate.",
    description:
      "Full Stack · AI · Cloud engineering, delivered by senior-led teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
