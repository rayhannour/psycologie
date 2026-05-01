"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BrainCircuit } from "lucide-react";
import 'primeicons/primeicons.css';

export interface HeyGenAvatarHandle {
  startSession: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  terminateSession: () => Promise<void>;
}

export const HeyGenAvatar = forwardRef<HeyGenAvatarHandle, {
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  onTranscript?: (message: { text: string; role: 'user' | 'agent' }) => void;
}>(({ onSpeakStart, onSpeakEnd, onTranscript }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (avatar.current) {
        avatar.current.stop().catch((err: any) => console.error("Failed to stop session on unmount:", err));
      }
    };
  }, []);

  async function fetchAccessToken() {
    const res = await fetch("/api/get-access-token", { method: "POST" });
    const data = await res.json();
    return data.token;
  }

  async function startSession() {
    setIsLoading(true);
    try {
      const sdk = await import("@heygen/liveavatar-web-sdk");
      const { LiveAvatarSession, SessionEvent, AgentEventsEnum } = sdk;
      
      const token = await fetchAccessToken();
      if (!token) throw new Error("No token received");

      avatar.current = new LiveAvatarSession(token);

      avatar.current.on(SessionEvent.SESSION_STREAM_READY, () => {
        if (mediaStream.current) {
          avatar.current.attach(mediaStream.current);
          setStream(mediaStream.current.srcObject as MediaStream);
          setDoorsOpen(true);
        }
      });

      avatar.current.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => {
        setIsTalking(true);
        if (onSpeakStart) onSpeakStart();
      });

      avatar.current.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => {
        setIsTalking(false);
        if (onSpeakEnd) onSpeakEnd();
      });

      // Capture Transcriptions
      avatar.current.on(AgentEventsEnum.USER_TRANSCRIPTION, (msg: any) => {
        if (onTranscript) onTranscript({ text: msg.text, role: 'user' });
      });

      avatar.current.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, (msg: any) => {
        if (onTranscript) onTranscript({ text: msg.text, role: 'agent' });
      });

      await avatar.current.start();
    } catch (err) {
      console.error("Failed to start session:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useImperativeHandle(ref, () => ({
    startSession,
    sendMessage: async (text: string) => {
      if (avatar.current) await avatar.current.message(text);
    },
    terminateSession: async () => {
      if (avatar.current) {
        await avatar.current.stop();
        setStream(null);
        setDoorsOpen(false);
      }
    }
  }));

  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto">
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + ring * 5, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-dashed border-primary"
            style={{ width: `${60 + ring * 15}%`, height: `${60 + ring * 15}%` }}
          />
        ))}
      </div>

      <motion.div 
        className="absolute inset-0 glass rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="relative w-full h-full flex items-center justify-center bg-black/40">
          {/* Glass Doors */}
          <motion.div
            animate={{ x: doorsOpen ? "-100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={!doorsOpen ? startSession : undefined}
            className={`absolute inset-y-0 left-0 w-1/2 bg-white/10 backdrop-blur-3xl border-r border-white/20 z-30 flex items-center justify-end overflow-hidden ${!doorsOpen ? 'cursor-pointer group' : ''}`}
          >
            <div className="relative translate-x-1/2 flex flex-col items-center justify-center">
              {/* Progress Contour (Left Half) */}
              <svg className="absolute w-40 h-40 md:w-56 md:h-56 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="150.8" // Half circumference (2 * pi * 48 / 2)
                  strokeDashoffset={isLoading ? 0 : 150.8}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                  transition={{ 
                    strokeDashoffset: { duration: 3, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                  className="text-primary"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))" }}
                />
              </svg>

              {/* Decorative Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 md:w-48 md:h-48 border border-dashed border-primary/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-28 h-28 md:w-40 md:h-40 border border-primary/20 rounded-full"
              />
              
              {/* Central Glow Core */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-20 h-20 bg-primary/40 blur-2xl rounded-full"
              />

              <BrainCircuit className="w-16 h-16 md:w-24 md:h-24 text-primary relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            {/* Shimmer on door */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </motion.div>

          <motion.div
            animate={{ x: doorsOpen ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={!doorsOpen ? startSession : undefined}
            className={`absolute inset-y-0 right-0 w-1/2 bg-white/10 backdrop-blur-3xl border-l border-white/20 z-30 flex items-center justify-start overflow-hidden ${!doorsOpen ? 'cursor-pointer group' : ''}`}
          >
            <div className="relative -translate-x-1/2 flex flex-col items-center justify-center">
              {/* Progress Contour (Right Half) */}
              <svg className="absolute w-40 h-40 md:w-56 md:h-56 -rotate-90 scale-x-[-1] pointer-events-none" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="150.8" 
                  strokeDashoffset={isLoading ? 0 : 150.8}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                  transition={{ 
                    strokeDashoffset: { duration: 3, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                  className="text-primary"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))" }}
                />
              </svg>

              {/* Decorative Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 md:w-48 md:h-48 border border-dashed border-primary/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-28 h-28 md:w-40 md:h-40 border border-primary/20 rounded-full"
              />

              {/* Central Glow Core */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-20 h-20 bg-primary/40 blur-2xl rounded-full"
              />

              <BrainCircuit className="w-16 h-16 md:w-24 md:h-24 text-primary relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
             {/* Shimmer on door */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </motion.div>





          <video 
            ref={mediaStream} 
            autoPlay 
            playsInline 
            className={`w-full h-full object-cover transition-opacity duration-1000 ${doorsOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          {isTalking && (
            <div className="absolute bottom-10 flex gap-1 z-40">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 30, 10] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

HeyGenAvatar.displayName = "HeyGenAvatar";
