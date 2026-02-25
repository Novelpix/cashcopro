"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Lock, ArrowRight, ExternalLink } from "lucide-react";

export default function DeckClient() {
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    return (
        <>
            <meta name="robots" content="noindex, nofollow" />

            <div
                className="min-h-screen font-sans text-[#0f172a] flex flex-col"
                style={{
                    background: "linear-gradient(160deg, #0f172a 0%, #1e2d45 60%, #0f172a 100%)",
                }}
                suppressHydrationWarning
            >
                {/* Nav */}
                <nav className="w-full z-50 bg-[#0f172a]/95 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-sm">N</span>
                            </div>
                            <span className="font-bold text-white tracking-wide text-sm">NOVELPIX</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                <Lock className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
                                    Document confidentiel
                                </span>
                            </div>
                            <a
                                href="/#demo"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs tracking-widest uppercase px-5 py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/30 group"
                            >
                                <Calendar className="w-4 h-4" />
                                Planifier une démo
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Deck en plein écran */}
                <div className="flex-1 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 relative"
                        style={{ minHeight: "calc(100vh - 64px)" }}
                    >
                        {/* Loading overlay */}
                        {!isIframeLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0f172a]">
                                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-white/60 text-sm font-medium">Chargement de la présentation…</p>
                            </div>
                        )}

                        <iframe
                            src="/pitch-deck/index.html"
                            style={{
                                width: "100%",
                                height: "calc(100vh - 64px)",
                                border: "none",
                                display: "block",
                                background: "#e2e8f0",
                            }}
                            title="Présentation Confidentielle Novelpix"
                            onLoad={() => setIsIframeLoaded(true)}
                        />
                    </motion.div>

                    {/* Footer */}
                    <div className="bg-[#0f172a] border-t border-white/10 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-white/30" />
                            <p className="text-xs text-white/30">
                                Document confidentiel — Ne pas diffuser sans autorisation. Accès personnel, non transférable.
                            </p>
                        </div>
                        <a
                            href="/#demo"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs font-bold tracking-widest uppercase transition-colors group shrink-0"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Discuter de votre situation
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
