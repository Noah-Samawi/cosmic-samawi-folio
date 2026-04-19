import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import NoavioLogo from './NoavioLogo';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.portfolio', href: '#projects' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutzerklärung', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ];

  return (
    <footer className="relative border-t border-cyan-500/10 bg-slate-950/50">
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <NoavioLogo />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              Noavio IT Solutions · {t('footer.tagline')}
            </p>
            <p className="mt-6 text-xs text-slate-500">
              © {currentYear} Noavio IT Solutions.
            </p>
          </motion.div>

          {/* Col 2: Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium mb-4">
              {t('footer.navigate')}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
