import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImg from '@/assets/hero-code.jpg';
import { Button } from '@/components/ui/button';

const stack = ['React', 'TypeScript', 'Python', 'Django', 'Docker', 'AWS'];

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-slate-950"
    >
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-0 h-full w-full object-cover opacity-50"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.08] px-4 py-1.5 text-sm text-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              {t('hero.status')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-foreground mb-4"
          >
            Noah Al-Samawi
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6"
          >
            {t('hero.role')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            {t('hero.sub2')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <Button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-colors hover:bg-primary"
            >
              {t('hero.cta.request').replace(' →', '')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 max-w-3xl border-t border-slate-800 pt-6"
            aria-label="Tech stack"
          >
            {stack.map((s) => (
              <li key={s} className="text-base md:text-lg font-semibold tracking-tight text-foreground opacity-60">
                {s}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
