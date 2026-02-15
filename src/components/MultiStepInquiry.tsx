import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react';
import SuccessConfetti from './SuccessConfetti';

interface InquiryData {
  projectType: string;
  industry: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  message: string;
}

const MultiStepInquiry: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState<InquiryData>({
    projectType: '',
    industry: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    message: '',
  });

  const projectTypes = [
    { key: 'Web / App Development', label: t('inquiry.type.webdev') },
    { key: 'AI Integration', label: t('inquiry.type.ai') },
    { key: 'Business Automation', label: t('inquiry.type.automation') },
    { key: 'Consulting', label: t('inquiry.type.consulting') },
  ];

  const budgets = [
    { key: '< €2k', label: 'Startup/MVP (< €2k)' },
    { key: '€2k-€10k', label: 'Growth Phase (€2k – €10k)' },
    { key: '€10k+', label: 'Custom Enterprise (€10k+)' },
  ];

  const timelines = [
    { key: 'ASAP', label: t('inquiry.timeline.asap') },
    { key: '1-3 months', label: t('inquiry.timeline.1to3') },
    { key: '3-6 months', label: t('inquiry.timeline.3to6') },
    { key: 'Flexible', label: t('inquiry.timeline.flexible') },
  ];

  const steps = [
    {
      title: t('inquiry.step1.title'),
      subtitle: t('inquiry.step1.subtitle'),
    },
    {
      title: t('inquiry.step2.title'),
      subtitle: t('inquiry.step2.subtitle'),
    },
    {
      title: t('inquiry.step3.title'),
      subtitle: t('inquiry.step3.subtitle'),
    },
  ];

  const canProceed = () => {
    if (step === 0) return data.projectType !== '';
    if (step === 1) return data.budget !== '' && data.timeline !== '';
    if (step === 2) return data.name !== '' && data.email !== '';
    return false;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          subject: `[${data.projectType}] New Project Inquiry`,
          message: `Project Type: ${data.projectType}\nIndustry: ${data.industry || 'N/A'}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\n${data.message}`,
        },
      });
      if (error) throw error;
      setShowSuccess(true);
      toast({
        title: t('inquiry.success'),
        description: t('inquiry.successMessage'),
      });
      setData({ projectType: '', industry: '', budget: '', timeline: '', name: '', email: '', message: '' });
      setStep(0);
    } catch (error) {
      toast({
        title: t('inquiry.error'),
        description: t('inquiry.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const OptionButton: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode }> = ({ selected, onClick, children }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
        selected
          ? 'border-primary bg-primary/10 text-foreground shadow-[0_0_20px_hsl(189_100%_50%_/_0.15)]'
          : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30 hover:bg-card/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
        }`}>
          {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
        </div>
        <span className="font-medium">{children}</span>
      </div>
    </motion.button>
  );

  return (
    <>
      <SuccessConfetti show={showSuccess} onComplete={() => setShowSuccess(false)} />
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t('inquiry.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('inquiry.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-10">
              {steps.map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="glass-card p-8 md:p-10 min-h-[400px] flex flex-col">
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {steps[step]?.title}
                </h3>
                <p className="text-muted-foreground text-sm">{steps[step]?.subtitle}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  {step === 0 && (
                    <div className="space-y-3">
                      {projectTypes.map((type) => (
                        <OptionButton
                          key={type.key}
                          selected={data.projectType === type.key}
                          onClick={() => setData({ ...data, projectType: type.key })}
                        >
                          {type.label}
                        </OptionButton>
                      ))}
                      <div className="mt-4">
                        <Input
                          placeholder={t('inquiry.industry')}
                          value={data.industry}
                          onChange={(e) => setData({ ...data, industry: e.target.value })}
                          className="bg-card/50 border-border/50 h-12"
                        />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-3 block">{t('inquiry.budget')}</label>
                        <div className="grid grid-cols-2 gap-3">
                          {budgets.map((b) => (
                            <OptionButton
                              key={b.key}
                              selected={data.budget === b.key}
                              onClick={() => setData({ ...data, budget: b.key })}
                            >
                              {b.label}
                            </OptionButton>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-3 block">{t('inquiry.timelineLabel')}</label>
                        <div className="grid grid-cols-2 gap-3">
                          {timelines.map((tl) => (
                            <OptionButton
                              key={tl.key}
                              selected={data.timeline === tl.key}
                              onClick={() => setData({ ...data, timeline: tl.key })}
                            >
                              {tl.label}
                            </OptionButton>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <Input
                        placeholder={t('inquiry.name')}
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="bg-card/50 border-border/50 h-12"
                      />
                      <Input
                        type="email"
                        placeholder={t('inquiry.email')}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="bg-card/50 border-border/50 h-12"
                      />
                      <Textarea
                        placeholder={t('inquiry.details')}
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                        rows={4}
                        className="bg-card/50 border-border/50 resize-none"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                <Button
                  variant="ghost"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('inquiry.back')}
                </Button>

                {step < 2 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    {t('inquiry.next')} <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> {t('inquiry.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> {t('inquiry.submit')}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MultiStepInquiry;
