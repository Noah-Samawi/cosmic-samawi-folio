import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceDetailModal from './ServiceDetailModal';
import { Marquee } from '@/components/ui/marquee';

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
  const { t, direction } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const services: ServiceData[] = [
    {
      icon: Code,
      titleKey: 'services.webdev.title',
      descKey: 'services.webdev.desc',
      detailsKey: 'services.webdev.details',
      techStack: ['React', 'TypeScript', 'Django', 'REST API', 'PostgreSQL', 'Tailwind CSS'],
      features: ['services.webdev.f1', 'services.webdev.f2', 'services.webdev.f3'],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Shield,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
      detailsKey: 'services.security.details',
      techStack: ['Active Directory', 'Firewalls', 'VPN', 'SIEM', 'Network Security'],
      features: ['services.security.f1', 'services.security.f2', 'services.security.f3'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Headphones,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      detailsKey: 'services.support.details',
      techStack: ['Windows Server', 'ServiceNow', 'Azure AD', 'Office 365', 'ITIL'],
      features: ['services.support.f1', 'services.support.f2', 'services.support.f3'],
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // Duplicate for seamless loop
  const duplicatedServices = [...services, ...services];

  return (
    <section id="services" className="py-24 md:py-32 relative bg-muted/20 overflow-hidden">
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

        {/* Marquee Services */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Marquee 
            speed="slow" 
            pauseOnHover 
            reverse={direction === 'rtl'}
            className="py-4"
          >
            {duplicatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={`${service.titleKey}-${index}`}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer w-[320px] md:w-[380px] shrink-0"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="glass-card h-full p-8 flex flex-col relative overflow-hidden">
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`} />
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {t(service.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {t(service.descKey)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 flex-1">
                      {service.features.map((featureKey) => (
                        <li key={featureKey} className="flex items-center gap-2 text-sm text-foreground/80">
                          <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                          {t(featureKey)}
                        </li>
                      ))}
                    </ul>

                    {/* Learn more hint */}
                    <div className="mt-4 pt-4 border-t border-border/30 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      {t('services.learnMore')} <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Marquee>
        </motion.div>

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
