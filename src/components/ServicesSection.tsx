import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ServerCog, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCard {
  icon: LucideIcon;
  titleKey: string;
  leadKey: string;
  bullets: string[];
}

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services: ServiceCard[] = [
    {
      icon: Code2,
      titleKey: 'svc.web.title',
      leadKey: 'svc.web.lead',
      bullets: ['svc.web.b1', 'svc.web.b2', 'svc.web.b3'],
    },
    {
      icon: ServerCog,
      titleKey: 'svc.it.title',
      leadKey: 'svc.it.lead',
      bullets: ['svc.it.b1', 'svc.it.b2', 'svc.it.b3'],
    },
    {
      icon: ShieldCheck,
      titleKey: 'svc.sec.title',
      leadKey: 'svc.sec.lead',
      bullets: ['svc.sec.b1', 'svc.sec.b2', 'svc.sec.b3'],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
            {t('svc.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            {t('svc.title')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed text-balance">
            {t('svc.sub')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.titleKey}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-150 hover:border-cyan-400/50 hover:bg-slate-900/80"
              >
                {/* Halo on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-2xl bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Icon tile */}
                <div className="relative w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                </div>

                <h3 className="relative text-xl font-semibold text-foreground mb-3 tracking-tight">
                  {t(service.titleKey)}
                </h3>

                <p className="relative text-slate-400 leading-relaxed mb-6 text-[15px]">
                  {t(service.leadKey)}
                </p>

                <ul className="relative space-y-3">
                  {service.bullets.map((bk) => (
                    <li key={bk} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"
                      />
                      <span>{t(bk)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
