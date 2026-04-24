import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoavioLogo from './NoavioLogo';

const XingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L21.235.756c.095-.191.097-.387.006-.535C21.151.078 20.987 0 20.775 0h-2.587zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.453c.522 0 .771-.348.95-.682l3.708-6.564-2.36-4.122c-.179-.327-.437-.706-.972-.706H3.648z" />
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutzerklärung', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ];

  const handleCookieSettings = () => {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  };

  return (
    <footer className="relative border-t border-cyan-400/20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <NoavioLogo />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <p className="mt-4 text-xs text-slate-500">
              © {currentYear} Noavio IT Solutions
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={handleCookieSettings}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Cookies-Einstellungen
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:kontakt@noahsamawi.de"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  kontakt@noahsamawi.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915215158667"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  +49 1521 515 8667
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                Frankfurt am Main
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/in/noah-al-samawi-058583197/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Noah-Samawi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.xing.com/profile/Noah_AlSamawi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xing"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors"
              >
                <XingIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cyan-400/10 text-center">
          <p className="text-xs text-slate-500">
            Entwickelt mit Sorgfalt in Frankfurt am Main.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
