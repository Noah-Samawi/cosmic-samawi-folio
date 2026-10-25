import { useLanguage } from "@/contexts/LanguageContext";
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const AGB: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{t('legal.terms')} — Noavio IT Solutions</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">
          {t('legal.terms')}
        </h1>
        <p className="text-muted-foreground">{t('legal.soon')}</p>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
