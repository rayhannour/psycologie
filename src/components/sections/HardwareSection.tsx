"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

export default function HardwareSection() {
  return (
    <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_right,_#00e5ff_0%,_transparent_30%)] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(circle_at_left,_#ff7900_0%,_transparent_30%)] opacity-[0.03] pointer-events-none" />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}
        className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-32 relative z-10">

        {/* Component 1: AI Analysis */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 group">
          <motion.div variants={fadeUp} className="flex-1 w-full order-2 lg:order-1 relative h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-[3rem] overflow-hidden border border-primary/20 shadow-[0_20px_60px_rgba(0,229,255,0.1)] flex items-center justify-center bg-white/[0.02]">
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-black/80 via-transparent to-black/20" />
            <Image src="/agent_.png" alt="Analyse IA Clinique" fill className="object-cover z-10 transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <div className="bg-black/80 backdrop-blur-2xl border border-primary/30 p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] md:text-xs font-mono uppercase text-primary tracking-widest mb-1">Saturation Clinique</p>
                  <p className="text-xl md:text-3xl font-bold text-white">412 Sessions Actives</p>
                </div>
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                  <i className="pi pi-brain text-lg md:text-2xl text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 w-full flex flex-col gap-4 md:gap-6 order-1 lg:order-2">
            <span className="text-primary font-mono tracking-widest uppercase text-xs md:text-sm border-l-2 border-primary pl-4">Télémétrie Neuronale</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight">IA Clinique <br />Proactive</h2>
            <p className="text-sm md:text-xl text-white/50 font-light leading-relaxed max-w-xl">
              Notre architecture deep learning anticipe activement les crises et redistribue intelligemment les ressources d'accompagnement thérapeutique.
            </p>
            <ul className="flex flex-col gap-2 md:gap-4 mt-4 text-sm md:text-lg text-white">
              <li className="flex items-center gap-4"><i className="pi pi-angle-right text-primary" /> Résolution 48x plus rapide des situations de crise.</li>
              <li className="flex items-center gap-4"><i className="pi pi-angle-right text-primary" /> Visualisation glass-style des états émotionnels.</li>
            </ul>
          </motion.div>
        </div>

        {/* Smart Connect Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="w-full bg-white/[0.03] border-y border-secondary/20 overflow-hidden py-6 md:py-10 group rounded-2xl md:rounded-none relative">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="bg-g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff7900" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#bg-g)" />
            </svg>
          </div>
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between px-5 md:px-12 gap-6 md:gap-12 relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                <span className="text-secondary font-mono text-[10px] font-black tracking-[0.4em] uppercase">CGPR_NEURAL_LINK_STABLE</span>
              </div>
              <h4 className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase">Réseau HDS Tunisie — Cluster Principal</h4>
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-12">
              {[
                { label: 'Latence', value: '8ms', icon: 'pi-bolt', color: 'text-secondary' },
                { label: 'Débit', value: '420 Gbps', icon: 'pi-cloud-download', color: 'text-white' },
                { label: 'Conformité', value: 'HDS', icon: 'pi-shield', color: 'text-primary' },
                { label: 'Statut', value: 'NOMINAL', icon: 'pi-wifi', color: 'text-primary' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col gap-1 border-l-2 border-white/5 pl-6 group/stat">
                  <p className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest flex items-center gap-2 group-hover/stat:text-white transition-colors">
                    <i className={`pi ${s.icon} text-[8px]`} /> {s.label}
                  </p>
                  <p className={`text-xl font-mono font-black ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:flex flex-1 justify-center overflow-hidden h-12 relative">
              <motion.div animate={{ x: [1000, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex items-center gap-10 whitespace-nowrap text-[10px] font-mono text-white/20">
                {Array(10).fill(0).map((_, i) => (
                  <span key={i}>AI_ANALYZING: SESSION_PARIS_07 // CGPR_CORE_LOAD: 12% // ANOMALY_DETECTED: 0.000%</span>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 right-1/4 w-96 h-full bg-secondary/5 blur-[100px] pointer-events-none" />
        </motion.div>

        {/* Component 2: AI Support */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 group">
          <motion.div variants={fadeUp} className="flex-1 w-full flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-secondary to-transparent" />
              <span className="text-secondary font-mono tracking-[0.3em] uppercase text-xs font-black">Soutien Cognitif Hybride</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              Zéro Délai. <br /> <span className="text-secondary">L'IA</span> Agit.
            </h2>
            <p className="text-sm md:text-xl text-white/50 font-light leading-relaxed max-w-xl">
              Le système élimine les barrières d'accès au soin. En utilisant la vision par ordinateur et l'analyse linguistique, elle détecte les signaux d'alarme en millisecondes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[{ icon: 'pi-camera', label: 'Capturer' }, { icon: 'pi-search-plus', label: 'Analyser' }, { icon: 'pi-check-circle', label: 'Résoudre' }].map((s, i) => (
                <div key={i} className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 hover:border-secondary/40 transition-all text-center group/step">
                  <i className={`pi ${s.icon} text-2xl mb-3 block opacity-40 group-hover/step:opacity-100 transition-all`} />
                  <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-white/30 group-hover/step:text-white transition-colors">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 bg-secondary/5 border-l-4 border-secondary rounded-r-2xl">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-secondary/40 overflow-hidden bg-white/5 flex-none">
                  <Image src="/agent.png" alt="Assistant" width={40} height={40} className="object-cover scale-150" />
                </div>
                <p className="text-sm italic text-secondary/80 font-light leading-snug">
                  "Votre patient présente des signes de détresse émotionnelle. Je vous transmets une analyse sémantique complète et un plan d'action immédiat."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex-1 w-full relative h-[320px] md:h-[600px] lg:h-[700px] rounded-2xl md:rounded-[4rem] overflow-hidden border border-secondary/20 shadow-[0_20px_80px_rgba(0,0,0,0.4)] bg-white/[0.02] group">
            <div className="absolute inset-0 z-30 bg-gradient-to-tr from-black/90 via-transparent to-black/10" />
            <div className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105">
              <Image src="/agent.png" alt="CGPR IA Support" fill className="object-cover opacity-70" />
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/20 blur-[60px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent z-40 opacity-50 shadow-[0_0_20px_#ff7900]" />
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="absolute top-12 right-12 z-50 bg-black/60 backdrop-blur-3xl border border-secondary/30 p-6 rounded-3xl max-w-[280px]">
              <p className="text-[10px] font-mono text-secondary mb-2 animate-pulse font-black uppercase">Analyse Session Active</p>
              <div className="space-y-3">
                <div className="flex justify-between text-xs"><span className="text-white/40">Signal:</span><span className="text-white font-mono">98% STABLE</span></div>
                <div className="flex justify-between text-xs"><span className="text-white/40">Détresse:</span><span className="text-red-400 font-mono">SIGNAL_03</span></div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                  <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-secondary" />
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 z-50 bg-secondary/90 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(255,121,0,0.3)] flex items-center gap-4">
              <i className="pi pi-shield text-xl text-white" />
              <p className="text-xs font-black text-white uppercase tracking-widest">Protocole Activé</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
