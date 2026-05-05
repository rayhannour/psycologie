"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#features', label: 'Solutions', icon: 'pi-th-large' },
  { href: '#ia', label: 'Technologie', icon: 'pi-microchip' },
  { href: '#pricing', label: 'Workflows', icon: 'pi-tag' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled
            ? 'py-3 bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* ── Logo ─────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary blur-[10px] rounded-full"
              />
              <div className="relative w-9 h-9 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                <BrainCircuit className="text-primary w-5 h-5" />
              </div>
            </div>
            <span className="text-xl font-black font-outfit tracking-tight uppercase">
              CGPR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
                Psy
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────── */}
          <div className="hidden md:flex items-center gap-2 relative">
            {/* Glass pill container */}
            <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHovered(link.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Animated glass highlight on hover */}
                  {hovered === link.href && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 text-white/50 hover:text-white"
                  >
                    <i className={`pi ${link.icon} text-[11px] opacity-70`} />
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative ml-2 flex items-center gap-2 px-6 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-[0.15em] overflow-hidden group"
              >
                {/* Glass layers */}
                <div className="absolute inset-0 bg-primary/10 backdrop-blur-md border border-primary/30 rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
                {/* Top shine */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                {/* Glow on hover */}
                <motion.div
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-primary/5 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                />
                {/* Sweep shimmer */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[200%] transition-all duration-700" />
                <i className="pi pi-user relative z-10 text-primary text-[11px]" />
                <span className="relative z-10 text-white">Espace Client</span>
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile burger ──────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu ──────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[68px] left-4 right-4 z-40 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-4 flex flex-col gap-2"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  <i className={`pi ${link.icon} text-primary text-base`} />
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-white/[0.06] mt-1 pt-3">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary/20 transition-colors backdrop-blur-sm">
                  Espace Client
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
