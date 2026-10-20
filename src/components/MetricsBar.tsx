import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Metric {
  value: string;
  labelKey: string;
}

const metrics: Metric[] = [
  { value: '10+', labelKey: 'metrics.experience' },
  { value: '4', labelKey: 'metrics.languages' },
  { value: '97/100', labelKey: 'metrics.pagespeed' },
  { value: '100%', labelKey: 'metrics.dsgvo' },
];

const MetricsBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Trust metrics"
      className="relative bg-slate-950 py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {metrics.map((m, i) => (
            <div
              key={m.labelKey}
              className={[
                'text-center px-4',
                // vertical hairline between cells on md+
                i > 0 ? 'md:border-l md:border-cyan-400/20' : '',
                // bottom hairline below first row on mobile
                i < 2 ? 'border-b border-cyan-400/20 pb-6 md:border-b-0 md:pb-0' : '',
              ].join(' ')}
            >
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 tabular-nums tracking-tight">
                {m.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-400 mt-2">
                {t(m.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
