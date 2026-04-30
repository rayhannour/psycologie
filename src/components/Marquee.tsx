"use client";
import { motion } from 'framer-motion';

const techKeywords = [
  "NEUROSCIENCES", "INTELLIGENCE ARTIFICIELLE", "ANALYSE SÉMANTIQUE", 
  "BIOMÉTRIE", "CONFIDENTIALITÉ", "ÉTHIQUE", "CLINIQUE", "INNOVATION"
];

export default function Marquee() {
  return (
    <div className="py-20 bg-background overflow-hidden border-y border-white/5">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 items-center"
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-20">
            {techKeywords.map((word, j) => (
              <span key={j} className="text-6xl md:text-8xl font-bold display-font opacity-10 hover:opacity-50 transition-opacity cursor-default tracking-tighter">
                {word}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
