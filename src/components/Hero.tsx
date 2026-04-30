"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-grid">
      <div className="bg-mesh" />
      
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            Nouvelle Génération d'IA Clinique
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold display-font leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto">
            L'Intelligence au service de la <span className="text-primary italic">Psyché</span>.
          </h1>
          
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            CGPR Psy redéfinit l'accompagnement thérapeutique avec une IA capable de comprendre les nuances émotionnelles les plus subtiles.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-10 py-5 rounded-full bg-primary text-background font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_40px_rgba(210,187,255,0.3)]">
              Démarrer l'Expérience
            </button>
            <button className="px-10 py-5 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
              Découvrir la Technologie
            </button>
          </div>
        </motion.div>

        {/* Floating Mockup / Visual */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 relative w-full max-w-5xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <Image 
            src="/hero.png" 
            alt="CGPR Interface" 
            fill 
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        </motion.div>
      </div>
    </section>
  );
}
