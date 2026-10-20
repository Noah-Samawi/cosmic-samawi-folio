import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import NoavioLogo from './NoavioLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (location.hash && isHomePage) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, [location.hash, isHomePage]);

  useEffect(() => {
    const sections = ['home', 'services', 'approach', 'projects', 'contact'];
    const handleScroll = () => {
      const y = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.portfolio', href: '#projects' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate(`/${href}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href={isHomePage ? '#home' : '/'}
            onClick={(e) => isHomePage && handleNavClick(e, '#home')}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            aria-label="Noah Al-Samawi — Home"
          >
            <NoavioLogo />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id && isHomePage;
              return (
                <a
                  key={item.key}
                  href={isHomePage ? item.href : `/${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-cyan-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Book a Call CTA */}
            <a
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold transition-all duration-150 hover:bg-cyan-400 shadow-[0_0_24px_-8px_rgba(34,211,238,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t('nav.book')}
            </a>

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Change language"
                >
                  <Globe className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold bg-cyan-500 text-slate-950 rounded px-1 leading-tight">
                    {language.toUpperCase()}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px] bg-slate-900 border-slate-800">
                <DropdownMenuItem
                  onClick={() => setLanguage('de')}
                  className={language === 'de' ? 'text-cyan-300' : 'text-slate-300'}
                >
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'text-cyan-300' : 'text-slate-300'}
                >
                  🇬🇧 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-cyan-500/10 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id && isHomePage;
                return (
                  <a
                    key={item.key}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
                    }`}
                  >
                    {t(item.key)}
                  </a>
                );
              })}
              <a
                href={isHomePage ? '#contact' : '/#contact'}
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-2 inline-flex items-center justify-center h-11 px-5 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition-colors"
              >
                {t('nav.book')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
