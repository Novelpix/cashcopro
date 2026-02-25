"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Lock, ArrowRight } from "lucide-react";

export default function MerciRdv() {
    return (
        <div
            className="min-h-screen font-sans text-[#0f172a] overflow-x-hidden flex flex-col"
            style={{
                background: "linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0fdf4 100%)",
            }}
            suppressHydrationWarning
        >
            {/* Nav minimaliste */}
            <nav className="fixed w-full z-50 top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-sm">N</span>
                        </div>
                        <span className="font-bold text-[#0f172a] tracking-wide text-sm">NOVELPIX</span>
                    </a>
                </div>
            </nav>

            {/* Contenu centré */}
            <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-16">
                <div className="max-w-lg w-full text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        {/* Icône success */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4 leading-tight">
                            Merci pour votre demande.
                        </h1>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 mb-8 text-left space-y-5">

                            {/* Étape 1 */}
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-white font-black text-xs">1</span>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0f172a] text-sm mb-1">Analyse en cours</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Votre estimation confidentielle sera analysée par nos experts financiers spécialisés dans le secteur des syndics indépendants.
                                    </p>
                                </div>
                            </div>

                            {/* Séparateur */}
                            <div className="h-px bg-gray-100 ml-12" />

                            {/* Étape 2 */}
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-white font-black text-xs">2</span>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0f172a] text-sm mb-1">Validation du rendez-vous</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Un lien privé vers la présentation vous sera transmis après validation du rendez-vous.
                                    </p>
                                </div>
                            </div>

                            {/* Séparateur */}
                            <div className="h-px bg-gray-100 ml-12" />

                            {/* Étape 3 */}
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-white font-black text-xs">3</span>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0f172a] text-sm mb-1">Résultats personnalisés</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Votre estimation confidentielle en 30 minutes, construite à partir de vos données réelles.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Badge confidentialité */}
                        <div className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-8 mx-auto max-w-sm">
                            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                            <p className="text-xs text-slate-600 font-medium leading-snug text-left">
                                Le lien d&apos;accès à la présentation sera personnalisé et transmis de manière sécurisée.
                            </p>
                        </div>

                        {/* Délai */}
                        <p className="text-sm text-gray-500 mb-8">
                            Délai de réponse habituel :{" "}
                            <strong className="text-[#0f172a]">sous 24 heures ouvrées.</strong>
                        </p>

                        {/* CTA retour */}
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors group"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                            Retour à l&apos;accueil
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Footer minimal */}
            <footer className="py-6 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Novelpix — Tous droits réservés.
                </p>
            </footer>
        </div>
    );
}
