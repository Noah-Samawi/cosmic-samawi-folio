import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkipNavLinkProps {
  targetId?: string;
}

const SkipNavLink: React.FC<SkipNavLinkProps> = ({ targetId = 'main-content' }) => {
  const { t } = useLanguage();
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
    >
      {t('common.skip')}
    </a>
  );
};

export default SkipNavLink;
