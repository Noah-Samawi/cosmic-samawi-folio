import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const Presse = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Presse | Tech-Noah Solutions</title>
        <meta name="description" content="Presseinformationen und Medienressourcen von Tech-Noah Solutions." />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">Presse</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pressekontakt</h2>
            <p>Noah Al-Samawi</p>
            <p>E-Mail: kontakt@noahsamawi.de</p>
            <p>Telefon: +49 152 1515 8667</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Über Tech-Noah Solutions</h2>
            <p>
              Tech-Noah Solutions ist eine KI-gestützte Software- und Automatisierungsagentur mit Sitz in Frankfurt am Main. 
              Wir entwickeln maßgeschneiderte Webanwendungen, KI-Integrationen und Automatisierungslösungen für Unternehmen weltweit.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Medienressourcen</h2>
            <p>Für Logos, Bilder und weitere Materialien kontaktieren Sie uns bitte direkt per E-Mail.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Presse;
