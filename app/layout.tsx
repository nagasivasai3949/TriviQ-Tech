import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TriviqTech — We Build Software That Moves the Needle",
  description:
    "TriviqTech is a focused technology studio delivering full-stack web apps, AI integrations, and cloud infrastructure for founders who need it done right.",
  keywords: [
    "TriviqTech",
    "Full Stack Development",
    "AI Integration",
    "Cloud Infrastructure",
    "DevOps",
    "Web Development Studio",
  ],
  openGraph: {
    title: "TriviqTech — We Build Software That Moves the Needle",
    description:
      "Full-stack web, AI, and cloud engineering from a team that ships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
