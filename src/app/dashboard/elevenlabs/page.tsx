"use client";
import { useState, useCallback, useRef, useEffect } from 'react';
import { useConversation, ConversationProvider } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Globe, Sparkles, Activity, Play, Download, Trash2 } from 'lucide-react';

export default function ElevenLabsPage() {
  return (
    <ConversationProvider>
      <ElevenLabsContent />
    </ConversationProvider>
  );
}

function ElevenLabsContent() {
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
  const [activeTab, setActiveTab] = useState<'agent' | 'tts'>('agent');
  const [ttsText, setTtsText] = useState("");
  const [isGeneratingTts, setIsGeneratingTts] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
      
      // In a real scenario, you'd fetch the signed URL from your API
      // Using your real Agent ID
      const agentId = "8301kqvk1h4xfa096j8acw49d4ac"; 
      
      await conversation.startSession({
        agentId: agentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert("Note: Pour utiliser l'Agent Vocal, vous devez créer un Agent sur le dashboard ElevenLabs et configurer son ID.");
    }
  }, [conversation]);

  const stopListening = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const generateTTS = async () => {
    if (!ttsText) return;
    setIsGeneratingTts(true);
    try {
      const response = await fetch('/api/elevenlabs/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: ttsText,
          language: language,
        }),
      });

      if (!response.ok) throw new Error('TTS Generation failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la génération audio. Vérifiez votre clé API ElevenLabs.");
    } finally {
      setIsGeneratingTts(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black display-font mb-2 flex items-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            ELEVENLABS <span className="text-primary">AI</span>
          </h1>
          <p className="text-secondary text-lg font-light">Assistant vocal haute fidélité pour le support psychologique.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab('agent')}
            className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'agent' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'text-secondary hover:text-white'}`}
          >
            Agent Vocal
          </button>
          <button 
            onClick={() => setActiveTab('tts')}
            className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'tts' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'text-secondary hover:text-white'}`}
          >
            Synthèse (TTS)
          </button>
        </div>
      </div>

      {activeTab === 'agent' ? (
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
              Note: L'Agent Vocal ElevenLabs permet une interaction en temps réel avec une latence ultra-faible (inférieure à 500ms). Idéal pour les simulations d'entretiens psychologiques.
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* TTS Input */}
          <div className="md:col-span-2 glass rounded-[2.5rem] p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold uppercase tracking-tight">Texte à synthétiser</h3>
              <button onClick={() => setTtsText("")} className="p-2 text-secondary hover:text-red-400 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <textarea 
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              placeholder="Saisissez le texte ici (Français ou Arabe)..."
              className="flex-1 min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-primary transition-all text-lg resize-none"
            />

            <button
              onClick={generateTTS}
              disabled={isGeneratingTts || !ttsText}
              className="w-full py-5 rounded-2xl bg-primary text-black font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:grayscale transition-all"
            >
              {isGeneratingTts ? <Activity className="animate-spin w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              {isGeneratingTts ? "Génération en cours..." : "Lancer la Synthèse"}
            </button>
          </div>

          {/* TTS Output & Controls */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[250px]">
              {audioUrl ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Volume2 className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="font-bold">Audio Généré</h4>
                  <audio controls src={audioUrl} className="w-full mt-4 fitness-scrollbar" />
                  <a 
                    href={audioUrl} 
                    download="synthese_cgpr.mp3"
                    className="mt-4 text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Télécharger MP3
                  </a>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 opacity-50">
                    <Play className="w-10 h-10 text-secondary" />
                  </div>
                  <p className="text-secondary text-sm italic">Aucun audio généré pour le moment.</p>
                </>
              )}
            </div>

            <div className="glass rounded-[2rem] p-6 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary">Voix Sélectionnée</h3>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold text-primary">R</div>
                <div>
                  <p className="text-sm font-bold">Rachel</p>
                  <p className="text-[10px] uppercase text-secondary">Multilingual v2</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
