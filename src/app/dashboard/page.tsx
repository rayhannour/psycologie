"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ChevronRight,
  Activity,
  Brain,
  Calendar,
  Lock,
  ShieldCheck,
  Video,
  Heart,
  MessageSquare,
  BookOpen,
  PhoneCall,
  User,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';

// ── Doctor stats ─────────────────────────────────────────────────────
const statsDoctor = [
  { label: "Total Patients", value: "48", icon: Users, color: "text-blue-400" },
  { label: "Sessions ce mois", value: "124", icon: Clock, color: "text-purple-400" },
  { label: "Nouveaux Patients", value: "+12%", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Alertes IA", value: "3", icon: AlertCircle, color: "text-amber-400" },
];

const recentActivity = [
  { patient: "Commandant Khaled Ben Amor", action: "DCI complété - Critique", time: "Il y a 10 min", type: "session" },
  { patient: "Lt. Yassine Chaouachi", action: "Séance Teams planifiée", time: "Il y a 1 heure", type: "event" },
  { patient: "Agent Béchir Mahmoud", action: "DCI enregistré - Normal", time: "Il y a 3 heures", type: "analysis" },
];

export default function DashboardPage() {
  const { role } = useAuth(); // Load role from auth context ('doctor' or 'agent')

  // ── RENDER PERSPECTIVE 1: AGENT PORTAL ──────────────────────────────
  if (role === 'agent') {
    return (
      <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative border-b border-white/5 pb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2"
            >
              <Lock className="w-3.5 h-3.5 animate-pulse" />
              Espace Personnel Sécurisé (AES-256)
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold display-font tracking-tight">
              Bonjour, <span className="text-primary">Khaled Ben Amor</span>
            </h1>
            <p className="text-secondary mt-1 text-sm md:text-base leading-relaxed">
              Votre espace d'accompagnement confidentiel. Vos réponses DCI sont cryptées et réservées exclusivement à votre clinicien.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/dashboard/dci'}
            className="px-6 py-4 bg-primary text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Remplir mon DCI
          </motion.button>
        </div>

        {/* Stats Grid for Agent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="!p-5 flex items-center gap-4 border-white/5 relative overflow-hidden group">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-secondary">Prochaine séance</span>
              <h4 className="text-base font-bold text-white mt-0.5">Aujourd'hui à 14:00</h4>
            </div>
          </GlassCard>

          <GlassCard className="!p-5 flex items-center gap-4 border-white/5 relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-secondary">Statut Médical</span>
              <h4 className="text-base font-bold text-white mt-0.5">DCI Chiffré & Transmis</h4>
            </div>
          </GlassCard>

          <GlassCard className="!p-5 flex items-center gap-4 border-white/5 relative overflow-hidden group">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-secondary">Thérapeute</span>
              <h4 className="text-base font-bold text-white mt-0.5">Dr. Rayhan</h4>
            </div>
          </GlassCard>
        </div>

        {/* Main Agent Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Care Pipeline */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="!p-6 space-y-6">
              <h3 className="text-lg font-extrabold display-font uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-4">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                Mon Parcours de Prise en Charge
              </h3>

              <div className="relative pl-6 border-l border-white/10 space-y-8 py-2">
                
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background flex items-center justify-center" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      1. Diagnostic initial DCI
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Complété</span>
                    </h4>
                    <p className="text-xs text-secondary mt-1">
                      Votre questionnaire d'admission clinique a été rempli et transmis en toute sécurité avec anonymisation RGPD.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background flex items-center justify-center" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      2. Triage et Analyse Prioritaire
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Calculé</span>
                    </h4>
                    <p className="text-xs text-secondary mt-1">
                      Les indicateurs de stress critique ont été identifiés par l'IA. Votre dossier a été placé en priorité élevée.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-primary border-4 border-background flex items-center justify-center animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      3. Consultation Teams programmée
                      <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded animate-pulse">Aujourd'hui</span>
                    </h4>
                    <p className="text-xs text-secondary mt-1">
                      Votre visioconférence individuelle sécurisée avec le <strong>Dr. Rayhan</strong> est fixée à <strong>14:00</strong>.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action shortcuts */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.href = '/dashboard/teams'}
                  className="flex-1 py-4 bg-[#5558EB] hover:bg-[#4649c9] text-white font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(85,88,235,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  Accéder à l'espace d'attente
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/calendar'}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Consulter mon agenda
                </button>
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Safety Toolkit */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="!p-6 space-y-4 border-white/5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-primary" />
                Coin Sécurité & Aide d'Urgence
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                Besoin d'un soutien immédiat ou de ressources d'auto-apaisement en dehors de vos consultations ?
              </p>

              <div className="space-y-3 pt-2">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Exercices de Sophrologie</h5>
                      <p className="text-[10px] text-secondary mt-0.5">Fiches techniques guidées</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-secondary" />
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Cellule d'écoute CGPR</h5>
                      <p className="text-[10px] text-secondary mt-0.5">Assistance téléphonique 24/7</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-secondary" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="bg-primary/5 border-primary/20 !p-6 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />
              
              <div className="flex items-center gap-2 relative z-10">
                <div className="p-1.5 rounded-lg bg-primary/20">
                  <Brain className="text-primary w-4.5 h-4.5 animate-pulse" />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-white">Aide Clinique</h4>
              </div>

              <p className="text-xs text-secondary leading-relaxed italic relative z-10">
                "Nous collaborons de manière cryptée pour vous réinsérer en toute confiance. L'administration ne reçoit aucun diagnostic médical brut."
              </p>
            </GlassCard>
          </div>

        </div>
      </div>
    );
  }

  // ── RENDER PERSPECTIVE 2: PRACTITIONER PORTAL ───────────────────────
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
          <p className="text-secondary mt-1 text-sm md:text-base">Analyse cognitive, triage DCI et séances de téléconsultations prêtes.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/dashboard/teams'}
          className="btn btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all w-full md:w-auto relative overflow-hidden group cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-sm">Nouveau Triage / Séance</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDoctor.map((stat, index) => (
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
              <button
                onClick={() => window.location.href = '/dashboard/patients'}
                className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
              >
                Gérer les Dossiers
              </button>
            </div>
            <div className="divide-y divide-white/5 flex-1">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  onClick={() => window.location.href = '/dashboard/patients'}
                  className="p-6 flex items-center justify-between hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
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
              onClick={() => window.location.href = '/dashboard/patients'}
              className="mt-auto btn btn-outline w-full justify-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all cursor-pointer"
            >
              Gérer les Rapports Cliniques
            </motion.button>
          </GlassCard>
        </div>
      </div>

    </div>
  );
}
