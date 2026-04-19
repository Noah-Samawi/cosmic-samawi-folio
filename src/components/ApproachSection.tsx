import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const ApproachSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { n: '01', titleKey: 'app.s1.title', descKey: 'app.s1.desc' },
    { n: '02', titleKey: 'app.s2.title', descKey: 'app.s2.desc' },
    { n: '03', titleKey: 'app.s3.title', descKey: 'app.s3.desc' },
    { n: '04', titleKey: 'app.s4.title', descKey: 'app.s4.desc' },
  ];

  return (
    <section id="approach" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
            {t('app.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {t('app.title')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Hairline connector (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[2.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Number */}
                <div className="relative inline-flex items-center justify-center mb-5">
                  <span className="text-5xl font-bold text-cyan-400 tracking-tight tabular-nums leading-none">
                    {step.n}
                  </span>
                  {/* Node dot for timeline */}
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute -bottom-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                  {t(step.titleKey)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
