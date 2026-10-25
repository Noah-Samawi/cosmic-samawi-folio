import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  { num: '01', titleKey: 'process.s1.title', bodyKey: 'process.s1.body' },
  { num: '02', titleKey: 'process.s2.title', bodyKey: 'process.s2.body' },
  { num: '03', titleKey: 'process.s3.title', bodyKey: 'process.s3.body' },
  { num: '04', titleKey: 'process.s4.title', bodyKey: 'process.s4.body' },
];

const ProcessTimeline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      aria-labelledby="process-headline"
      className="relative bg-slate-950 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t('process.eyebrow')}
          </p>
          <h2
            id="process-headline"
            className="text-3xl md:text-4xl font-bold text-white mt-3"
          >
            {t('process.headline')}
          </h2>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-stretch gap-4">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex-1 rounded-xl border border-cyan-400/20 bg-slate-900 p-6 hover:border-cyan-400/40 transition-colors">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-400 text-xs font-semibold tabular-nums mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t(s.titleKey)}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  {t(s.bodyKey)}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 text-cyan-400/40 rtl:rotate-180" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: vertical with dotted left rule */}
        <div className="md:hidden relative">
          <div
            aria-hidden="true"
            className="absolute start-4 top-2 bottom-2 border-s-2 border-dotted border-cyan-400/40"
          />
          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="ms-10 rounded-xl border border-cyan-400/20 bg-slate-900 p-6"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-400 text-xs font-semibold tabular-nums mb-3">
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t(s.titleKey)}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  {t(s.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
