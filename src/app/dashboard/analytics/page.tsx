"use client";
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Brain, 
  Activity, 
  Zap, 
  PieChart, 
  BarChart3, 
  LineChart,
  ArrowUpRight,
  Target,
  Sparkles,
  Layers,
  Search,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const stats = [
  { label: "Précision IA", value: "98.4%", icon: Target, trend: "+0.2%", color: "text-primary" },
  { label: "Temps d'Analyse", value: "1.2s", icon: Zap, trend: "-15%", color: "text-amber-400" },
  { label: "Corrélations Trouvées", value: "1,240", icon: Layers, trend: "+84", color: "text-purple-400" },
  { label: "Taux de Réussite", value: "92%", icon: TrendingUp, trend: "+4%", color: "text-emerald-400" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <div className="hidden md:flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
            <Brain className="w-4 h-4 animate-pulse" />
            Analyse Sémantique Profonde
          </div>
          <h1 className="text-3xl md:text-4xl font-bold display-font tracking-tight">Analyses <span className="text-primary">Cognitives</span></h1>
          <p className="text-secondary mt-1 text-sm md:text-base hidden md:block">Visualisation des tendances neurologiques et sémantiques globales.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center justify-center gap-2 px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.2)] font-bold uppercase tracking-widest text-xs w-full md:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            Extraire Insights
          </motion.button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="group relative overflow-hidden border-white/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-2.5 rounded-lg bg-white/5 ${stat.color} border border-white/5`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 ${
                stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'
              }`}>{stat.trend}</span>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">{stat.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <LineChart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Évolution du Bien-être Global</h3>
                <p className="text-xs text-secondary">Données agrégées sur les 30 derniers jours</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-primary/40 border border-primary animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Live Sync</span>
            </div>
          </div>
          
          <div className="flex-1 w-full bg-white/[0.02] rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-around px-10 opacity-20 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-white/10" />
              ))}
            </div>
            {/* Mock Chart Visualization */}
            <svg className="w-full h-full px-4" viewBox="0 0 800 200">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,150 Q100,80 200,120 T400,100 T600,60 T800,80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Sparkles className="w-12 h-12 text-primary/20 mb-4 animate-float" />
              <p className="text-sm text-secondary/40 font-medium italic">Traitement des modèles cognitifs en cours...</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col border-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10">
              <PieChart className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Répartition Émotionnelle</h3>
          </div>

          <div className="space-y-6">
            {[
              { label: "Sérénité", value: 45, color: "bg-emerald-500" },
              { label: "Anxiété", value: 25, color: "bg-amber-500" },
              { label: "Stress", value: 15, color: "bg-red-500" },
              { label: "Optimisme", value: 15, color: "bg-primary" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}%</p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className={`h-full ${item.color} relative`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Note de l'IA</p>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Les niveaux de sérénité ont augmenté de 12% suite à l'introduction des nouveaux protocoles sémantiques.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Feature Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <GlassCard className="relative group overflow-hidden">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Corrélations Temporelles</h3>
              <p className="text-sm text-secondary leading-relaxed mb-6">
                Identifiez les pics d'anxiété en fonction des événements externes et du calendrier patient.
              </p>
              <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
                Explorer les données <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="relative group overflow-hidden">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Activity className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Predictive Health Score</h3>
              <p className="text-sm text-secondary leading-relaxed mb-6">
                Notre algorithme prédit les risques de rechute à 30 jours avec une fiabilité de 94%.
              </p>
              <button className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
                Activer le monitoring <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
