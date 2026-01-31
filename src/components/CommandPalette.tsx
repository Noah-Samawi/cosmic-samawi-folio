import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Code,
  GraduationCap,
  Mail,
  Download,
  Copy,
  Moon,
  Sun,
  X,
  Command,
  Star,
  Palette,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

interface CommandItem {
  id: string;
  icon: React.ElementType;
  label: string;
  shortcut?: string;
  category: 'navigation' | 'action';
  action: () => void;
  aliases?: string[]; // For fuzzy search
}

interface CommandPaletteProps {
  onOpenDesignGallery?: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenDesignGallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t, direction } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigateToSection = useCallback((sectionId: string) => {
    setIsOpen(false);
    setSearch('');
    
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  }, [isHomePage, navigate]);

  const commands: CommandItem[] = [
    {
      id: 'home',
      icon: Home,
      label: t('nav.home'),
      category: 'navigation',
      action: () => navigateToSection('home'),
      aliases: ['start', 'top', 'beginning'],
    },
    {
      id: 'about',
      icon: User,
      label: t('nav.about'),
      category: 'navigation',
      action: () => navigateToSection('about'),
      aliases: ['me', 'bio', 'profile', 'who'],
    },
    {
      id: 'services',
      icon: Briefcase,
      label: t('nav.services'),
      category: 'navigation',
      action: () => navigateToSection('services'),
      aliases: ['what i do', 'offer', 'work'],
    },
    {
      id: 'projects',
      icon: FolderOpen,
      label: t('nav.projects'),
      category: 'navigation',
      action: () => navigateToSection('projects'),
      aliases: ['portfolio', 'work', 'apps', 'websites'],
    },
    {
      id: 'skills',
      icon: Code,
      label: t('nav.skills'),
      category: 'navigation',
      action: () => navigateToSection('skills'),
      aliases: ['tech', 'technologies', 'stack', 'tools'],
    },
    {
      id: 'education',
      icon: GraduationCap,
      label: t('nav.education'),
      category: 'navigation',
      action: () => navigateToSection('education'),
      aliases: ['school', 'degree', 'university', 'learning'],
    },
    {
      id: 'testimonials',
      icon: Star,
      label: t('testimonials.title'),
      category: 'navigation',
      action: () => navigateToSection('testimonials'),
      aliases: ['reviews', 'feedback', 'opinions', 'comments', 'ratings', 'what people say'],
    },
    {
      id: 'contact',
      icon: Mail,
      label: t('nav.contact'),
      category: 'navigation',
      action: () => navigateToSection('contact'),
      aliases: ['email', 'message', 'reach', 'hire'],
    },
    {
      id: 'download-cv',
      icon: Download,
      label: t('command.downloadCV') || 'Download CV',
      shortcut: '⇧D',
      category: 'action',
      action: () => {
        setIsOpen(false);
        setSearch('');
        window.open('/noah-alsamawi-cv.pdf', '_blank');
      },
      aliases: ['resume', 'pdf', 'curriculum'],
    },
    {
      id: 'copy-email',
      icon: Copy,
      label: t('command.copyEmail') || 'Copy Email',
      shortcut: '⇧E',
      category: 'action',
      action: () => {
        setIsOpen(false);
        setSearch('');
        navigator.clipboard.writeText('kontakt@noahsamawi.de');
        toast.success(t('command.emailCopied') || 'Email copied to clipboard!');
      },
      aliases: ['email address', 'mail'],
    },
    {
      id: 'toggle-theme',
      icon: theme === 'dark' ? Sun : Moon,
      label: theme === 'dark' 
        ? (t('command.lightMode') || 'Switch to Light Mode')
        : (t('command.darkMode') || 'Switch to Dark Mode'),
      shortcut: '⇧T',
      category: 'action',
      action: () => {
        setIsOpen(false);
        setSearch('');
        toggleTheme();
      },
      aliases: ['dark mode', 'light mode', 'theme', 'color scheme'],
    },
    {
      id: 'design-gallery',
      icon: Palette,
      label: t('gallery.title') || 'Design Gallery',
      category: 'action',
      action: () => {
        setIsOpen(false);
        setSearch('');
        if (onOpenDesignGallery) {
          onOpenDesignGallery();
        } else {
          // Emit custom event for design gallery
          window.dispatchEvent(new CustomEvent('openDesignGallery'));
        }
      },
      aliases: ['styles', 'portfolio styles', 'design options'],
    },
  ];

  // Fuzzy search - check label and aliases
  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    const labelMatch = cmd.label.toLowerCase().includes(searchLower);
    const aliasMatch = cmd.aliases?.some(alias => alias.toLowerCase().includes(searchLower));
    return labelMatch || aliasMatch;
  });

  const navigationCommands = filteredCommands.filter((cmd) => cmd.category === 'navigation');
  const actionCommands = filteredCommands.filter((cmd) => cmd.category === 'action');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      // Close on escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
      }

      // Navigate with arrow keys
      if (isOpen && e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      }

      if (isOpen && e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      }

      // Execute selected command
      if (isOpen && e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/50 text-muted-foreground text-sm hover:bg-muted hover:text-foreground transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">{t('command.search') || 'Search...'}</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-background/80 border border-border/50 rounded">
          <Command className="h-3 w-3" />K
        </kbd>
      </motion.button>

      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4"
              dir={direction}
            >
              <div className="relative overflow-hidden rounded-2xl glass-card border border-primary/20 shadow-2xl shadow-primary/10">
                {/* Glow effect */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                {/* Search Input */}
                <div className="relative flex items-center border-b border-border/50">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('command.placeholder') || 'Type a command or search...'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-12 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Command List */}
                <div className="max-h-[300px] overflow-y-auto scrollbar-custom p-2">
                  {filteredCommands.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      {t('command.noResults') || 'No results found.'}
                    </div>
                  ) : (
                    <>
                      {/* Navigation Section */}
                      {navigationCommands.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {t('command.navigation') || 'Navigation'}
                          </div>
                          {navigationCommands.map((cmd, index) => {
                            const globalIndex = filteredCommands.indexOf(cmd);
                            const Icon = cmd.icon;
                            return (
                              <button
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                  selectedIndex === globalIndex
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground hover:bg-muted/50'
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span className="flex-1">{cmd.label}</span>
                                {cmd.shortcut && (
                                  <kbd className="text-xs font-mono text-muted-foreground">
                                    {cmd.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Actions Section */}
                      {actionCommands.length > 0 && (
                        <div>
                          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {t('command.actions') || 'Actions'}
                          </div>
                          {actionCommands.map((cmd) => {
                            const globalIndex = filteredCommands.indexOf(cmd);
                            const Icon = cmd.icon;
                            return (
                              <button
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                  selectedIndex === globalIndex
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground hover:bg-muted/50'
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span className="flex-1">{cmd.label}</span>
                                {cmd.shortcut && (
                                  <kbd className="text-xs font-mono text-muted-foreground">
                                    {cmd.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border/50 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd>
                    <span>{t('command.navigate') || 'Navigate'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd>
                    <span>{t('command.select') || 'Select'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd>
                    <span>{t('command.close') || 'Close'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
