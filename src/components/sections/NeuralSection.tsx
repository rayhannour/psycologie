"use client";
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.15 } } };
const fadeUp: Variants = { hidden:{opacity:0,y:60}, show:{opacity:1,y:0,transition:{type:'spring',stiffness:50,damping:20}} };

export default function NeuralArchitectureSection() {
  return (
    <section className="pb-24 md:pb-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:"-80px"}} variants={stagger}
          className="text-center mb-20">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">Architecture Neuronale</motion.h2>
          <motion.p variants={fadeUp} className="text-primary/60 font-mono text-sm tracking-[0.3em] uppercase">Sous-systèmes Interactifs</motion.p>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32">
          {/* Left column */}
          <div className="flex flex-col gap-8 w-full lg:w-[350px] z-20">
            {[
              { icon:'pi-eye', title:'Vision Clinique', desc:'Analyse en temps réel des expressions faciales et du comportement non-verbal.' },
              { icon:'pi-comments', title:'Langage Naturel', desc:'Compréhension sémantique avancée du discours thérapeutique en français.' }
            ].map((c,i)=>(
              <motion.div key={i} variants={fadeUp} whileInView="show" initial="hidden" viewport={{once:true}}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-primary/20 p-8 rounded-3xl hover:border-primary transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <div className="hidden lg:block absolute top-1/2 -right-32 w-32 h-[2px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 shadow-[0_0_20px_#00e5ff] z-[-1]" />
                <i className={`pi ${c.icon} text-3xl text-primary mb-4 block drop-shadow-[0_0_10px_#00e5ff]`} />
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{c.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Central core */}
          <motion.div initial={{scale:0.8,opacity:0}} whileInView={{scale:1,opacity:1}} transition={{duration:1}} viewport={{once:true}}
            className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 z-10 flex items-center justify-center my-8 lg:my-0">
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute inset-[-20px] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
            <div className="absolute inset-4 border-2 border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 bg-black rounded-full border-4 border-primary/40 shadow-[0_0_60px_rgba(0,229,255,0.3)] flex items-center justify-center overflow-hidden group hover:border-primary hover:shadow-[0_0_100px_rgba(0,229,255,0.6)] transition-all duration-700 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute w-20 h-20 bg-primary rounded-full blur-[20px] animate-pulse opacity-80" />
              <Image src="/agent.png" alt="CGPR Core" fill sizes="(max-width: 768px) 160px, 192px" className="object-cover opacity-90 mix-blend-screen scale-[1.3] group-hover:scale-[1.4] transition-transform duration-700" />
              <motion.div animate={{ top:['-20%','120%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_15px_#00e5ff] opacity-60 z-20" />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-8 w-full lg:w-[350px] z-20">
            {[
              { icon:'pi-bolt', title:'Traitement Logique', desc:'Moteur de décision autonome avec modélisation prédictive des états émotionnels.' },
              { icon:'pi-globe', title:'Données Temps Réel', desc:'Synchronisation en direct avec les protocoles cliniques standardisés HAS.' }
            ].map((c,i)=>(
              <motion.div key={i} variants={fadeUp} whileInView="show" initial="hidden" viewport={{once:true}}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-primary/20 p-8 rounded-3xl hover:border-primary transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <div className="hidden lg:block absolute top-1/2 -left-32 w-32 h-[2px] bg-gradient-to-l from-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 shadow-[0_0_20px_#00e5ff] z-[-1]" />
                <i className={`pi ${c.icon} text-3xl text-primary mb-4 block drop-shadow-[0_0_10px_#00e5ff]`} />
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{c.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
