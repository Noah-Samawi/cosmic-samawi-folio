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
    "nav.home": "Start",
    "nav.about": "Über uns",
    "nav.services": "Leistungen",
    "nav.approach": "Vorgehen",
    "nav.portfolio": "Portfolio",
    "nav.projects": "Portfolio",
    "nav.skills": "Stack",
    "nav.casestudies": "Fallstudien",
    "nav.experience": "Erfahrung",
    "nav.education": "Ausbildung",
    "nav.contact": "Kontakt",
    "nav.consult": "Erstgespräch",
    "nav.book": "Erstgespräch buchen",

    // Hero
    "hero.headline.before": "Empowering Your Business with",
    "hero.headline.accent": "Cleveren, anpassbaren",
    "hero.headline.after": "IT-Lösungen.",
    "hero.subhead":
      "Hi, ich bin Noah Al-Samawi — IT-Engineer und Gründer von Noavio IT Solutions. Wir entwickeln sichere, skalierbare Custom-Software und bieten Premium IT-Support für kleine und mittlere Unternehmen in Frankfurt. Language-agnostic by design: der richtige Stack für Ihr Problem, nicht für unseres.",
    "hero.cta.primary": "Mit Noavio starten",
    "hero.cta.secondary": "Leistungen entdecken",
    "hero.cta.profile": "Firmenprofil",
    "hero.cta.contact": "Kontakt aufnehmen",
    "hero.status": "Verfügbar für neue Projekte",

    // Trust strip
    "trust.exp": "10+ Jahre IT-Erfahrung",

    // Services
    "svc.eyebrow": "WAS WIR LIEFERN",
    "svc.title": "Drei Disziplinen. Ein verantwortlicher Partner.",
    "svc.sub":
      "Ob neue Plattform, zuverlässiger Tagesbetrieb oder auditfähige Compliance — Noavio deckt den vollen Stack moderner IT-Arbeit für deutsche KMU ab.",
    "svc.web.title": "Custom Web & Software Architektur",
    "svc.web.lead":
      "Maßgeschneiderte Webanwendungen und Plattformen, designt für Skalierung, Performance und Wartbarkeit — gebaut mit dem richtigen Stack für Ihr Problem, nicht für unseres.",
    "svc.web.b1": "Full-Stack Web-Apps (React, Next.js, TypeScript, Django, Node)",
    "svc.web.b2": "REST- und GraphQL-APIs, Drittanbieter-Integrationen, ERP/CRM-Brücken",
    "svc.web.b3": "Performance-first Architektur, Core Web Vitals über 90",
    "svc.it.title": "IT-Support & Infrastruktur",
    "svc.it.lead":
      "Zuverlässiger technischer Betrieb ohne festangestellte Kraft. Von Linux-Servern bis Cloud-Deployments — planbare Verfügbarkeit und schnelle, persönliche Reaktionszeiten.",
    "svc.it.b1": "Docker, CI/CD, Cloud-Deployments (AWS, Vercel, DigitalOcean)",
    "svc.it.b2": "Remote-IT-Support, Netzwerk-Setup, Monitoring & Backups",
    "svc.it.b3": "Retainer-basierte Wartung mit klaren SLAs",
    "svc.sec.title": "Security & Beratung (DSGVO-konform)",
    "svc.sec.lead":
      "Security-by-Design und Datenschutz, der einem echten Audit standhält. Komplexe Compliance übersetze ich in pragmatische, dokumentierte Implementierungen.",
    "svc.sec.b1": "DSGVO-Beratung, Datenschutzerklärungen, Verzeichnis von Verarbeitungstätigkeiten",
    "svc.sec.b2": "OWASP-Top-10-Härtung, OAuth2/JWT, sicheres Session-Handling",
    "svc.sec.b3": "Vulnerability-Reviews, Audit-Vorbereitung, Entwickler-Schulungen",

    // Approach
    "app.eyebrow": "WIE WIR ARBEITEN",
    "app.title": "Language-agnostic. Outcome-obsessed.",
    "app.s1.title": "Zuhören.",
    "app.s1.desc": "Ein 15-minütiges kostenloses Kennenlernen, um Ihr Geschäft zu verstehen — kein Vertriebsgespräch.",
    "app.s2.title": "Scope.",
    "app.s2.desc": "Schriftliches Angebot mit klaren Deliverables, Zeitplan und Festpreis oder Retainer.",
    "app.s3.title": "Bauen.",
    "app.s3.desc": "Direkte Kommunikation mit mir, wöchentliche Check-ins, produktionsreifer Code ab Tag eins.",
    "app.s4.title": "Betreiben.",
    "app.s4.desc": "Dokumentationsübergabe, retainer-basierte Wartung, kein Vendor-Lock-in.",

    // Projects
    "projects.title": "Portfolio",
    "projects.subtitle": "Ausgewählte Projekte aus unserer Werkstatt.",
    "projects.viewLive": "Live ansehen",
    "projects.viewCode": "Code ansehen",
    "projects.coming": "Case Study folgt in Kürze.",

    // Contact
    "contact.eyebrow": "REDEN WIR",
    "contact.title": "Lassen Sie uns über Ihre nächsten 90 Tage sprechen.",
    "contact.sub": "Kostenloses 15-Minuten-Gespräch — auf Deutsch, English oder Arabisch. Ich höre zuerst zu und sage Ihnen ehrlich, ob ich helfen kann.",
    "contact.cta.primary": "Kostenloses 15-Min Gespräch buchen",
    "contact.cta.secondary": "DSGVO-QuickScan anfragen",
    "contact.direct": "Direkter Draht",
    "contact.languages": "Sprachen",

    // Footer
    "footer.tagline": "Ihr IT-Partner in Frankfurt am Main.",
    "footer.navigate": "Navigation",
    "footer.legal": "Rechtliches",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.visitors": "Besucher",

    // About / Terminal
    "about.title": "Über Noavio",
    "about.subtitle": "Ein verantwortlicher Partner statt einer Agentur-Black-Box.",

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
    "nav.about": "About",
    "nav.services": "Services",
    "nav.approach": "Approach",
    "nav.portfolio": "Portfolio",
    "nav.projects": "Portfolio",
    "nav.skills": "Stack",
    "nav.casestudies": "Case Studies",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.consult": "Get a Quote",
    "nav.book": "Book a Call",

    // Hero
    "hero.headline.before": "Empowering Your Business with",
    "hero.headline.accent": "Clever, Adaptable",
    "hero.headline.after": "IT Solutions.",
    "hero.subhead":
      "Hi, I'm Noah Al-Samawi — IT-Engineer and founder of Noavio IT Solutions. We build secure, scalable custom software and deliver premium IT-Support for small and mid-sized companies in Frankfurt. Language-agnostic by design: the right stack for your problem, not ours.",
    "hero.cta.primary": "Partner with Noavio",
    "hero.cta.secondary": "Explore Services",
    "hero.cta.profile": "Company Profile",
    "hero.cta.contact": "Get in Touch",
    "hero.status": "Available for new projects",

    // Trust strip
    "trust.exp": "10+ Years IT Experience",

    // Services
    "svc.eyebrow": "WHAT I DO",
    "svc.title": "Three disciplines. One dedicated partner.",
    "svc.sub":
      "Whether you need a new platform, reliable day-to-day IT, or a compliance-ready security posture — Noavio covers the full stack of modern IT work for German SMEs.",
    "svc.web.title": "Custom Web & Software Architecture",
    "svc.web.lead":
      "Bespoke web applications and platforms designed for scale, performance, and maintainability — built with the right stack for your problem, not ours.",
    "svc.web.b1": "Full-stack web apps (React, Next.js, TypeScript, Django, Node)",
    "svc.web.b2": "REST & GraphQL APIs, third-party integrations, ERP/CRM bridges",
    "svc.web.b3": "Performance-first architecture, Core Web Vitals above 90",
    "svc.it.title": "IT-Support & Infrastructure",
    "svc.it.lead":
      "Reliable technical operations without a full-time hire. From Linux servers to cloud deployments, you get predictable uptime and fast, personal response times.",
    "svc.it.b1": "Docker, CI/CD, cloud deployments (AWS, Vercel, DigitalOcean)",
    "svc.it.b2": "Remote IT support, network setup, monitoring & backups",
    "svc.it.b3": "Retainer-based maintenance with clear SLAs",
    "svc.sec.title": "Security & Consulting (DSGVO-compliant)",
    "svc.sec.lead":
      "Security-by-design and data protection that stands up to a real audit. I translate complex compliance into pragmatic, documented implementations.",
    "svc.sec.b1": "DSGVO/GDPR consulting, privacy policies, data-processing records",
    "svc.sec.b2": "OWASP Top-10 hardening, OAuth2/JWT, secure session handling",
    "svc.sec.b3": "Vulnerability reviews, penetration-style audits, dev training",

    // Approach
    "app.eyebrow": "HOW I WORK",
    "app.title": "Language-agnostic. Outcome-obsessed.",
    "app.s1.title": "Listen.",
    "app.s1.desc": "A 15-minute free intro call to understand your business — not a sales pitch.",
    "app.s2.title": "Scope.",
    "app.s2.desc": "A written proposal with clear deliverables, timeline, and a fixed or retainer price.",
    "app.s3.title": "Build.",
    "app.s3.desc": "Direct communication with me, weekly check-ins, production-quality code from day one.",
    "app.s4.title": "Sustain.",
    "app.s4.desc": "Documentation handover, retainer-based maintenance, no vendor lock-in.",

    // Projects
    "projects.title": "Portfolio",
    "projects.subtitle": "Selected work from our shop.",
    "projects.viewLive": "View Live",
    "projects.viewCode": "View Code",
    "projects.coming": "Case study coming soon.",

    // Contact
    "contact.eyebrow": "LET'S TALK",
    "contact.title": "Let's talk about your next 90 days.",
    "contact.sub": "Free 15-minute call — in Deutsch, English, oder Arabisch. I'll listen first and tell you honestly whether I can help.",
    "contact.cta.primary": "Book a Free 15-min Call",
    "contact.cta.secondary": "Request a DSGVO QuickScan",
    "contact.direct": "Direct line",
    "contact.languages": "Languages",

    // Footer
    "footer.tagline": "Your IT partner in Frankfurt am Main.",
    "footer.navigate": "Navigate",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",
    "footer.visitors": "Visitors",

    // About
    "about.title": "About Noavio",
    "about.subtitle": "A dedicated partner instead of an agency black box.",

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
