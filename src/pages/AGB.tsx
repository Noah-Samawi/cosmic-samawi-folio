import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const AGB: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>AGB — Noavio IT Solutions</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-muted-foreground">Wird in Kürze ergänzt.</p>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
