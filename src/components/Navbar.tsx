import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import CommandPalette from './CommandPalette';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { language, setLanguage, t, direction } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const languageLabels: Record<string, string> = {
    en: 'EN',
    de: 'DE',
    ar: 'AR',
  };

  // Handle smooth scrolling after navigation from sub-pages
  useEffect(() => {
    if (location.hash && isHomePage) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', href: '#home', path: '/' },
    { key: 'nav.about', href: '#about', path: '/#about' },
    { key: 'nav.services', href: '#services', path: '/#services' },
    { key: 'nav.projects', href: '#projects', path: '/#projects' },
    { key: 'nav.skills', href: '#skills', path: '/#skills' },
    { key: 'nav.education', href: '#education', path: '/#education' },
    { key: 'nav.contact', href: '#contact', path: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate(item.path);
    }
  };

  const cycleLanguage = () => {
    const languages: Array<'en' | 'de' | 'ar'> = ['en', 'de', 'ar'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-card border-b border-border/50 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      dir={direction}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="font-display text-xl md:text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.02 }}
          >
            Noah<span className="text-foreground">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={item.key}
                  href={isHomePage ? item.href : item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-4 py-2 text-sm transition-colors rounded-lg ${
                    isActive && isHomePage
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {t(item.key)}
                  {isActive && isHomePage && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(124,58,237,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Theme Toggle, Language Toggle, Command Palette & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Command Palette */}
            <CommandPalette />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative"
              data-theme-toggle
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
            
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Globe className="h-5 w-5" />
                  <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded px-1">
                    {languageLabels[language]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[100px]">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-primary/10 text-primary' : ''}
                >
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('de')}
                  className={language === 'de' ? 'bg-primary/10 text-primary' : ''}
                >
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('ar')}
                  className={language === 'ar' ? 'bg-primary/10 text-primary' : ''}
                >
                  🇸🇦 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                  return (
                    <a
                      key={item.key}
                      href={isHomePage ? item.href : item.path}
                      className={`px-4 py-3 transition-colors rounded-lg ${
                        isActive && isHomePage
                          ? 'text-primary bg-primary/10 font-medium' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleNavClick(e, item);
                      }}
                    >
                      {t(item.key)}
                    </a>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
