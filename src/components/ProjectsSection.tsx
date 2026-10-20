import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
            {t('projects.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t('projects.subtitle')}
          </p>
          <a
            href="https://github.com/Noah-Samawi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 font-medium text-base transition-all duration-150 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {t('projects.github')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
