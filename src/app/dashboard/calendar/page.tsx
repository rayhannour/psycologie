"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Video,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Lock,
  Search,
  Filter,
  Activity,
  X,
  ShieldCheck,
  VideoOff,
  UserCheck,
  FileText
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';

interface Appointment {
  id: string;
  patientName: string;
  matricule: string;
  role: string;
  date: string; // YYYY-MM-DD
  time: string;
  duration: string;
  severity: 'critical' | 'high' | 'normal';
  severityText: string;
  status: 'scheduled' | 'pending' | 'completed';
  doctorName: string;
  notes: string;
}

const initialAppointments: Appointment[] = [
  {
    id: "app-1",
    patientName: "Commandant Khaled Ben Amor",
    matricule: "AGT-0814",
    role: "Officier de Sécurité - Mornaguia",
    date: "2026-05-19",
    time: "14:00",
    duration: "60 min",
    severity: "critical",
    severityText: "🟥 Niveau 1 - Urgence Clinique",
    status: "scheduled",
    doctorName: "Dr. Rayhan",
    notes: "TSPT sévère suite à l'incident du Bloc C. Suivi EMDR et contrôle de la tension post-traumatique."
  },
  {
    id: "app-2",
    patientName: "Lt. Yassine Chaouachi",
    matricule: "AGT-1102",
    role: "Escorte et Transfert",
    date: "2026-05-20",
    time: "10:00",
    duration: "45 min",
    severity: "high",
    severityText: "🟧 Niveau 2 - Priorité Élevée",
    status: "scheduled",
    doctorName: "Dr. Rayhan",
    notes: "Symptômes d'épuisement professionnel sévère et troubles importants du sommeil. Entretien de soutien."
  },
  {
    id: "app-3",
    patientName: "Agent Béchir Mahmoud",
    matricule: "AGT-0341",
    role: "Garde de Nuit - Bizerte",
    date: "2026-05-22",
    time: "09:00",
    duration: "45 min",
    severity: "normal",
    severityText: "🟩 Niveau 4 - Suivi Normal",
    status: "pending",
    doctorName: "Dr. Rayhan",
    notes: "Évaluation de routine suite à réintégration après arrêt maladie."
  }
];

export default function CalendarPage() {
  const { role } = useAuth(); // Dynamically check active role (doctor or agent)
  
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(initialAppointments[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State for new appointment mockup
  const [newApp, setNewApp] = useState({
    patientName: '',
    matricule: '',
    role: 'Officier de Sécurité',
    date: '2026-05-20',
    time: '11:00',
    duration: '45 min',
    severity: 'high' as 'critical' | 'high' | 'normal',
    notes: ''
  });

  const daysInMonth = 31; // May has 31 days
  const firstDayIndex = 5; // May 1st, 2026 is a Friday (index 5)
  
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDayIndex }, (_, i) => null);

  // Filter appointments according to active role permissions
  const visibleAppointments = role === 'doctor' 
    ? appointments 
    : appointments.filter(app => app.patientName.includes("Khaled Ben Amor")); // Simulated confidential check: Agent only sees their own!

  const getAppointmentsForDay = (day: number) => {
    const formattedDay = `2026-05-${String(day).padStart(2, '0')}`;
    return visibleAppointments.filter(app => app.date === formattedDay);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Appointment = {
      id: `app-${Date.now()}`,
      patientName: newApp.patientName || "Agent CGPR Factice",
      matricule: newApp.matricule || "AGT-9999",
      role: newApp.role,
      date: newApp.date,
      time: newApp.time,
      duration: newApp.duration,
      severity: newApp.severity,
      severityText: newApp.severity === 'critical' ? '🟥 Niveau 1 - Urgence' : newApp.severity === 'high' ? '🟧 Niveau 2 - Priorité Élevée' : '🟩 Niveau 4 - Normal',
      status: 'scheduled',
      doctorName: 'Dr. Rayhan',
      notes: newApp.notes || 'Aucune note clinique spécifiée.'
    };

    setAppointments(prev => [...prev, created]);
    setSelectedApp(created);
    setShowAddModal(false);
    // Reset form
    setNewApp({
      patientName: '',
      matricule: '',
      role: 'Officier de Sécurité',
      date: '2026-05-20',
      time: '11:00',
      duration: '45 min',
      severity: 'high',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
            <Lock className="w-3.5 h-3.5" />
            {role === 'doctor' ? 'Espace Praticien Sécurisé CGPR' : 'Mon Espace Patient Sécurisé'}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold display-font tracking-tight">
            {role === 'doctor' ? (
              <>Agenda des <span className="text-primary">Téléconsultations</span></>
            ) : (
              <>Mon Calendrier de <span className="text-primary">Suivi Clinique</span></>
            )}
          </h1>
          <p className="text-secondary text-sm mt-1 max-w-2xl leading-relaxed">
            {role === 'doctor' 
              ? 'Consultez les plannings cliniques globaux de l\'administration pénitentiaire, gérez les priorités de triage et lancez les bridges Teams IA.' 
              : 'Retrouvez vos séances programmées avec votre psychologue référent. Pour des raisons de confidentialité médicale, les plannings des autres agents vous sont inaccessibles.'}
          </p>
        </div>

        {role === 'doctor' ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3.5 bg-primary text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Planifier un RDV
          </motion.button>
        ) : (
          <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex items-center gap-2.5 text-xs text-primary font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
            Accès Patient Sécurisé
          </div>
        )}
      </div>

      {/* ── STATS SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {role === 'doctor' ? (
          <>
            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Consultations planifiées</span>
                <h4 className="text-xl font-bold text-white mt-0.5">{appointments.length} séances</h4>
              </div>
            </GlassCard>

            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Urgences actives</span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {appointments.filter(app => app.severity === 'critical').length} cas critiques
                </h4>
              </div>
            </GlassCard>

            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Taux d'assiduité</span>
                <h4 className="text-xl font-bold text-white mt-0.5">100% validé</h4>
              </div>
            </GlassCard>
          </>
        ) : (
          <>
            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Mes séances prévues</span>
                <h4 className="text-xl font-bold text-white mt-0.5">{visibleAppointments.length} rendez-vous</h4>
              </div>
            </GlassCard>

            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Thérapeute assigné</span>
                <h4 className="text-xl font-bold text-white mt-0.5">Dr. Rayhan</h4>
              </div>
            </GlassCard>

            <GlassCard className="!p-5 flex items-center gap-4 border-white/5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Status de mon DCI</span>
                <h4 className="text-xl font-bold text-white mt-0.5">Chiffré & Transmis</h4>
              </div>
            </GlassCard>
          </>
        )}
      </div>

      {/* ── MAIN WORKSPACE GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: The Calendar Month Grid */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard className="!p-6 space-y-6">
            
            {/* Calendar Header / Month controls */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-lg font-extrabold display-font flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Mai 2026
              </h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Week Days list */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase font-bold tracking-widest text-secondary/60">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>

            {/* Grid days */}
            <div className="grid grid-cols-7 gap-2">
              {blankDays.map((_, index) => (
                <div key={`blank-${index}`} className="h-16 bg-white/[0.01] rounded-lg opacity-30" />
              ))}

              {calendarDays.map((day) => {
                const dayApps = getAppointmentsForDay(day);
                const isSelected = day === 19; // Highlight Current day (May 19, 2026)
                
                return (
                  <div
                    key={`day-${day}`}
                    className={`h-20 bg-white/[0.02] border p-2 rounded-xl flex flex-col justify-between hover:bg-white/[0.04] transition-all group ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(0,229,255,0.05)]' 
                        : 'border-white/5'
                    }`}
                  >
                    <span className={`text-xs font-bold font-mono ${
                      isSelected ? 'text-primary' : 'text-secondary/70 group-hover:text-white'
                    }`}>
                      {day}
                    </span>
                    
                    <div className="space-y-1">
                      {dayApps.map(app => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`w-full text-[8px] font-bold p-1 rounded font-sans truncate cursor-pointer transition-all hover:scale-105 ${
                            app.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            app.severity === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {app.time} {app.patientName.split(" ").slice(-1)[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: Role-based Action Panel */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="!p-6 space-y-6">
            
            {/* 🩺 DOCTOR PERSPECTIVE DETAIL PANEL */}
            {role === 'doctor' ? (
              selectedApp ? (
                <motion.div
                  key={selectedApp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedApp.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                      selectedApp.severity === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {selectedApp.severityText}
                    </span>
                    
                    <h3 className="font-extrabold text-xl text-white mt-3 leading-tight">
                      {selectedApp.patientName}
                    </h3>
                    <p className="text-[10px] text-secondary/60 font-mono mt-0.5">
                      {selectedApp.matricule} • {selectedApp.role}
                    </p>
                  </div>

                  <div className="border-t border-b border-white/5 py-4 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-secondary">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span>Mardi 19 Mai 2026</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-secondary">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{selectedApp.time} ({selectedApp.duration})</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-secondary">
                      <User className="w-4 h-4 text-primary" />
                      <span>Clinicien : <strong>{selectedApp.doctorName}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Synthèse d'évaluation DCI
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
                      "{selectedApp.notes}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        window.location.href = `/dashboard/teams`;
                      }}
                      className="w-full py-4 bg-[#5558EB] hover:bg-[#4649c9] text-white font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(85,88,235,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Lancer Séance Teams Bridge</span>
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-secondary space-y-2">
                  <CalendarIcon className="w-10 h-10 text-secondary/40" />
                  <p className="text-xs">Sélectionnez une consultation.</p>
                </div>
              )
            ) : (
              
              /* 👤 AGENT PERSPECTIVE DETAIL PANEL */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    🔴 Séance Urgente Classée Niveau 1
                  </span>
                  
                  <h3 className="font-extrabold text-xl text-white mt-3 leading-tight">
                    Ma Consultation de Suivi
                  </h3>
                  <p className="text-[10px] text-secondary/60 font-mono mt-0.5">
                    Rendez-vous individuel d'accompagnement post-traumatique.
                  </p>
                </div>

                <div className="border-t border-b border-white/5 py-4 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-secondary">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span>Mardi 19 Mai 2026</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-secondary">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>14:00 (60 minutes)</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-secondary">
                    <User className="w-4 h-4 text-primary" />
                    <span>Mon Clinicien : <strong>Dr. Rayhan</strong></span>
                  </div>
                </div>

                {/* Helpful prep tips for the agent */}
                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-primary animate-pulse" /> Préparer ma Séance
                  </h4>
                  <ul className="text-[11px] text-secondary space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Isolez-vous dans un bureau ou local calme et fermé.</li>
                    <li>Utilisez un casque ou des écouteurs pour préserver le secret médical de la conversation.</li>
                    <li>Vérifiez le fonctionnement de votre caméra et micro avant le lancement.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      // Standalone teams meetup simulation handler
                      window.location.href = "msteams://teams.microsoft.com/l/meetup-join/mock-clinical-bridge-cdt-khaled";
                      setTimeout(() => {
                        // Redirect client dashboard back to consultation active console
                        window.location.href = `/dashboard/teams`;
                      }, 1000);
                    }}
                    className="w-full py-4 bg-primary text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Rejoindre ma Séance Teams</span>
                  </button>
                </div>
              </motion.div>
            )}

          </GlassCard>
        </div>

      </div>

      {/* ── MODAL MOCKUP FOR DOCTOR ONLY ── */}
      <AnimatePresence>
        {showAddModal && role === 'doctor' && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg glass border border-white/10 rounded-3xl p-8 relative space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 p-2 text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-xl font-extrabold display-font flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  Nouvelle Planification Clinique
                </h3>
                <p className="text-xs text-secondary mt-1">
                  Ce rendez-vous sera notifié à l'agent et synchronisé avec le service d'évaluation.
                </p>
              </div>

              <form onSubmit={handleCreateAppointment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Nom de l'agent</label>
                    <input
                      type="text"
                      placeholder="Ex: Cdt. Khaled Ben Amor"
                      value={newApp.patientName}
                      onChange={e => setNewApp(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Matricule</label>
                    <input
                      type="text"
                      placeholder="Ex: AGT-0814"
                      value={newApp.matricule}
                      onChange={e => setNewApp(prev => ({ ...prev, matricule: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Date</label>
                    <input
                      type="date"
                      value={newApp.date}
                      onChange={e => setNewApp(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Heure</label>
                    <input
                      type="time"
                      value={newApp.time}
                      onChange={e => setNewApp(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Urgence Triage</label>
                    <select
                      value={newApp.severity}
                      onChange={e => setNewApp(prev => ({ ...prev, severity: e.target.value as any }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary transition-colors"
                    >
                      <option className="bg-background" value="normal">Normal (Vert)</option>
                      <option className="bg-background" value="high">Élevé (Orange)</option>
                      <option className="bg-background" value="critical">Critique (Rouge)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-secondary">Diagnostic Initiale / Notes</label>
                  <textarea
                    placeholder="Inscrivez les observations cliniques ou alertes détectées sur le DCI..."
                    value={newApp.notes}
                    onChange={e => setNewApp(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-white"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
                  >
                    Confirmer la planification
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
