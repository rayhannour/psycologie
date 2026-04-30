"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Play, Square, Mic } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface Message {
  text: string;
  role: 'user' | 'agent';
}

interface TranscriptHistoryProps {
  messages: Message[];
  inputText: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onStartSession?: () => void;
  onStopSession?: () => void;
  isAgentTyping?: boolean;
  isSessionActive?: boolean;
}

export function TranscriptHistory({ 
  messages, 
  inputText, 
  onInputChange, 
  onSendMessage,
  onStartSession,
  onStopSession,
  isAgentTyping,
  isSessionActive
}: TranscriptHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState<'fr-FR' | 'ar-TN'>('fr-FR');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = lang;
      }
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onInputChange(transcript);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onInputChange]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Microphone access error:", e);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-[400px] lg:h-full">
      <div className="glass p-4 lg:p-6 rounded-[2rem] flex flex-col overflow-hidden relative h-[400px] lg:h-full">
        <div className="flex items-center justify-between mb-6 order-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-bold display-font uppercase tracking-widest text-[10px] sm:text-xs">Transcription <span className="xl:hidden">IA</span></h3>
          </div>
          
          {/* Mobile Only Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <button 
              onClick={onStartSession}
              className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              title="Initialiser l'IA"
            >
              <Play className="w-4 h-4 fill-primary" />
            </button>
            <button 
              onClick={onStopSession}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              title="Clôturer"
            >
              <Square className="w-4 h-4 fill-red-400" />
            </button>
          </div>
        </div>

        {/* Input Area - Shows first on mobile (order-2), last on desktop (lg:order-3) */}
        <div className="mb-6 pb-6 border-b lg:border-b-0 lg:border-t border-white/5 order-2 lg:order-3 lg:mt-6 lg:pt-6 lg:mb-0">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={lang === 'fr-FR' ? "Posez une question à l'assistant..." : "اكتب سؤالك للمساعد..."}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-32 outline-none focus:border-primary transition-colors text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSendMessage();
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => setLang(lang === 'fr-FR' ? 'ar-TN' : 'fr-FR')}
                className="text-[10px] font-mono font-bold text-secondary hover:text-white transition-colors px-2 py-1 bg-white/5 rounded-md border border-white/10"
                title="Changer la langue (FR/AR)"
              >
                {lang === 'fr-FR' ? 'FR' : 'AR'}
              </button>
              <button 
                onClick={toggleListening}
                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-white/50 hover:text-white'}`}
                title="Saisie Vocale"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </button>
              <button 
                onClick={onSendMessage}
                className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area - Shows second on mobile (order-3), middle on desktop (lg:order-2) */}
        <div 
          ref={scrollRef}
          className="h-[100px] lg:h-[400px] overflow-y-auto overflow-x-hidden space-y-4 pr-2 fitness-scrollbar order-3 lg:order-2 flex-1"
        >
          <AnimatePresence initial={false}>
            {messages.length === 0 && !isSessionActive ? (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center text-secondary/30 text-sm italic text-center px-4"
              >
                L'analyse sémantique s'affichera ici en temps réel...
              </motion.div>
            ) : (
              messages.map((msg, i) => (
                <motion.div
                  key={`msg-${i}-${msg.role}`}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >

                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-primary/20 border border-primary/30 text-white rounded-br-none shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'bg-white/5 border border-white/10 text-secondary rounded-bl-none'
                  }`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      components={{
                        p: ({children}) => <p className="leading-relaxed mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="leading-relaxed">{children}</li>,
                        code: ({children}) => <code className="bg-white/10 px-1 rounded text-primary">{children}</code>,
                        table: ({children}) => <div className="overflow-x-auto mb-2"><table className="min-w-full border-collapse border border-white/10">{children}</table></div>,
                        th: ({children}) => <th className="border border-white/10 p-2 bg-white/5 text-left text-xs font-bold uppercase tracking-wider">{children}</th>,
                        td: ({children}) => <td className="border border-white/10 p-2 text-xs">{children}</td>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))
            )}

            {isAgentTyping && (
              <motion.div
                key="typing-indicator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
