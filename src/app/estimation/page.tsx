"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2, Building2, Calculator } from "lucide-react";

const logiciels = ["ICS", "Septeo", "Vilogi", "Arcopole", "Autre"];

export default function Estimation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lots: "",
    impayes: "",
    logiciel: "",
    isSyndic: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.lots || Number(formData.lots) < 1)
      e.lots = "Veuillez indiquer un nombre de lots valide.";
    if (!formData.impayes || Number(formData.impayes) < 0)
      e.impayes = "Veuillez indiquer un stock d'impayés.";
    if (!formData.logiciel)
      e.logiciel = "Veuillez sélectionner votre logiciel.";
    if (!formData.isSyndic)
      e.isSyndic = "Vous devez confirmer agir pour un cabinet de syndic.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsLoading(true);

    // Sauvegarde dans sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "estimation_data",
        JSON.stringify({
          lots: formData.lots,
          impayes: formData.impayes,
          logiciel: formData.logiciel,
          timestamp: Date.now(),
        })
      );
    }

    await new Promise((r) => setTimeout(r, 700));
    router.push("/simulateur");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === "checkbox" ? target.checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
    if (errors[target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
  };

  return (
    <div
      className="min-h-screen font-sans text-[#0f172a] overflow-x-hidden"
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
          <span className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400">
            <Lock className="w-3 h-3" />
            Accès sécurisé
          </span>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-lg mx-auto">

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-700">
                Accès confidentiel
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-[#0f172a] leading-tight mb-4">
              Estimation confidentielle
              <br />
              <span className="text-blue-600">— 2 minutes</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
              Renseignez vos informations pour accéder au simulateur personnalisé. 
              Réservé aux cabinets de syndic professionnels.
            </p>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 space-y-6"
              noValidate
            >

              {/* Nombre de lots */}
              <div>
                <label
                  htmlFor="lots"
                  className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2"
                >
                  <Building2 className="inline w-3.5 h-3.5 mr-1.5 text-blue-500" />
                  Nombre de lots gérés
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="lots"
                  name="lots"
                  min={1}
                  value={formData.lots}
                  onChange={handleChange}
                  placeholder="ex : 1 200"
                  className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all text-sm font-medium ${
                    errors.lots
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                {errors.lots && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.lots}</p>
                )}
              </div>

              {/* Stock d'impayés */}
              <div>
                <label
                  htmlFor="impayes"
                  className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2"
                >
                  <Calculator className="inline w-3.5 h-3.5 mr-1.5 text-blue-500" />
                  Stock d&apos;impayés estimé (€)
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="impayes"
                  name="impayes"
                  min={0}
                  value={formData.impayes}
                  onChange={handleChange}
                  placeholder="ex : 300 000"
                  className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all text-sm font-medium ${
                    errors.impayes
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                {errors.impayes && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.impayes}</p>
                )}
              </div>

              {/* Logiciel */}
              <div>
                <label
                  htmlFor="logiciel"
                  className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2"
                >
                  Logiciel utilisé
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                  id="logiciel"
                  name="logiciel"
                  value={formData.logiciel}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all text-sm font-medium appearance-none cursor-pointer ${
                    errors.logiciel
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  } ${formData.logiciel === "" ? "text-gray-300" : "text-gray-900"}`}
                >
                  <option value="" disabled>
                    Sélectionner votre logiciel
                  </option>
                  {logiciels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.logiciel && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.logiciel}</p>
                )}
              </div>

              {/* Checkbox confirmation */}
              <div
                className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                  errors.isSyndic
                    ? "border-red-200 bg-red-50"
                    : formData.isSyndic
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  id="isSyndic"
                  name="isSyndic"
                  checked={formData.isSyndic}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
                />
                <label
                  htmlFor="isSyndic"
                  className="text-sm font-medium text-gray-700 cursor-pointer leading-snug"
                >
                  Je confirme agir pour un{" "}
                  <strong className="text-[#0f172a]">cabinet de syndic</strong>{" "}
                  professionnel et souhaite accéder à l&apos;estimation personnalisée.
                </label>
              </div>
              {errors.isSyndic && (
                <p className="-mt-3 text-xs text-red-500 font-medium">{errors.isSyndic}</p>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black text-sm tracking-widest uppercase py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/25 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Chargement…</span>
                  </>
                ) : (
                  <>
                    <span>Accéder au simulateur</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                Données traitées de façon confidentielle.<br />
                Aucun engagement requis.
              </p>
            </form>
          </motion.div>

          {/* Garanties */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { icon: "🔒", label: "Confidentiel" },
              { icon: "⏱️", label: "2 minutes" },
              { icon: "✅", label: "Sans engagement" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-2xl block mb-1">{item.icon}</span>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Lien retour */}
          <div className="text-center mt-8">
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
