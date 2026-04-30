"use client";
import { motion } from "framer-motion";

export const SmartBanner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/80">CORE_V1.4_ACTIVE</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-6 pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/40">LATENCY</span>
            <span className="text-[10px] font-mono text-primary font-bold">12MS</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/40">UPTIME</span>
            <span className="text-[10px] font-mono text-tertiary font-bold">99.9%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
