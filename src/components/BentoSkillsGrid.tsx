import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Server, Shield, MapPin } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  span?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = '', span = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`${span} group`}
    >
      <div className={`glass-card h-full p-6 md:p-8 relative overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-500 ${className}`}>
        {children}
      </div>
    </motion.div>
  );
};

const SkillTag: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
    {label}
  </span>
);

// Mock GitHub contribution graph
const GitHubGraph: React.FC = () => {
  const weeks = 20;
  const days = 7;
  const levels = [
    'bg-muted/30',
    'bg-primary/20',
    'bg-primary/40',
    'bg-primary/60',
    'bg-primary/80',
  ];

  // Deterministic "random" based on position
  const getLevel = (w: number, d: number) => {
    const v = ((w * 7 + d) * 13 + 7) % 17;
    if (v < 5) return 0;
    if (v < 9) return 1;
    if (v < 12) return 2;
    if (v < 15) return 3;
    return 4;
  };

  return (
    <div className="flex gap-[3px] overflow-hidden">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: days }).map((_, d) => (
            <motion.div
              key={d}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (w * 7 + d) * 0.005 }}
              className={`w-[10px] h-[10px] md:w-3 md:h-3 rounded-[2px] ${levels[getLevel(w, d)]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const BentoSkillsGrid: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">What I Work With</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Core competencies across the modern tech stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[minmax(200px,auto)]" style={{ perspective: '1000px' }}>
          {/* Frontend */}
          <BentoCard span="md:col-span-2">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl group-hover:opacity-40 transition-opacity opacity-20" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Frontend Development</h3>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              Building responsive, accessible, and performant user interfaces with modern frameworks and design systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <SkillTag label="React" />
              <SkillTag label="TypeScript" />
              <SkillTag label="Tailwind CSS" />
              <SkillTag label="Next.js" />
              <SkillTag label="Framer Motion" />
              <SkillTag label="HTML5 / CSS3" />
            </div>
          </BentoCard>

          {/* IT Systems - tall card */}
          <BentoCard span="md:row-span-2">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[hsl(150,80%,45%)]/20 to-transparent blur-3xl group-hover:opacity-40 transition-opacity opacity-20" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(150,80%,45%)] to-[hsl(170,80%,45%)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">IT Systems & Security</h3>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              Enterprise infrastructure, network security, and DevOps with a security-first mindset honed over 6+ years.
            </p>
            <div className="flex flex-wrap gap-2">
              <SkillTag label="Active Directory" />
              <SkillTag label="Windows Server" />
              <SkillTag label="Linux" />
              <SkillTag label="Docker" />
              <SkillTag label="CI/CD" />
              <SkillTag label="ServiceNow" />
              <SkillTag label="Burp Suite" />
              <SkillTag label="Network Security" />
            </div>
          </BentoCard>

          {/* Backend */}
          <BentoCard>
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[hsl(280,80%,60%)]/20 to-transparent blur-3xl group-hover:opacity-40 transition-opacity opacity-20" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(280,80%,60%)] to-[hsl(320,80%,55%)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Server className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Backend & Databases</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Scalable APIs, data modeling, and server-side logic.
            </p>
            <div className="flex flex-wrap gap-2">
              <SkillTag label="Python" />
              <SkillTag label="Django" />
              <SkillTag label="Node.js" />
              <SkillTag label="PostgreSQL" />
              <SkillTag label="REST APIs" />
              <SkillTag label="Supabase" />
            </div>
          </BentoCard>

          {/* GitHub Graph + Location */}
          <BentoCard>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Frankfurt, Germany</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Contribution Activity</p>
              </div>
              <GitHubGraph />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default BentoSkillsGrid;
