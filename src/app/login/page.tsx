"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Reset offline bypass state on mount to allow fresh logins
  useEffect(() => {
    localStorage.removeItem("offline_mode");
  }, []);

  const handleOfflineBypass = () => {
    localStorage.setItem("offline_mode", "true");
    localStorage.setItem("cgpr_role_mock-offline-id", "doctor"); // Set default role to doctor for testing
    window.location.href = '/dashboard';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      if (isRegistering) {
        setError("Erreur lors de la création du compte. L'email est peut-être déjà utilisé.");
      } else {
        setError("Identifiants invalides ou compte inexistant.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError("Échec de la connexion avec Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-primary-container/5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <BrainCircuit className="text-primary w-10 h-10" />
            <span className="text-2xl font-bold display-font">CGPR <span className="text-primary">PSY</span></span>
          </Link>
          <h1 className="text-3xl font-bold display-font mb-2">{isRegistering ? 'Créer un compte' : 'Bon retour'}</h1>
          <p className="text-secondary text-sm">
            {isRegistering ? 'Rejoignez la plateforme CGPR Psychologie.' : 'Connectez-vous à votre espace praticien sécurisé.'}
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-secondary px-1">Email professionnel</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.rayhan@clinic.fr"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-secondary">Mot de passe</label>
              <Link href="#" className="text-xs text-primary hover:underline">Oublié ?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-sm"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full py-4 mt-4 rounded-2xl bg-primary text-black font-black text-base uppercase tracking-widest cursor-pointer overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.7)] transition-shadow group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {/* Shimmer sweep */}
            {!loading && <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[200%] transition-all duration-700" />}
            {/* Top shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <span className="relative z-10">{loading ? 'Vérification...' : (isRegistering ? "S'inscrire" : 'Se connecter')}</span>
            {!loading && (
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            )}
          </motion.button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-secondary font-bold tracking-widest">Ou continuer avec</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </motion.button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-background px-3 text-secondary font-bold tracking-widest">Développement Local</span>
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOfflineBypass}
          className="w-full py-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(0,229,255,0.05)] hover:shadow-[0_0_25px_rgba(0,229,255,0.15)]"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Accéder en Mode Démo Hors-ligne</span>
        </motion.button>

        <p className="text-center text-xs text-secondary mt-8">
          {isRegistering ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-primary hover:underline font-bold"
          >
            {isRegistering ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>

        <p className="text-center text-xs text-secondary mt-4 opacity-50">
          En continuant, vous acceptez nos <Link href="#" className="text-primary hover:underline">Conditions</Link> et notre <Link href="#" className="text-primary hover:underline">Confidentialité</Link>.
        </p>
      </motion.div>
    </div>
  );
}
