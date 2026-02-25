"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Building2,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
  FileText,
  MapPin,
  CheckCircle2,
  Calculator,
  DollarSign,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AuditSection } from './components/AuditSection';

/* ─────────────────────────────────────────────────────────────
   Helpers d'animation
───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  }),
};

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Badge / Pill
───────────────────────────────────────────────────────────── */
type BadgeProps = {
  children: React.ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red';
  icon?: React.ReactNode;
};
function Badge({ children, color = 'blue', icon }: BadgeProps) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide ${colors[color]}`}>
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ Accordion
───────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "À qui s'adresse cette solution ?",
    a: "Aux syndics indépendants gérant entre 500 et 3 000 lots, qui subissent une hausse structurelle des impayés et cherchent à sécuriser leur trésorerie sans transformer leur organisation.",
  },
  {
    q: "Est-ce que cela remplace mon logiciel métier ?",
    a: "Non. ICS, Septeo, Vilogi ou Arcopole demeurent vos uniques référentiels. Notre intervention est complémentaire et ne crée aucune dépendance technologique.",
  },
  {
    q: "Quel est le délai avant les premiers résultats ?",
    a: "Un pilote peut être activé en 60 jours sur un périmètre limité. Les indicateurs sont mesurés avant toute extension.",
  },
  {
    q: "Quelles données sont nécessaires pour l'estimation ?",
    a: "Nous travaillons à partir de vos balances âgées et du stock d'impayés identifié. Aucune donnée sensible n'est requise pour l'estimation initiale.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {faqs.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 text-gray-900 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <span>{item.q}</span>
            {open === i
              ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
              : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
          </button>
          {open === i && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-6 pb-5 text-gray-500 text-sm leading-relaxed"
            >
              {item.a}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE PRINCIPALE
───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="w-full font-sans overflow-x-hidden bg-white text-[#0f172a]" suppressHydrationWarning>

      {/* ════════════════════════════════════════════════════
          NAVIGATION
         ════════════════════════════════════════════════════ */}
      <nav className="fixed w-full z-50 top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="font-bold text-[#0f172a] tracking-wide text-sm">NOVELPIX</span>
          </a>
          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Stratégie Cash', href: '#strategie' },
              { label: 'Méthode', href: '#methode' },
              { label: 'FAQ', href: '#faq' },
            ].map(link => (
              <a key={link.href} href={link.href}
                className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 pb-0.5">
                {link.label}
              </a>
            ))}
          </div>
          {/* CTA */}
          <a href="#demo"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg transition-colors">
            Lancer l&apos;estimation
          </a>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{
        background: 'linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0fdf4 100%)'
      }}>
        {/* Photo de fond subtile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=70&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-[0.04]"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <Badge color="blue" icon={<TrendingUp className="w-3 h-3" />}>
              Une nouvelle catégorie d&apos;optimisation dédiée aux syndics indépendants
            </Badge>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="mt-8 font-black text-[#0f172a] leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              Libérez{' '}
              <span className="text-blue-600">20 % à 40 %</span>
              <br />
              de votre trésorerie
              <br />
              immobilisée en 60 jours.
            </h1>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-lg mx-auto">
              Approche structurée intégrée à vos outils existants.<br />
              Sans migration. Sans rupture organisationnelle.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#demo"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-xl transition-colors group shadow-lg shadow-blue-600/25">
                Obtenir mon estimation confidentielle en 30 minutes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold tracking-widest uppercase text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                Décision financière rationnelle
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                Analyse personnalisée
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                À partir de vos données
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          KPI CARDS (sous le hero)
         ════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#eef2ff] to-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '⚡', val: '60 jours', label: "Délai d'activation pilote", color: 'text-yellow-500' },
              { icon: '🏢', val: '+1', label: 'Immeuble / gestionnaire visé', color: 'text-blue-500' },
              { icon: '📈', val: '25 %', label: 'Hypothèse de récupération cible', color: 'text-green-500' },
            ].map((kpi, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <span className="text-3xl">{kpi.icon}</span>
                  <p className={`mt-3 text-2xl font-black ${kpi.color}`}>{kpi.val}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">{kpi.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SIMULATION DE RÉFÉRENCE (hero section)
         ════════════════════════════════════════════════════ */}
      <section id="strategie" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <FadeUp className="text-center mb-10">
            <Badge color="blue" icon={<Calculator className="w-3 h-3" />}>
              Simulation de référence
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-[#0f172a]">
              Cabinet <span className="text-blue-600">1 200 lots</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              {/* 3 metric boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-gray-200 p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Stock d&apos;impayés identifié</p>
                  <p className="text-2xl font-black text-[#0f172a]">300 000 €</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">
                    <TrendingUp className="inline w-3 h-3 mr-1" />
                    Récupération potentielle (25%)
                  </p>
                  <p className="text-2xl font-black text-green-600">+ 75 000 €</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-red-500 mb-2">
                    <AlertTriangle className="inline w-3 h-3 mr-1" />
                    Coût mensuel de l&apos;inaction
                  </p>
                  <p className="text-2xl font-black text-red-500 leading-tight">- 37 500 €<br /><span className="text-lg">/ mois</span></p>
                </div>
              </div>

              {/* CTA */}
              <a href="/simulateur"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase py-4 rounded-xl transition-colors group">
                <Calculator className="w-4 h-4" />
                Calculer mon potentiel
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="mt-3 text-center text-xs text-gray-400">
                Calcul basé exclusivement sur les données saisies.<br />
                Aucune hypothèse externe non visible.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CONTEXTE MARCHÉ
         ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <Badge color="orange" icon={<AlertTriangle className="w-3 h-3" />}>
              Contexte marché
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-[#0f172a]">
              Le modèle traditionnel{' '}
              <span className="text-orange-500">atteint ses limites.</span>
            </h2>
          </FadeUp>

          {/* Photo contexte */}
          <FadeUp delay={0.05}>
            <div className="rounded-2xl overflow-hidden mb-10 h-64 relative">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=70&auto=format&fit=crop"
                alt="Team meeting"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </FadeUp>

          {/* 2x2 grid of pain points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <TrendingDown className="w-5 h-5 text-white" />, bg: 'bg-red-500', label: 'Hausse structurelle des impayés' },
              { icon: <AlertTriangle className="w-5 h-5 text-white" />, bg: 'bg-yellow-500', label: 'Pression constante et sollicitations des copropriétaires' },
              { icon: <FileText className="w-5 h-5 text-white" />, bg: 'bg-blue-500', label: 'Charge administrative sans cesse croissante' },
              { icon: <MapPin className="w-5 h-5 text-white" />, bg: 'bg-purple-500', label: 'Difficulté de recrutement en Île-de-France' },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    {item.icon}
                  </div>
                  <p className="text-gray-700 font-medium text-sm">{item.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Citation encadrée */}
          <FadeUp delay={0.2}>
            <div className="rounded-2xl p-8 text-center"
              style={{ background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)' }}>
              <p className="text-gray-700 text-lg font-medium leading-relaxed">
                La question n&apos;est plus de savoir <strong>si</strong> le modèle doit évoluer,<br />
                mais <span className="text-blue-600 font-bold">comment l&apos;activer</span> sans perturber votre organisation.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          IMPACT FINANCIER
         ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <Badge color="green" icon={<DollarSign className="w-3 h-3" />}>
              Impact financier
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-[#0f172a]">
              Libérer le <span className="text-green-600">cash immobilisé.</span>
            </h2>
            <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Calcul financier structuré. Nous ne visons pas une réorganisation globale de votre entreprise, mais une injection directe de liquidités sur la base de vos créances actuelles.
            </p>
          </FadeUp>

          {/* Photo financière */}
          <FadeUp delay={0.04}>
            <div className="rounded-2xl overflow-hidden mb-10 h-48 relative">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=70&auto=format&fit=crop"
                alt="Financial charts"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
              {/* Header */}
              <div className="px-8 py-5 border-b border-gray-100 text-center">
                <span className="text-sm font-black tracking-widest uppercase text-blue-600">Simulation de référence</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="px-8 py-5 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Cabinet représentatif (Volume)</span>
                    <span className="font-black text-[#0f172a]">1 200 lots</span>
                  </div>
                  <div className="px-8 py-5 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Stock d&apos;impayés identifié</span>
                    <span className="font-black text-[#0f172a]">300 000 €</span>
                  </div>
                </div>
                <div className="px-8 py-5 bg-green-50 flex justify-between items-center">
                  <span className="text-green-700 text-sm font-medium">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    Récupération potentielle (25%)
                  </span>
                  <span className="font-black text-green-600 text-xl">+ 75 000 €</span>
                </div>
              </div>

              {/* Formule inaction */}
              <div className="px-8 py-6 border-t border-gray-100">
                <p className="text-center font-black text-red-600 uppercase tracking-widest text-sm mb-4">
                  Le coût mensuel de l&apos;inaction.
                </p>
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center">
                  <p className="font-mono text-xs text-gray-500 leading-relaxed">
                    Coût d&apos;inaction mensuel estimatif =<br />
                    Stock immobilisé × (Hypothèse récupération / 60 jours) × 30 jours
                  </p>
                  <p className="text-red-500 font-medium text-xs mt-2">Trésorerie retenue par mois de délai</p>
                  <p className="font-black text-red-600 text-3xl mt-3">- 37 500 €</p>
                </div>
                <p className="mt-4 text-center text-xs text-gray-400">
                  Chaque mois de décalage retarde mécaniquement la mobilisation partielle de cette trésorerie.
                </p>
              </div>

              <div className="px-8 pb-6 text-center text-xs text-gray-400">
                Calcul basé exclusivement sur les données saisies. Aucune hypothèse externe non visible.
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CASH-CONTROL — Méthode
         ════════════════════════════════════════════════════ */}
      <section id="methode" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <Badge color="blue" icon={<TrendingUp className="w-3 h-3" />}>
              Cash-Control
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-[#0f172a]">
              Une action directe sur le flux financier.
            </h2>
          </FadeUp>

          {/* Dashboard inline — 100% contrôlé, aucune photo */}
          <FadeUp delay={0.04}>
            <div className="rounded-2xl overflow-hidden mb-10 border border-gray-200 shadow-md bg-[#0f172a]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-3 text-[10px] text-white/30 font-mono tracking-widest uppercase">Tableau de bord — Pilotage trésorerie</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Live
                </span>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-2">Cash récupéré</p>
                  <p className="text-2xl font-black text-emerald-400">+75 000 €</p>
                  <p className="text-[10px] text-emerald-400/70 mt-1">↑ +25% vs mois précédent</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-2">Taux de recouvrement</p>
                  <p className="text-2xl font-black text-blue-400">92 %</p>
                  <p className="text-[10px] text-blue-400/70 mt-1">↑ Objectif atteint</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-2">Dossiers sécurisés</p>
                  <p className="text-2xl font-black text-white">47</p>
                  <p className="text-[10px] text-white/40 mt-1">↑ Ce trimestre</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-3">Évolution du cash récupéré — 6 mois</p>
                  <svg viewBox="0 0 400 80" className="w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <path d="M0,72 C30,68 60,62 90,56 C120,50 150,44 180,38 C210,32 240,26 270,20 C300,14 330,10 360,6 L400,4 L400,80 L0,80 Z" fill="url(#cashGrad)" />
                    <path d="M0,72 C30,68 60,62 90,56 C120,50 150,44 180,38 C210,32 240,26 270,20 C300,14 330,10 360,6 L400,4" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="0" cy="72" r="3" fill="#34d399" />
                    <circle cx="80" cy="58" r="3" fill="#34d399" />
                    <circle cx="160" cy="40" r="3" fill="#34d399" />
                    <circle cx="240" cy="24" r="3" fill="#34d399" />
                    <circle cx="320" cy="10" r="3" fill="#34d399" />
                    <circle cx="400" cy="4" r="3" fill="#34d399" />
                    <text x="0" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Août</text>
                    <text x="80" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Sep</text>
                    <text x="160" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Oct</text>
                    <text x="240" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Nov</text>
                    <text x="320" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Déc</text>
                    <text x="400" y="78" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Jan</text>
                  </svg>
                </div>
              </div>
            </div>
          </FadeUp>


          <div className="space-y-4 mb-14">
            {[
              {
                n: '01', bg: 'from-blue-400 to-blue-600',
                title: 'Priorisation structurée des dossiers',
                desc: 'Le système identifie les dossiers à fort potentiel au sein de vos balances âgées.',
                icon: (
                  <svg className="w-6 h-6 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
                  </svg>
                )
              },
              {
                n: '02', bg: 'from-purple-400 to-pink-500',
                title: 'Relances progressives selon ancienneté',
                desc: 'Application de relances courtoises mais fermes selon le profil du débiteur.',
                icon: (
                  <svg className="w-6 h-6 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                )
              },
              {
                n: '03', bg: 'from-green-400 to-emerald-600',
                title: 'Pilotage hebdomadaire du stock',
                desc: 'Tableau de bord financier dirigeant, isolant le cash effectivement recouvré.',
                icon: (
                  <svg className="w-6 h-6 text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                )
              },
            ].map((step, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
                  {/* Badge dégradé */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.bg} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-black text-base">{step.n}</span>
                  </div>
                  {/* Icône fantôme */}
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#0f172a] text-sm">{step.title}</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Méthode opérationnelle — 2 cartes Figma */}
          <FadeUp delay={0.1}>
            <div className="mt-4 mb-4 text-center">
              <Badge color="purple" icon={<Users className="w-3 h-3" />}>Méthode opérationnelle</Badge>
              <h3 className="mt-4 font-black text-[#0f172a] text-2xl">Organisation &amp; <span className="text-purple-500">Flux</span></h3>
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="grid md:grid-cols-2 gap-5">

              {/* Carte gauche — Réduire les interruptions */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 flex flex-col gap-5">
                {/* Icon + titre */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </div>
                  <h4 className="font-black text-[#0f172a] text-base leading-tight">Réduire les interruptions.</h4>
                </div>
                {/* Bullet list */}
                <ul className="space-y-2.5">
                  {['Qualification administrative', 'Préparation des réponses', 'Filtrage niveau 1', 'Aucun arbitrage juridique'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Info box */}
                <div className="bg-blue-50 rounded-xl px-4 py-3">
                  <p className="text-blue-600 font-semibold text-sm">Le système assiste. Il ne décide pas.</p>
                </div>
                <p className="text-gray-400 text-xs italic leading-relaxed">
                  Cette approche repose sur l&apos;analyse des flux syndic observés en cabinet indépendant.
                </p>
              </div>

              {/* Carte droite — Absorber sans recruter */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 flex flex-col gap-5">
                {/* Icon + titre */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-black text-[#0f172a] text-base leading-tight">Absorber plus d&apos;immeubles sans recruter.</h4>
                </div>
                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  Le temps restauré permet d&apos;absorber une croissance organique maîtrisée sans accroissement de la masse salariale.
                </p>
                {/* Bullet list */}
                <ul className="space-y-2.5">
                  {["Indicateur de capacité absorbable", "Pilotage charge gestionnaire", "Répartition optimisée des flux"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Objectif box */}
                <div className="bg-green-50 rounded-xl px-5 py-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-medium leading-snug">Objectif<br />opérationnel :</span>
                  <span className="text-green-600 font-black text-xl leading-tight text-right">+1 immeuble /<br />gestionnaire</span>
                </div>
              </div>

            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PÉRIMÈTRE
         ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="mb-12">
            <div className="rounded-2xl overflow-hidden h-64 relative mb-10">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop"
                alt="Équipe syndic satisfaite"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 25%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <Badge color="purple" icon={<CheckCircle2 className="w-3 h-3" />}>
              Périmètre
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-[#0f172a]">
              Vous gardez votre cadre.
            </h2>
            <p className="mt-3 text-gray-500 text-sm">
              Le logiciel métier reste l&apos;unique référentiel. Notre intervention est complémentaire.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            {/* Header */}
            <div className="mb-6">
              <p className="text-xs font-black tracking-widest uppercase text-gray-400 flex items-center gap-2">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-black text-[10px]">✕</span>
                </span>
                Ce que nous ne faisons pas
              </p>
            </div>
            {/* Grille 2×2 */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Nous ne remplaçons pas votre comptabilité.", desc: "ICS, Septeo, Vilogi ou Arcopole demeurent les uniques référentiels." },
                { title: "Nous ne modifions pas vos AG.", desc: "Le processus institutionnel et légal de l'immeuble reste entre les mains du gestionnaire." },
                { title: "Nous ne recréons pas un extranet.", desc: "Nous n'imposons aucune plateforme tierce à vos clients." },
                { title: "Nous n'intervenons pas dans vos décisions juridiques.", desc: "Le système est un outil limitant le chaos ; il ne tranche jamais un contentieux complexe." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 font-black text-xs">✕</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0f172a] text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Déploiement progressif — carte horizontale */}
          <FadeUp delay={0.14}>
            <div className="mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)' }}>
              {/* Icône play */}
              <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              {/* Texte */}
              <div className="flex-1">
                <p className="font-black text-[#0f172a] text-base mb-1">Déploiement progressif.</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Le déploiement peut débuter sur un périmètre pilote limité. Les indicateurs sont mesurés avant toute extension.
                </p>
                <p className="text-blue-600 font-semibold text-sm mt-1">
                  Objectif : sécuriser la décision et valider le potentiel réel.
                </p>
              </div>
              {/* CTA */}
              <a href="#demo"
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-widest uppercase px-5 py-3 rounded-xl transition-colors">
                Planifier l&apos;audit
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <Badge color="blue" icon={<Users className="w-3 h-3" />}>FAQ</Badge>
            <h2 className="mt-5 text-3xl font-black text-[#0f172a]">Questions fréquentes</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <FAQ />
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          AUDIT SECTION (Figma style)
         ════════════════════════════════════════════════════ */}
      <AuditSection />

      {/* ════════════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════════════ */}
      <footer className="bg-[#0f172a] py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">N</span>
              </div>
              <span className="font-bold text-white tracking-wide text-sm">NOVELPIX</span>
            </div>
            {/* Copyright */}
            <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase text-center">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Novelpix. Tous droits réservés.
            </p>
            {/* Links */}
            <div className="flex items-center gap-6 text-[10px] text-white/30 font-medium tracking-widest uppercase">
              <a href="#" className="hover:text-white/50 transition-colors">Mentions Légales</a>
              <span>|</span>
              <a href="#" className="hover:text-white/50 transition-colors">Politique de Confidentialité</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/20 leading-relaxed max-w-2xl mx-auto">
              Novelpix propose des solutions d&apos;optimisation de trésorerie dédiées aux syndics indépendants.<br />
              Notre approche structurée s&apos;intègre à vos outils existants sans migration ni rupture organisationnelle.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
