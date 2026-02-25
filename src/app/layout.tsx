import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Novelpix | Solution IA pour Syndics Indépendants",
  description: "Récupérez vos impayés dormants en 60 jours sans changer de logiciel. La solution d'optimisation IA conçue pour soulager la trésorerie et réduire la surcharge opérationnelle des cabinets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning={true}>
      <body className={`${inter.variable} font-sans antialiased bg-[#040d1a] text-[#0f172a]`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
