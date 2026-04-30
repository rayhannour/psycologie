"use client";
import { motion, Variants } from 'framer-motion';

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } } };

const rows = [
  { id: 'PT-001', region: 'Tunis', status: 'Stable', statusColor: 'bg-primary', throughput: '4 sessions', action: 'Monitoring baseline', aColor: 'text-white/50', spin: false },
  { id: 'PT-024', region: 'Sousse', status: 'Critique', statusColor: 'bg-yellow-400', throughput: '9 sessions', action: 'Alerte anxiété détectée', aColor: 'text-yellow-400', spin: true },
  { id: 'PT-057', region: 'Sfax', status: 'Stable', statusColor: 'bg-primary', throughput: '3 sessions', action: 'Suivi nominal', aColor: 'text-white/50', spin: false },
  { id: 'PT-089', region: 'Mednine', status: 'Urgent', statusColor: 'bg-red-500', throughput: '6 sessions', action: 'Détresse émotionnelle', aColor: 'text-red-400', spin: true },
  { id: 'PT-102', region: 'Bizerte', status: 'Stable', statusColor: 'bg-primary', throughput: '2 sessions', action: 'Progression positive', aColor: 'text-white/50', spin: false },
];

export default function TelemetrySection() {
  return (
    <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
      <svg className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
        <path d="M0,250 C200,400 300,100 500,250 C700,400 800,100 1000,250 L1000,500 L0,500 Z" fill="url(#telGrad)" />
        <defs>
          <linearGradient id="telGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}
        className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-primary/20 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-3">Télémétrie Live</h2>
            <p className="text-sm md:text-2xl text-white/40 font-light">Supervision en temps réel des sessions cliniques actives.</p>
          </div>
          <div className="flex gap-6">
            <span className="bg-primary/10 border border-primary/20 text-primary px-6 py-3 rounded-xl text-sm font-mono tracking-widest flex items-center gap-3">
              <i className="pi pi-bolt" /> CLINIQUE
            </span>
            <span className="bg-secondary/10 border border-secondary/20 text-secondary px-6 py-3 rounded-xl text-sm font-mono tracking-widest flex items-center gap-3">
              <i className="pi pi-wifi" /> COGNITIF
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main SVG topology */}
          <motion.div variants={fadeUp} className="lg:col-span-8 bg-white/[0.03] p-5 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-6">
              <h3 className="text-lg md:text-3xl font-bold text-white">Topologie Neuronale Globale</h3>
              <span className="text-sm font-mono text-white/30 tracking-widest uppercase">Nœuds: 1,247</span>
            </div>
            <div className="w-full flex-1 relative flex items-center justify-center min-h-[200px]">
              <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-80">
                <path d="M 100,200 Q 250,50 400,200 T 700,200" fill="none" stroke="#00e5ff40" strokeWidth="1.5" strokeDasharray="6 6" />
                <path d="M 200,300 Q 400,100 600,300" fill="none" stroke="#ff790050" strokeWidth="2.5" opacity="0.6" />
                <circle cx="100" cy="200" r="8" fill="#00e5ff" className="animate-pulse" />
                <circle cx="400" cy="200" r="16" fill="#00e5ff30" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="400" cy="200" r="8" fill="#000" stroke="#00e5ff" strokeWidth="3" />
                <circle cx="700" cy="200" r="10" fill="#00e5ff" className="animate-pulse" />
                <circle cx="200" cy="300" r="6" fill="#ff7900" />
                <circle cx="600" cy="300" r="6" fill="#ff7900" />
                <rect x="360" y="130" width="100" height="30" rx="6" fill="#ffffff10" stroke="#00e5ff40" strokeWidth="2" />
                <text x="410" y="150" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle">CORE-PSY</text>
              </svg>
              <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-xl border border-primary/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                <p className="text-xs text-primary font-mono tracking-widest mb-2">SATURATION RÉSEAU</p>
                <div className="flex items-end gap-3">
                  <span className="text-2xl md:text-4xl font-bold text-white">98.4</span>
                  <span className="text-xs text-white/50 font-mono mb-1">Sessions/jour</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat blocks */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-primary/10 to-white/[0.03] p-5 md:p-10 rounded-[2rem] border border-primary/30 shadow-[0_0_40px_rgba(0,229,255,0.1)] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
              <i className="pi pi-chart-line text-2xl md:text-4xl text-primary mb-6 drop-shadow-[0_0_10px_var(--color-primary)]" />
              <h4 className="text-base text-white/50 mb-2">Précision IA</h4>
              <p className="text-3xl md:text-6xl font-black text-white">99.8%</p>
              <div className="w-full h-1.5 bg-white/5 mt-6 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[99.8%] shadow-[0_0_15px_#00e5ff]" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white/[0.03] p-5 md:p-10 rounded-[2rem] border border-white/5 flex flex-col justify-center shadow-lg">
              <i className="pi pi-server text-2xl md:text-4xl text-secondary mb-6" />
              <h4 className="text-base text-white/50 mb-2">Analyses</h4>
              <p className="text-3xl md:text-6xl font-black text-white">14,092<span className="text-xl text-secondary ml-2 font-normal">/j</span></p>
            </motion.div>
          </div>

          {/* Data Table */}
          <motion.div variants={fadeUp} className="lg:col-span-12 bg-white/[0.02] p-5 md:p-12 rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl mt-4">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-8 flex items-center gap-4">
              <i className="pi pi-list text-primary text-2xl" /> Matrice Patient Live
            </h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-white/10 text-sm font-mono tracking-widest text-white/30 uppercase">
                    <th className="pb-5 px-6">ID Patient</th>
                    <th className="pb-5 px-6">Région</th>
                    <th className="pb-5 px-6">Statut</th>
                    <th className="pb-5 px-6">Sessions</th>
                    <th className="pb-5 px-6">Action IA</th>
                  </tr>
                </thead>
                <tbody className="text-base text-white">
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 px-6 font-mono text-primary font-bold">{row.id}</td>
                      <td className="py-6 px-6 text-white/70">{row.region}</td>
                      <td className="py-6 px-6">
                        <span className="flex items-center gap-3">
                          <span className={`w-3 h-3 rounded-full ${row.statusColor} inline-block`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-6 px-6 font-mono text-white/70">{row.throughput}</td>
                      <td className={`py-6 px-6 font-semibold ${row.aColor}`}>
                        {row.action} {row.spin && <i className="pi pi-sync ml-2 animate-spin text-sm" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
