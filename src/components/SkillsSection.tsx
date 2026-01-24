import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Server, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';

const SkillsSection: React.FC = () => {
  const { t, direction } = useLanguage();

  const categories = [
    {
      key: 'languages',
      icon: Code2,
      skills: portfolioData.skills.languages,
      gradient: 'from-primary to-primary/50',
    },
    {
      key: 'frameworks',
      icon: Layers,
      skills: portfolioData.skills.frameworks,
      gradient: 'from-secondary to-secondary/50',
    },
    {
      key: 'systems',
      icon: Server,
      skills: portfolioData.skills.systems,
      gradient: 'from-primary via-secondary to-primary',
    },
    {
      key: 'security',
      icon: ShieldCheck,
      skills: portfolioData.skills.security,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
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
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('skills.subtitle')}</p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {categories.map(({ key, icon: Icon, skills, gradient }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6 md:p-8 h-full"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10`}>
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {t(`skills.${key}`)}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
