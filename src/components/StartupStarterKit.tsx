import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, CreditCard, Image, Monitor, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const StartupStarterKit: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Globe, key: 'starterkit.item1' },
    { icon: CreditCard, key: 'starterkit.item2' },
    { icon: Image, key: 'starterkit.item3' },
    { icon: Monitor, key: 'starterkit.item4' },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12 relative overflow-hidden border-primary/30 hover:border-primary/50 transition-all duration-500">
              {/* Background glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

              {/* Badge */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{t('starterkit.badge')}</span>
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Rocket className="w-8 h-8 text-primary" />
                  <h3 className="font-display text-3xl md:text-4xl font-bold gradient-text">
                    {t('starterkit.title')}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  {t('starterkit.subtitle')}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 max-w-lg mx-auto">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
                    >
                      <div className="p-2 rounded-lg bg-primary/15">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{t(item.key)}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center space-y-3">
                <Button variant="hero" size="xl" asChild>
                  <a href="#contact" className="gap-2">
                    {t('starterkit.cta')}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">{t('starterkit.note')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StartupStarterKit;
