import React from 'react';
import { motion } from 'framer-motion';
import { Rss, ExternalLink, Zap, Brain, Cpu } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

const radarItems = [
  {
    title: 'OpenAI GPT-5 & Beyond',
    description: 'Die neuesten Modelle für Enterprise-Automatisierung',
    url: 'https://openai.com/blog',
    icon: Brain,
  },
  {
    title: 'LangChain Agents',
    description: 'Autonome KI-Agenten für komplexe Workflows',
    url: 'https://blog.langchain.dev',
    icon: Cpu,
  },
  {
    title: 'AI in Production',
    description: 'Skalierbare KI-Systeme für den Unternehmenseinsatz',
    url: 'https://techcrunch.com/category/artificial-intelligence/',
    icon: Zap,
  },
];

const AIRadar: React.FC = () => (
  <section className="py-12 relative overflow-hidden border-y border-border/30">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <Rss className="w-4 h-4 text-primary animate-pulse" />
        <h3 className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-widest">
          Live AI & Tech Radar
        </h3>
      </motion.div>

      <Marquee speed="slow" pauseOnHover className="py-2">
        {radarItems.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-6 py-4 mx-2 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 w-[320px] shrink-0"
          >
            <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </a>
        ))}
      </Marquee>
    </div>
  </section>
);

export default AIRadar;
