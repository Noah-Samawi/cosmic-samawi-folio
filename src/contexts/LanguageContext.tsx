import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "de";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über mich",
    "nav.services": "Was ich mache",
    "nav.approach": "Vorgehen",
    "nav.portfolio": "Projekte",
    "nav.projects": "Projekte",
    "nav.skills": "Stack",
    "nav.casestudies": "Projekte",
    "nav.experience": "Erfahrung",
    "nav.education": "Ausbildung",
    "nav.contact": "Kontakt",
    "nav.consult": "Erstgespräch",
    "nav.book": "Erstgespräch buchen",

    // Hero
    "hero.name": "Noah Al-Samawi",
    "hero.role": "Full-Stack Developer & IT Engineer",
    "hero.tagline": "Frankfurt am Main · Verfügbar für Freelance-Projekte",

    // AI-native statement
    "ai.eyebrow": "DIE NÄCHSTE WELLE",
    "ai.headline.p1": "Vor 20 Jahren brauchte jedes Unternehmen eine Website. Heute braucht jedes Unternehmen einen ",
    "ai.headline.accent": "KI-nativen Entwickler",
    "ai.headline.p2": ".",
    "ai.support":
      "Ich baue KI-native Software, die Teams entlastet, Prozesse automatisiert und messbar Zeit und Kosten spart — DSGVO-konform, stack-agnostisch, aus Frankfurt.",
    "hero.cta.primary": "Kostenloses 30-Min-Gespräch buchen",
    "hero.cta.secondary": "Profil ansehen (PDF)",
    "hero.cta.profile": "Profil ansehen (PDF)",
    "hero.cta.contact": "Kontakt aufnehmen",
    "hero.status": "Verfügbar für Freelance-Projekte",
    "hero.cta.caption": "Keine Verpflichtung · Video oder Telefon · Antwort < 24 h",

    // Metrics bar
    "metrics.experience": "Jahre IT-Erfahrung",
    "metrics.languages": "Sprachen gesprochen",
    "metrics.pagespeed": "Google PageSpeed",
    "metrics.dsgvo": "DSGVO-konform",

    // Process timeline
    "process.eyebrow": "DER WEG ZUM PROJEKT",
    "process.headline": "So arbeiten wir zusammen.",
    "process.s1.title": "Erstgespräch",
    "process.s1.body": "15 Minuten kostenlos. Wir klären, ob wir zusammenpassen und was Sie eigentlich brauchen.",
    "process.s2.title": "Konzept & Angebot",
    "process.s2.body": "Innerhalb 48 Stunden erhalten Sie einen klaren Projektplan, konkrete Kalkulation und Zeitschiene.",
    "process.s3.title": "Umsetzung",
    "process.s3.body": "Agile Entwicklung mit wöchentlichen Zwischenständen. Sie sehen jederzeit, wo wir stehen.",
    "process.s4.title": "Launch & Betreuung",
    "process.s4.body": "Go-Live, Übergabe, und auf Wunsch laufender Support-Retainer für langfristige Weiterentwicklung.",

    // FAQ
    "faq.eyebrow": "HÄUFIG GEFRAGT",
    "faq.headline": "Was Sie wahrscheinlich wissen wollen.",
    "faq.q1": "Ist die Entwicklung wirklich DSGVO-konform?",
    "faq.a1": "Ja. Ich entwickle nach dem Prinzip \"DSGVO by Design\": minimale Datenerhebung, verschlüsselte Speicherung, Hosting in der EU (Frankfurt oder Nürnberg), vollständige Datenschutz-Dokumentation für jedes Projekt. Auf Wunsch stelle ich Ihnen die Auftragsverarbeitungsvereinbarung (AVV) direkt zum Projektstart bereit.",
    "faq.q2": "Was kostet ein Projekt?",
    "faq.a2": "Jedes Projekt ist individuell. Schreiben Sie mir — ich antworte innerhalb von 24 Stunden mit einer ersten Einschätzung.",
    "faq.q3": "Arbeiten Sie alleine oder mit einem Team?",
    "faq.a3": "Als Ansprechpartner haben Sie mich direkt — keine Account-Manager, keine Weiterleitung. Für größere Projekte ziehe ich bei Bedarf ein kuratiertes Netzwerk aus vertrauten Spezialisten (Design, DevOps, Security) hinzu. Sie kommunizieren immer nur mit mir.",
    "faq.q4": "Wie schnell können wir starten?",
    "faq.a4": "Standard-Vorlauf vom Erstgespräch bis zum Projektstart sind ein bis zwei Wochen. Für dringende Fälle (Website-Ausfall, DSGVO-Dringlichkeit, akuter IT-Support) ist auch Start innerhalb 48 Stunden möglich.",
    "faq.q5": "Was passiert, wenn ich nach dem Launch Änderungen brauche?",
    "faq.a5": "Jedes Projekt enthält einen Support-Zeitraum nach dem Go-Live (zwei Wochen bis ein Monat, je nach Paket). Für laufende Weiterentwicklung gibt es flexible Retainer-Modelle — stundenbasiert oder mit festem Kontingent pro Monat.",
    "faq.q6": "Binden Sie mich an einen bestimmten Tech-Stack?",
    "faq.a6": "Nein. Ich arbeite stack-agnostisch — das heißt, ich wähle für jedes Projekt die passende Technologie, nicht die, die mir gerade gefällt. Typisch sind React, Next.js, Django, Python und Node — aber die Entscheidung fällt nach Ihrem Bedarf, nicht nach meinem Portfolio.",

    // Trust strip
    "trust.exp": "10+ Jahre IT-Erfahrung",

    // Services
    "svc.eyebrow": "WAS ICH MACHE",
    "svc.title": "What I Do",
    "svc.sub":
      "Vier Schwerpunkte aus über 10 Jahren IT-Praxis — von der ersten Codezeile bis zum laufenden Betrieb.",
    "svc.web.title": "Web Development & Software Engineering",
    "svc.web.lead":
      "Ich entwickle maßgeschneiderte Webanwendungen — skalierbar, performant und wartbar, mit dem passenden Stack für das Problem.",
    "svc.web.b1": "Full-Stack Web-Apps (React, Next.js, TypeScript, Django, Node)",
    "svc.web.b2": "REST- und GraphQL-APIs, Drittanbieter-Integrationen, ERP/CRM-Brücken",
    "svc.web.b3": "Performance-first Architektur, Core Web Vitals über 90",
    "svc.it.title": "IT Support & Consulting",
    "svc.it.lead":
      "Zuverlässiger technischer Betrieb und ehrliche Beratung — von Linux-Servern bis Cloud-Deployments, mit schnellen, persönlichen Reaktionszeiten.",
    "svc.it.b1": "Docker, CI/CD, Cloud-Deployments (AWS, Vercel, DigitalOcean)",
    "svc.it.b2": "Remote-IT-Support, Netzwerk-Setup, Monitoring & Backups",
    "svc.it.b3": "Technische Beratung & Wartung nach Bedarf",
    "svc.sec.title": "IT Security & DSGVO-konforme Architektur",
    "svc.sec.lead":
      "Security-by-Design und Datenschutz, der einem echten Audit standhält. Komplexe Compliance übersetze ich in pragmatische, dokumentierte Implementierungen.",
    "svc.sec.b1": "DSGVO-Beratung, Datenschutzerklärungen, Verzeichnis von Verarbeitungstätigkeiten",
    "svc.sec.b2": "OWASP-Top-10-Härtung, OAuth2/JWT, sicheres Session-Handling",
    "svc.sec.b3": "Vulnerability-Reviews, Audit-Vorbereitung, Entwickler-Schulungen",
    "svc.ai.title": "AI Integration & Automation",
    "svc.ai.lead":
      "Ich verbinde Sprachmodelle mit bestehenden Systemen und automatisiere wiederkehrende Abläufe — praxisnah und datenschutzkonform.",
    "svc.ai.b1": "LLM-Integration (OpenAI, Gemini), Chatbots & Assistenten",
    "svc.ai.b2": "Workflow-Automatisierung und API-Anbindungen",
    "svc.ai.b3": "RAG-Lösungen mit eigenen Dokumenten und Datenbanken",

    // Approach
    "app.eyebrow": "WIE WIR ARBEITEN",
    "app.title": "Language-agnostic. Outcome-obsessed.",
    "app.s1.title": "Zuhören.",
    "app.s1.desc": "Ein 30-minütiges kostenloses Kennenlernen, um Ihr Geschäft zu verstehen — kein Vertriebsgespräch.",
    "app.s2.title": "Scope.",
    "app.s2.desc": "Schriftliches Angebot mit klaren Deliverables, Zeitplan und Festpreis oder Retainer.",
    "app.s3.title": "Bauen.",
    "app.s3.desc": "Direkte Kommunikation mit mir, wöchentliche Check-ins, produktionsreifer Code ab Tag eins.",
    "app.s4.title": "Betreiben.",
    "app.s4.desc": "Dokumentationsübergabe, retainer-basierte Wartung, kein Vendor-Lock-in.",

    // Projects
    "projects.eyebrow": "PROJEKTE",
    "projects.title": "Projekte",
    "projects.subtitle": "Aktuelle Arbeiten sind auf GitHub dokumentiert.",
    "projects.github": "GitHub ansehen",
    "projects.viewLive": "Live ansehen",
    "projects.viewCode": "Code ansehen",
    "projects.coming": "Case Study folgt in Kürze.",

    // Contact
    "contact.eyebrow": "REDEN WIR",
    "contact.title": "Let's work together",
    "contact.sub": "Ich bin verfügbar für Freelance-Projekte und Teilzeit-Zusammenarbeit — auf Deutsch, Englisch oder Arabisch. Schreiben Sie mir, ich antworte innerhalb von 24 Stunden.",
    "contact.cta.primary": "Kostenloses 30-Min Gespräch buchen",
    "contact.cta.secondary": "DSGVO-QuickScan anfragen",
    "contact.direct": "Direkter Draht",
    "contact.languages": "Sprachen",

    // Footer
    "footer.tagline": "Full-Stack Developer & IT Engineer aus Frankfurt am Main.",
    "footer.navigate": "Navigation",
    "footer.legal": "Rechtliches",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.visitors": "Besucher",

    // About / Terminal
    "about.title": "Über mich",
    "about.subtitle": "Über 10 Jahre IT-Erfahrung — ich entwickle, sichere und automatisiere.",

    // Reviews
    "testimonials.title": "Was Kunden sagen",
    "testimonials.subtitle": "Vertrauen, in einer Zeile.",
    "testimonials.writeReview": "Bewertung schreiben",

    // Misc placeholders kept for compatibility
    "common.loading": "Lädt…",
    "common.error": "Ein Fehler ist aufgetreten",
    "cookie.message": "Wir verwenden essenzielle Cookies, um Ihre Erfahrung zu verbessern.",
    "cookie.accept": "Akzeptieren",
    "cookie.decline": "Ablehnen",
    "skills.title": "Tech Stack",
    "skills.subtitle": "Tools, die wir täglich verwenden.",

    // Legacy keys (some old components still query these)
    "services.title": "Leistungen",
    "services.subtitle": "Drei Disziplinen, ein Partner.",
    "services.learnMore": "Mehr erfahren",
    "services.web.title": "Web & Software",
    "services.web.desc": "Custom Web-Anwendungen und Plattformen.",
    "services.web.f1": "Full-Stack",
    "services.web.f2": "APIs & Integrationen",
    "services.web.f3": "Performance-first",
    "services.design.title": "Branding & Design",
    "services.design.desc": "Visuelle Identität für Ihr Unternehmen.",
    "services.design.f1": "Brand-Design",
    "services.design.f2": "Print & Digital",
    "services.design.f3": "Corporate Identity",
    "services.it.title": "IT-Support",
    "services.it.desc": "Zuverlässiger IT-Support für KMU.",
    "services.it.f1": "Remote-Support",
    "services.it.f2": "Netzwerk & Hardware",
    "services.it.f3": "Retainer mit SLAs",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About me",
    "nav.services": "What I Do",
    "nav.approach": "Approach",
    "nav.portfolio": "Projects",
    "nav.projects": "Projects",
    "nav.skills": "Stack",
    "nav.casestudies": "Projects",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.consult": "Get a Quote",
    "nav.book": "Book a Call",

    // Hero
    "hero.name": "Noah Al-Samawi",
    "hero.role": "Full-Stack Developer & IT Engineer",
    "hero.tagline": "Frankfurt am Main · Available for Freelance Projects",

    // AI-native statement
    "ai.eyebrow": "THE NEXT WAVE",
    "ai.headline.p1": "20 years ago every company needed a website. Today every company needs an ",
    "ai.headline.accent": "AI-native developer",
    "ai.headline.p2": ".",
    "ai.support":
      "I build AI-native software that frees teams, automates processes and measurably saves time and cost — GDPR-compliant, stack-agnostic, from Frankfurt.",
    "hero.cta.primary": "Book a Free 30-min Call",
    "hero.cta.secondary": "View Profile (PDF)",
    "hero.cta.profile": "View Profile (PDF)",
    "hero.cta.contact": "Get in Touch",
    "hero.status": "Available for freelance projects",
    "hero.cta.caption": "No commitment · Video or phone · Reply < 24 h",

    // Metrics bar
    "metrics.experience": "Years of IT experience",
    "metrics.languages": "Languages spoken",
    "metrics.pagespeed": "Google PageSpeed",
    "metrics.dsgvo": "GDPR-compliant",

    // Process timeline
    "process.eyebrow": "THE PATH TO YOUR PROJECT",
    "process.headline": "How we work together.",
    "process.s1.title": "Intro call",
    "process.s1.body": "15 minutes, free. We figure out if we're a fit and what you actually need.",
    "process.s2.title": "Concept & proposal",
    "process.s2.body": "Within 48 hours you get a clear project plan, concrete budget and timeline.",
    "process.s3.title": "Build",
    "process.s3.body": "Agile delivery with weekly check-ins. You always know exactly where we stand.",
    "process.s4.title": "Launch & support",
    "process.s4.body": "Go-live, handover, and an optional ongoing support retainer for long-term work.",

    // FAQ
    "faq.eyebrow": "FREQUENTLY ASKED",
    "faq.headline": "What you're probably wondering.",
    "faq.q1": "Is development really GDPR-compliant?",
    "faq.a1": "Yes. I build with \"GDPR by Design\": minimal data collection, encrypted storage, EU hosting (Frankfurt or Nuremberg), and full data-protection documentation per project. A data-processing agreement (DPA / AVV) is available at project start.",
    "faq.q2": "How much does a project cost?",
    "faq.a2": "Every project is individual. Write to me — I reply within 24 hours with a first assessment.",
    "faq.q3": "Do you work alone or with a team?",
    "faq.a3": "You talk to me directly — no account managers, no handoffs. For larger projects I bring in a curated network of trusted specialists (design, DevOps, security). You always communicate with me.",
    "faq.q4": "How fast can we start?",
    "faq.a4": "Standard lead time from intro call to kickoff is one to two weeks. For urgent cases (site outage, GDPR urgency, acute IT support) we can start within 48 hours.",
    "faq.q5": "What happens if I need changes after launch?",
    "faq.a5": "Every project includes a post-launch support window (two weeks to one month depending on package). For ongoing work there are flexible retainer models — hourly or fixed monthly allotment.",
    "faq.q6": "Will you lock me into a specific tech stack?",
    "faq.a6": "No. I work stack-agnostic — I pick the right technology for each project, not the one I happen to like. Typical stacks are React, Next.js, Django, Python and Node — but the choice follows your needs, not my portfolio.",

    // Trust strip
    "trust.exp": "10+ Years IT Experience",

    // Services
    "svc.eyebrow": "WHAT I DO",
    "svc.title": "What I Do",
    "svc.sub":
      "Four focus areas from 10+ years of hands-on IT — from the first line of code to day-to-day operations.",
    "svc.web.title": "Web Development & Software Engineering",
    "svc.web.lead":
      "I build bespoke web applications — scalable, fast and maintainable, with the right stack for the problem.",
    "svc.web.b1": "Full-stack web apps (React, Next.js, TypeScript, Django, Node)",
    "svc.web.b2": "REST & GraphQL APIs, third-party integrations, ERP/CRM bridges",
    "svc.web.b3": "Performance-first architecture, Core Web Vitals above 90",
    "svc.it.title": "IT Support & Consulting",
    "svc.it.lead":
      "Reliable technical operations and honest advice — from Linux servers to cloud deployments, with fast, personal response times.",
    "svc.it.b1": "Docker, CI/CD, cloud deployments (AWS, Vercel, DigitalOcean)",
    "svc.it.b2": "Remote IT support, network setup, monitoring & backups",
    "svc.it.b3": "Technical consulting & maintenance on demand",
    "svc.sec.title": "IT Security & DSGVO-compliant Architecture",
    "svc.sec.lead":
      "Security-by-design and data protection that stands up to a real audit. I translate complex compliance into pragmatic, documented implementations.",
    "svc.sec.b1": "DSGVO/GDPR consulting, privacy policies, data-processing records",
    "svc.sec.b2": "OWASP Top-10 hardening, OAuth2/JWT, secure session handling",
    "svc.sec.b3": "Vulnerability reviews, penetration-style audits, dev training",
    "svc.ai.title": "AI Integration & Automation",
    "svc.ai.lead":
      "I connect language models to existing systems and automate repetitive workflows — practical and privacy-compliant.",
    "svc.ai.b1": "LLM integration (OpenAI, Gemini), chatbots & assistants",
    "svc.ai.b2": "Workflow automation and API integrations",
    "svc.ai.b3": "RAG solutions with your own documents and databases",

    // Approach
    "app.eyebrow": "HOW I WORK",
    "app.title": "Language-agnostic. Outcome-obsessed.",
    "app.s1.title": "Listen.",
    "app.s1.desc": "A 30-minute free intro call to understand your business — not a sales pitch.",
    "app.s2.title": "Scope.",
    "app.s2.desc": "A written proposal with clear deliverables, timeline, and a fixed or retainer price.",
    "app.s3.title": "Build.",
    "app.s3.desc": "Direct communication with me, weekly check-ins, production-quality code from day one.",
    "app.s4.title": "Sustain.",
    "app.s4.desc": "Documentation handover, retainer-based maintenance, no vendor lock-in.",

    // Projects
    "projects.eyebrow": "PROJECTS",
    "projects.title": "Projects",
    "projects.subtitle": "Current work is documented on GitHub.",
    "projects.github": "View GitHub",
    "projects.viewLive": "View Live",
    "projects.viewCode": "View Code",
    "projects.coming": "Case study coming soon.",

    // Contact
    "contact.eyebrow": "LET'S TALK",
    "contact.title": "Let's work together",
    "contact.sub": "I'm available for freelance projects and part-time collaborations — in German, English or Arabic. Drop me a message, I reply within 24 hours.",
    "contact.cta.primary": "Book a Free 30-min Call",
    "contact.cta.secondary": "Request a DSGVO QuickScan",
    "contact.direct": "Direct line",
    "contact.languages": "Languages",

    // Footer
    "footer.tagline": "Full-Stack Developer & IT Engineer from Frankfurt am Main.",
    "footer.navigate": "Navigate",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",
    "footer.visitors": "Visitors",

    // About
    "about.title": "About me",
    "about.subtitle": "10+ years in IT — I build, secure and automate.",

    // Reviews
    "testimonials.title": "What clients say",
    "testimonials.subtitle": "Trust, in one line.",
    "testimonials.writeReview": "Write a Review",

    // Misc
    "common.loading": "Loading…",
    "common.error": "An error occurred",
    "cookie.message": "We use essential cookies to improve your experience.",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",
    "skills.title": "Tech Stack",
    "skills.subtitle": "Tools we use day-to-day.",

    // Legacy keys
    "services.title": "Services",
    "services.subtitle": "Three disciplines, one partner.",
    "services.learnMore": "Learn more",
    "services.web.title": "Web & Software",
    "services.web.desc": "Custom web applications and platforms.",
    "services.web.f1": "Full-Stack",
    "services.web.f2": "APIs & Integrations",
    "services.web.f3": "Performance-first",
    "services.design.title": "Branding & Design",
    "services.design.desc": "Visual identity for your business.",
    "services.design.f1": "Brand Design",
    "services.design.f2": "Print & Digital",
    "services.design.f3": "Corporate Identity",
    "services.it.title": "IT Support",
    "services.it.desc": "Reliable IT support for SMEs.",
    "services.it.f1": "Remote Support",
    "services.it.f2": "Network & Hardware",
    "services.it.f3": "Retainer with SLAs",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("de");
  const direction: Direction = "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language") as Language | null;
    if (saved && (saved === "en" || saved === "de")) {
      setLanguageState(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
