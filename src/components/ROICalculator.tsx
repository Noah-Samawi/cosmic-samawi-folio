import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString('de-DE')
  );
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    spring.set(value);
    const unsub = display.on('change', (v) => setDisplayValue(v));
    return unsub;
  }, [value, spring, display]);

  return <span>{displayValue}</span>;
};

const ROICalculator: React.FC = () => {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState(5);
  const [hours, setHours] = useState(2);
  const [wage, setWage] = useState(30);

  const annualSavings = employees * hours * wage * 5 * 52;

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">ROI Calculator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Calculate Your Potential Savings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how much time and money your business could save with intelligent automation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Glow background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12">
              {/* Inputs */}
              <div className="space-y-8">
                {/* Employees */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Number of Employees</label>
                    <span className="text-sm font-mono text-primary font-bold">{employees}</span>
                  </div>
                  <Slider
                    value={[employees]}
                    onValueChange={(v) => setEmployees(v[0])}
                    min={1}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Hours on Manual Tasks (daily)</label>
                    <span className="text-sm font-mono text-primary font-bold">{hours}h</span>
                  </div>
                  <Slider
                    value={[hours]}
                    onValueChange={(v) => setHours(v[0])}
                    min={1}
                    max={8}
                    step={0.5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1h</span>
                    <span>8h</span>
                  </div>
                </div>

                {/* Wage */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Average Hourly Wage</label>
                    <span className="text-sm font-mono text-primary font-bold">€{wage}</span>
                  </div>
                  <Slider
                    value={[wage]}
                    onValueChange={(v) => setWage(v[0])}
                    min={10}
                    max={150}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>€10</span>
                    <span>€150</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="glass-card p-8 rounded-2xl w-full border border-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Annual Savings</span>
                    </div>
                    <div className="mb-4">
                      <span className="font-display text-5xl md:text-6xl font-extrabold gradient-text glow-text">
                        €<AnimatedCounter value={annualSavings} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      You could save <span className="text-primary font-semibold">€<AnimatedCounter value={annualSavings} /></span> annually with our automation solutions.
                    </p>
                    <motion.div className="mt-6">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      >
                        <Zap className="w-4 h-4" />
                        Start Saving Now
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
