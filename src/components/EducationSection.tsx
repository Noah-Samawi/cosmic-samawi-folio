import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';

const EducationSection: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section id="education" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/20 via-transparent to-transparent" />
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
            <span className="gradient-text">{t('education.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('education.subtitle')}</p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 md:p-8 h-full relative overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Degree */}
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {edu.id === 'bsc' ? t('education.bsc.degree') : t('education.diploma.degree')}
                </h3>

                {/* School */}
                <p className="text-primary font-medium text-lg mb-4">
                  {edu.id === 'bsc' ? t('education.bsc.school') : t('education.diploma.school')}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  {edu.year && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.id === 'diploma' ? t('education.diploma.year') : edu.year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
