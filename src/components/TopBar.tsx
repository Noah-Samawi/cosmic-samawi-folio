import React from 'react';
import { LogIn, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { t, direction } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-[61] h-8 bg-card/80 backdrop-blur-md border-b border-border/30 text-xs" dir={direction}>
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <LogIn className="w-3 h-3" />
          <span>{t('topbar.clientLogin')}</span>
        </button>
        <a
          href="#case-studies"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <Search className="w-3 h-3" />
          <span>{t('topbar.quickBrowse')}</span>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
