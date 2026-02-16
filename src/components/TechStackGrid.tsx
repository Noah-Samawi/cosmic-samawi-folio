import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface TechItem {
  name: string;
  icon: string;
  description: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: 'Python', icon: '🐍', description: 'The brain behind your custom AI robots.', color: 'from-yellow-500/20 to-blue-500/20' },
  { name: 'React', icon: '⚛️', description: 'Lightning-fast interfaces for your team.', color: 'from-cyan-500/20 to-blue-400/20' },
  { name: 'Supabase', icon: '⚡', description: 'Secure, scalable database hosting in Frankfurt.', color: 'from-green-500/20 to-emerald-400/20' },
  { name: 'OpenAI', icon: '🧠', description: 'Next-gen intelligence for your workflows.', color: 'from-purple-500/20 to-pink-400/20' },
  { name: 'TypeScript', icon: '📘', description: 'Type-safe code that scales with your business.', color: 'from-blue-500/20 to-indigo-400/20' },
  { name: 'Node.js', icon: '🟢', description: 'High-performance backend for real-time operations.', color: 'from-green-600/20 to-lime-400/20' },
  { name: 'Docker', icon: '🐳', description: 'Containerized deployments, zero downtime.', color: 'from-blue-400/20 to-cyan-400/20' },
  { name: 'n8n / Make', icon: '🔄', description: 'Visual workflow automation, no code needed.', color: 'from-orange-500/20 to-red-400/20' },
];

const TechStackGrid: React.FC = () => {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Tech Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enterprise-grade tools powering your digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="perspective-1000"
            >
              <motion.div
                className="relative w-full aspect-square cursor-pointer"
                onHoverStart={() => setFlipped(tech.name)}
                onHoverEnd={() => setFlipped(null)}
                onTap={() => setFlipped(flipped === tech.name ? null : tech.name)}
              >
                {/* Front */}
                <motion.div
                  className={`absolute inset-0 glass-card rounded-2xl flex flex-col items-center justify-center gap-3 border border-border/50 backface-hidden transition-colors ${
                    flipped === tech.name ? 'pointer-events-none' : ''
                  }`}
                  animate={{ rotateY: flipped === tech.name ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-4xl md:text-5xl">{tech.icon}</span>
                  <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                </motion.div>

                {/* Back */}
                <motion.div
                  className={`absolute inset-0 glass-card rounded-2xl flex flex-col items-center justify-center p-4 border border-primary/30 bg-gradient-to-br ${tech.color} backface-hidden`}
                  animate={{ rotateY: flipped === tech.name ? 0 : -180 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-2xl mb-2">{tech.icon}</span>
                  <p className="text-xs md:text-sm text-foreground font-medium text-center leading-relaxed">
                    {tech.description}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
