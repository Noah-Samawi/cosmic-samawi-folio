import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const TrustStrip: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    t('trust.exp'),
    'DSGVO-konform',
    'React',
    'TypeScript',
    'Django',
    'AWS',
    'Docker',
    'Linux',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-y border-cyan-500/10 bg-slate-950/50"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 overflow-hidden">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-slate-500 whitespace-nowrap overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <React.Fragment key={item}>
              <span className="shrink-0">{item}</span>
              {i < items.length - 1 && (
                <span className="text-cyan-500/30 shrink-0" aria-hidden="true">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustStrip;
