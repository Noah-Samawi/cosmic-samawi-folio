import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            <p>Noah Al-Samawi</p>
            <p>Full-Stack Software Developer</p>
            <p>Im Mellsig 30</p>
            <p>60433 Frankfurt am Main</p>
            <p>Deutschland</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
            <p>Telefon: +49 152 1515 8667</p>
            <p>E-Mail: kontakt@noahsamawi.de</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
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
