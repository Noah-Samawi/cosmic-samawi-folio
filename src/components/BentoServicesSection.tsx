import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Workflow, Lightbulb, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BentoServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      titleKey: 'agency.services.webdev.title',
      descKey: 'agency.services.webdev.desc',
      tags: ['React', 'TypeScript', 'Django', 'REST API'],
      gradient: 'from-[hsl(189,100%,50%)] to-[hsl(200,100%,55%)]',
      span: 'md:col-span-2 md:row-span-1',
    },
    {
      icon: Brain,
      titleKey: 'agency.services.ai.title',
      descKey: 'agency.services.ai.desc',
      tags: ['GPT Integration', 'Automation', 'ML Pipelines'],
      gradient: 'from-[hsl(280,80%,60%)] to-[hsl(320,80%,55%)]',
      span: 'md:col-span-1 md:row-span-2',
    },
    {
      icon: Workflow,
      titleKey: 'agency.services.automation.title',
      descKey: 'agency.services.automation.desc',
      tags: ['Workflows', 'CRM', 'n8n', 'Zapier'],
      gradient: 'from-[hsl(150,80%,45%)] to-[hsl(170,80%,45%)]',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      icon: Lightbulb,
      titleKey: 'agency.services.consulting.title',
      descKey: 'agency.services.consulting.desc',
      tags: ['Strategy', 'Architecture', 'Security Audit'],
      gradient: 'from-[hsl(40,90%,55%)] to-[hsl(25,90%,55%)]',
      span: 'md:col-span-1 md:row-span-1',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('agency.services.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('agency.services.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[minmax(220px,auto)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${service.span} group`}
              >
                <div className="glass-card h-full p-8 flex flex-col relative overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-500">
                  {/* 3D Glassmorphism glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-25 blur-3xl transition-all duration-700`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {t(service.descKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn more hint */}
                  <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                    {t('services.learnMore')} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoServicesSection;
