import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, TrendingUp, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import aiIntelligenceImage from '@/assets/casestudy-ai-intelligence.jpg';
import financialDashboardImage from '@/assets/casestudy-financial-dashboard.jpg';
import workflowAutomationImage from '@/assets/casestudy-workflow-automation.jpg';

interface CaseStudy {
  id: string;
  titleKey: string;
  descKey: string;
  resultKey: string;
  image?: string;
  tags: string[];
  icon: React.ElementType;
  gradient: string;
}

const CaseStudiesSection: React.FC = () => {
  const { t } = useLanguage();

  const caseStudies: CaseStudy[] = [
    {
      id: 'ai-intelligence',
      titleKey: 'casestudies.1.title',
      descKey: 'casestudies.1.desc',
      resultKey: 'casestudies.1.result',
      image: aiIntelligenceImage,
      tags: ['GPT-4o', 'Node.js', 'WhatsApp API', 'AI'],
      icon: TrendingUp,
      gradient: 'from-[hsl(189,100%,50%)] to-[hsl(200,100%,55%)]',
    },
    {
      id: 'financial-dashboard',
      titleKey: 'casestudies.2.title',
      descKey: 'casestudies.2.desc',
      resultKey: 'casestudies.2.result',
      image: financialDashboardImage,
      tags: ['Next.js', 'Supabase', 'Recharts', 'SaaS'],
      icon: Zap,
      gradient: 'from-[hsl(280,80%,60%)] to-[hsl(320,80%,55%)]',
    },
    {
      id: 'workflow-automation',
      titleKey: 'casestudies.3.title',
      descKey: 'casestudies.3.desc',
      resultKey: 'casestudies.3.result',
      image: workflowAutomationImage,
      tags: ['n8n', 'Make.com', 'Python', 'Automation'],
      icon: Shield,
      gradient: 'from-[hsl(150,80%,45%)] to-[hsl(170,80%,45%)]',
    },
  ];

  return (
    <section id="case-studies" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent" />
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
            <span className="gradient-text">{t('casestudies.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('casestudies.subtitle')}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="glass-card overflow-hidden group hover:border-primary/40 transition-all duration-500">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image / Visual */}
                    <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                      {study.image ? (
                        <img
                          src={study.image}
                          alt={t(study.titleKey)}
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-20`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {t(study.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {t(study.descKey)}
                      </p>

                      {/* Result highlight */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                        <p className="text-sm text-foreground font-medium">
                          <span className="text-primary">↗</span> {t(study.resultKey)}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button variant="outline" size="sm" className="w-fit gap-2 opacity-60 cursor-not-allowed">
                        <ExternalLink className="w-4 h-4" />
                        {t('casestudies.livePreview')}
                      </Button>
                    </div>
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

export default CaseStudiesSection;
