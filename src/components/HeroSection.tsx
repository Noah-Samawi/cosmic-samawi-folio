import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  // Smooth scroll for hash anchors
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Backdrop layer 1: ambient orb */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[640px] w-[640px] rounded-full bg-cyan-500/20 blur-3xl"
      />
      {/* Backdrop layer 2: circuit grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 circuit-grid"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-cyan-300">
                DSGVO-Ready · Security-First
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance text-foreground mb-6"
          >
            {t('hero.headline.before')}{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              {t('hero.headline.accent')}
            </span>{' '}
            {t('hero.headline.after')}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          >
            {t('hero.subhead')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-base transition-all duration-150 hover:bg-cyan-400 shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>

            <button
              onClick={() => scrollTo('services')}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 font-medium text-base transition-all duration-150 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t('hero.cta.secondary')}
            </button>
          </motion.div>

          {/* Tertiary: Firmenprofil PDF */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex justify-center mb-8"
          >
            <a
              href="/Firmenprofil.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-2 py-1"
            >
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              {t('hero.cta.profile')} (PDF)
            </a>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Frankfurt am Main
            </span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span>IT-Engineer & Full-Stack Developer</span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="font-medium text-slate-400">DE · EN · AR</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
