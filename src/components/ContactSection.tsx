import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, Github, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      label: '+49 152 1515 8667',
      href: 'tel:+4915215158667',
    },
    {
      icon: Mail,
      label: 'kontakt@noahsamawi.de',
      href: 'mailto:kontakt@noahsamawi.de',
    },
    {
      icon: Linkedin,
      label: 'linkedin.com/in/noah-al-samawi',
      href: 'https://www.linkedin.com/in/noah-al-samawi-058583197/',
      external: true,
    },
    {
      icon: Github,
      label: 'github.com/Noah-Samawi',
      href: 'https://github.com/Noah-Samawi',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Frankfurt am Main, Deutschland',
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-t border-cyan-500/10 bg-slate-900/40"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
              {t('contact.eyebrow')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed text-balance mb-8">
              {t('contact.sub')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:kontakt@noahsamawi.de?subject=15-Minuten%20Kennenlernen"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-base transition-all duration-150 hover:bg-cyan-400 shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t('contact.cta.primary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="mailto:kontakt@noahsamawi.de?subject=DSGVO-QuickScan%20Anfrage"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 font-medium text-base transition-all duration-150 hover:border-cyan-400/60 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t('contact.cta.secondary')}
              </a>
            </div>
          </motion.div>

          {/* Right: Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-7 md:p-8 backdrop-blur-sm"
          >
            <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-medium mb-6">
              {t('contact.direct')}
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-3 text-slate-300 group-hover:text-cyan-300 transition-colors duration-150">
                    <span className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 transition-colors">
                      <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] break-all">{item.label}</span>
                  </span>
                );
                return (
                  <li key={i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('contact.languages')}: <span className="text-slate-400 font-medium">Deutsch · English · العربية</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
