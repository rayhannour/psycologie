"use client";
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } }
};

const steps = [
  {
    id: '01',
    icon: 'pi-user',
    color: '#00e5ff',
    title: 'Accueil Patient',
    subtitle: 'Entrée en Contact',
    desc: 'Le psychologue initie une session. L\'IA capture l\'identité du patient, son historique clinique et le contexte émotionnel immédiat via un formulaire intelligent.',
    tags: ['Anamnèse', 'Profil Patient', 'DSM-5'],
    stat: '< 90s',
    statLabel: 'Temps d\'Accueil',
  },
  {
    id: '02',
    icon: 'pi-microphone',
    color: '#7c3aed',
    title: 'Écoute Active IA',
    subtitle: 'Analyse Temps Réel',
    desc: 'Transcription vocale instantanée avec analyse sémantique profonde. L\'IA détecte les marqueurs émotionnels, les micro-expressions verbales et les patterns cognitifs.',
    tags: ['NLP Clinique', 'Transcription', 'Affect'],
    stat: '0.02ms',
    statLabel: 'Latence Analyse',
  },
  {
    id: '03',
    icon: 'pi-chart-line',
    color: '#00ffaa',
    title: 'Diagnostic Cognitif',
    subtitle: 'Pattern Recognition',
    desc: 'Le moteur neural compare les données de la session aux 4.7 millions de cas cliniques validés. Détection automatique d\'indicateurs d\'anxiété, dépression, trauma ou trouble bipolaire.',
    tags: ['ICD-11', 'GAD-7', 'PHQ-9', 'PTSD'],
    stat: '98.4%',
    statLabel: 'Précision',
  },
  {
    id: '04',
    icon: 'pi-file-edit',
    color: '#ff7900',
    title: 'Rapport Clinique',
    subtitle: 'Génération Automatique',
    desc: 'Production d\'un compte-rendu structuré conforme aux normes HAS — anamnèse, hypothèses diagnostiques, cotation, plan de traitement suggéré — en moins de 3 secondes.',
    tags: ['HAS Conforme', 'SOAP Notes', 'E-Signer'],
    stat: '< 3s',
    statLabel: 'Génération',
  },
  {
    id: '05',
    icon: 'pi-shield',
    color: '#ff4444',
    title: 'Plan Thérapeutique',
    subtitle: 'Recommandations IA',
    desc: 'L\'IA propose un parcours de soins personnalisé : TCC, EMDR, thérapie systémique ou médicamenteuse. Le praticien valide, ajuste et signe numériquement en un clic.',
    tags: ['TCC', 'EMDR', 'Mindfulness', 'Plan Soins'],
    stat: '1 Clic',
    statLabel: 'Validation',
  },
  {
    id: '06',
    icon: 'pi-sync',
    color: '#00e5ff',
    title: 'Suivi Longitudinal',
    subtitle: 'Évolution & Alertes',
    desc: 'Surveillance continue inter-sessions. L\'IA détecte les régressions, génère des alertes de crise et compare l\'évolution sur l\'ensemble du parcours thérapeutique du patient.',
    tags: ['Alertes Crise', 'Progress Report', 'Archivage'],
    stat: '24/7',
    statLabel: 'Monitoring',
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-1 md:py-1 px-5 sm:px-8 lg:px-16 relative overflow-hidden" id="solutions">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary blur-[200px]"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 50, 0], opacity: [0.04, 0.10, 0.04] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-0 w-[600px] h-[400px] rounded-full bg-purple-600 blur-[180px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Workflow Steps Grid */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              onMouseMove={(e) => {
                const t = e.currentTarget, r = t.getBoundingClientRect();
                t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                t.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
              className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Lamp spotlight effect */}
              <div
                className="absolute -inset-[1px] rounded-2xl md:rounded-3xl z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(200px circle at var(--mx) var(--my), ${step.color}22, transparent 60%)` }}
              />

              {/* Top row: step number + icon */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}40` }}
                  >
                    <i className={`pi ${step.icon} text-lg`} style={{ color: step.color }} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black tracking-[0.3em] text-white/30 uppercase">Étape</span>
                    <p className="text-lg font-black text-white leading-none">{step.id}</p>
                  </div>
                </div>

                {/* Stat badge */}
                <div className="text-right">
                  <p className="text-xl md:text-2xl font-black" style={{ color: step.color }}>{step.stat}</p>
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{step.statLabel}</p>
                </div>
              </div>

              {/* Title */}
              <div className="relative z-10 mb-3">
                <p className="text-[9px] font-mono tracking-[0.3em] uppercase mb-1" style={{ color: step.color }}>
                  {step.subtitle}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">{step.title}</h3>
              </div>

              {/* Separator with animated line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="h-[1px] mb-4 relative z-10"
                style={{ background: `linear-gradient(to right, ${step.color}60, transparent)` }}
              />

              {/* Description */}
              <p className="relative z-10 text-sm text-white/40 leading-relaxed mb-6 font-light">{step.desc}</p>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-widest"
                    style={{ color: step.color, borderColor: `${step.color}30`, backgroundColor: `${step.color}08` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Connector arrow (not on last in row) */}
              {(i + 1) % 3 !== 0 && i < steps.length - 1 && (
                <motion.div
                  animate={{ x: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center"
                >
                  <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                  <i className="pi pi-angle-right text-white/30 text-xs absolute right-0" />
                </motion.div>
              )}

              {/* Animated corner bracket */}
              <div
                className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                style={{ borderColor: step.color }}
              />
              <div
                className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                style={{ borderColor: step.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
        >
          <div>
            <p className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase mb-2">Conformité & Sécurité</p>
            <p className="text-xl md:text-3xl font-black text-white">Toutes les données sont chiffrées <span className="text-primary">AES-512</span></p>
            <p className="text-sm text-white/30 mt-2 font-light">Conformité HDS · RGPD · ISO 27001 · Hébergement Tunisie</p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-end">
            {['HDS Certifié', 'RGPD', 'ISO 27001', 'HL7 FHIR'].map((cert) => (
              <div key={cert} className="px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono font-black tracking-widest uppercase flex items-center gap-2">
                <i className="pi pi-verified text-xs" /> {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
