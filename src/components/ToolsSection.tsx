import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Figma, Cloud, Container, Code2, GitBranch, FileCode2, Database, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const tools: { name: string; icon: LucideIcon }[] = [
  { name: 'VS Code', icon: Terminal },
  { name: 'Next.js', icon: FileCode2 },
  { name: 'Figma', icon: Figma },
  { name: 'Azure', icon: Cloud },
  { name: 'Docker', icon: Container },
  { name: 'Python', icon: Code2 },
  { name: 'Git', icon: GitBranch },
  { name: 'PostgreSQL', icon: Database },
];

const ToolsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="tools" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">{t('tools.eyebrow')}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">{t('tools.title')}</h2>
          <p className="text-lg text-slate-400">{t('tools.sub')}</p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map(({ name, icon: Icon }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-8 transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800 bg-slate-950">
                <Icon className="h-7 w-7 text-foreground" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-foreground">{name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToolsSection;
