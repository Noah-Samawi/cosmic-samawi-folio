import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface ServiceCard {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  gradient: string;
}

const HireMeSection: React.FC = () => {
  const { t, direction } = useLanguage();

  const services: ServiceCard[] = [
    {
      icon: Palette,
      titleKey: 'hire.webdesign.title',
      descKey: 'hire.webdesign.desc',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Smartphone,
      titleKey: 'hire.apps.title',
      descKey: 'hire.apps.desc',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      titleKey: 'hire.security.title',
      descKey: 'hire.security.desc',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // Duplicate for infinite loop effect
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <section id="hire" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

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
            <span className="gradient-text">{t('hire.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('hire.subtitle')}
          </p>
        </motion.div>

        {/* Auto-scrolling Service Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              direction: direction,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {duplicatedServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="glass-card h-full p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden">
                        {/* Gradient glow on hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`} />
                        
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {t(service.titleKey)}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(service.descKey)}
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#contact" className="gap-2">
              {t('hire.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMeSection;
