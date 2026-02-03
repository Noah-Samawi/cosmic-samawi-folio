import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layers, Server, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';
import { Marquee } from '@/components/ui/marquee';
import TechIcon from '@/components/TechIcon';
import { Button } from '@/components/ui/button';

type CategoryKey = 'all' | 'languages' | 'frameworks' | 'systems' | 'security';

const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all');

  const categories = [
    {
      key: 'languages' as const,
      icon: Code2,
      skills: portfolioData.skills.languages,
      gradient: 'from-primary to-primary/50',
    },
    {
      key: 'frameworks' as const,
      icon: Layers,
      skills: portfolioData.skills.frameworks,
      gradient: 'from-secondary to-secondary/50',
    },
    {
      key: 'systems' as const,
      icon: Server,
      skills: portfolioData.skills.systems,
      gradient: 'from-primary via-secondary to-primary',
    },
    {
      key: 'security' as const,
      icon: ShieldCheck,
      skills: portfolioData.skills.security,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // Build all skills with category labels
  const allSkillsWithCategory = useMemo(() => [
    ...portfolioData.skills.languages.map(s => ({ ...s, category: 'languages' as const })),
    ...portfolioData.skills.frameworks.map(s => ({ ...s, category: 'frameworks' as const })),
    ...portfolioData.skills.systems.map(s => ({ ...s, category: 'systems' as const })),
    ...portfolioData.skills.security.map(s => ({ ...s, category: 'security' as const })),
  ], []);

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeFilter === 'all') return allSkillsWithCategory;
    return allSkillsWithCategory.filter(s => s.category === activeFilter);
  }, [activeFilter, allSkillsWithCategory]);

  // Split into two rows
  const firstRowSkills = filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2));
  const secondRowSkills = filteredSkills.slice(Math.ceil(filteredSkills.length / 2));

  const handleCategoryClick = (key: CategoryKey) => {
    setActiveFilter(prev => prev === key ? 'all' : key);
  };

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
        <AnimatePresence mode="wait">
          <motion.div
            key={`row1-${activeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {firstRowSkills.length > 0 && (
              <Marquee speed="slow" pauseOnHover className="py-4">
                {firstRowSkills.map((skill, index) => (
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
            )}
          </motion.div>
        </AnimatePresence>

        {/* Skills Marquee - Row 2 (Right to Left) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`row2-${activeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {secondRowSkills.length > 0 && (
              <Marquee speed="slow" pauseOnHover reverse className="py-4">
                {secondRowSkills.map((skill, index) => (
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
            )}
          </motion.div>
        </AnimatePresence>

        {/* Category Filter Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          {/* All Button */}
          <div className="flex justify-center mb-6">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="px-8"
            >
              {t('skills.all')}
            </Button>
          </div>
          
          {/* Category Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ key, icon: Icon, gradient }) => (
              <motion.button
                type="button"
                key={key}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(key)}
                className={`glass-card p-6 text-center group cursor-pointer transition-all duration-300 w-full ${
                  activeFilter === key 
                    ? 'ring-2 ring-primary border-primary/50 bg-primary/5' 
                    : 'hover:border-primary/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-4 bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform ${
                  activeFilter === key ? 'scale-110' : ''
                }`}>
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t(`skills.${key}`)}
                </h3>
                {activeFilter === key && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 text-xs text-primary font-medium"
                  >
                    {t('skills.active')}
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
