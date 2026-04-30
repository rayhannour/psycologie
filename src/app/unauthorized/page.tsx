"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, BrainCircuit } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[2.5rem] relative z-10 border-red-500/20"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <Lock className="w-10 h-10 text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold display-font mb-4">Accès Refusé</h1>
        <p className="text-secondary leading-relaxed mb-10">
          Désolé, cet espace est strictement réservé aux praticiens authentifiés. Veuillez vous connecter pour accéder au portail CGPR Psycologie.
        </p>
        
        <div className="space-y-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full btn btn-primary py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
            >
              Se Connecter
            </motion.button>
          </Link>
          
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 text-secondary hover:text-white text-xs font-bold uppercase tracking-widest transition-colors py-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-2 opacity-30">
          <BrainCircuit className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sécurité Biométrique Active</span>
        </div>
      </motion.div>
    </div>
  );
}
