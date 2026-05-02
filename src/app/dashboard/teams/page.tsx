"use client";
import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import { useState } from 'react';

export default function TeamsPage() {
  // En production, ce token et cette URL seraient générés via l'API côté serveur
  const [token, setToken] = useState("");
  const serverUrl = "wss://your-livekit-server.livekit.cloud";

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-[#5558EB]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(85,88,235,0.3)]">
          <i className="pi pi-video text-[#5558EB] text-3xl" />
        </div>
        <h1 className="text-3xl font-bold mb-4 font-manrope uppercase tracking-wider">Salle de Téléconsultation</h1>
        <p className="text-secondary max-w-md mb-8 font-light leading-relaxed">
          Espace sécurisé de communication avec les psychologues agréés. L'infrastructure vidéo repose sur le protocole WebRTC de LiveKit.
        </p>
        <button 
          onClick={() => setToken("simulate-token-for-ui")} 
          className="px-8 py-4 bg-gradient-to-r from-[#5558EB] to-[#7173e6] rounded-2xl text-white font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(85,88,235,0.6)] hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <i className="pi pi-lock text-white/70" />
          Initialiser Session LiveKit
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-container rounded-[2rem] border border-white/10 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Header Info */}
      <div className="w-full bg-black/40 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">Live: Session Psychologue</span>
        </div>
        <button 
          onClick={() => setToken("")}
          className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors font-mono text-[10px] uppercase font-bold"
        >
          Clôturer Communication
        </button>
      </div>

      {/* LiveKit Video Conference UI */}
      <div className="flex-1 bg-black relative" style={{ minHeight: "60vh" }}>
        {token === "simulate-token-for-ui" ? (
          <div className="w-full h-full flex flex-col relative bg-[#111]">
            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#222] rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                <i className="pi pi-user text-white/20 text-6xl" />
                <span className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-xs">Psychologue (Vous)</span>
              </div>
              <div className="bg-[#222] rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                <i className="pi pi-user text-white/20 text-6xl" />
                <span className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-xs">Patient / Agent</span>
              </div>
            </div>
            <div className="h-16 bg-[#1a1a1a] flex items-center justify-center gap-4 border-t border-white/10">
               <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><i className="pi pi-microphone text-white" /></button>
               <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><i className="pi pi-video text-white" /></button>
               <button onClick={() => setToken("")} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600"><i className="pi pi-phone text-white" /></button>
            </div>
          </div>
        ) : (
          <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            className="w-full h-full"
            onDisconnected={() => setToken("")}
          >
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        )}
        
        {/* Mockup Overlay if connect is false (since token is fake) */}
        {token === "simulate-token-for-ui" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center">
            <i className="pi pi-spin pi-spinner text-4xl text-[#5558EB] mb-6" />
            <p className="text-white font-mono text-sm tracking-widest uppercase max-w-md mb-4">
              En attente de connexion au serveur LiveKit. 
            </p>
            <p className="text-white/50 text-xs max-w-md">
              (Le code d'intégration complet LiveKitRoom est prêt dans `page.tsx`. Remplacez `simulate-token-for-ui` par un vrai jeton JWT pour activer le flux vidéo WebRTC réel).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
