"use client";
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } } };

const steps = [
  { step: '01', title: 'Dialogue Initial', desc: 'Parlez directement à l\'assistant. Il comprend vos besoins cliniques via reconnaissance vocale neuronale.', img: '/hero.png', color: 'border-primary/20 hover:border-primary' },
  { step: '02', title: 'Analyse Sémantique', desc: 'Le système extrait les patterns émotionnels et cognitifs de la session en moins d\'une seconde.', img: '/agent_.png', color: 'border-secondary/20 hover:border-secondary' },
  { step: '03', title: 'Rapport Clinique IA', desc: 'Génération automatique d\'un compte-rendu structuré selon les normes DSM-5.', img: '/agent.png', color: 'border-primary/20 hover:border-primary' },
  { step: '04', title: 'Suivi Longitudinal', desc: 'Le système compare les sessions pour détecter les évolutions subtiles du comportement patient.', img: '/agent.png', color: 'border-secondary/20 hover:border-secondary' },
  { step: '05', title: 'Validation Praticien', desc: 'Validez, annotez et signez numériquement les rapports IA en un clic sécurisé.', img: '/agent.png', color: 'border-primary/20 hover:border-primary' },
  { step: '06', title: 'Archive Sécurisée', desc: 'Tous les dossiers sont chiffrés AES-512 et conformes aux exigences HDS françaises.', img: '/hero.png', color: 'border-tertiary/20 hover:border-tertiary' },
];

export default function CycleSection() {
  return (
    <section className="py-12 md:py-24 bg-black/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
        className="relative z-10 w-full">
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-16 max-w-7xl mx-auto px-5">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.5em] mb-4 inline-block font-bold">Zéro Lenteur · Zéro Papier</span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Cycle Clinique <span className="text-primary italic">CGPR</span></h2>
          <p className="text-sm md:text-xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
            Dites adieu aux dossiers papier. Le système automatise votre flux clinique en temps réel, du premier mot à l'archivage final.
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden pb-12"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div animate={{ x: [0, -2200] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex flex-none gap-10 items-stretch cursor-grab active:cursor-grabbing">
            {[...steps, ...steps].map((item, i) => (
              <div key={i} className={`flex-none w-[280px] md:w-[400px] bg-white/[0.03] p-6 md:p-8 rounded-[2.5rem] border transition-all duration-500 group flex flex-col gap-6 relative overflow-hidden ${item.color}`}>
                <div className="absolute top-0 right-0 p-6 text-6xl font-black opacity-5 text-white pointer-events-none group-hover:opacity-10 transition-opacity">{item.step}</div>
                <div className="w-full h-40 md:h-48 rounded-2xl overflow-hidden relative border border-white/5">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-auto pt-4 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-white/20">
                  <span>Temps réel</span>
                  <span className="flex items-center gap-2">Processus IA <i className="pi pi-bolt text-primary animate-pulse" /></span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
