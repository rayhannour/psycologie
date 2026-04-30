"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Activity, Cpu } from 'lucide-react';

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
};

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden xl:block absolute top-[220px] left-[280px] right-[280px] h-[1px] pointer-events-none"
        >
          <motion.div
            animate={{ left: ['0%', '50%', '100%', '50%', '0%'], y: [0, -80, 0, 80, 0], opacity: [0.8, 0.1, 0.8, 0.1, 0.8] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#00e5ff]"
          />
        </motion.div>
        <Image src="/agent_.png" alt="CGPR PSY" fill className="object-cover opacity-50 mix-blend-screen scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      </div>

      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full pointer-events-none z-20"
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="show"
        className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full mt-16">

        {/* HUD LEFT — BRAIN SYNC */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, borderColor: ['rgba(0,229,255,0.1)', 'rgba(0,229,255,0.4)', 'rgba(0,229,255,0.1)'] }}
          transition={{ opacity: { delay: 1.5, duration: 1 }, x: { delay: 1.5, duration: 1 }, borderColor: { duration: 6, repeat: Infinity } }}
          onMouseMove={(e) => { const t = e.currentTarget, r = t.getBoundingClientRect(); t.style.setProperty('--mx', `${e.clientX - r.left}px`); t.style.setProperty('--my', `${e.clientY - r.top}px`); }}
          className="hidden lg:flex absolute top-10 left-10 flex-col p-5 bg-white/[0.03] backdrop-blur-2xl border-2 border-primary/20 rounded-2xl w-64 shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden"
        >
          <div className="absolute -inset-[1.5px] rounded-2xl z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(120px circle at var(--mx) var(--my), #00e5ff, transparent 40%)' }} />
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Activity className="text-primary w-3 h-3" />
              <span className="text-[10px] font-mono font-black text-primary tracking-widest uppercase">BRAIN_SYNC</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00e5ff]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-black tracking-tighter text-white">98.4</span>
            <span className="text-sm font-bold text-primary">%</span>
          </div>
          <div className="text-[9px] font-mono text-white/40 uppercase mb-4 tracking-wider">Neural Coherence Level</div>
          <div className="flex items-end justify-between gap-[2px] h-10 border-b border-white/10 pb-1 mb-3">
            {[40, 70, 45, 90, 60, 85, 30, 65, 50, 80, 55, 75].map((h, i) => (
              <motion.div key={i}
                animate={{ height: [`${h}%`, `${Math.max(20, h + (Math.random() * 40 - 20))}%`, `${h}%`] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                className="w-full bg-primary/50 rounded-t-[1px] group-hover:bg-primary transition-colors"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[{ l: 'EMPATHIE', v: '99%' }, { l: 'COHÉRENCE', v: '96%' }].map((m, i) => (
              <div key={i} className="flex justify-between text-[8px] font-mono">
                <span className="text-white/50">{m.l}</span>
                <span className="text-primary">{m.v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* HUD RIGHT — CONN_DATA */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, borderColor: ['rgba(0,255,170,0.1)', 'rgba(0,255,170,0.4)', 'rgba(0,255,170,0.1)'] }}
          transition={{ opacity: { delay: 1.7, duration: 1 }, x: { delay: 1.7, duration: 1 }, borderColor: { duration: 6, repeat: Infinity } }}
          onMouseMove={(e) => { const t = e.currentTarget, r = t.getBoundingClientRect(); t.style.setProperty('--mx', `${e.clientX - r.left}px`); t.style.setProperty('--my', `${e.clientY - r.top}px`); }}
          className="hidden lg:flex absolute top-10 right-10 flex-col p-5 bg-white/[0.03] backdrop-blur-2xl border-2 border-tertiary/20 rounded-2xl w-64 shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden"
        >
          <div className="absolute -inset-[1.5px] rounded-2xl z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(120px circle at var(--mx) var(--my), #00ffaa, transparent 40%)' }} />
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="text-tertiary w-3 h-3" />
              <span className="text-[10px] font-mono font-black text-tertiary tracking-widest uppercase">CORE_DATA</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#00ffaa]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-black tracking-tighter text-white">0.02</span>
            <span className="text-sm font-bold text-tertiary">ms</span>
          </div>
          <div className="text-[9px] font-mono text-white/40 uppercase mb-4 tracking-wider">Inference Latency</div>
          <div className="relative flex items-center justify-between h-10 border-b border-white/10 mb-3">
            <div className="absolute w-full h-[1px] bg-white/5 top-1/2" />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <motion.div key={i} animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1.5 h-1.5 rounded-full bg-tertiary/80 shadow-[0_0_8px_rgba(0,255,170,0.5)] relative z-10"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[8px] font-mono">
              <span className="text-white/50">SÉCURITÉ</span><span className="text-tertiary">AES-512</span>
            </div>
            <div className="flex justify-between text-[8px] font-mono">
              <span className="text-white/50">UPTIME</span><span className="text-tertiary animate-pulse">99.9%</span>
            </div>
          </div>
        </motion.div>

        {/* Core Icon */}
        <motion.div variants={fadeUp}
          className="w-16 h-16 md:w-24 md:h-24 border-t-[3px] border-r-[3px] border-primary rounded-tr-[2rem] flex items-center justify-center relative mb-6">
          <motion.div animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute w-4 h-4 bg-primary blur-[3px] rounded-full" />
        </motion.div>

        <motion.span variants={fadeUp}
          className="px-6 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-mono tracking-[0.3em] uppercase mb-6 backdrop-blur-xl shadow-[0_0_20px_rgba(0,229,255,0.1)]">
          CGPR Psycologie Engine v4.0
        </motion.span>

        {/* TITLE — letter by letter */}
        <motion.h1 variants={fadeUp}
          className="text-[3.5rem] sm:text-[5rem] lg:text-[8rem] leading-[0.85] tracking-tighter font-black uppercase flex flex-col items-center mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative group flex items-center justify-center">
            <motion.div
              initial={{ left: '-20%', opacity: 0 }} animate={{ left: ['-20%', '120%'], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[80px] z-20 pointer-events-none"
            />
            <div className="flex items-end gap-1">
              {['C', 'G', 'P', 'R', ' ', 'P', 'S', 'Y'].map((c, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, filter: 'brightness(0)' }}
                  animate={{ opacity: 1, filter: ['brightness(12)', 'brightness(1)'] }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                  className={`font-black tracking-tighter select-none leading-none block
                    ${i === 0 ? 'text-[60px] sm:text-[130px] -mb-1' : 'text-[45px] sm:text-[95px]'}
                    ${c === ' ' ? 'w-4 sm:w-8' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'}`}>
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.h1>

        {/* Description */}
        <div className="relative mt-4 max-w-4xl mx-auto">
          <motion.p className="relative z-10 text-lg sm:text-xl md:text-[1.8rem] text-white font-black leading-[1.1] flex flex-wrap gap-x-[0.2em] justify-center text-center px-4 tracking-tight">
            {['Le', 'CGPR', 'fusionne', 'l\'analyse', 'clinique', 'profonde', 'avec', 'une', 'IA', 'autonome', 'dédiée', 'aux', 'agents', 'officiers.'].map((w, wi) => (
              <span key={wi} className="relative flex whitespace-nowrap">
                {w.split('').map((c, ci) => (
                  <motion.span key={ci}
                    initial={{ opacity: 0, filter: 'brightness(0)' }}
                    animate={{ opacity: 1, filter: ['brightness(12)', 'brightness(1)'] }}
                    transition={{ duration: 1.2, delay: 2.5 + (wi * 0.08) + (ci * 0.015) }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                    {c}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 3.5 } } }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-12 w-full max-w-3xl justify-center px-4 z-50">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } } }} className="flex-1">
            <Link href="/login" className="w-full">
              <button
                onMouseMove={(e) => { const t = e.currentTarget, r = t.getBoundingClientRect(); t.style.setProperty('--mx', `${e.clientX - r.left}px`); t.style.setProperty('--my', `${e.clientY - r.top}px`); }}
                className="relative overflow-hidden bg-primary hover:bg-cyan-300 text-black px-8 py-5 rounded-2xl font-black transform transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.7)] hover:-translate-y-1 flex items-center justify-center gap-4 w-full text-sm tracking-[0.2em] uppercase group">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(120px circle at var(--mx) var(--my), rgba(255,255,255,0.6), transparent 70%)' }} />
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:left-[200%] transition-all duration-1000" />
                <span className="relative z-10">INITIALISER CGPR</span>
              </button>
            </Link>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } } }} className="flex-1">
            <button
              onMouseMove={(e) => { const t = e.currentTarget, r = t.getBoundingClientRect(); t.style.setProperty('--mx', `${e.clientX - r.left}px`); t.style.setProperty('--my', `${e.clientY - r.top}px`); }}
              className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-primary/30 hover:border-primary text-white px-8 py-5 rounded-2xl font-bold transition-all hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center gap-4 w-full text-sm tracking-widest uppercase group">
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'radial-gradient(120px circle at var(--mx) var(--my), rgba(0,229,255,0.3), transparent 70%)' }} />
              <span className="relative z-10 text-white/70 group-hover:text-white transition-colors">SPÉCIFICATIONS</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="mt-20 flex flex-col items-center text-primary font-mono text-xs uppercase tracking-widest gap-3 opacity-60">
          Diagnostic Système
          <div className="w-px h-8 bg-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
