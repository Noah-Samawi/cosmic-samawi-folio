import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Lock, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import casestudyAi from '@/assets/casestudy-ai-intelligence.jpg';
import casestudyDashboard from '@/assets/casestudy-financial-dashboard.jpg';
import casestudyWorkflow from '@/assets/casestudy-workflow-automation.jpg';

interface ReferenceCard {
  title: string;
  result: string;
  stack: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const cards: ReferenceCard[] = [
  {
    title: 'KI-Buchungsassistent',
    result: 'Eigenes Projekt: KI-Chatbot, der Terminanfragen versteht und automatisch in einen Kalender bucht.',
    stack: ['Next.js', 'Django', 'OpenAI', 'Vercel'],
    image: casestudyAi,
    icon: Bot,
  },
  {
    title: 'Sicheres Web-Portal',
    result:
      'Eigenes Projekt: rollenbasiertes Portal mit OAuth2, JWT und verschlüsselter Datenhaltung — DSGVO-konform aufgebaut.',
    stack: ['React', 'Django', 'PostgreSQL', 'JWT'],
    image: casestudyDashboard,
    icon: Lock,
  },
  {
    title: 'Dieses Portfolio',
    result: 'Selbst entwickelt mit React und TypeScript — optimiert auf Performance, Barrierefreiheit und SEO.',
    stack: ['React', 'TypeScript', 'Vercel', 'SEO'],
    image: casestudyWorkflow,
    icon: Gauge,
  },
];

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
            {t('projects.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all duration-200"
              >
                {/* 16:10 image with cyan top hairline */}
                <div className="relative aspect-[16/10] overflow-hidden border-t border-cyan-500/30">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-slate-950/70 border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {card.result}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-medium rounded-full border border-cyan-500/30 text-cyan-300 bg-cyan-500/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
