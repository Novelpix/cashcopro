"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export function AuditSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        lots: '',
        impayes: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="demo" className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover opacity-5"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-indigo-50/90 to-purple-50/95" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium tracking-wide">
                            AUDIT CONFIDENTIEL
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                        Activer l&apos;estimation <span className="text-green-600">confidentielle.</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-4 font-semibold uppercase tracking-widest text-sm">
                        Planifier l&apos;estimation confidentielle
                    </p>
                    <p className="text-blue-600 font-bold text-xs tracking-[0.2em] uppercase">
                        Données réelles. Décision éclairée.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 bg-white border border-gray-200 rounded-2xl shadow-xl"
                    >
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Demande bien reçue !</h3>
                                <p className="text-gray-600">
                                    Nous vous contacterons sous 24h pour planifier votre estimation confidentielle.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Nom complet <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            suppressHydrationWarning
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="Jean Dupont"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Cabinet / Société <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            required
                                            value={formData.company}
                                            onChange={handleChange}
                                            suppressHydrationWarning
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="Cabinet Syndic Paris"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email professionnel <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                        placeholder="jean.dupont@cabinet.fr"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Téléphone <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                        placeholder="+33 6 12 34 56 78"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="lots" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Nombre de lots gérés
                                        </label>
                                        <input
                                            type="number"
                                            id="lots"
                                            name="lots"
                                            value={formData.lots}
                                            onChange={handleChange}
                                            suppressHydrationWarning
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="1 200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="impayes" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Stock d&apos;impayés estimé (€)
                                        </label>
                                        <input
                                            type="number"
                                            id="impayes"
                                            name="impayes"
                                            value={formData.impayes}
                                            onChange={handleChange}
                                            suppressHydrationWarning
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="300 000"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black py-4 px-6 rounded-lg transition-all text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span>Envoi en cours…</span>
                                    ) : (
                                        <>
                                            <Calendar className="w-4 h-4" />
                                            <span>Planifier mon estimation</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 mt-2">
                                    Estimation confidentielle réalisée en 30 minutes. Aucun engagement.
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Colonne droite — Figma exact */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="space-y-4"
                    >
                        {/* Carte bleue — En 30 minutes */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <p className="text-blue-700 font-black text-sm tracking-wide mb-5">
                                EN 30 MINUTES, NOUS ESTIMONS :
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { icon: <TrendingUp className="w-4 h-4 text-blue-600" />, text: 'Tésorerie mobilisable' },
                                    { icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />, text: 'Seuil de rentabilité' },
                                    { icon: <Users className="w-4 h-4 text-blue-600" />, text: 'Impact organisationnel estimatif' },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                            {item.icon}
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Carte blanche — Confidentialité garantie */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <p className="font-bold text-gray-900 text-sm mb-2">Confidentialité garantie</p>
                            <p className="text-gray-500 text-xs leading-relaxed mb-2">
                                Vos données sont traitées de manière strictement confidentielle et ne seront jamais partagées avec des tiers.
                            </p>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                L&apos;analyse est réalisée par nos experts financiers spécialisés dans le secteur des syndics indépendants.
                            </p>
                        </div>

                        {/* Carte verte — Sans engagement */}
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                            <p className="font-bold text-green-600 text-sm mb-2">Sans engagement</p>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Cette estimation est totalement gratuite et ne vous engage en aucune manière. Elle vous permettra de prendre une décision éclairée sur l&apos;opportunité d&apos;optimiser votre trésorerie.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
