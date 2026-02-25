"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";

/**
 * /simulateur — page protégée
 * Le simulateur d'origine (SIMULATEUR/index.html) est servi tel quel
 * via une iframe pointant sur /simulateur-embed.html (fichier statique dans /public).
 * Seule la vérification sessionStorage est ajoutée ici.
 */
export default function Simulateur() {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "denied" | "granted">("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("estimation_data");
    if (raw) {
      try {
        const data = JSON.parse(raw);
        // Session valide 2h
        if (Date.now() - data.timestamp < 2 * 60 * 60 * 1000) {
          setStatus("granted");
          return;
        }
      } catch {
        // données corrompues
      }
    }
    setStatus("denied");
  }, []);

  // ── Chargement ─────────────────────────────────────────────
  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Accès refusé ───────────────────────────────────────────
  if (status === "denied") {
    return (
      <div
        className="min-h-screen font-sans flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0fdf4 100%)",
        }}
        suppressHydrationWarning
      >
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-10">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-black text-[#0f172a] mb-3">
              Accès via estimation requis
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Le simulateur est accessible uniquement après validation de votre profil.
              Ce processus prend moins de 2 minutes.
            </p>
            <a
              href="/estimation"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/25 group"
            >
              <span>Commencer l&apos;estimation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <div className="mt-6">
              <a
                href="/"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
              >
                ← Retour à l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Simulateur d'origine — embarqué tel quel via iframe ────
  return (
    <iframe
      src="/simulateur-embed.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        display: "block",
      }}
      title="Simulateur Novelpix"
    />
  );
}
