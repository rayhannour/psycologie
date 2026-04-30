"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  Activity, 
  Calendar,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const patients = [
  { 
    id: "1", 
    name: "Jean Dupont", 
    status: "Stable", 
    lastSession: "24/04/2024", 
    sessionsCount: 12, 
    risk: "Low", 
    stability: 85,
    trend: "improving"
  },
  { 
    id: "2", 
    name: "Marie Curie", 
    status: "Observation", 
    lastSession: "22/04/2024", 
    sessionsCount: 8, 
    risk: "Medium", 
    stability: 62,
    trend: "stable"
  },
  { 
    id: "3", 
    name: "Alan Turing", 
    status: "Stable", 
    lastSession: "20/04/2024", 
    sessionsCount: 15, 
    risk: "Low", 
    stability: 92,
    trend: "improving"
  },
  { 
    id: "4", 
    name: "Ada Lovelace", 
    status: "Critique", 
    lastSession: "19/04/2024", 
    sessionsCount: 24, 
    risk: "High", 
    stability: 35,
    trend: "declining"
  },
  { 
    id: "5", 
    name: "Sigmund Freud", 
    status: "Observation", 
    lastSession: "18/04/2024", 
    sessionsCount: 6, 
    risk: "Medium", 
    stability: 58,
    trend: "stable"
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold display-font tracking-tight">Base <span className="text-primary">Patients</span></h1>
          <p className="text-secondary mt-1 text-sm md:text-base">Gestion centralisée et suivi cognitif de vos patients.</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline flex items-center gap-2 px-5 py-3 rounded-xl border-white/10 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <Filter className="w-4 h-4" />
            Filtrer
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.2)] font-bold uppercase tracking-widest text-sm"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-secondary group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Rechercher un patient par nom, identifiant ou statut..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm"
        />
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPatients.map((patient, index) => (
            <GlassCard 
              key={patient.id}
              className="group relative flex flex-col p-0 overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-50" />
                      <span className="text-xl font-bold text-primary relative z-10">{patient.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{patient.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${
                          patient.risk === 'High' ? 'bg-red-500 animate-pulse' : 
                          patient.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/80">Risque : {patient.risk}</p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="p-2 rounded-lg bg-white/5 text-secondary hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Indice de Stabilité</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      patient.stability > 70 ? 'text-emerald-400' : 
                      patient.stability > 40 ? 'text-amber-400' : 'text-red-400'
                    }`}>{patient.stability}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${patient.stability}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full relative ${
                        patient.stability > 70 ? 'bg-emerald-500' : 
                        patient.stability > 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-secondary" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/60">Dernière</p>
                    </div>
                    <p className="text-xs font-medium">{patient.lastSession}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-3 h-3 text-secondary" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/60">Sessions</p>
                    </div>
                    <p className="text-xs font-medium">{patient.sessionsCount} sessions</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-white/5 p-4 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${
                    patient.trend === 'improving' ? 'text-emerald-400' : 
                    patient.trend === 'declining' ? 'text-red-400' : 'text-secondary'
                  }`} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Tendance : {patient.trend}</span>
                </div>
                <button className="text-[10px] uppercase font-bold tracking-widest text-primary hover:underline">
                  Profil complet
                </button>
              </div>
            </GlassCard>
          ))}
        </AnimatePresence>
      </div>

      {filteredPatients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
            <AlertCircle className="w-10 h-10 text-secondary opacity-20" />
          </div>
          <h3 className="text-xl font-bold display-font">Aucun patient trouvé</h3>
          <p className="text-secondary mt-2 max-w-xs">
            Essayez de modifier vos critères de recherche ou ajoutez un nouveau patient.
          </p>
        </div>
      )}
    </div>
  );
}
