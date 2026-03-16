import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, Database, Globe, Zap, Brain, TrendingUp, Workflow } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

const techTools = [
  'GPT-4o', 'LangChain', 'Supabase', 'React', 'Vercel', 'n8n', 'Python', 'TypeScript',
  'Node.js', 'Docker', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Prisma', 'Redis',
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const valueCards = [
  {
    icon: Workflow,
    title: 'Prozesse Automatisieren',
    desc: 'Workflows mit KI und Webhooks automatisieren — von der Datenerfassung bis zur Entscheidungsfindung. Kein manueller Eingriff nötig.',
  },
  {
    icon: Brain,
    title: 'Intelligente Daten',
    desc: 'Rohdaten in verwertbare Insights verwandeln. KI-gestützte Analysen liefern Erkenntnisse in Echtzeit, die fundierte Geschäftsentscheidungen ermöglichen.',
  },
  {
    icon: TrendingUp,
    title: 'Wettbewerbsvorteil',
    desc: 'Jedes moderne Unternehmen muss KI adaptieren, um schnell zu skalieren. Wer heute investiert, sichert sich den Vorsprung von morgen.',
  },
];

const AIInsightsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
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
            <span className="gradient-text">Warum KI-Integration?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            KI ist kein Trend — es ist die Grundlage moderner Softwareentwicklung. So schaffe ich Mehrwert.
          </p>
        </motion.div>

        {/* Tool-Chain Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { icon: Bot, label: 'OpenAI / LLM' },
              { icon: Database, label: 'Datenbank' },
              { icon: Globe, label: 'Frontend' },
            ].map((node, i) => (
              <React.Fragment key={node.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-5 rounded-2xl bg-muted/50 border border-primary/20 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] group cursor-default">
                    <node.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{node.label}</span>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="hidden md:flex items-center"
                  >
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 relative">
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                        animate={{ x: [0, 56, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                      />
                    </div>
                    <Zap className="w-4 h-4 text-primary/50 mx-1" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Value Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" style={{ perspective: '1000px' }}>
          {valueCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card p-6 h-full border border-primary/10 hover:border-primary/30 transition-all group cursor-default">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Ticker Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-xs text-muted-foreground mb-4 uppercase tracking-widest font-medium">
            Tech-Stack & Tools
          </p>
          <Marquee speed="slow" pauseOnHover className="py-2">
            {techTools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-muted/50 text-foreground border border-border/50 hover:border-primary/30 transition-colors whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                {tool}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default AIInsightsSection;
