import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const AGB: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>AGB | Noavio IT Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Allgemeine Geschäftsbedingungen der Noavio IT Solutions, Frankfurt am Main."
        />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-32 max-w-4xl">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-2">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-sm text-slate-500 mb-10">
          Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })} · Noavio IT Solutions, Frankfurt am Main
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für sämtliche Verträge zwischen Noah Al-Samawi,
              handelnd unter „Noavio IT Solutions" (nachfolgend „Auftragnehmer"), Im Mellsig 30, 60433 Frankfurt am Main, und
              dem Auftraggeber über IT-Dienstleistungen, insbesondere Software-Entwicklung, IT-Beratung, IT-Support sowie
              damit verbundene Leistungen.
            </p>
            <p className="mt-2">
              Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen des Auftraggebers werden nicht Vertragsbestandteil,
              es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 2 Vertragsschluss</h2>
            <p>
              Angebote des Auftragnehmers sind freibleibend. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung
              des Auftragnehmers oder durch Beginn der Leistungsausführung zustande. Mündliche Nebenabreden bedürfen zur
              Wirksamkeit der schriftlichen Bestätigung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 3 Leistungsumfang</h2>
            <p>
              Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
              Soweit nichts anderes vereinbart ist, schuldet der Auftragnehmer eine Dienstleistung im Sinne der §§ 611 ff. BGB,
              keinen Werkerfolg. Werkleistungen sind als solche ausdrücklich zu kennzeichnen.
            </p>
            <p className="mt-2">
              Der Auftragnehmer ist berechtigt, zur Erfüllung seiner Leistungspflichten qualifizierte Subunternehmer
              hinzuzuziehen. Die Verantwortung gegenüber dem Auftraggeber bleibt davon unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 4 Mitwirkungspflichten des Auftraggebers</h2>
            <p>
              Der Auftraggeber stellt dem Auftragnehmer rechtzeitig und unentgeltlich alle für die Leistungserbringung
              erforderlichen Informationen, Daten, Zugänge und Materialien zur Verfügung. Verzögerungen aufgrund unterbliebener
              oder verspäteter Mitwirkung gehen zu Lasten des Auftraggebers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 5 Vergütung und Zahlungsbedingungen</h2>
            <p>
              Die Vergütung richtet sich nach dem vereinbarten Stunden- bzw. Pauschalsatz zzgl. der gesetzlichen Umsatzsteuer.
              Rechnungen sind innerhalb von 14 Tagen nach Zugang ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden
              Verzugszinsen in gesetzlicher Höhe berechnet.
            </p>
            <p className="mt-2">
              Der Auftragnehmer ist berechtigt, bei Projekten ab einem Volumen von 2.000 € netto eine Anzahlung in Höhe
              von 30 % des vereinbarten Honorars zu verlangen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 6 Nutzungsrechte und Eigentumsvorbehalt</h2>
            <p>
              An vom Auftragnehmer erstellten Arbeitsergebnissen erhält der Auftraggeber nach vollständiger Bezahlung der
              vereinbarten Vergütung ein einfaches, nicht ausschließliches, zeitlich und räumlich unbeschränktes Nutzungsrecht
              für den vertraglich vereinbarten Zweck. Eine Übertragung an Dritte oder Bearbeitung bedarf der vorherigen
              schriftlichen Zustimmung des Auftragnehmers.
            </p>
            <p className="mt-2">
              An Open-Source-Komponenten gelten die jeweiligen Lizenzbedingungen der Drittanbieter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 7 Gewährleistung</h2>
            <p>
              Der Auftragnehmer gewährleistet, dass die erbrachten Leistungen den vertraglich vereinbarten Spezifikationen
              entsprechen. Mängel sind unverzüglich, spätestens innerhalb von 14 Tagen nach Übergabe, schriftlich anzuzeigen.
              Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 8 Haftung</h2>
            <p>
              Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben,
              Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf
              den vertragstypischen, vorhersehbaren Schaden begrenzt.
            </p>
            <p className="mt-2">
              Eine Haftung für entgangenen Gewinn, mittelbare Schäden, Folgeschäden sowie Datenverluste ist ausgeschlossen,
              soweit gesetzlich zulässig. Der Auftraggeber ist verpflichtet, eine angemessene Datensicherung vorzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 9 Vertraulichkeit und Datenschutz</h2>
            <p>
              Beide Vertragsparteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen
              auch über die Beendigung des Vertrages hinaus geheim zu halten. Die Verarbeitung personenbezogener Daten erfolgt
              im Einklang mit der DSGVO und dem BDSG. Details regelt die{' '}
              <a href="/datenschutz" className="text-cyan-400 hover:text-cyan-300 underline">
                Datenschutzerklärung
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 10 Kündigung</h2>
            <p>
              Laufende Dienstverhältnisse können von beiden Parteien mit einer Frist von 30 Tagen zum Monatsende ordentlich
              gekündigt werden, sofern nichts anderes schriftlich vereinbart wurde. Das Recht zur außerordentlichen Kündigung
              aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Textform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">§ 11 Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Erfüllungsort und
              ausschließlicher Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, Frankfurt am Main.
            </p>
            <p className="mt-2">
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, so bleibt die
              Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die
              gesetzliche Regelung.
            </p>
          </section>

          <section className="border-t border-slate-800 pt-6 mt-12">
            <p className="text-sm text-slate-500">
              Bei Fragen zu diesen AGB erreichen Sie uns unter{' '}
              <a href="mailto:kontakt@noahsamawi.de" className="text-cyan-400 hover:text-cyan-300">
                kontakt@noahsamawi.de
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
