"use client";
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({ children, className = "", hoverEffect = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass p-6 rounded-2xl ${hoverEffect ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
