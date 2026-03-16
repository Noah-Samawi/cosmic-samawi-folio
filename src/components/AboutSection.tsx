import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Code, Server, Award, Shield, Globe, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const codeLines = [
  { text: 'const', color: 'text-purple-400' },
  { text: ' developer', color: 'text-blue-300' },
  { text: ' = {', color: 'text-foreground' },
  { text: '  name', color: 'text-sky-300' },
  { text: ': ', color: 'text-foreground' },
  { text: '"Noah Al-Samawi"', color: 'text-emerald-400' },
  { text: ',', color: 'text-foreground' },
  { text: '  role', color: 'text-sky-300' },
  { text: ': ', color: 'text-foreground' },
  { text: '"Full-Stack Software Engineer"', color: 'text-emerald-400' },
  { text: ',', color: 'text-foreground' },
  { text: '  location', color: 'text-sky-300' },
  { text: ': ', color: 'text-foreground' },
  { text: '"Frankfurt, Germany 🇩🇪"', color: 'text-emerald-400' },
  { text: ',', color: 'text-foreground' },
  { text: '  skills', color: 'text-sky-300' },
  { text: ': [', color: 'text-foreground' },
  { text: '"React"', color: 'text-amber-300' },
  { text: ', ', color: 'text-foreground' },
  { text: '"Python"', color: 'text-amber-300' },
  { text: ', ', color: 'text-foreground' },
  { text: '"Supabase"', color: 'text-amber-300' },
  { text: ', ', color: 'text-foreground' },
  { text: '"AI Integrations"', color: 'text-amber-300' },
  { text: '],', color: 'text-foreground' },
  { text: '  status', color: 'text-sky-300' },
  { text: ': ', color: 'text-foreground' },
  { text: '"Available for new opportunities"', color: 'text-emerald-400' },
  { text: ',', color: 'text-foreground' },
  { text: '  contact', color: 'text-sky-300' },
  { text: ': ', color: 'text-foreground' },
  { text: '"kontakt@noahsamawi.de"', color: 'text-emerald-400' },
  { text: '};', color: 'text-foreground' },
];

const formattedCode = [
  [0, 1, 2],       // const developer = {
  [3, 4, 5, 6],    //   name: "Noah Al-Samawi",
  [7, 8, 9, 10],   //   role: "Full-Stack Software Engineer",
  [11, 12, 13, 14],//   location: "Frankfurt, Germany 🇩🇪",
  [15, 16, 17, 18, 19, 20, 21, 22, 23, 24], //   skills: [...],
  [25, 26, 27, 28],//   status: "Available for new opportunities",
  [29, 30, 31, 32],//   contact: "kontakt@noahsamawi.de"
];

const CodeBox: React.FC = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = codeLines.reduce((sum, l) => sum + l.text.length, 0);

  useEffect(() => {
    if (visibleChars < totalChars) {
      const timer = setTimeout(() => setVisibleChars(v => v + 1), 25);
      return () => clearTimeout(timer);
    }
  }, [visibleChars, totalChars]);

  // Build visible text
  let charCount = 0;
  const getVisibleText = (lineIdx: number) => {
    return formattedCode[lineIdx].map(tokenIdx => {
      const token = codeLines[tokenIdx];
      const chars = token.text.split('');
      return chars.map((char, ci) => {
        charCount++;
        if (charCount > visibleChars) return null;
        return (
          <span key={`${tokenIdx}-${ci}`} className={token.color}>
            {char}
          </span>
        );
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 transition-shadow duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
      style={{ background: 'hsl(222 47% 6%)' }}
    >
      {/* macOS Title Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30" style={{ background: 'hsl(222 47% 8%)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">developer.js</span>
      </div>

      {/* Code Content */}
      <div className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
        {formattedCode.map((_, lineIdx) => {
          // We need a fresh charCount per render, so we use a ref trick
          return (
            <div key={lineIdx} className="whitespace-pre">
              <span className="text-muted-foreground/40 select-none mr-4 inline-block w-4 text-right">{lineIdx + 1}</span>
              {lineIdx > 0 && lineIdx < formattedCode.length - 1 && <span className="text-foreground/30">  </span>}
            </div>
          );
        })}
        {/* Blinking cursor */}
        {visibleChars >= totalChars && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        )}
      </div>
    </motion.div>
  );
};

// Proper rendering with char counting
const CodeBoxProper: React.FC = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = codeLines.reduce((sum, l) => sum + l.text.length, 0);

  useEffect(() => {
    if (visibleChars < totalChars) {
      const timer = setTimeout(() => setVisibleChars(v => v + 1), 22);
      return () => clearTimeout(timer);
    }
  }, [visibleChars, totalChars]);

  let globalCharIndex = 0;

  const renderLine = (tokenIndices: number[], lineNum: number) => {
    const indent = lineNum > 0 && lineNum < formattedCode.length - 1 ? '  ' : '';
    const elements: React.ReactNode[] = [];

    for (const tokenIdx of tokenIndices) {
      const token = codeLines[tokenIdx];
      for (let ci = 0; ci < token.text.length; ci++) {
        globalCharIndex++;
        if (globalCharIndex <= visibleChars) {
          elements.push(
            <span key={`${tokenIdx}-${ci}`} className={token.color}>
              {token.text[ci]}
            </span>
          );
        }
      }
    }

    return (
      <div key={lineNum} className="whitespace-pre">
        <span className="text-muted-foreground/40 select-none mr-4 inline-block w-5 text-right text-[11px]">
          {lineNum + 1}
        </span>
        {indent && <span>{indent}</span>}
        {elements}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 transition-shadow duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
      style={{ background: 'hsl(222 47% 6%)' }}
    >
      {/* macOS Title Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30" style={{ background: 'hsl(222 47% 8%)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">developer.js</span>
      </div>

      {/* Code Content */}
      <div className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed">
        {formattedCode.map((tokenIndices, lineIdx) => renderLine(tokenIndices, lineIdx))}
        {/* Blinking cursor */}
        {visibleChars >= totalChars && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />
        )}
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Server, key: 'about.highlight1' },
    { icon: Code, key: 'about.highlight2' },
    { icon: Award, key: 'about.highlight3' },
    { icon: Zap, key: 'about.highlight4' },
    { icon: Users, key: 'about.highlight5' },
  ];

  const stats = [
    { value: '6+', labelKey: 'about.stat1' },
    { value: '5+', labelKey: 'about.stat2' },
    { value: '10+', labelKey: 'about.stat3' },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            <span className="gradient-text">{t('about.agencyTitle')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('about.agencySubtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Code Box replaces portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <CodeBoxProper />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Unique value proposition */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-foreground text-lg leading-relaxed font-medium">
                {t('about.valueProposition')}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {t('about.description2')}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <span className="block text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{t(stat.labelKey)}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid gap-3">
              {highlights.map(({ icon: Icon, key }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group border border-transparent hover:border-primary/20"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{t(key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
