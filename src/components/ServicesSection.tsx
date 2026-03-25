import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Palette, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceDetailModal from './ServiceDetailModal';

interface ServiceData {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  detailsKey: string;
  techStack: string[];
  features: string[];
  gradient: string;
}

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const services: ServiceData[] = [
    {
      icon: Globe,
      titleKey: 'services.web.title',
      descKey: 'services.web.desc',
      detailsKey: 'services.web.details',
      techStack: ['React', 'TypeScript', 'Python', 'Supabase', 'OpenAI', 'Tailwind CSS'],
      features: ['services.web.f1', 'services.web.f2', 'services.web.f3'],
      gradient: 'from-[hsl(189,100%,50%)] to-[hsl(220,100%,55%)]',
    },
    {
      icon: Palette,
      titleKey: 'services.design.title',
      descKey: 'services.design.desc',
      detailsKey: 'services.design.details',
      techStack: ['Figma', 'Adobe Suite', 'Canva Pro', 'Print Design', 'Brand Strategy'],
      features: ['services.design.f1', 'services.design.f2', 'services.design.f3'],
      gradient: 'from-[hsl(280,80%,60%)] to-[hsl(320,80%,55%)]',
    },
    {
      icon: Wrench,
      titleKey: 'services.it.title',
      descKey: 'services.it.desc',
      detailsKey: 'services.it.details',
      techStack: ['Windows Server', 'Active Directory', 'Networking', 'Office 365', 'Hardware'],
      features: ['services.it.f1', 'services.it.f2', 'services.it.f3'],
      gradient: 'from-[hsl(150,80%,45%)] to-[hsl(170,80%,45%)]',
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
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* 3-Column Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="glass-card h-full p-8 flex flex-col relative overflow-hidden hover:border-primary/40 transition-all duration-500">
                  {/* Gradient glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-25 blur-3xl transition-all duration-700`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {t(service.descKey)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-6">
                    {service.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-2 text-sm text-foreground/80">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more hint */}
                  <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium pt-4 border-t border-border/30">
                    {t('services.learnMore')} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Service Detail Modal */}
        <ServiceDetailModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
