"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Brain,
  Sliders,
  Send,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Heart,
  ChevronRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AgentDciPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    suicidalIdeation: 'none',
    suicidalDetails: '',
    criticalIncident: 'no',
    incidentDetails: '',
    sleepDisorder: false,
    sleepDetails: '',
    stressLevel: 3,
    observations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate encryption & processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Move to success step
      // Store in localStorage to pass data to doctor triage list dynamically if needed!
      localStorage.setItem("agent_submitted_dci", "true");
      localStorage.setItem("agent_dci_score", String(calculateMockScore()));
    }, 2000);
  };

  const calculateMockScore = () => {
    let score = 0;
    if (formData.suicidalIdeation !== 'none') score += 6;
    if (formData.criticalIncident === 'yes') score += 10;
    if (formData.sleepDisorder) score += 4;
    score += Math.round(formData.stressLevel);
    return Math.min(20, score);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
          <Lock className="w-3.5 h-3.5" />
          Formulaire Médical Sécurisé CGPR
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight display-font">
          Mon Dépistage <span className="text-primary">Clinique Initial (DCI)</span>
        </h1>
        <p className="text-secondary text-sm mt-1 leading-relaxed">
          Veuillez remplir cette auto-évaluation pré-rendez-vous de manière transparente. Vos réponses sont cryptées de bout en bout et transmises uniquement aux psychologues agréés pour évaluer votre priorité de prise en charge.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: WELCOME & PRINCIPLES */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <GlassCard className="!p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Charte de Confidentialité Clinique</h3>
                  <p className="text-xs text-secondary">Vos droits et la sécurité de vos données de santé.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-secondary leading-relaxed">
                <div className="space-y-4">
                  <h4 className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Secret Médical Strict
                  </h4>
                  <p>
                    Toutes les informations saisies sont couvertes par le secret médical absolu. Ni votre hiérarchie, ni vos collègues n'ont accès à ces évaluations. Elles servent uniquement au psychologue pour trier les urgences cliniques.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Triage par Urgence
                  </h4>
                  <p>
                    Notre algorithme clinique évalue l'urgence (Niveau 1 à Niveau 4). Les agents ayant subi un incident critique en service (mutinerie, agression) ou présentant une détresse aiguë sont programmés prioritairement pour des séances Teams.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-secondary leading-relaxed">
                  Le temps estimé pour remplir ce questionnaire est de <strong>5 minutes</strong>. Veuillez vous installer dans un endroit calme et privé avant de continuer.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2 group"
                >
                  <span>Démarrer l'évaluation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 2: THE DCI FORM */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <form onSubmit={handleSubmit}>
              <GlassCard className="!p-8 space-y-6">
                
                {/* Section A: Psychiatric Triage */}
                <div className="space-y-4 border-b border-white/5 pb-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-primary animate-pulse" />
                    SECTION A : Urgence Clinique Immédiate
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">
                        Ressentez-vous des idées de suicide, d'auto-mutilation ou de fatigue psychologique extrême ?
                      </label>
                      <select
                        value={formData.suicidalIdeation}
                        onChange={(e) => setFormData(prev => ({ ...prev, suicidalIdeation: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors"
                        required
                      >
                        <option className="bg-background" value="none">Non, aucun sentiment d'auto-mutilation ou de détresse extrême.</option>
                        <option className="bg-background" value="low">Légère fatigue psychologique occasionnelle.</option>
                        <option className="bg-background" value="moderate">Idées d'échappement / Sentiment d'impuissance récurrent.</option>
                        <option className="bg-background" value="high">Détresse psychologique extrême (Besoin d'aide immédiat).</option>
                      </select>
                    </div>

                    {formData.suicidalIdeation !== 'none' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/70">
                          Veuillez détailler brièvement votre ressenti (verbatim pour le médecin) :
                        </label>
                        <textarea
                          value={formData.suicidalDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, suicidalDetails: e.target.value }))}
                          placeholder="Exprimez ici librement ce que vous traversez actuellement..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Section B: Critical Incidents */}
                <div className="space-y-4 border-b border-white/5 pb-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-primary" />
                    SECTION B : Incident Critique en Service
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">
                        Avez-vous subi ou assisté à un incident violent, une mutinerie ou une agression physique en service récemment ?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-xl border border-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="criticalIncident"
                            checked={formData.criticalIncident === 'yes'}
                            onChange={() => setFormData(prev => ({ ...prev, criticalIncident: 'yes' }))}
                            className="accent-primary"
                          />
                          <span className="text-xs text-white">Oui, j'ai subi/assisté à un incident critique</span>
                        </label>

                        <label className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-xl border border-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="criticalIncident"
                            checked={formData.criticalIncident === 'no'}
                            onChange={() => setFormData(prev => ({ ...prev, criticalIncident: 'no' }))}
                            className="accent-primary"
                          />
                          <span className="text-xs text-white">Non, aucun incident récent</span>
                        </label>
                      </div>
                    </div>

                    {formData.criticalIncident === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/70">
                          Décrivez succinctement l'incident et vos réactions (évitement, sursauts, flashbacks) :
                        </label>
                        <textarea
                          value={formData.incidentDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, incidentDetails: e.target.value }))}
                          placeholder="Racontez ce qui s'est produit et si vous évitez certains secteurs ou sursautez aux bruits..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                          required
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Section C: Sleep & Trauma */}
                <div className="space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-primary" />
                    SECTION C : Sommeil & Stress Traumatique
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                          Évaluez votre niveau de stress traumatique global
                        </label>
                        <span className="text-xs font-mono font-bold text-primary">{formData.stressLevel} / 10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.stressLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                        className="w-full accent-primary bg-white/5 h-2 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-secondary/40 font-mono mt-1">
                        <span>Léger inconfort</span>
                        <span>Stress modéré</span>
                        <span>Hypervigilance / Détresse aiguë</span>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sleepDisorder}
                        onChange={(e) => setFormData(prev => ({ ...prev, sleepDisorder: e.target.checked }))}
                        className="accent-primary w-4 h-4 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Insomnies et troubles graves du sommeil</p>
                        <p className="text-[10px] text-secondary mt-0.5">Difficultés d'endormissement, réveils paniqués, cauchemars répétés.</p>
                      </div>
                    </label>

                    {formData.sleepDisorder && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        <textarea
                          value={formData.sleepDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, sleepDetails: e.target.value }))}
                          placeholder="Décrivez vos insomnies (durée moyenne du sommeil, nature des cauchemars)..."
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Submit Block */}
                <div className="border-t border-white/5 pt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-secondary hover:text-white uppercase font-bold tracking-widest"
                  >
                    Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Lock className="w-4 h-4 animate-pulse" />
                        <span>Cryptage AES-256...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmettre mon DCI</span>
                      </>
                    )}
                  </button>
                </div>

              </GlassCard>
            </form>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS & CONFIRMATION */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <GlassCard className="!p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-2xl text-white">DCI Clinique Transmis avec Succès</h3>
                <p className="text-xs text-secondary/80 max-w-md mx-auto">
                  Votre diagnostic initial a été crypté et archivé de manière sécurisée sous la référence de transaction <strong>CGPR-DCI-981A</strong>.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl max-w-md mx-auto text-left space-y-3">
                <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Étapes Suivantes du Suivi
                </h4>
                <ul className="text-xs text-secondary space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Votre évaluation est immédiatement disponible pour l'équipe des psychologues cliniciens CGPR.</li>
                  <li>Ils calculeront votre niveau de priorité de triage (Urgence 1 à 4) afin de planifier au plus vite un créneau.</li>
                  <li>Une fois planifié, vous recevrez une invitation pour vous connecter de manière sécurisée au **Bridge de consultation Teams**.</li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    // Redirect back to teams dashboard view
                    window.location.href = `/dashboard/teams`;
                  }}
                  className="px-6 py-3.5 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2"
                >
                  <span>Accéder à mes séances</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
