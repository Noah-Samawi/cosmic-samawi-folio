import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
            <p className="text-muted-foreground">Allgemeine Hinweise: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
            <p className="text-muted-foreground mt-2">Datenerfassung auf dieser Website: Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Hosting (Vercel)</h2>
            <p className="text-muted-foreground">Wir hosten unsere Website bei Vercel Inc. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="text-muted-foreground">
              <p className="font-medium text-foreground">Verantwortliche Stelle:</p>
              <p>Noah Al-Samawi</p>
              <p>Im Mellsig 30</p>
              <p>60433 Frankfurt am Main</p>
              <p>E-Mail: kontakt@noahsamawi.de</p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Datenerfassung auf dieser Website</h2>
            <p className="text-muted-foreground">Kontaktformular: Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular zwecks Bearbeitung der Anfrage bei uns gespeichert.</p>
            <p className="text-muted-foreground mt-2">Cookies: Unsere Website verwendet Cookies zur Verbesserung der Nutzererfahrung.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
