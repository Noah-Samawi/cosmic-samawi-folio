import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Server, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';
import { Marquee } from '@/components/ui/marquee';
import TechIcon from '@/components/TechIcon';

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

  // Flatten all skills for marquee
  const allSkills = [
    ...portfolioData.skills.languages.map(s => ({ ...s, category: 'languages' })),
    ...portfolioData.skills.frameworks.map(s => ({ ...s, category: 'frameworks' })),
    ...portfolioData.skills.systems.map(s => ({ ...s, category: 'systems' })),
    ...portfolioData.skills.security.map(s => ({ ...s, category: 'security' })),
  ];

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
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

        {/* Skills Marquee - Row 1 (Left to Right) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Marquee speed="slow" pauseOnHover className="py-4">
            {allSkills.slice(0, Math.ceil(allSkills.length / 2)).map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card px-6 py-4 rounded-xl flex items-center gap-4 min-w-[200px] group cursor-pointer"
              >
                <TechIcon tech={skill.name} showLabel={false} size="md" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground block">
                    {skill.name}
                  </span>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1 w-24">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>

        {/* Skills Marquee - Row 2 (Right to Left) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Marquee speed="slow" pauseOnHover reverse className="py-4">
            {allSkills.slice(Math.ceil(allSkills.length / 2)).map((skill, index) => (
              <motion.div
                key={`${skill.name}-r-${index}`}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card px-6 py-4 rounded-xl flex items-center gap-4 min-w-[200px] group cursor-pointer"
              >
                <TechIcon tech={skill.name} showLabel={false} size="md" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground block">
                    {skill.name}
                  </span>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1 w-24">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {categories.map(({ key, icon: Icon, gradient }) => (
            <motion.div
              key={key}
              whileHover={{ y: -4 }}
              className="glass-card p-6 text-center group"
            >
              <div className={`w-12 h-12 rounded-xl mx-auto mb-4 bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {t(`skills.${key}`)}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
