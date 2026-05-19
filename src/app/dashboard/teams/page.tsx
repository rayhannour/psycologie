"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Activity,
  Calendar,
  Video,
  Clock,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Award,
  FileText,
  ChevronRight,
  Check,
  Send,
  Sparkles,
  Brain,
  Plus,
  Info,
  RefreshCw,
  PhoneCall,
  User,
  Heart,
  Briefcase,
  Layers,
  Link,
  MessageSquare,
  Lock,
  ArrowRight,
  ShieldCheck,
  VideoOff,
  Sliders,
  TrendingDown,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// ── Types for Clinical Triage Workspace ─────────────────────────────
interface Patient {
  id: string;
  name: string;
  matricule: string;
  role: string;
  age: number;
  dciCompleted: boolean;
  dciScore?: number; // Score out of 20
  priority?: 'critical' | 'high' | 'moderate' | 'normal';
  dciData?: {
    suicidalIdeation: 'none' | 'low' | 'moderate' | 'high';
    aggressionRisk: 'none' | 'low' | 'moderate' | 'high';
    traumaStressLevel: number; // 1 to 10
    anxietySeverity: 'none' | 'mild' | 'moderate' | 'severe';
    sleepDisorder: boolean;
    substanceAbuse: boolean;
    observations: string;
  };
  appointmentSlot?: string;
  appointedDoctor?: string;
  teamsLink?: string;
  teamsGenerated?: boolean;
}

// ── Scoring Algorithm (NHS / CSC Triage Standard) ────────────────────
const calculateDciScore = (data: Patient['dciData']) => {
  if (!data) return 0;
  let score = 0;
  
  // Suicidal Ideation: none=0, low=3, moderate=6, high=8
  if (data.suicidalIdeation === 'low') score += 3;
  else if (data.suicidalIdeation === 'moderate') score += 6;
  else if (data.suicidalIdeation === 'high') score += 8;

  // Aggression/Violence Risk: none=0, low=2, moderate=4, high=6
  if (data.aggressionRisk === 'low') score += 2;
  else if (data.aggressionRisk === 'moderate') score += 4;
  else if (data.aggressionRisk === 'high') score += 6;

  // Trauma Stress Level: 1-10 mapped to max 5 pts
  score += Math.round(data.traumaStressLevel / 2);

  // Anxiety Severity: none=0, mild=1, moderate=2, severe=3
  if (data.anxietySeverity === 'mild') score += 1;
  else if (data.anxietySeverity === 'moderate') score += 2;
  else if (data.anxietySeverity === 'severe') score += 3;

  // Sleep Disorder: 1 point
  if (data.sleepDisorder) score += 1;

  // Substance Abuse: 1 point
  if (data.substanceAbuse) score += 1;

  return Math.min(20, score);
};

const getPriorityFromScore = (score: number): Patient['priority'] => {
  if (score >= 15) return 'critical';
  if (score >= 10) return 'high';
  if (score >= 5) return 'moderate';
  return 'normal';
};

// ── Initial Seed Data ────────────────────────────────────────────────
const initialPatients: Patient[] = [
  {
    id: "pat-1",
    name: "Commandant Khaled Ben Amor",
    matricule: "AGT-0814",
    role: "Officier de Sécurité - Mornaguia",
    age: 42,
    dciCompleted: true,
    dciScore: 18,
    priority: 'critical',
    dciData: {
      suicidalIdeation: 'moderate',
      aggressionRisk: 'high',
      traumaStressLevel: 9,
      anxietySeverity: 'severe',
      sleepDisorder: true,
      substanceAbuse: false,
      observations: "Symptomatologie de stress post-traumatique aiguë suite à un incident critique en service à la prison de Mornaguia. Hyper-vigilance sévère, insomnies répétées et flashbacks traumatiques récurrents."
    }
  },
  {
    id: "pat-2",
    name: "Lt. Yassine Chaouachi",
    matricule: "AGT-1102",
    role: "Escorte et Transfert",
    age: 35,
    dciCompleted: true,
    dciScore: 13,
    priority: 'high',
    dciData: {
      suicidalIdeation: 'none',
      aggressionRisk: 'moderate',
      traumaStressLevel: 7,
      anxietySeverity: 'severe',
      sleepDisorder: true,
      substanceAbuse: false,
      observations: "Anxiété généralisée chronique accompagnée de troubles sévères du sommeil. Sentiment d'épuisement professionnel intense (Burnout clinique)."
    }
  },
  {
    id: "pat-3",
    name: "Lt. Manel Jebali",
    matricule: "AGT-0015",
    role: "Surveillante Adjointe - Etab. Mineurs",
    age: 29,
    dciCompleted: true,
    dciScore: 8,
    priority: 'moderate',
    dciData: {
      suicidalIdeation: 'none',
      aggressionRisk: 'none',
      traumaStressLevel: 5,
      anxietySeverity: 'moderate',
      sleepDisorder: false,
      substanceAbuse: false,
      observations: "Difficultés d'adaptation situationnelle suite à sa récente mutation. Phobie sociale modérée."
    }
  },
  {
    id: "pat-4",
    name: "Capitaine Sami Cherif",
    matricule: "AGT-0016",
    role: "Chef de Poste - Sfax",
    age: 48,
    dciCompleted: false,
    dciScore: undefined,
    priority: undefined,
  },
  {
    id: "pat-5",
    name: "Agent Imed Oueslati",
    matricule: "AGT-0014",
    role: "Gardien Principal",
    age: 38,
    dciCompleted: false,
    dciScore: undefined,
    priority: undefined,
  }
];

export default function TeamsTriagePage() {
  const { role } = useAuth();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("pat-1");

  // Modal / Form States for DCI
  const [isDciModalOpen, setIsDciModalOpen] = useState(false);
  const [triagePatientId, setTriagePatientId] = useState<string | null>(null);
  const [dciForm, setDciForm] = useState<{
    suicidalIdeation: 'none' | 'low' | 'moderate' | 'high';
    aggressionRisk: 'none' | 'low' | 'moderate' | 'high';
    traumaStressLevel: number;
    anxietySeverity: 'none' | 'mild' | 'moderate' | 'severe';
    sleepDisorder: boolean;
    substanceAbuse: boolean;
    observations: string;
  }>({
    suicidalIdeation: 'none',
    aggressionRisk: 'none',
    traumaStressLevel: 3,
    anxietySeverity: 'none',
    sleepDisorder: false,
    substanceAbuse: false,
    observations: ''
  });

  // Scheduling states
  const [bookingDate, setBookingDate] = useState("2026-05-20");
  const [bookingTime, setBookingTime] = useState("09:00");
  const [appointedDoctor, setAppointedDoctor] = useState("Dr. Rayhan (Clinicien Principal)");

  // Teams & AI Simulation active states
  const [isTeamsLaunching, setIsTeamsLaunching] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<{ sender: 'patient' | 'system' | 'doctor'; text: string; time: string }[]>([
    { sender: 'system', text: "Connexion sécurisée établie via le Bridge MS Teams.", time: "09:00" },
  ]);
  const [sessionNotes, setSessionNotes] = useState("");
  const [isReportSaved, setIsReportSaved] = useState(false);

  // Active dialogue index for real-time therapy simulation
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // ── Sorting Queue Logic (Urgent to Normal) ──────────────────────────
  const sortedPatients = [...patients].sort((a, b) => {
    // Non completed go at the bottom
    if (a.dciCompleted && !b.dciCompleted) return -1;
    if (!a.dciCompleted && b.dciCompleted) return 1;
    if (!a.dciCompleted && !b.dciCompleted) return 0;
    
    const priorityWeight = {
      critical: 4,
      high: 3,
      moderate: 2,
      normal: 1
    };
    
    const aWeight = priorityWeight[a.priority || 'normal'];
    const bWeight = priorityWeight[b.priority || 'normal'];
    
    if (aWeight !== bWeight) {
      return bWeight - aWeight; // higher weight (critical) comes first
    }
    
    return (b.dciScore || 0) - (a.dciScore || 0); // then sort by score
  });

  // Open DCI evaluation form
  const handleOpenDci = (patId: string) => {
    const pat = patients.find(p => p.id === patId);
    if (!pat) return;
    setTriagePatientId(patId);
    if (pat.dciCompleted && pat.dciData) {
      setDciForm({ ...pat.dciData });
    } else {
      setDciForm({
        suicidalIdeation: 'none',
        aggressionRisk: 'none',
        traumaStressLevel: 3,
        anxietySeverity: 'none',
        sleepDisorder: false,
        substanceAbuse: false,
        observations: ''
      });
    }
    setIsDciModalOpen(true);
  };

  // Submit DCI form
  const handleSaveDci = () => {
    if (!triagePatientId) return;
    
    const score = calculateDciScore(dciForm);
    const priority = getPriorityFromScore(score);

    setPatients(prev => prev.map(p => {
      if (p.id === triagePatientId) {
        return {
          ...p,
          dciCompleted: true,
          dciScore: score,
          priority: priority,
          dciData: { ...dciForm } as any
        };
      }
      return p;
    }));

    setIsDciModalOpen(false);
    setTriagePatientId(null);
  };

  // Handle slot reservation
  const handleScheduleAppt = () => {
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatientId) {
        return {
          ...p,
          appointmentSlot: `${bookingDate} à ${bookingTime}`,
          appointedDoctor: appointedDoctor
        };
      }
      return p;
    }));
    setActiveStep(3); // Jump to Step 3 (Teams Launch)
  };

  // Dynamic Secure deep link generation
  const handleGenerateTeams = () => {
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatientId) {
        const token = Math.random().toString(36).substring(2, 10).toUpperCase();
        return {
          ...p,
          teamsGenerated: true,
          teamsLink: `msteams://teams.microsoft.com/l/meetup-join/19:psych-session-${p.id}@thread.v2/0?context={"Tid":"cgpr-secure-tenant","Oid":"therapist-${token}"}`
        };
      }
      return p;
    }));
  };

  // Simulation of Live Teams deep bridge session
  const simulatedDialogues = [
    { sender: 'patient' as const, text: "Je ressens une tension nerveuse insoutenable au quotidien... Au travail, le moindre bruit me fait sursauter.", time: "09:02" },
    { sender: 'system' as const, text: "🤖 IA Co-Pilote : [Alerte Sémantique] Détection de détresse psychologique et hyper-vigilance active.", time: "09:03" },
    { sender: 'doctor' as const, text: "Prenez une grande inspiration. Pouvez-vous me raconter l'incident le plus marquant qui s'est produit récemment ?", time: "09:04" },
    { sender: 'patient' as const, text: "C'était lors de la mutinerie du bloc C le mois dernier. J'ai été encerclé par 3 détenus... J'ai cru que je n'allais pas rentrer chez moi.", time: "09:05" },
    { sender: 'system' as const, text: "🤖 IA Co-Pilote : [Indice Clinique] Trouble de Stress Post-Traumatique (TSPT) post-mutinerie suspecté.", time: "09:06" },
    { sender: 'doctor' as const, text: "C'est une épreuve extrêmement difficile. Nous allons travailler ensemble sur la désensibilisation systématique.", time: "09:08" },
    { sender: 'patient' as const, text: "Merci Docteur. Le simple fait d'en parler dans cet espace sécurisé Teams me soulage déjà un peu.", time: "09:10" }
  ];

  const handleLaunchTeams = () => {
    setIsTeamsLaunching(true);
    setTimeout(() => {
      setIsTeamsLaunching(false);
      setIsSessionStarted(true);
      setDialogueIndex(0);
      setLiveTranscript([{ sender: 'system', text: "Connexion sécurisée établie avec le Bridge MS Teams.", time: "09:00" }]);
    }, 1500);
  };

  useEffect(() => {
    if (isSessionStarted && dialogueIndex < simulatedDialogues.length) {
      const nextDialogue = simulatedDialogues[dialogueIndex];
      const timer = setTimeout(() => {
        setLiveTranscript(prev => [...prev, nextDialogue]);
        setDialogueIndex(prev => prev + 1);
      }, 3500); // Trigger new dialogue lines every 3.5s
      return () => clearTimeout(timer);
    }
  }, [isSessionStarted, dialogueIndex]);

  const handleFinishSession = () => {
    // Clear out session and mark patient as treated / closed
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatientId) {
        return {
          ...p,
          dciCompleted: true,
          priority: 'normal',
          dciScore: 3, // normalized
          appointmentSlot: undefined,
          teamsGenerated: false
        };
      }
      return p;
    }));
    setIsSessionStarted(false);
    setIsReportSaved(true);
    setTimeout(() => {
      setIsReportSaved(false);
      setActiveStep(1);
    }, 3000);
  };

  if (role === 'agent') {
    return (
      <div className="space-y-6 pb-12 max-w-4xl mx-auto">
        <div className="border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
            Espace Patient Sécurisé CGPR
          </div>
          <h1 className="text-3xl font-extrabold display-font">
            Ma Consultation <span className="text-primary">Visio Teams</span>
          </h1>
          <p className="text-secondary text-sm mt-1 leading-relaxed">
            Votre espace d'attente sécurisé pour votre entretien de soutien psychologique avec votre clinicien de référence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Card: Waiting Queue status */}
          <div className="md:col-span-8">
            <GlassCard className="!p-8 text-center space-y-6">
              
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(0,229,255,0.15)] relative">
                <Video className="w-10 h-10 text-primary animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-2xl text-white">Salle d'Attente Active</h3>
                <p className="text-xs text-secondary max-w-md mx-auto">
                  Votre diagnostic DCI a été validé. Le clinicien principal a planifié votre créneau thérapeutique prioritaire.
                </p>
              </div>

              {/* Status parameters */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-b border-white/5 py-6 my-4 text-left">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary">Horaire Prévu</span>
                  <h4 className="text-sm font-bold text-white mt-1">Aujourd'hui à 14:00</h4>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary">Durée Séance</span>
                  <h4 className="text-sm font-bold text-white mt-1">60 Minutes</h4>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 col-span-2 md:col-span-1">
                  <span className="text-[9px] uppercase tracking-wider text-secondary">Clinicien Référent</span>
                  <h4 className="text-sm font-bold text-primary mt-1">Dr. Rayhan</h4>
                </div>
              </div>

              {/* Secure teams click room */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    window.location.href = "msteams://teams.microsoft.com/l/meetup-join/19:psych-session-pat-1@thread.v2/0";
                  }}
                  className="w-full md:w-auto px-10 py-4 bg-primary text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Video className="w-4 h-4 animate-bounce" />
                  <span>Rejoindre la Téléconsultation Teams</span>
                </button>
                <p className="text-[10px] text-secondary/60">
                  En cliquant sur ce bouton, l'application Microsoft Teams se lancera de manière sécurisée de votre poste.
                </p>
              </div>

            </GlassCard>
          </div>

          {/* Side Card: Prep checklist & breathing animation */}
          <div className="md:col-span-4 space-y-6">
            <GlassCard className="!p-6 space-y-4 border-white/5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                Diagnostic Matériel Securisé
              </h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-secondary">Périphérique Caméra</span>
                  <span className="text-emerald-400 font-bold">Actif ✅</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-secondary">Micro & Haut-Parleurs</span>
                  <span className="text-emerald-400 font-bold">Prêt ✅</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-secondary">Réseau Local VPN</span>
                  <span className="text-emerald-400 font-bold">Chiffré ✅</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="!p-6 space-y-4 border-white/5 text-center">
              <h4 className="font-bold text-xs uppercase tracking-widest text-secondary flex items-center justify-center gap-1.5">
                <Activity className="w-4 h-4 text-primary" />
                Respiration Guidée 4-7-8
              </h4>
              
              <p className="text-[11px] text-secondary leading-relaxed">
                Prenez une minute pour vous recentrer et faire descendre le stress avant la connexion clinique.
              </p>

              {/* Breathing circle indicator */}
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center mx-auto relative overflow-hidden my-4">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1.4, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-2 bg-primary/10 rounded-full border border-primary/40"
                />
                <span className="text-[10px] text-primary font-bold uppercase relative z-10 animate-pulse">Inspirez</span>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Upper Navigation Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
            <Brain className="w-4 h-4 text-primary animate-pulse" />
            Médecine & Psychologie Pénitentiaire (CGPR)
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight display-font">
            Espace de Triage & <span className="text-primary">Suivi Clinique</span>
          </h1>
          <p className="text-secondary text-sm font-light mt-1 max-w-2xl">
            Triage clinique DCI (Dépistage Clinique Initial), planification d'agenda et séances de téléconsultation assistées par IA via le protocole sécurisé MS Teams.
          </p>
        </div>

        {/* 3-Step Progress Indicator */}
        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/5 w-full xl:w-auto">
          {[
            { step: 1, label: "Triage DCI", icon: Sliders },
            { step: 2, label: "Rendez-vous", icon: Calendar },
            { step: 3, label: "Séance Teams", icon: Video }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all ${
                activeStep === item.step
                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: The prioritized queue (Salle d'Attente) */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Salle d'Attente & Triage
            </h3>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-mono font-bold">
              {patients.length} Agents
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 max-h-[70vh] fitness-scrollbar">
            {sortedPatients.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              const hasSlot = !!patient.appointmentSlot;
              
              // Resolve color tokens for priority levels
              let priorityBadge = <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 text-secondary border border-white/5">DCI non fait</span>;
              if (patient.dciCompleted) {
                if (patient.priority === 'critical') {
                  priorityBadge = <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">🟥 Niveau 1 (Critique)</span>;
                } else if (patient.priority === 'high') {
                  priorityBadge = <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">🟧 Niveau 2 (Élevé)</span>;
                } else if (patient.priority === 'moderate') {
                  priorityBadge = <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">🟨 Niveau 3 (Modéré)</span>;
                } else {
                  priorityBadge = <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟩 Niveau 4 (Normal)</span>;
                }
              }

              return (
                <motion.div
                  key={patient.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-primary/5 border-primary/40 shadow-[0_0_20px_rgba(0,229,255,0.05)]'
                      : 'bg-surface border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  {/* Left edge glow for selected */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  )}

                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <h4 className={`font-bold transition-colors text-sm ${isSelected ? 'text-primary' : 'text-white'}`}>
                        {patient.name}
                      </h4>
                      <p className="text-[10px] text-secondary/70 font-mono mt-0.5">{patient.matricule} • {patient.role}</p>
                    </div>
                    {priorityBadge}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-secondary mt-4 border-t border-white/5 pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary/60" />
                      DCI : {patient.dciCompleted ? `Score ${patient.dciScore}/20` : 'En attente'}
                    </span>

                    {hasSlot ? (
                      <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        <Calendar className="w-3 h-3" />
                        Planifié
                      </span>
                    ) : (
                      <span className="text-secondary/50 italic">Pas de RDV</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] text-secondary leading-relaxed">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Info className="w-3.5 h-3.5 text-primary" /> Algorithme de Triage National
            </h4>
            Inspiré de la grille de triage clinique du Service Correctionnel du Canada (SCC) et des protocoles NHS. Les agents ayant subi un incident critique sont automatiquement placés au sommet de la file d'attente.
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMNS: Active Workflow Panel */}
        <div className="xl:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CLINICAL TRIAGE DETAILED VIEW */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <GlassCard className="!p-6 space-y-6">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                        <p className="text-xs text-secondary font-mono mt-0.5">{selectedPatient.matricule} • {selectedPatient.role} • {selectedPatient.age} ans</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenDci(selectedPatient.id)}
                      className="px-4 py-2 bg-primary text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      {selectedPatient.dciCompleted ? "Réévaluer DCI" : "Évaluer le DCI"}
                    </button>
                  </div>

                  {selectedPatient.dciCompleted && selectedPatient.dciData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left Block: Clinical risk details */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-[11px] uppercase tracking-widest text-primary flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-primary" /> Indicateurs de Risque Clinique
                        </h3>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs text-white">Idéations Suicidaires</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                              selectedPatient.dciData.suicidalIdeation === 'high' ? 'bg-red-500/20 text-red-400' :
                              selectedPatient.dciData.suicidalIdeation === 'moderate' ? 'bg-orange-500/20 text-orange-400' :
                              selectedPatient.dciData.suicidalIdeation === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {selectedPatient.dciData.suicidalIdeation}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs text-white">Risque d'Agression/Passage à l'acte</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                              selectedPatient.dciData.aggressionRisk === 'high' ? 'bg-red-500/20 text-red-400' :
                              selectedPatient.dciData.aggressionRisk === 'moderate' ? 'bg-orange-500/20 text-orange-400' :
                              selectedPatient.dciData.aggressionRisk === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {selectedPatient.dciData.aggressionRisk}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs text-white">Troubles Sévères du Sommeil</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                              selectedPatient.dciData.sleepDisorder ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {selectedPatient.dciData.sleepDisorder ? 'Détectés' : 'Absents'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs text-white">Consommation de Substances</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                              selectedPatient.dciData.substanceAbuse ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {selectedPatient.dciData.substanceAbuse ? 'Active' : 'Absente'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Triage calculations */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-[11px] uppercase tracking-widest text-primary flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-primary animate-pulse" /> Analyse Graphique & Synthèse
                        </h3>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1.5 text-xs text-secondary">
                              <span>Niveau de Stress Traumatique</span>
                              <span className="text-white font-bold">{selectedPatient.dciData.traumaStressLevel} / 10</span>
                            </div>
                            <div className="h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                                style={{ width: `${selectedPatient.dciData.traumaStressLevel * 10}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1.5 text-xs text-secondary">
                              <span>Gravité de l'Anxiété Sémantique</span>
                              <span className="text-white font-bold uppercase">{selectedPatient.dciData.anxietySeverity}</span>
                            </div>
                            <div className="h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{
                                  width: selectedPatient.dciData.anxietySeverity === 'severe' ? '100%' :
                                         selectedPatient.dciData.anxietySeverity === 'moderate' ? '66%' :
                                         selectedPatient.dciData.anxietySeverity === 'mild' ? '33%' : '0%'
                                }}
                              />
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                            <div>
                              <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Score DCI Global</p>
                              <p className="text-2xl font-extrabold text-white">{selectedPatient.dciScore} / 20</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Priorité assignée</p>
                              <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                                selectedPatient.priority === 'critical' ? 'text-red-400' :
                                selectedPatient.priority === 'high' ? 'text-orange-400' :
                                selectedPatient.priority === 'moderate' ? 'text-yellow-400' : 'text-emerald-400'
                              }`}>
                                {selectedPatient.priority}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Observations note */}
                      <div className="md:col-span-2 bg-white/5 p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-secondary flex items-center gap-1.5 mb-2">
                          <FileText className="w-3.5 h-3.5 text-secondary/60" /> Observations Cliniques de l'Agent de Triage
                        </h4>
                        <p className="text-xs text-white/80 leading-relaxed italic">
                          "{selectedPatient.dciData.observations || "Aucune observation spécifiée."}"
                        </p>
                      </div>

                      {/* Transition button */}
                      <div className="md:col-span-2 flex justify-end">
                        <button
                          onClick={() => setActiveStep(2)}
                          className="px-6 py-3 bg-[#5558EB] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_30px_rgba(85,88,235,0.4)] transition-all flex items-center gap-2 group"
                        >
                          <span>Passer à la Planification RDV</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-2xl border border-dashed border-white/10 text-center">
                      <Sliders className="w-12 h-12 text-secondary mb-4 opacity-50 animate-pulse" />
                      <h3 className="text-lg font-bold text-white mb-2">Diagnostic Initial non effectué</h3>
                      <p className="text-xs text-secondary max-w-sm mb-6">
                        Cet agent n'a pas encore fait son Dépistage Clinique Initial (DCI). Vous devez remplir sa fiche clinique pour calculer sa priorité.
                      </p>
                      <button
                        onClick={() => handleOpenDci(selectedPatient.id)}
                        className="px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Remplir la fiche DCI
                      </button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 2: APPOINTMENT MANAGEMENT */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GlassCard className="!p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Planifier un Rendez-vous Clinique</h2>
                    <p className="text-xs text-secondary">
                      Affectation d'un médecin agréé et programmation du créneau horaire pour <strong>{selectedPatient.name}</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-white/5 py-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Médecin Clinicien Référent</label>
                        <select
                          value={appointedDoctor}
                          onChange={(e) => setAppointedDoctor(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors"
                        >
                          <option className="bg-background">Dr. Rayhan (Clinicien Principal - CGPR)</option>
                          <option className="bg-background">Dr. Sonia Belhadj (Traumatologue Clinicienne)</option>
                          <option className="bg-background">Dr. Anis Ghozzi (Psychologue Comportementaliste)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Date du rendez-vous</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Créneau Horaire</label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-mono"
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-primary" /> Synthèse d'Urgence Clinical
                        </h4>
                        
                        <div className="space-y-2 text-xs">
                          <p className="flex justify-between">
                            <span className="text-secondary">Statut DCI :</span>
                            <span className="font-bold text-white">{selectedPatient.dciCompleted ? "Validé" : "Non fait"}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-secondary">Niveau de Priorité :</span>
                            <span className="font-bold text-red-400 uppercase tracking-wider">{selectedPatient.priority || "INDÉTERMINÉ"}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-secondary">Temps limite recommandé :</span>
                            <span className="font-bold text-white">
                              {selectedPatient.priority === 'critical' ? "Immédiat ( < 24 heures )" :
                               selectedPatient.priority === 'high' ? "Prioritaire ( < 72 heures )" :
                               selectedPatient.priority === 'moderate' ? "Standard ( < 7 jours )" : "Routine"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 mt-4">
                        <p className="text-[10px] text-secondary leading-relaxed flex items-start gap-1">
                          <Info className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span>
                            La validation du rendez-vous générera un canal de téléconsultation Teams sécurisé et pré-authentifié.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="text-xs text-secondary hover:text-white uppercase font-bold tracking-widest flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" /> Retour au Triage
                    </button>

                    <button
                      onClick={handleScheduleAppt}
                      className="px-6 py-3.5 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirmer le Rendez-vous
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 3: SECURE TEAMS SESSION ACTIVE BRIDGE */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Check if slot is planned */}
                {selectedPatient.appointmentSlot ? (
                  <GlassCard className="!p-6 space-y-6">
                    
                    {/* Upper Card Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">
                          Session Prête
                        </span>
                        <h2 className="text-xl font-bold mt-2">Bridge de Séance Sécurisée Teams</h2>
                        <p className="text-xs text-secondary mt-0.5">
                          Rendez-vous planifié le <strong>{selectedPatient.appointmentSlot}</strong> avec <strong>{selectedPatient.appointedDoctor}</strong>.
                        </p>
                      </div>

                      {/* Launch Teams toggle */}
                      {!selectedPatient.teamsGenerated ? (
                        <button
                          onClick={handleGenerateTeams}
                          className="px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4 animate-spin-slow" />
                          Générer le Canal Teams
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                            <ShieldCheck className="w-4 h-4" /> Teams Sécurisé Connecté
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pre-launch State */}
                    {!selectedPatient.teamsGenerated ? (
                      <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-2xl border border-dashed border-white/10 text-center">
                        <Lock className="w-12 h-12 text-secondary mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-white mb-2">Génération de la séance sécurisée</h3>
                        <p className="text-xs text-secondary max-w-sm mb-6">
                          Le système doit crypter l'URL d'accès Teams pour assurer la confidentialité médicale requise pour les agents CGPR.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        
                        {/* Launch Controls */}
                        {!isSessionStarted ? (
                          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="space-y-2">
                              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                <Video className="w-4 h-4 text-primary animate-pulse" />
                                Astuce Dual-Screen : Teams + IA Assistance
                              </h3>
                              <p className="text-xs text-secondary max-w-xl leading-relaxed">
                                En cliquant sur le bouton ci-contre, Microsoft Teams se lancera directement pour votre téléconsultation audio/vidéo. Notre application reste ouverte en arrière-plan pour écouter en temps réel via le pont audio sécurisé, effectuer l'analyse sémantique cognitive et vous suggérer des recommandations cliniques en direct !
                              </p>
                            </div>

                            <button
                              onClick={handleLaunchTeams}
                              disabled={isTeamsLaunching}
                              className="px-8 py-4 bg-gradient-to-r from-[#5558EB] to-[#7173e6] rounded-xl text-white font-bold tracking-widest uppercase text-xs hover:shadow-[0_0_35px_rgba(85,88,235,0.6)] hover:-translate-y-0.5 transition-all flex items-center gap-3 w-full md:w-auto justify-center"
                            >
                              {isTeamsLaunching ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <PhoneCall className="w-4 h-4 fill-white" />
                              )}
                              {isTeamsLaunching ? "Lancement en cours..." : "Lancer Séance MS Teams"}
                            </button>
                          </div>
                        ) : (
                          
                          /* ACTIVE SESSION SIMULATOR */
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Live Dialogue & Transcript column */}
                            <div className="lg:col-span-7 space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                                  Dialogue en Direct (Teams Bridge)
                                </h3>
                                <span className="text-[10px] text-secondary font-mono">ID Séance: PRV-2026-TEAMS</span>
                              </div>

                              <div className="bg-black/50 border border-white/5 rounded-2xl p-4 h-[350px] overflow-y-auto fitness-scrollbar space-y-4">
                                {liveTranscript.map((msg, index) => {
                                  let senderStyle = "bg-white/5 border-white/5 text-white mr-12";
                                  let senderLabel = selectedPatient.name;
                                  
                                  if (msg.sender === 'doctor') {
                                    senderStyle = "bg-[#5558EB]/10 border-[#5558EB]/20 text-white ml-12";
                                    senderLabel = "Vous (Psychologue)";
                                  } else if (msg.sender === 'system') {
                                    senderStyle = "bg-primary/10 border-primary/20 text-primary mx-4 text-center";
                                    senderLabel = "CO-PILOTE INTÉLLIGENT";
                                  }

                                  return (
                                    <div key={index} className={`p-3 rounded-xl border text-xs leading-relaxed ${senderStyle}`}>
                                      <div className="flex justify-between items-center mb-1 text-[9px] font-bold uppercase tracking-wider text-secondary/60">
                                        <span>{senderLabel}</span>
                                        <span>{msg.time}</span>
                                      </div>
                                      <p>{msg.text}</p>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Live emotional stats */}
                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                  <p className="text-[9px] text-secondary uppercase font-bold tracking-widest mb-1">Détresse sémantique</p>
                                  <p className="text-lg font-bold text-red-400">84%</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                  <p className="text-[9px] text-secondary uppercase font-bold tracking-widest mb-1">Cohérence cognitive</p>
                                  <p className="text-lg font-bold text-primary">62%</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                  <p className="text-[9px] text-secondary uppercase font-bold tracking-widest mb-1">Sentiment prédominant</p>
                                  <p className="text-lg font-bold text-secondary">Négatif</p>
                                </div>
                              </div>
                            </div>

                            {/* Clinical recommendations & notes column */}
                            <div className="lg:col-span-5 space-y-4">
                              <h3 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary animate-pulse" />
                                Recommandations Cliniques (IA)
                              </h3>

                              <div className="space-y-3">
                                {/* Suggestion Card 1 */}
                                <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded">Action immédiate</span>
                                    <span className="text-[9px] text-secondary font-mono">Confiance 92%</span>
                                  </div>
                                  <h4 className="font-bold text-xs text-white">Technique de respiration 4-7-8</h4>
                                  <p className="text-[10.5px] text-secondary leading-relaxed">
                                    Suggérer au patient une respiration régulée pour diminuer la charge vagale et stabiliser le rythme cardiaque face aux crises de panique.
                                  </p>
                                </div>

                                {/* Suggestion Card 2 */}
                                <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Recommandation RH</span>
                                    <span className="text-[9px] text-secondary font-mono">Confiance 85%</span>
                                  </div>
                                  <h4 className="font-bold text-xs text-white">Audit & Réaménagement du poste</h4>
                                  <p className="text-[10.5px] text-secondary leading-relaxed">
                                    Envisager un allègement temporaire de service (pas de gardes de nuit ni de contact direct avec les détenus) pendant 15 jours.
                                  </p>
                                </div>
                              </div>

                              {/* Consultation Notes entry */}
                              <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Observations & Notes Thérapeutiques</label>
                                <textarea
                                  value={sessionNotes}
                                  onChange={(e) => setSessionNotes(e.target.value)}
                                  placeholder="Saisissez vos observations cliniques de la téléconsultation ici..."
                                  rows={4}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                                />
                              </div>

                              <button
                                onClick={handleFinishSession}
                                className="w-full py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Clôturer Séance & Sauvegarder
                              </button>
                            </div>

                          </div>
                        )}
                      </div>
                    )}
                  </GlassCard>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-3xl border border-white/5 text-center h-[50vh]">
                    <VideoOff className="w-12 h-12 text-secondary mb-4 opacity-50" />
                    <h3 className="text-lg font-bold text-white mb-2">Rendez-vous requis</h3>
                    <p className="text-xs text-secondary max-w-sm mb-6">
                      Vous devez d'abord planifier un rendez-vous pour cet agent dans l'étape 2 (Agenda) avant de pouvoir lancer le pont sécurisé MS Teams.
                    </p>
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 bg-[#5558EB] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(85,88,235,0.4)] transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Planifier un rendez-vous
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DCI EVALUATION MODAL FORM */}
      <AnimatePresence>
        {isDciModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDciModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-primary" />
                    Grille Clinique DCI (Dépistage Initial)
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">Évaluation des symptômes et risques immédiats pour l'agent.</p>
                </div>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto fitness-scrollbar pr-2 mb-6">
                
                {/* Suicidal & aggression dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Idéations / Risque d'auto-mutilation</label>
                    <select
                      value={dciForm.suicidalIdeation}
                      onChange={(e) => setDciForm(prev => ({ ...prev, suicidalIdeation: e.target.value as any }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                    >
                      <option className="bg-background" value="none">Aucun risque décelé (0 pts)</option>
                      <option className="bg-background" value="low">Risque Faible / Idées fugaces (3 pts)</option>
                      <option className="bg-background" value="moderate">Risque Modéré / Verbalisation active (6 pts)</option>
                      <option className="bg-background" value="high">Urgence Absolue / Passage à l'acte imminent (8 pts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Risque d'agressivité envers autrui</label>
                    <select
                      value={dciForm.aggressionRisk}
                      onChange={(e) => setDciForm(prev => ({ ...prev, aggressionRisk: e.target.value as any }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                    >
                      <option className="bg-background" value="none">Aucun (0 pts)</option>
                      <option className="bg-background" value="low">Faible / Tensions verbales (2 pts)</option>
                      <option className="bg-background" value="moderate">Modéré / Antécédents récents (4 pts)</option>
                      <option className="bg-background" value="high">Élevé / Menace physique active (6 pts)</option>
                    </select>
                  </div>
                </div>

                {/* Trauma stress slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Niveau de Stress Traumatique / Flashbacks</label>
                    <span className="text-xs font-mono font-bold text-primary">{dciForm.traumaStressLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dciForm.traumaStressLevel}
                    onChange={(e) => setDciForm(prev => ({ ...prev, traumaStressLevel: parseInt(e.target.value) }))}
                    className="w-full accent-primary bg-white/5 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-secondary/50 font-mono mt-1">
                    <span>Léger inconfort</span>
                    <span>Anxiété modérée</span>
                    <span>Détresse aiguë / TSPT</span>
                  </div>
                </div>

                {/* Anxiety severity dropdown */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Gravité de l'anxiété sémantique</label>
                  <select
                    value={dciForm.anxietySeverity}
                    onChange={(e) => setDciForm(prev => ({ ...prev, anxietySeverity: e.target.value as any }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                  >
                    <option className="bg-background" value="none">Absente (0 pts)</option>
                    <option className="bg-background" value="mild">Légère / Stress occasionnel (1 pt)</option>
                    <option className="bg-background" value="moderate">Modérée / Crises angoisse occasionnelles (2 pts)</option>
                    <option className="bg-background" value="severe">Sévère / Attaques de panique quotidiennes (3 pts)</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dciForm.sleepDisorder}
                      onChange={(e) => setDciForm(prev => ({ ...prev, sleepDisorder: e.target.checked }))}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Insomnies et Troubles du sommeil (+1 pt)</p>
                      <p className="text-[10px] text-secondary">Réveils précoces, cauchemars récurrents.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dciForm.substanceAbuse}
                      onChange={(e) => setDciForm(prev => ({ ...prev, substanceAbuse: e.target.checked }))}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Abus de substances addictives (+1 pt)</p>
                      <p className="text-[10px] text-secondary">Alcool, médicaments psychotropes, stupéfiants.</p>
                    </div>
                  </label>
                </div>

                {/* Detailed observations */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Observations Cliniques Détaillées</label>
                  <textarea
                    value={dciForm.observations}
                    onChange={(e) => setDciForm(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Saisissez ici les observations initiales de l'agent..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                <button
                  onClick={() => setIsDciModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 text-secondary hover:text-white rounded-xl text-xs uppercase font-bold tracking-wider"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveDci}
                  className="px-5 py-2.5 bg-primary text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4 font-extrabold" />
                  Enregistrer & Trier
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SAVE CONFIRMATION SNACKBAR */}
      <AnimatePresence>
        {isReportSaved && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-6 py-4 rounded-2xl flex items-center gap-3 border border-emerald-400/30 shadow-[0_10px_35px_rgba(16,185,129,0.4)]"
          >
            <CheckCircle className="w-5 h-5 fill-black" />
            <div>
              <p className="font-bold text-xs uppercase tracking-wider">Compte-rendu médical sauvegardé !</p>
              <p className="text-[10px] text-black/70 mt-0.5">Le patient a été réintégré dans le suivi de routine.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
