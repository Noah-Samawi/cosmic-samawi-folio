import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Headset, ShieldCheck, Check, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCard {
  icon: LucideIcon;
  titleKey: string;
  leadKey: string;
  features: string[]; // plain text or translation keys
}

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services: ServiceCard[] = [
    { icon: Code2, titleKey: 'svc4.web.title', leadKey: 'svc4.web.lead', features: ['React', 'Next.js', 'TypeScript', 'Supabase'] },
    { icon: Bot, titleKey: 'svc4.ai.title', leadKey: 'svc4.ai.lead', features: ['OpenAI API', 'svc4.ai.f2', 'Chatbots'] },
    { icon: ShieldCheck, titleKey: 'svc4.sec.title', leadKey: 'svc4.sec.lead', features: ['svc4.sec.f1', 'svc4.sec.f2'] },
    { icon: Headset, titleKey: 'svc4.it.title', leadKey: 'svc4.it.lead', features: ['svc4.it.f1', 'svc4.it.f2', 'svc4.it.f3'] },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">{t('svc.eyebrow')}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            {t('nav.leistungen')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed text-balance">{t('svc.sub')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.titleKey}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-xl border border-slate-800 bg-slate-900 p-8 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
              >
                <Icon className="h-10 w-10 text-cyan-400 mb-6" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-xl font-bold text-foreground mb-3">{t(s.titleKey)}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{t(s.leadKey)}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-400 text-sm">
                      <Check className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
                      {f.startsWith('svc4.') ? t(f) : f}
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
