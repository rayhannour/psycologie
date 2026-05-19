"use client";
import React, { useState } from 'react';
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
  AlertCircle,
  FileText,
  ShieldAlert,
  Clock,
  CheckCircle,
  Sparkles,
  Brain,
  Info,
  Sliders,
  Award,
  ArrowLeft,
  X,
  Lock,
  Heart,
  TrendingDown,
  Video,
  ShieldAlert as ShieldIcon,
  Flame,
  Moon,
  Skull
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// ── Patient & Multi-Act DCI Structure ────────────────────────────────
interface DciQuestion {
  id: string;
  questionText: string;
  patientResponse: string;
  severity: 'critical' | 'high' | 'moderate' | 'normal';
  points: number;
}

interface ClinicalAct {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  riskPercentage: number;
  questions: DciQuestion[];
}

interface Patient {
  id: string;
  name: string;
  matricule: string;
  role: string;
  status: string;
  lastSession: string;
  sessionsCount: number;
  risk: 'High' | 'Medium' | 'Low';
  stability: number;
  trend: 'improving' | 'declining' | 'stable';
  age: number;
  dciCompleted: boolean;
  dciReport?: {
    totalScore: number;
    maxScore: number;
    triageCategory: string;
    clinicalSummary: string;
    aiPreAnalysis: string;
    acts: ClinicalAct[];
    recommendations: { title: string; desc: string; type: 'urgent' | 'standard' }[];
  };
}

// ── Complete Pre-configured Seed Data with Tabbed DCI Acts ───────────
const initialPatients: Patient[] = [
  { 
    id: "1", 
    name: "Commandant Khaled Ben Amor", 
    matricule: "AGT-0814",
    role: "Officier de Sécurité - Mornaguia",
    age: 42,
    status: "Critique", 
    lastSession: "24/04/2024", 
    sessionsCount: 12, 
    risk: "High", 
    stability: 32,
    trend: "declining",
    dciCompleted: true,
    dciReport: {
      totalScore: 35,
      maxScore: 40,
      triageCategory: "🟥 Niveau 1 - Urgence Psychiatrique Absolue",
      clinicalSummary: "Détresse clinique aiguë post-traumatique majeure consécutive à l'agression et à la prise d'otages lors des récents troubles du Bloc C à la prison de Mornaguia.",
      aiPreAnalysis: "L'analyse sémantique pré-rendez-vous démontre un état d'activation émotionnelle critique (92%) avec des manifestations sévères de TSPT, d'insomnie réfractaire et d'évitement cognitif.",
      acts: [
        {
          id: "act-1",
          title: "Acte I : Incidents Opérationnels",
          subtitle: "Exposition aux chocs et événements de service",
          icon: Flame,
          riskPercentage: 95,
          questions: [
            {
              id: "q1-1",
              questionText: "Avez-vous subi une agression physique ou une menace directe avec arme en service ?",
              patientResponse: "Oui, j'ai été pris à la gorge et menacé avec un poinçon artisanal par un détenu lors de la mutinerie du Bloc C le mois dernier.",
              severity: "critical",
              points: 10
            },
            {
              id: "q1-2",
              questionText: "Avez-vous été retenu contre votre gré (prise d'otage) ou séquestré dans l'établissement ?",
              patientResponse: "Oui, j'ai été enfermé dans le bureau du gardien-chef pendant 45 minutes sous la menace constante, avant l'assaut de l'unité d'intervention.",
              severity: "critical",
              points: 10
            },
            {
              id: "q1-3",
              questionText: "Avez-vous été le premier intervenant sur un drame majeur de détenu (suicide, automutilation grave) ?",
              patientResponse: "J'ai dû intervenir pour éteindre un détenu qui s'était immolé par le feu il y a 6 mois. L'odeur et les cris me hantent encore.",
              severity: "high",
              points: 8
            }
          ]
        },
        {
          id: "act-2",
          title: "Acte II : Diagnostic TSPT",
          subtitle: "Symptomatologie post-traumatique active",
          icon: Brain,
          riskPercentage: 88,
          questions: [
            {
              id: "q2-1",
              questionText: "Présentez-vous des flashbacks involontaires ou des images intrusives de l'incident en repos ?",
              patientResponse: "Oui, plusieurs fois par jour. Le simple bruit d'une alarme à la télévision déclenche instantanément des images précises de l'émeute.",
              severity: "critical",
              points: 9
            },
            {
              id: "q2-2",
              questionText: "Pratiquez-vous l'évitement actif de certaines zones ou tâches de l'établissement ?",
              patientResponse: "Je refuse de passer par le sas d'entrée du Bloc C. J'invente des détours administratifs pour ne plus jamais croiser ce couloir.",
              severity: "high",
              points: 8
            },
            {
              id: "q2-3",
              questionText: "Ressentez-vous une hypervigilance physique ou sursauts au bruit des clés ou des grilles ?",
              patientResponse: "Oui, je sursaute violemment au moindre cliquetis métallique de clés. Mon cœur s'emballe instantanément à plus de 120 bpm.",
              severity: "critical",
              points: 9
            }
          ]
        },
        {
          id: "act-3",
          title: "Acte III : Impact Somatique",
          subtitle: "Désorganisation des cycles physiologiques",
          icon: Moon,
          riskPercentage: 75,
          questions: [
            {
              id: "q3-1",
              questionText: "Décrivez vos troubles du sommeil (endormissement, réveils paniqués, cauchemars).",
              patientResponse: "Impossible de m'endormir avant 3h ou 4h du matin. Je me réveille en sueur, terrassé par des cauchemars où je suis bloqué dans une cellule en flammes.",
              severity: "high",
              points: 8
            },
            {
              id: "q3-2",
              questionText: "Avez-vous recours à l'alcool ou à des psychotropes non prescrits pour évacuer la tension ?",
              patientResponse: "Je bois 3 verres de whisky fort chaque soir pour engourdir mes pensées et je prends du Temesta que ma femme m'a donné.",
              severity: "critical",
              points: 9
            }
          ]
        },
        {
          id: "act-4",
          title: "Acte IV : Alertes Psychiatriques",
          subtitle: "Risques cliniques majeurs d'auto/hétéro-agression",
          icon: Skull,
          riskPercentage: 70,
          questions: [
            {
              id: "q4-1",
              questionText: "Avez-vous des idées de suicide, d'auto-mutilation ou l'envie d'en finir ?",
              patientResponse: "Pas de plan précis, mais parfois au réveil, je ressens un vide si grand que je me dis qu'il serait plus simple de ne plus jamais me réveiller.",
              severity: "high",
              points: 7
            },
            {
              id: "q4-2",
              questionText: "Éprouvez-vous des accès de colère incontrôlables ou de l'impulsivité envers vos collègues ou proches ?",
              patientResponse: "Je suis d'une irritabilité extrême. J'ai brisé une chaise à la maison hier suite à une simple discussion. Je crains de perdre le contrôle en service.",
              severity: "high",
              points: 8
            }
          ]
        }
      ],
      recommendations: [
        {
          title: "Retrait immédiat du milieu carcéral actif",
          desc: "Retrait temporaire de 15 jours de tout contact direct avec la population carcérale générale.",
          type: "urgent"
        },
        {
          title: "Planification d'urgence Teams",
          desc: "Planifier une thérapie de désensibilisation par EMDR sous visioconférence sécurisée avec assistance IA.",
          type: "urgent"
        }
      ]
    }
  },
  { 
    id: "2", 
    name: "Lt. Yassine Chaouachi", 
    matricule: "AGT-1102",
    role: "Escorte et Transfert",
    age: 35,
    status: "Observation", 
    lastSession: "22/04/2024", 
    sessionsCount: 8, 
    risk: "Medium", 
    stability: 62,
    trend: "stable",
    dciCompleted: true,
    dciReport: {
      totalScore: 22,
      maxScore: 40,
      triageCategory: "🟧 Niveau 2 - Priorité Élevée / Burnout Clinique",
      clinicalSummary: "Épuisement professionnel sévère (stade d'épuisement émotionnel aigu) lié à une surcharge chronique de gardes de nuit et d'extractions judiciaires à haut risque.",
      aiPreAnalysis: "Résilience globale faible. Le sujet exprime un détachement cynique du travail (dépersonnalisation) et une fatigue physique permanente sans TSPT caractérisé.",
      acts: [
        {
          id: "act-1",
          title: "Acte I : Incidents Opérationnels",
          subtitle: "Exposition aux chocs de service",
          icon: Flame,
          riskPercentage: 45,
          questions: [
            {
              id: "q1-1",
              questionText: "Avez-vous subi une agression physique ou une menace directe avec arme en service ?",
              patientResponse: "Pas d'agression directe avec arme récemment, mais des menaces de mort verbales quotidiennes de la part de détenus radicalisés lors des transferts.",
              severity: "moderate",
              points: 5
            }
          ]
        },
        {
          id: "act-2",
          title: "Acte II : Diagnostic TSPT",
          subtitle: "Symptomatologie post-traumatique active",
          icon: Brain,
          riskPercentage: 30,
          questions: [
            {
              id: "q2-1",
              questionText: "Présentez-vous des flashbacks involontaires ou des images intrusives de l'incident en repos ?",
              patientResponse: "Non, pas de flashbacks visuels de scènes traumatiques.",
              severity: "normal",
              points: 2
            }
          ]
        },
        {
          id: "act-3",
          title: "Acte III : Impact Somatique",
          subtitle: "Désorganisation des cycles physiologiques",
          icon: Moon,
          riskPercentage: 85,
          questions: [
            {
              id: "q3-1",
              questionText: "Décrivez vos troubles du sommeil (endormissement, réveils paniqués, cauchemars).",
              patientResponse: "Réveils automatiques vers 3h30 du matin avec incapacité totale de me rendormir. Je passe mes nuits à ressasser mes plannings de garde.",
              severity: "high",
              points: 8
            },
            {
              id: "q3-2",
              questionText: "Avez-vous recours à l'alcool ou à des psychotropes non prescrits pour évacuer la tension ?",
              patientResponse: "Je consomme du vin en quantité croissante le soir pour 'éteindre' mon cerveau.",
              severity: "moderate",
              points: 6
            }
          ]
        },
        {
          id: "act-4",
          title: "Acte IV : Alertes Psychiatriques",
          subtitle: "Risques cliniques majeurs",
          icon: Skull,
          riskPercentage: 50,
          questions: [
            {
              id: "q4-1",
              questionText: "Avez-vous des idées de suicide, d'auto-mutilation ou l'envie d'en finir ?",
              patientResponse: "Pas d'idées suicidaires actives, mais une fatigue existentielle extrême. J'aimerais juste que tout s'arrête quelques semaines.",
              severity: "moderate",
              points: 4
            }
          ]
        }
      ],
      recommendations: [
        {
          title: "Allègement horaire immédiat",
          desc: "Retrait temporaire des astreintes et gardes de nuit pendant 15 jours.",
          type: "standard"
        }
      ]
    }
  }
];

export default function PatientsPage() {
  const [patientsList, setPatientsList] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientDci, setSelectedPatientDci] = useState<Patient | null>(null);
  
  // Tab control inside the DCI Report Mockup
  const [activeActTab, setActiveActTab] = useState<string>("act-1");

  const filteredPatients = patientsList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.matricule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeClinicalAct = selectedPatientDci?.dciReport?.acts.find(act => act.id === activeActTab) || selectedPatientDci?.dciReport?.acts[0];

  return (
    <div className="space-y-8 pb-10">
      
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: PATIENTS LIST GRID */}
        {!selectedPatientDci ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div>
                <h1 className="text-4xl font-extrabold display-font tracking-tight">
                  Base <span className="text-primary">Praticien</span> & Triage DCI
                </h1>
                <p className="text-secondary mt-1 text-sm md:text-base">
                  Gestion centralisée, fiches cliniques et diagnostics initiaux (DCI) pré-rendez-vous pour vos consultations CGPR.
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn bg-white/5 border border-white/10 flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-secondary hover:text-white"
                >
                  <Filter className="w-4 h-4" />
                  Filtrer les priorités
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
                placeholder="Rechercher un agent par nom, matricule ou statut clinique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm text-white"
              />
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <GlassCard 
                  key={patient.id}
                  className="group relative flex flex-col p-0 overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-50" />
                          <span className="text-xl font-bold text-primary relative z-10">{patient.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-base group-hover:text-primary transition-colors leading-tight">{patient.name}</h3>
                          <p className="text-[10px] text-secondary/60 font-mono mt-0.5">{patient.matricule} • {patient.role}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              patient.risk === 'High' ? 'bg-red-500 animate-pulse' : 
                              patient.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                            <p className="text-[9px] uppercase font-extrabold tracking-wider text-secondary">Risque : {patient.risk}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stability indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end text-[10px] uppercase font-bold tracking-widest text-secondary">
                        <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-primary" /> Stabilité Psychologique</span>
                        <span className={patient.stability > 70 ? 'text-emerald-400' : patient.stability > 40 ? 'text-amber-400' : 'text-red-400'}>{patient.stability}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${patient.stability}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full ${patient.stability > 70 ? 'bg-emerald-500' : patient.stability > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        />
                      </div>
                    </div>

                    {/* Stats summary */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-secondary/60 flex items-center gap-1"><Calendar className="w-3 h-3 text-secondary/70" /> Dernière</span>
                        <p className="text-xs font-semibold mt-0.5">{patient.lastSession}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-secondary/60 flex items-center gap-1"><MessageSquare className="w-3 h-3 text-secondary/70" /> Sessions</span>
                        <p className="text-xs font-semibold mt-0.5">{patient.sessionsCount} sessions</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-white/5 p-4 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-3.5 h-3.5 ${patient.trend === 'improving' ? 'text-emerald-400' : patient.trend === 'declining' ? 'text-red-400' : 'text-secondary'}`} />
                      <span className="text-[9px] uppercase font-bold tracking-wider text-secondary/80">Tendance : {patient.trend}</span>
                    </div>

                    {patient.dciCompleted ? (
                      <button 
                        onClick={() => {
                          setSelectedPatientDci(patient);
                          // Default to first act tab
                          if (patient.dciReport?.acts[0]) {
                            setActiveActTab(patient.dciReport.acts[0].id);
                          }
                        }}
                        className="text-[10px] uppercase font-bold tracking-widest bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all flex items-center gap-1.5"
                      >
                        <Sliders className="w-3 h-3" />
                        Analyse DCI Pré-RDV
                      </button>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-white/5 border border-white/5 text-secondary/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-not-allowed">
                        <Lock className="w-3 h-3 text-secondary/40" />
                        DCI non complété
                      </span>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        ) : (
          
          /* VIEW 2: TABBED MULTI-ACT DCI PRE-APPOINTMENT ANALYSIS REPORT */
          <motion.div
            key="dci-report"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header with back navigation */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedPatientDci(null)}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-secondary hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Diagnostic Clinique Initial (DCI) • Multi-Actes
                </span>
                <h1 className="text-3xl font-extrabold display-font">Rapport Pré-Rendez-vous</h1>
              </div>
            </div>

            {/* Split Screen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Tab switcher & questions list */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Horizontal Tab Bar for Acts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedPatientDci.dciReport?.acts.map((act) => {
                    const isActive = activeActTab === act.id;
                    const Icon = act.icon;
                    
                    return (
                      <motion.button
                        key={act.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveActTab(act.id)}
                        className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between h-24 relative overflow-hidden transition-all ${
                          isActive 
                            ? 'bg-primary/5 border-primary/40 shadow-[0_0_20px_rgba(0,229,255,0.05)]'
                            : 'bg-surface border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                        }`}
                      >
                        {/* Dynamic Active accent glow */}
                        {isActive && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                        )}

                        <div className="flex justify-between items-start w-full">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-secondary/80'}`} />
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            act.riskPercentage > 75 ? 'bg-red-500/20 text-red-400' :
                            act.riskPercentage > 50 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {act.riskPercentage}%
                          </span>
                        </div>

                        <div>
                          <h4 className={`text-xs font-bold truncate ${isActive ? 'text-primary' : 'text-white'}`}>
                            {act.title.split(" : ")[1]}
                          </h4>
                          <p className="text-[8px] text-secondary/60 uppercase tracking-widest font-mono truncate">{act.title.split(" : ")[0]}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Questions List for Active Clinical Act */}
                <GlassCard className="!p-6 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{activeClinicalAct?.title}</span>
                    <h3 className="font-extrabold text-lg text-white mb-1">{activeClinicalAct?.subtitle}</h3>
                    <p className="text-xs text-secondary">
                      Questions posées au cours de cet acte d'évaluation et déclarations verbatim de l'agent.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {activeClinicalAct?.questions.map((q) => {
                      let severityBadge = "bg-white/5 text-secondary border border-white/5";
                      if (q.severity === 'critical') {
                        severityBadge = "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse";
                      } else if (q.severity === 'high') {
                        severityBadge = "bg-orange-500/20 text-orange-400 border border-orange-500/30";
                      } else if (q.severity === 'moderate') {
                        severityBadge = "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
                      }

                      return (
                        <div 
                          key={q.id}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.03] transition-all space-y-3 group"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest font-mono">{q.id.toUpperCase()}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${severityBadge}`}>
                              Risque : {q.severity} (+{q.points} pts)
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors">
                            Question : {q.questionText}
                          </h4>

                          <div className="bg-black/40 border border-white/5 p-3.5 rounded-xl text-xs text-white/80 leading-relaxed italic">
                            <p className="text-[9px] text-secondary font-mono uppercase tracking-widest mb-1.5 font-bold">Réponse de l'Agent :</p>
                            "{q.patientResponse}"
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>

              </div>

              {/* Right Column: Score calculators & Clinical recommendations */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Score Summary Card */}
                <GlassCard className="!p-6 space-y-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/20">
                      <Brain className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-secondary">Triage Global CGPR</h4>
                      <p className="text-sm font-bold text-white">Score de Gravité DCI</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 space-y-3 border-y border-white/5 my-4">
                    <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-black/60 border border-white/5">
                      <div className={`absolute inset-1.5 rounded-full border-2 border-dashed ${
                        selectedPatientDci.risk === 'High' ? 'border-red-500 animate-spin-slow' : 'border-amber-500'
                      }`} />
                      
                      <div className="text-center relative z-10">
                        <span className="text-3xl font-extrabold text-white">
                          {selectedPatientDci.dciReport?.totalScore}
                        </span>
                        <span className="text-secondary text-sm font-bold"> / 40</span>
                        <p className="text-[9px] text-secondary/60 uppercase font-mono tracking-widest mt-1">Symptomatologie</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Catégorie de Triage</p>
                      <p className={`text-xs font-bold uppercase mt-1 ${
                        selectedPatientDci.risk === 'High' ? 'text-red-400 font-extrabold' : 'text-amber-400'
                      }`}>
                        {selectedPatientDci.dciReport?.triageCategory}
                      </p>
                    </div>
                  </div>

                  {/* Avis medical */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary">Avis du clinicien de triage</h4>
                    <p className="text-xs text-white/80 leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
                      "{selectedPatientDci.dciReport?.clinicalSummary}"
                    </p>
                  </div>
                </GlassCard>

                {/* AI Pre-Analysis and Insights */}
                <GlassCard className="!p-6 space-y-4 border-white/5">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" /> Analyse IA Sémantique
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                    {selectedPatientDci.dciReport?.aiPreAnalysis}
                  </p>

                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary">Actions Pré-Rendez-vous recommandées</h4>
                    
                    {selectedPatientDci.dciReport?.recommendations.map((rec, i) => (
                      <div 
                        key={i}
                        className={`p-3 rounded-xl border text-xs ${
                          rec.type === 'urgent' 
                            ? 'bg-red-500/10 border-red-500/20 text-white' 
                            : 'bg-white/5 border-white/5 text-white/90'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            rec.type === 'urgent' ? 'text-red-400' : 'text-secondary'
                          }`}>
                            {rec.type === 'urgent' ? '🔴 Critique' : '🟡 Recommandé'}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs">{rec.title}</h5>
                        <p className="text-[10.5px] text-secondary mt-0.5 leading-relaxed">{rec.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Connect to teams session */}
                  <div className="border-t border-white/5 pt-4">
                    <button
                      onClick={() => {
                        window.location.href = `/dashboard/teams`;
                      }}
                      className="w-full py-3.5 bg-[#5558EB] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(85,88,235,0.4)] transition-all flex items-center justify-center gap-2 group"
                    >
                      <Video className="w-4 h-4" />
                      <span>Passer à la Séance Teams</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </GlassCard>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
