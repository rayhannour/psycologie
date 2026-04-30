"use client";
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ChevronRight,
  Activity,
  Brain
} from 'lucide-react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

const stats = [
  { label: "Total Patients", value: "48", icon: Users, color: "text-blue-400" },
  { label: "Sessions ce mois", value: "124", icon: Clock, color: "text-purple-400" },
  { label: "Nouveaux Patients", value: "+12%", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Alertes IA", value: "3", icon: AlertCircle, color: "text-amber-400" },
];

const recentActivity = [
  { patient: "Jean Dupont", action: "Session terminée", time: "Il y a 10 min", type: "session" },
  { patient: "Marie Curie", action: "Nouvelle analyse disponible", time: "Il y a 1 heure", type: "analysis" },
  { patient: "Alan Turing", action: "Rendez-vous déplacé", time: "Il y a 3 heures", type: "event" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2"
          >
            <Activity className="w-4 h-4 animate-pulse" />
            Statut du système : Optimal
          </motion.div>
          <h1 className="text-4xl font-bold display-font tracking-tight">Bonjour, <span className="text-primary">Dr. Rayhan</span></h1>
          <p className="text-secondary mt-1 text-sm md:text-base">Analyse cognitive et sémantique prête pour vos consultations.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all w-full md:w-auto relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Plus className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-sm">Nouvelle Session</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard
            key={index}
            className="group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color} border border-white/5`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-secondary font-bold mt-1">{stat.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard className="!p-0 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-bold display-font uppercase tracking-widest text-sm">Activité Récente</h3>
              </div>
              <button className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:border-primary/50 transition-colors">
                Voir tout
              </button>
            </div>
            <div className="divide-y divide-white/5 flex-1">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-6 flex items-center justify-between hover:bg-white/[0.03] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                      <span className="text-primary font-bold relative z-10">{activity.patient[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold group-hover:text-primary transition-colors">{activity.patient}</p>
                      <p className="text-xs text-secondary mt-0.5">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/50 mb-1">Horodatage</p>
                      <p className="text-xs text-secondary">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* AI Insight Card */}
        <div className="hidden lg:block">
          <GlassCard className="bg-primary/5 border-primary/20 flex flex-col group relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-700" />

          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="p-2 rounded-lg bg-primary/20">
              <Brain className="text-primary w-5 h-5 animate-pulse" />
            </div>
            <h3 className="font-bold display-font uppercase tracking-widest text-sm">Neural Insights</h3>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl group-hover:border-primary/30 transition-colors">
            <Image
              src="/agent_.png"
              alt="Neural Visualization"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Live Analysis</p>
              </div>
              <p className="text-lg font-bold display-font leading-tight">Progression thérapeutique positive détectée</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 relative z-10">
            <div className="flex justify-between items-end mb-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-secondary">Indice de Bien-être</p>
              <p className="text-primary font-bold">+14%</p>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "74%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary-container relative"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </motion.div>
            </div>
            <p className="text-sm text-secondary leading-relaxed italic">
              "L'analyse sémantique indique une corrélation directe entre les dernières sessions et la réduction de l'anxiété."
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-auto btn btn-outline w-full justify-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
          >
            Générer le rapport complet
          </motion.button>
        </GlassCard>
      </div>
      </div>
    </div>
  );
}
