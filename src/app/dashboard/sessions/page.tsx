"use client";
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeyGenAvatar, HeyGenAvatarHandle } from '@/components/ai/HeyGenAvatar';
import { Play, Square } from 'lucide-react';
import { TranscriptHistory } from '@/components/ai/TranscriptHistory';
import { useSearchParams } from 'next/navigation';

export default function SessionsPage() {
  const avatarRef = useRef<HeyGenAvatarHandle>(null);
  const [messages, setMessages] = useState<{ text: string; role: 'user' | 'agent' }[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const searchParams = useSearchParams();

  const handleStartSession = async () => {
    setIsSessionActive(true);
    await avatarRef.current?.startSession();
  };

  useEffect(() => {
    if (searchParams.get('start') === 'true') {
      // Small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        handleStartSession();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleStopSession = async () => {
    setIsSessionActive(false);
    await avatarRef.current?.terminateSession();
  };

  const handleTestMessage = () => {
    if (!inputText) return;
    avatarRef.current?.sendMessage(inputText);
    setInputText("");
    setIsAgentTyping(true); // Start showing the indicator
  };

  const handleTranscript = (msg: { text: string; role: 'user' | 'agent' }) => {
    if (msg.role === 'agent') {
      setIsAgentTyping(false); // Hide indicator when text starts arriving
    }
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.role === msg.role) {
        return [...prev.slice(0, -1), msg];
      }
      return [...prev, msg];
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="hidden xl:flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold display-font">Session <span className="text-primary">IA en Direct</span></h1>
          <p className="text-secondary mt-2 text-sm md:text-base hidden md:block">Interagissez avec l'assistant pour une analyse sémantique temps réel.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartSession}
            className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold text-xs sm:text-sm tracking-widest uppercase overflow-hidden group shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-shadow w-full sm:flex-1 xl:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Play className="w-4 h-4 fill-primary flex-shrink-0" />
            <span className="truncate">Initialiser l'IA</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStopSession}
            className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs sm:text-sm tracking-widest uppercase group hover:bg-red-500/20 transition-colors w-full sm:flex-1 xl:w-auto"
          >
            <Square className="w-4 h-4 fill-red-400 flex-shrink-0" />
            <span className="truncate">Clôturer</span>
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 flex-1">
        {/* Avatar Container */}
        <div className="flex items-center justify-center bg-surface-bright/30 rounded-[3rem] border border-white/5 relative overflow-hidden h-[500px] xl:h-auto">
          <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
          <HeyGenAvatar ref={avatarRef} onTranscript={handleTranscript} />
        </div>

        {/* Controls & Chat History Component */}
        <TranscriptHistory 
          messages={messages}
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={handleTestMessage}
          onStartSession={handleStartSession}
          onStopSession={handleStopSession}
          isAgentTyping={isAgentTyping}
          isSessionActive={isSessionActive}
        />
      </div>
    </div>
  );
}
