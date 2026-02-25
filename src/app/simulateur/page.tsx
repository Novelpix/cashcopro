"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────────────────────
//  Sections utilitaires
// ─────────────────────────────────────────────────────────────
const SectionSeparator = () => (
  <span className="block w-10 h-0.5 bg-[#0a192f] mb-5" />
);

export default function Simulateur() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    lotsCount: "1500",
    unpaidPercent: "20",
    avgUnpaidAmount: "1500",
    weeklyCalls: "300",
    adminHourlyRate: "35",
    setupFee: "5000",
    monthlyFee: "800",
    reductionPercent: "70",
    callTimeMin: "5",
  });

  const [hasSimulated, setHasSimulated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [results, setResults] = useState({
    immobilizedCash: 0,
    recovery15: 0,
    recovery20: 0,
    recovery30: 0,
    invest60: 0,
    roi15: 0,
    roi20: 0,
    roi30: 0,
    adminHours: 0,
    roiThreshold: 0,
    inactionCost: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();

    const lots = Number(formData.lotsCount) || 0;
    const unpaidPercent = Number(formData.unpaidPercent) || 0;
    const avgAmount = Number(formData.avgUnpaidAmount) || 0;
    const calls = Number(formData.weeklyCalls) || 0;
    const hourlyRate = Number(formData.adminHourlyRate) || 0;
    const setup = Number(formData.setupFee) || 0;
    const monthly = Number(formData.monthlyFee) || 0;
    const reduction = Number(formData.reductionPercent) || 0;
    const callTime = Number(formData.callTimeMin) || 0;

    const immobilized = lots * (unpaidPercent / 100) * avgAmount;
    const rec15 = immobilized * 0.15;
    const rec20 = immobilized * 0.2;
    const rec30 = immobilized * 0.3;
    const invest = setup + monthly * 2;
    const hours = Math.round(((calls * (reduction / 100) * callTime) / 60) * 52);
    const threshold = avgAmount > 0 ? Math.ceil(invest / avgAmount) : 0;

    setResults({
      immobilizedCash: immobilized,
      recovery15: rec15,
      recovery20: rec20,
      recovery30: rec30,
      invest60: invest,
      roi15: rec15 - invest,
      roi20: rec20 - invest,
      roi30: rec30 - invest,
      adminHours: hours,
      roiThreshold: threshold,
      inactionCost: Math.round(rec20 / 2),
    });

    setHasSimulated(true);
  };

  const handlePlanAudit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    router.push("/audit");
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  // ─── Input group ─────────────────────────────────────────
  const InputField = ({
    label,
    name,
    value,
  }: {
    label: string;
    name: string;
    value: string;
  }) => (
    <div>
      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={handleInputChange}
        required
        className="sim-input"
      />
    </div>
  );

  return (
    <div
      className="w-full font-sans bg-[#f8f9fb] min-h-screen pb-24 text-[#0f172a]"
      suppressHydrationWarning={true}
    >
      {/* Navigation minimaliste */}
      <nav className="fixed w-full z-50 top-0 bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#0a192f] flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-widest">N</span>
            </div>
            <span className="font-black text-[#0a192f] tracking-tight text-base uppercase">Novelpix</span>
          </a>
          <span className="label-caps text-slate-400 hidden md:block">Module d&apos;analyse financière interne</span>
        </div>
      </nav>

      {/* Header de page */}
      <section className="bg-white pt-36 pb-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="label-caps text-slate-400 mb-4">
            Module d&apos;analyse financière interne
          </p>
          <h1 className="text-display-xl text-[#0a192f] mb-6">
            Simulation personnalisée de trésorerie immobilisée
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto font-medium">
            Visualisez l&apos;ordre de grandeur du cash actuellement bloqué, sur la base de vos données et hypothèses.
          </p>
        </div>
      </section>

      {/* Corp principal */}
      <div className="max-w-7xl mx-auto px-8 pt-14">
        <div className="grid xl:grid-cols-12 gap-8 md:gap-10">

          {/* ── FORMULAIRE ──────────────────────────────────────── */}
          <div className="xl:col-span-4">
            <div className="bg-white border border-slate-200 border-t-2 border-t-[#0a192f] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="label-caps-md text-[#0a192f]">Données d&apos;entrée</h2>
              </div>
              <form onSubmit={handleSimulate} className="p-6 space-y-6">

                {/* Structure & Créances */}
                <div className="space-y-4">
                  <div className="sim-section-label">Structure &amp; Créances</div>
                  <InputField label="Nombre de lots gérés" name="lotsCount" value={formData.lotsCount} />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Taux d'impayés (%)" name="unpaidPercent" value={formData.unpaidPercent} />
                    <InputField label="Montant moyen (€)" name="avgUnpaidAmount" value={formData.avgUnpaidAmount} />
                  </div>
                </div>

                {/* Paramètres opérationnels */}
                <div className="space-y-4">
                  <div className="sim-section-label">Paramètres opérationnels</div>
                  <InputField label="Demandes entrantes / semaine" name="weeklyCalls" value={formData.weeklyCalls} />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="% Réduction cible" name="reductionPercent" value={formData.reductionPercent} />
                    <InputField label="Temps moy. (min)" name="callTimeMin" value={formData.callTimeMin} />
                  </div>
                  <InputField label="Coût horaire moyen gestionnaire (€)" name="adminHourlyRate" value={formData.adminHourlyRate} />
                </div>

                {/* Investissement */}
                <div className="space-y-4">
                  <div className="sim-section-label">Investissement estimé</div>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Frais de Set-up" name="setupFee" value={formData.setupFee} />
                    <InputField label="Abo. mensuel" name="monthlyFee" value={formData.monthlyFee} />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0a192f] hover:bg-[#102a43] text-white font-black label-caps-md py-4 px-6 transition-colors"
                  >
                    Calculer le modèle
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── RÉSULTATS ───────────────────────────────────────── */}
          <div className="xl:col-span-8">
            {!hasSimulated ? (
              <div className="bg-white border border-slate-200 border-t-2 border-t-slate-300 h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
                <div className="w-12 h-12 border-2 border-slate-200 flex items-center justify-center mb-6">
                  <span className="text-slate-300 text-xl font-black">∑</span>
                </div>
                <p className="text-slate-400 font-medium text-lg">
                  En attente des données d&apos;entrée pour générer le modèle d&apos;analyse.
                </p>
              </div>
            ) : (
              <div className="space-y-6">

                {/* BLOC A – Stock immobilisé */}
                <div className="sim-result-block">
                  <SectionSeparator />
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-4">
                    A — Stock immobilisé actuel <span className="text-slate-300">(Photographie)</span>
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 p-3 mb-5 font-mono text-xs text-slate-400 leading-relaxed">
                    Formule : Stock immobilisé = Nombre de lots ({formData.lotsCount}) × Taux d&apos;impayés ({formData.unpaidPercent}%) × Montant moyen ({formData.avgUnpaidAmount}&nbsp;€)
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                      Trésorerie latente estimée
                    </p>
                    <p className="financial-figure text-[#0a192f] text-4xl">
                      {formatCurrency(results.immobilizedCash)}
                    </p>
                  </div>
                </div>

                {/* BLOC B – Simulation récupération */}
                <div className="sim-result-block">
                  <SectionSeparator />
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-4">
                    B — Simulation de récupération du stock existant <span className="text-slate-300">(Ponctuel sur 60 jours)</span>
                  </h3>

                  <div className="bg-slate-50 border border-slate-100 p-3 mb-5 font-mono text-xs text-slate-400 leading-relaxed">
                    Formule : Montant récupérable = Stock immobilisé × Hypothèse&nbsp;%<br />
                    Investissement total (60 jours) = Frais de Set-up + (Abo. mensuel × 2) = {formatCurrency(results.invest60)}
                  </div>

                  <div className="border border-slate-200 overflow-hidden">
                    <table className="w-full sim-table">
                      <thead>
                        <tr>
                          <th>Hypothèse</th>
                          <th>Cash récupéré</th>
                          <th>Investissement</th>
                          <th>ROI net</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-slate-500">Prudente (15%)</td>
                          <td className="num text-slate-700">{formatCurrency(results.recovery15)}</td>
                          <td className="num text-slate-400">{formatCurrency(results.invest60)}</td>
                          <td className="num font-bold text-[#0a192f]">{formatCurrency(results.roi15)}</td>
                        </tr>
                        <tr className="highlight">
                          <td>Cible (20%)</td>
                          <td className="num">{formatCurrency(results.recovery20)}</td>
                          <td className="num text-slate-400">{formatCurrency(results.invest60)}</td>
                          <td className="num text-emerald-700">{formatCurrency(results.roi20)}</td>
                        </tr>
                        <tr>
                          <td className="text-slate-500">Optimiste (30%)</td>
                          <td className="num text-slate-700">{formatCurrency(results.recovery30)}</td>
                          <td className="num text-slate-400">{formatCurrency(results.invest60)}</td>
                          <td className="num font-bold text-[#0a192f]">{formatCurrency(results.roi30)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 italic font-medium">
                    Mentions : Cette récupération concerne exclusivement le stock existant. Elle ne constitue pas un flux trimestriel reconductible.
                  </p>
                </div>

                {/* BLOC – Seuil de rentabilité */}
                <div className="sim-result-highlight">
                  <SectionSeparator />
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-4">
                    Seuil de rentabilité irréfutable
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-3 mb-5 font-mono text-xs text-slate-500 leading-relaxed">
                    Formule : Seuil impayés = Investissement total ({formatCurrency(results.invest60)}) / Montant moyen d&apos;un impayé ({formatCurrency(Number(formData.avgUnpaidAmount))})
                  </div>
                  <div className="text-lg font-bold text-white mb-3">Décision financière :</div>
                  <div className="text-slate-300 leading-relaxed font-medium">
                    Si l&apos;investissement est couvert par{" "}
                    <span className="text-white font-black bg-white/10 px-2 py-0.5">
                      {results.roiThreshold}
                    </span>{" "}
                    impayés moyens régularisés, la décision repose principalement sur le calendrier d&apos;activation.
                  </div>
                </div>

                {/* BLOC – Coût de l'inaction */}
                <div className="sim-result-block">
                  <SectionSeparator />
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-4">
                    Le coût mensuel de l&apos;inaction
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 p-3 mb-5 font-mono text-xs text-slate-400 leading-relaxed">
                    Formule : Coût d&apos;inaction mensuel estimatif = Stock immobilisé × (Hypothèse récupération 20% / 60 jours) × 30 jours
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                      Stock latente par mois de délai
                    </p>
                    <p className="financial-figure text-3xl text-[#0a192f]">
                      {formatCurrency(results.inactionCost)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Chaque mois de délai maintient une partie de cette trésorerie immobilisée.
                  </p>
                </div>

                {/* BLOC C – Impact récurrent */}
                <div className="sim-result-block">
                  <SectionSeparator />
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-4">
                    C — Impact opérationnel récurrent estimatif <span className="text-slate-300">(Flux futurs)</span>
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 p-3 mb-5 font-mono text-xs text-slate-400 leading-relaxed">
                    Formule : Temps économisé annuel = (Demandes hebdo ({formData.weeklyCalls}) × Réduction ({formData.reductionPercent}%) × Temps moyen ({formData.callTimeMin} min) × 52 semaines) / 60
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4">
                      <p className="data-label mb-2">Temps opérationnel annuel dégagé</p>
                      <p className="kpi-value text-[#0a192f]">{results.adminHours}<span className="text-sm font-medium ml-1 text-slate-400">h</span></p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4">
                      <p className="data-label mb-2">Valeur interne théorique de ce temps</p>
                      <p className="kpi-value text-[#0a192f] text-2xl">{formatCurrency(results.adminHours * Number(formData.adminHourlyRate))}</p>
                    </div>
                  </div>
                </div>

                {/* Hypothèses & Limites */}
                <div className="bg-white border border-slate-200 border-l-2 border-l-slate-400 p-6">
                  <h4 className="label-caps-md text-[#0a192f] mb-4">Hypothèses structurantes &amp; Limites</h4>
                  <ul className="space-y-2 text-sm text-slate-500 font-medium mb-4">
                    {[
                      "Ancienneté moyenne des créances non spécifiée",
                      "Taux de contestation potentiel non pris en compte",
                      "Dossiers déjà en contentieux exclus",
                      "Capacité interne de suivi variable"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-300 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold text-[#0a192f] bg-slate-50 border border-slate-100 p-3 mb-3">
                    Les résultats sont indicatifs et dépendent de la qualité des données et de l&apos;ancienneté des créances.
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    Cette approche repose sur l&apos;analyse des flux syndic observés en cabinet indépendant.
                  </p>
                </div>

                {/* Avertissement */}
                <div className="text-center py-4 border-t border-slate-200">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">
                    Ce simulateur constitue un outil d&apos;aide à la décision.<br />
                    Il ne constitue ni une garantie de résultat ni un engagement contractuel.
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 text-center flex flex-col items-center gap-4">
                  <p className="text-lg font-bold text-[#0a192f]">
                    L&apos;optimisation financière n&apos;est pas une question technologique.<br />C&apos;est une question d&apos;activation.
                  </p>
                  <button
                    onClick={handlePlanAudit}
                    disabled={isSubmitting}
                    className="bg-[#0a192f] hover:bg-[#102a43] disabled:opacity-70 text-white font-black label-caps-md py-4 px-8 transition-colors w-full sm:w-auto"
                  >
                    {isSubmitting ? "Enregistrement..." : "Lancer l'estimation confidentielle"}
                  </button>
                  <p className="text-xs text-slate-400 font-medium">
                    Analyse personnalisée à partir de vos données. Sans engagement.
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
