"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// ── Section imports ──────────────────────────────────────────
import HeroSection from '@/components/sections/HeroSection';
import NeuralSection from '@/components/sections/NeuralSection';
import CycleSection from '@/components/sections/CycleSection';
import TelemetrySection from '@/components/sections/TelemetrySection';
import HardwareSection from '@/components/sections/HardwareSection';
import WorkflowSection from '@/components/sections/WorkflowSection';

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } } };

// ── Animated Split Divider ────────────────────────────────────
function SplitDivider({ label }: { label: string }) {
  return (
    <div className="w-full max-w-7xl mx-auto py-12 md:py-24 relative flex items-center justify-center overflow-hidden border-t border-white/5">
      <motion.div initial={{ left: '50%', width: '0%' }} whileInView={{ left: '0%', width: '45%' }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: '-100px' }}
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-primary" />
      <motion.div initial={{ right: '50%', width: '0%' }} whileInView={{ right: '0%', width: '45%' }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: '-100px' }}
        className="absolute h-[1px] bg-gradient-to-l from-transparent via-primary/40 to-primary" />
      <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} viewport={{ once: true, margin: '-100px' }}
        className="z-10 bg-black px-8">
        <span className="text-xs font-mono font-black text-primary tracking-[1em] uppercase drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">{label}</span>
      </motion.div>
    </div>
  );
}

// ── Video / Image Showcase ────────────────────────────────────
function ShowcaseSection() {
  return (
    <section className="w-full relative px-4 sm:px-8 md:px-12 py-16 -mt-10 md:-mt-20 z-40 flex justify-center">
      <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }} viewport={{ once: true, margin: '-100px' }}
        className="relative w-full max-w-6xl aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden border border-primary/20 bg-white/[0.02] shadow-[0_40px_100px_rgba(0,229,255,0.15)] group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,229,255,0.1)] z-10 pointer-events-none rounded-[3rem]" />
        <Image src="/hero.png" alt="Interface CGPR" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)] group-hover:scale-110 transition-transform">
            <i className="pi pi-play text-white text-3xl ml-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Ticker / Logo Bar ─────────────────────────────────────────
function TickerSection() {
  const partners = ['INSERM', 'CNRS', 'HAS France', 'CHU Paris', 'APHP', 'ANAP', 'FNS Clinique', 'INRIA Santé'];
  return (
    <section className="py-10 md:py-20 bg-white/[0.02] border-b border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      <div className="max-w-7xl mx-auto relative z-20">
        <p className="text-center text-[10px] font-mono tracking-[0.4em] text-primary uppercase mb-8 animate-pulse font-bold">Partenaires Institutionnels</p>
        <div className="flex overflow-hidden w-full select-none">
          <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex flex-none gap-24 items-center whitespace-nowrap px-12">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex items-center gap-6 group/logo">
                <div className="w-2 h-2 bg-primary rounded-full group-hover/logo:scale-150 transition-transform shadow-[0_0_10px_#00e5ff]" />
                <span className="text-3xl font-black tracking-tighter text-white opacity-30 group-hover/logo:opacity-100 group-hover/logo:text-primary transition-all duration-300">{p}</span>
                <span className="text-xs font-mono text-white/20 font-light">CORE.STREAM</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Cinematic Image Slider ────────────────────────────────────
function SliderSection() {
  const slides = [
    { img: '/agent.png', title: 'Intelligence Autonome', subtitle: 'Neural Orchestration' },
    { img: '/agent_.png', title: 'Analyse Clinique', subtitle: 'Cognitive Luminescence' },
    { img: '/hero.png', title: 'Interface CGPR', subtitle: 'Dynamic Flow' },
    { img: '/agent.png', title: 'Soutien Patient', subtitle: 'Human AI Stream' },
  ];
  return (
    <section className="w-full h-[280px] md:h-[500px] lg:h-[600px] bg-black relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-px bg-primary/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-primary/20" />
      <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="flex flex-none gap-20 items-center whitespace-nowrap px-12 h-full">
        {[...slides, ...slides].map((s, i) => (
          <div key={i} className="flex-none w-[260px] md:w-[500px] lg:w-[800px] h-[200px] md:h-[340px] lg:h-[450px] relative rounded-2xl md:rounded-[3rem] overflow-hidden group border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute bottom-4 md:bottom-12 left-4 md:left-12 z-20">
              <p className="text-primary font-mono text-[9px] md:text-xs uppercase tracking-[0.4em] mb-2">{s.subtitle}</p>
              <h3 className="text-lg md:text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">{s.title}</h3>
            </div>
            <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ── Live Dashboard Bars ───────────────────────────────────────
function DashboardSection() {
  const bars = [
    { label: 'Préfrontal Cortex', max: '80%', color: '#00e5ff' },
    { label: 'Amygdale Réponse', max: '45%', color: '#ff7900' },
    { label: 'Hippocampe Flux', max: '92%', color: '#ff4444' },
  ];
  return (
    <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-secondary/5 blur-[200px] rounded-[100%] pointer-events-none" />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-20 relative z-10">
        <motion.div variants={fadeUp} className="flex-1 w-full bg-white/[0.03] backdrop-blur-3xl p-6 md:p-16 rounded-2xl md:rounded-[3rem] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-white">Saturation Données</h3>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mt-2">Live Feed — Secteur Alpha</p>
            </div>
            <span className="text-primary bg-primary/10 p-3 rounded-full border border-primary/30"><i className="pi pi-spin pi-cog text-3xl" /></span>
          </div>
          <div className="flex flex-col gap-10">
            {bars.map((b, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex justify-between text-sm font-mono uppercase text-white/50 font-bold">
                  <span>{b.label}</span><span style={{ color: b.color }}>{b.max}</span>
                </div>
                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: b.max }} transition={{ duration: 2, ease: 'easeOut', delay: i * 0.3 }} viewport={{ once: true }}
                    className="h-full rounded-full" style={{ backgroundColor: b.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5 grid grid-cols-2 gap-8">
            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
              <p className="text-xs uppercase font-mono text-white/30 tracking-widest mb-2">Paquets Actifs</p>
              <p className="text-4xl font-black text-white">3.2B</p>
            </div>
            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
              <p className="text-xs uppercase font-mono text-white/30 tracking-widest mb-2">Charge Stress</p>
              <p className="text-4xl font-black text-primary">Nominal</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col gap-5 md:gap-8 w-full">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight">Télémétrie <br />Interactive</motion.h2>
          <motion.p variants={fadeUp} className="text-sm md:text-2xl text-white/40 font-light leading-relaxed">
            Ne regardez pas votre infrastructure, orchestrez-la. Le centre de commandement du CGPR transforme des millions d'interactions en alertes actionnables.
          </motion.p>
          <motion.ul variants={stagger} className="flex flex-col gap-3 md:gap-6 mt-6 text-sm md:text-lg text-white">
            {['Temps de réaction en millisecondes.', 'Graphes de topologie neuronale visuelle.', 'Guérison proactive de la bande passante.'].map((t, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-center gap-5 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <i className="pi pi-check-circle text-primary text-2xl" /> {t}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="mt-8">
            <Link href="/dashboard">
              <button className="border-b-2 border-primary text-primary hover:text-cyan-300 hover:border-cyan-300 transition-colors pb-2 w-fit font-mono text-base tracking-widest uppercase flex items-center gap-3 font-semibold">
                Accéder au Tableau de Bord <i className="pi pi-arrow-right text-sm" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-16 md:py-40 px-5 sm:px-8 lg:px-24">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
        className="max-w-7xl mx-auto bg-gradient-to-r from-white/[0.05] to-white/[0.02] border-2 border-primary/30 rounded-2xl md:rounded-[4rem] p-8 md:p-16 lg:p-24 text-center relative overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.1)]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#008ba340_0%,_transparent_50%)] opacity-30" />
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 relative z-10">Prêt à Initialiser ?</h2>
        <p className="text-sm md:text-2xl text-white/40 max-w-3xl mx-auto mb-12 relative z-10 font-light leading-relaxed">
          Rejoignez les organisations de niveau 1 qui modernisent leur accompagnement psychologique avec l'intelligence autonome du système.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 relative z-10">
          <Link href="/login">
            <button className="bg-primary text-black px-12 py-6 rounded-2xl font-bold transform transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:shadow-[0_0_80px_rgba(0,229,255,0.8)] hover:-translate-y-2 flex items-center justify-center gap-4 w-full sm:w-auto uppercase tracking-widest text-sm">
              Initialiser Contact <i className="pi pi-send" />
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-transparent border-2 border-white/20 hover:border-primary/60 text-white px-12 py-6 rounded-2xl font-bold transition-all hover:bg-white/5 w-full sm:w-auto uppercase tracking-widest text-sm hover:-translate-y-2">
              Voir les Licences
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase font-black">
        <div>© 2026 CGPR PSYC_CORE — <span className="text-primary">CGPR ENGINE</span></div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-primary transition-colors">Termes</a>
          <a href="#" className="hover:text-primary transition-colors">API_DOCS</a>
        </div>
        <div>STATUS: <span className="text-tertiary">STABLE</span></div>
      </div>
    </footer>
  );
}

// ── ROOT PAGE ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="flex flex-col text-white w-full overflow-hidden relative z-10 bg-black min-h-screen">
      <HeroSection />
      <ShowcaseSection />
      <TickerSection />
      <SliderSection />
      <SplitDivider label="CAPABILITIES" />
      <NeuralSection />
      <SplitDivider label="SOLUTIONS" />
      <WorkflowSection />
      <CycleSection />
      <SplitDivider label="TELEMETRY" />
      <TelemetrySection />
      <DashboardSection />
      <SplitDivider label="INFRASTRUCTURE" />
      <HardwareSection />
      <CTASection />
      <Footer />
    </div>
  );
}
