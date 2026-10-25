import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const faqs = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

const FAQSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      aria-labelledby="faq-headline"
      className="relative bg-slate-950 py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t('faq.eyebrow')}
          </p>
          <h2
            id="faq-headline"
            className="text-3xl md:text-4xl font-bold text-white mt-3"
          >
            {t('faq.headline')}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="border border-cyan-400/15 rounded-xl bg-slate-900/40 px-5 data-[state=open]:border-cyan-400/40 transition-colors"
            >
              <AccordionTrigger className="text-start gap-3 text-base md:text-lg font-medium text-white hover:no-underline [&>svg]:text-cyan-400">
                {t(item.q)}
              </AccordionTrigger>
              <AccordionContent className="text-base text-slate-300 leading-relaxed">
                {t(item.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
