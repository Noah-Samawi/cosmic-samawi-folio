import { useLanguage } from "@/contexts/LanguageContext";
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const Datenschutz = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">{t('legal.privacy')}</h1>
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.overview')}</h2>
            <p className="text-muted-foreground">{t('privacy.overviewBody')}</p>
            <p className="text-muted-foreground mt-2">{t('privacy.collectionBody')}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.hosting')}</h2>
            <p className="text-muted-foreground">{t('privacy.hostingBody')}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.general')}</h2>
            <div className="text-muted-foreground">
              <p className="font-medium text-foreground">{t('privacy.controller')}</p>
              <p>Noah Al-Samawi</p>
              <p>Im Mellsig 30</p>
              <p>60433 Frankfurt am Main</p>
              <p>{t('legal.email')}: <bdi dir="ltr">kontakt@noahsamawi.de</bdi></p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.data')}</h2>
            <p className="text-muted-foreground">{t('privacy.formBody')}</p>
            <p className="text-muted-foreground mt-2">{t('privacy.cookiesBody')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
