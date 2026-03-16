import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const COMMANDS = [
  { prompt: '> node noah.js', delay: 800 },
  {
    prompt: '',
    output: `const noah = {
  role: 'Founder & Software Engineer',
  location: 'Frankfurt, DE',
  education: 'B.Sc. Computer Science · Full-Stack Diploma',
  stack: ['React', 'Python', 'Supabase', 'OpenAI', 'Node.js', 'SQL'],
  focus: 'Automating business logic & building scalable AI systems',
};`,
    delay: 600,
  },
  { prompt: '> noah.getHighlights()', delay: 1200 },
  {
    prompt: '',
    output: `// Output: [
  '✓ B.Sc. Computer Science & Full-Stack Web Development',
  '✓ Experienced Hackathon Participant — Rapid prototyping',
  '✓ Security-first approach — Burp Suite, Secure Architecture',
  '✓ Delivering end-to-end Enterprise web & AI solutions',
  '✓ Strong Enterprise IT background (CBRE / DXC / Dell)'
]`,
    delay: 600,
  },
];

const TerminalAbout: React.FC = () => {
  const [lines, setLines] = useState<Array<{ text: string; type: 'prompt' | 'output' }>>([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentCommand >= COMMANDS.length) return;

    const cmd = COMMANDS[currentCommand];

    if (cmd.prompt) {
      // Type the prompt character by character
      setIsTyping(true);
      if (charIndex < cmd.prompt.length) {
        const timer = setTimeout(() => {
          setLines(prev => {
            const updated = [...prev];
            const lastLine = updated[updated.length - 1];
            if (lastLine && lastLine.type === 'prompt' && charIndex > 0) {
              updated[updated.length - 1] = { text: cmd.prompt.slice(0, charIndex + 1), type: 'prompt' };
            } else {
              updated.push({ text: cmd.prompt.slice(0, charIndex + 1), type: 'prompt' });
            }
            return updated;
          });
          setCharIndex(charIndex + 1);
        }, 40 + Math.random() * 30);
        return () => clearTimeout(timer);
      } else {
        // Finished typing prompt
        setIsTyping(false);
        setCharIndex(0);
        setCurrentCommand(currentCommand + 1);
      }
    } else if (cmd.output) {
      // Show output after delay
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { text: cmd.output!, type: 'output' }]);
        setCurrentCommand(currentCommand + 1);
      }, cmd.delay);
      return () => clearTimeout(timer);
    }
  }, [started, currentCommand, charIndex]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      const el = terminalRef.current.querySelector('.terminal-content');
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get to know me — the developer way.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal */}
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border/50 overflow-hidden shadow-2xl bg-[hsl(222,20%,8%)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-shadow duration-500">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(222,20%,12%)] border-b border-border/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(40,90%,55%)]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(150,80%,45%)]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono flex items-center justify-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    noah@portfolio ~ /about
                  </span>
                </div>
              </div>

              {/* Terminal content */}
              <div className="terminal-content p-5 font-mono text-sm min-h-[320px] max-h-[420px] overflow-y-auto scrollbar-hide">
                {lines.map((line, i) => (
                  <div key={i} className={`mb-1 ${line.type === 'prompt' ? 'text-primary' : 'text-[hsl(150,80%,65%)]'}`}>
                    {line.type === 'output' ? (
                      <pre className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed opacity-90">{line.text}</pre>
                    ) : (
                      <span>{line.text}</span>
                    )}
                  </div>
                ))}
                {currentCommand < COMMANDS.length && (
                  <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
                )}
                {currentCommand >= COMMANDS.length && (
                  <div className="mt-2 text-primary">
                    <span>&gt; </span>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalAbout;
