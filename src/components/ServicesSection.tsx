import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Settings, Globe, Palette, Smartphone, Check, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCard {
  icon: LucideIcon;
  titleKey: string;
  leadKey: string;
  features: string[];
}

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services: ServiceCard[] = [
    ...([
      ['web', Code2], ['software', Settings], ['ai', Bot],
      ['hosting', Globe], ['design', Palette], ['marketing', Smartphone],
    ] as const).map(([key, icon]) => ({
      icon,
      titleKey: `svc4.${key}.title`,
      leadKey: `svc4.${key}.lead`,
      features: [1, 2, 3, 4].map((n) => `svc4.${key}.f${n}`),
    })),
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
          <p className="text-xs uppercase text-primary font-medium mb-3">{t('svc.eyebrow')}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-4">
            {t('nav.leistungen')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">{t('svc.sub')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.titleKey}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-lg border border-border bg-card p-6 md:p-8 transition-colors duration-200 hover:border-primary"
              >
                <Icon className="h-10 w-10 text-primary mb-6" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-xl font-bold text-foreground mb-3">{t(s.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{t(s.leadKey)}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {t(f)}
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
