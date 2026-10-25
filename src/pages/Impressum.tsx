import { useLanguage } from "@/contexts/LanguageContext";
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const Impressum = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">{t('legal.imprint')}</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('legal.provider')}</h2>
            <p>Noah Al-Samawi</p>
            <p>{t('hero.role')}</p>
            <p>Im Mellsig 30</p>
            <p>60433 Frankfurt am Main</p>
            <p>{t('legal.country')}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('nav.contact')}</h2>
            <p>{t('legal.phone')}: <bdi dir="ltr">+49 152 1515 8667</bdi></p>
            <p>{t('legal.email')}: <bdi dir="ltr">kontakt@noahsamawi.de</bdi></p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('legal.responsible')}</h2>
            <p>Noah Al-Samawi</p>
            <p>Im Mellsig 30</p>
            <p>60433 Frankfurt am Main</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
