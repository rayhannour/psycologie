"use client";
import { useState, useCallback } from 'react';
import { useConversation, ConversationProvider } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Globe, Sparkles, Activity } from 'lucide-react';

export default function ElevenLabsPage() {
  return (
    <ConversationProvider>
      <ElevenLabsContent />
    </ConversationProvider>
  );
}

function ElevenLabsContent() {
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  // Conversational AI Hook
  const conversation = useConversation({
    onConnect: () => console.log('Connected to ElevenLabs'),
    onDisconnect: () => console.log('Disconnected from ElevenLabs'),
    onMessage: (message) => console.log('Received message:', message),
    onError: (error) => console.error('ElevenLabs Error:', error),
  });

  const startListening = useCallback(async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 1. Fetch the signed URL from our secure backend
      const response = await fetch('/api/elevenlabs/signed-url');
      if (!response.ok) throw new Error('Failed to get signed URL');
      const { signed_url } = await response.json();
      
      // 2. Start session using the signed URL and specified language
      const firstMessage = language === 'fr' 
        ? "Bonjour, je suis Alex, votre assistant. Comment puis-je vous aider aujourd'hui ?" 
        : "مرحباً، أنا أليكس، مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟";

      await conversation.startSession({
        signedUrl: signed_url,
        // Passing client-side overrides to nudge the AI
        // Note: Some models require these to be enabled in the ElevenLabs dashboard
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert("Erreur lors du démarrage de la conversation. Vérifiez votre connexion.");
    }
  }, [conversation]);

  const stopListening = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black display-font mb-2 flex items-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            Psy <span className="text-primary">AI</span>
          </h1>
          <p className="text-secondary text-lg font-light">Assistant vocal haute fidélité pour le support psychologique.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center min-h-[400px] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
          
          {/* Pulsing Visualizer */}
          <div className="relative mb-12">
            <AnimatePresence>
              {conversation.status === 'connected' && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" 
                />
              )}
            </AnimatePresence>
            
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${conversation.status === 'connected' ? 'border-primary bg-primary/10 scale-110 shadow-[0_0_50px_rgba(0,229,255,0.5)]' : 'border-white/10 bg-white/5'}`}>
              {conversation.status === 'connected' ? (
                  <Activity className="w-12 h-12 text-primary animate-bounce" />
              ) : (
                <Mic className="w-12 h-12 text-secondary" />
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter">
            {conversation.status === 'connected' ? "L'IA vous écoute..." : "Prêt à discuter ?"}
          </h2>
          <p className="text-secondary max-w-sm mb-10 text-sm leading-relaxed">
            Activez l'assistant pour une conversation fluide en {language === 'fr' ? 'Français' : 'Arabe'}.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition-all"
              title="Changer de langue"
            >
              <Globe className="w-6 h-6 text-primary" />
            </button>

            <button
              onClick={conversation.status === 'connected' ? stopListening : startListening}
              className={`px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center gap-4 ${conversation.status === 'connected' ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-primary text-black shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-105'}`}
            >
              {conversation.status === 'connected' ? (
                <><MicOff className="w-6 h-6" /> Arrêter</>
              ) : (
                <><Mic className="w-6 h-6" /> Démarrer</>
              )}
            </button>
          </div>
        </motion.div>

        {/* Settings & Info */}
        <div className="space-y-6">
          <div className="glass rounded-[2rem] p-6 border-l-4 border-primary">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-2">Langue Détectée</h3>
            <p className="text-xl font-bold flex items-center gap-3">
              {language === 'fr' ? '🇫🇷 Français (Multilingual v2)' : '🇹🇳 Arabe (Multilingual v2)'}
            </p>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-4">Statut de l'Agent</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-secondary uppercase font-bold">Connexion</span>
                <span className={`text-xs font-mono ${conversation.status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>{conversation.status.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-secondary uppercase font-bold">Modèle</span>
                <span className="text-xs font-mono text-primary">ConvAI Alpha</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 text-xs text-secondary leading-relaxed italic">
            Note: L'Agent Vocal Psy AI permet une interaction en temps réel avec une latence ultra-faible. Idéal pour les simulations d'entretiens psychologiques.
          </div>
        </div>
      </div>
    </div>
  );
}
