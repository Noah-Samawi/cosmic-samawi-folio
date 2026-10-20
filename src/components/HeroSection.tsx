import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, FileText, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Backdrop layer 1: ambient cyan orb */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[640px] w-[640px] rounded-full bg-cyan-500/20 blur-3xl"
      />
      {/* Backdrop layer 2: circuit grid (pure CSS, 48x48) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300/30 bg-amber-300/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
              </span>
              <span className="text-xs font-medium text-amber-200">
                {t('hero.status')}
              </span>
            </div>
          </motion.div>

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
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
            Noah{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Al-Samawi
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          >
            {t('hero.role')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <div className="flex flex-col items-center">
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-base transition-all duration-150 hover:bg-cyan-400 shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {t('hero.cta.primary')}
              </button>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('hero.cta.caption')}
              </p>
            </div>

            <a
              href="/Firmenprofil.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 font-medium text-base transition-all duration-150 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {t('hero.cta.secondary')}
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
              {t('hero.tagline')}
            </span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="font-medium text-slate-400">DE · EN · AR</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
