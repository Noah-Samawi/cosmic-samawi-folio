import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';
import SpotlightCard from '@/components/SpotlightCard';

const ExperienceSection: React.FC = () => {
  const { t, direction } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: direction === 'rtl' ? 50 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('experience.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('experience.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Line */}
              <div 
                className={`absolute top-0 ${direction === 'rtl' ? 'right-6' : 'left-6'} w-px h-full bg-gradient-to-b from-primary via-secondary to-transparent md:${direction === 'rtl' ? 'right-1/2' : 'left-1/2'}`} 
              />
              
              {/* Timeline Dot */}
              <div 
                className={`absolute top-8 ${direction === 'rtl' ? 'right-4' : 'left-4'} w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50 md:${direction === 'rtl' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </div>

              {/* Content Card */}
              <div className={`${direction === 'rtl' ? 'pr-16' : 'pl-16'} pb-12 md:${direction === 'rtl' ? 'pr-0 pl-[52%]' : 'pl-0 pr-[52%]'}`}>
                <SpotlightCard 
                  className="glass-card p-6 md:p-8"
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                >
                  <motion.div whileHover={{ scale: 1.01, y: -3 }} className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {t('experience.cbre.title')}
                      </h3>
                      <p className="text-primary font-medium">{t('experience.cbre.company')}</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{t('experience.cbre.period')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t('experience.cbre.description')}
                  </p>

                  {/* Tasks */}
                  <ul className="space-y-2 mb-6">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <li key={num} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{t(`experience.cbre.task${num}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  </motion.div>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
