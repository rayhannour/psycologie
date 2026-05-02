"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  BrainCircuit,
  Search,
  Menu,
  X,
  Video,
  RefreshCw
} from 'lucide-react';

// Define all possible items
const allItems = [
  { icon: LayoutDashboard, label: "Tableau de Bord", href: "/dashboard", roles: ['doctor'] },
  { icon: Users, label: "Patients", href: "/dashboard/patients", roles: ['doctor'] },
  { icon: Calendar, label: "Agenda", href: "/dashboard/calendar", roles: ['agent', 'doctor'] },
  { icon: MessageSquare, label: "Assistant IA", href: "/dashboard/sessions", roles: ['agent'] },
  { icon: MessageSquare, label: "Suivi IA", href: "/dashboard/sessions", roles: ['doctor'] },
  { icon: Video, label: "Assistant Team", href: "/dashboard/teams", roles: ['agent'] },
  { icon: Video, label: "Séances Teams", href: "/dashboard/teams", roles: ['doctor'] },
  { icon: BrainCircuit, label: "Analyses", href: "/dashboard/analytics", roles: ['doctor'] },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings", roles: ['doctor'] },
];

import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter items based on role
  const sidebarItems = allItems.filter(item => item.roles.includes(role));

  useEffect(() => {
    if (!loading && !user) {
      router.push('/unauthorized');
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    // Clear any session data here if needed
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <BrainCircuit className="w-12 h-12 text-primary animate-pulse" />
          <p className="text-secondary text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Vérification de l'identité...</p>
        </div>
      </div>
    );
  }

  if (!user) return null; // Prevent flicker before redirect

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 flex flex-col
        transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/dashboard/sessions?start=true" className="flex items-center gap-2 group">
            <BrainCircuit className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold display-font">CGPR <span className="text-primary">PSY</span></span>
          </Link>
          <button
            className="md:hidden text-secondary hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto fitness-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-primary-container/20 text-primary border border-primary/20'
                    : 'text-secondary hover:bg-white/5 hover:text-foreground'
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.96 }}
            onClick={async () => {
              if (user) {
                const newRole = role === 'agent' ? 'doctor' : 'agent';
                await updateDoc(doc(db, "users", user.uid), { role: newRole });
                window.location.reload(); // Reload to apply context change
              }
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-primary/70 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer group border border-primary/10"
          >
            <RefreshCw className="w-5 h-5 flex-shrink-0 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-medium">Passer en mode {role === 'agent' ? 'Praticien' : 'Agent'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:animate-pulse" />
            <span className="text-sm font-medium">Déconnexion</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 md:h-16 glass border-b border-white/5 md:border-b flex items-center justify-between px-4 md:px-8 z-10 gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              className="md:hidden p-2 -ml-2 text-secondary hover:text-white rounded-lg hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-3 md:gap-4 bg-white/5 px-3 md:px-4 py-2 rounded-lg w-full max-w-sm border border-white/5">
              <Search className="w-4 h-4 text-secondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent border-none outline-none text-sm w-full text-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold truncate">{user?.displayName || user?.email?.split('@')[0] || "Praticien"}</p>
              <p className="text-xs text-secondary truncate">Espace Sécurisé</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-container/30 border border-primary/20 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-primary/20 transition-colors">
              <span className="text-primary font-bold text-xs md:text-base">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'P')}
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-2 md:p-8 bg-surface-dim/30 scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
}
