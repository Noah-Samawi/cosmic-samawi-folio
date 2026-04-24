import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const AiNativeStatement: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="ai-native-headline"
      className="relative bg-slate-950 border-y border-cyan-400/30 py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-6"
        >
          {t('ai.eyebrow')}
        </motion.p>

        <motion.h2
          id="ai-native-headline"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-bold text-3xl md:text-5xl leading-tight text-white max-w-3xl mx-auto text-balance"
        >
          {t('ai.headline.p1')}
          <span className="text-cyan-400">{t('ai.headline.accent')}</span>
          {t('ai.headline.p2')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mt-8 leading-relaxed text-balance"
        >
          {t('ai.support')}
        </motion.p>
      </div>
    </section>
  );
};

export default AiNativeStatement;
