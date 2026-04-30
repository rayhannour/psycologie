"use client";
import { motion } from 'framer-motion';
import { Brain, Shield, Sparkles, Zap, Globe, Layers } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const bentoItems = [
  {
    title: "Analyse Sémantique Profonde",
    description: "Comprenez les non-dits grâce à une analyse textuelle et vocale de pointe.",
    icon: Brain,
    className: "md:col-span-2 md:row-span-2 bg-primary-container/10 border-primary/20",
    image: "/agent_.png"
  },
  {
    title: "Confidentialité Absolue",
    description: "Cryptage post-quantique pour toutes les données patients.",
    icon: Shield,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Interface Intuitive",
    description: "Un design épuré pour une concentration maximale.",
    icon: Layers,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Collaboration Temps Réel",
    description: "Partagez des insights avec votre équipe instantanément.",
    icon: Globe,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "IA Générative Assistée",
    description: "Rédaction automatique de comptes-rendus cliniques.",
    icon: Zap,
    className: "md:col-span-2 md:row-span-1 bg-surface-bright",
  }
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeader
          title="Une Technologie"
          highlight="Supérieure"
          subtitle="CGPR Psy intègre les dernières avancées en neurosciences computationnelles."
          centered={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] border border-white/5 p-8 flex flex-col justify-between group ${item.className || 'bg-surface'}`}
            >
              {item.image && (
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
              )}

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 display-font leading-tight">{item.title}</h3>
                <p className="text-secondary text-sm leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
