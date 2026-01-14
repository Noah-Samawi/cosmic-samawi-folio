import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hello, I\'m',
    'hero.name': 'Noah Al-Samawi',
    'hero.title': 'Full-Stack Developer & IT Engineer',
    'hero.subtitle': 'Building robust web solutions with enterprise expertise',
    'hero.description': 'Bridging the gap between IT infrastructure and modern web development with 6+ years of enterprise experience and a passion for building elegant full-stack solutions.',
    'hero.cta.contact': 'Get in Touch',
    'hero.cta.projects': 'View Projects',
    'hero.cta.download': 'Download CV',
    'hero.location': 'Frankfurt, Germany',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',
    'about.years': 'Years Experience',
    'about.valueProposition': 'A versatile developer blending 6+ years of enterprise IT stability with the creative agility of a freelance developer and hackathon enthusiast.',
    'about.description1': 'I\'m a Software Developer and IT Systems Engineer based in Frankfurt, Germany, with a unique blend of enterprise IT experience and modern full-stack development skills.',
    'about.description2': 'Beyond my corporate experience at CBRE, I have a strong track record delivering custom tailored solutions for individual clients. My active participation in hackathons has honed my rapid prototyping & agile development skills—building complex solutions in high-pressure, fast-paced team environments.',
    'about.highlight1': '6+ years enterprise IT experience at Fortune 500 companies',
    'about.highlight2': 'Full-Stack development with React, Django & TypeScript',
    'about.highlight3': 'Code Institute Diploma in Full-Stack Web Development (2024)',
    'about.highlight4': 'Rapid Prototyping & Innovation through multiple Hackathons',
    'about.highlight5': 'Custom Tailored Solutions for freelance clients',
    'about.stat1': 'Years IT Experience',
    'about.stat2': 'Hackathons Joined',
    'about.stat3': 'Projects Delivered',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'How I can help bring your ideas to life',
    'services.webdev.title': 'Web Development',
    'services.webdev.desc': 'Building responsive, modern web applications with cutting-edge technologies.',
    'services.webdev.f1': 'React & TypeScript frontends',
    'services.webdev.f2': 'Django & REST API backends',
    'services.webdev.f3': 'Database design & optimization',
    'services.security.title': 'Cybersecurity',
    'services.security.desc': 'Protecting your digital assets with enterprise-grade security practices.',
    'services.security.f1': 'Security audits & assessments',
    'services.security.f2': 'Network security configuration',
    'services.security.f3': 'Active Directory management',
    'services.support.title': 'Tech Support',
    'services.support.desc': 'Professional IT support with enterprise-level troubleshooting expertise.',
    'services.support.f1': 'Windows Server administration',
    'services.support.f2': 'IT infrastructure management',
    'services.support.f3': 'ServiceNow ticketing & escalation',
    'services.learnMore': 'Learn more',
    'services.webdev.details': 'I build complete web applications from concept to deployment. Using React and TypeScript for dynamic frontends paired with Django REST backends, I create scalable, maintainable solutions. Whether you need a single-page app, e-commerce platform, or custom dashboard, I deliver clean code that performs.',
    'services.security.details': 'Leveraging 6+ years of enterprise IT experience, I help secure your digital infrastructure. From Active Directory hardening to network security configuration, I implement industry best practices to protect your assets against modern threats.',
    'services.support.details': 'Professional IT support with enterprise-level expertise. I troubleshoot complex Windows environments, manage cloud services, and ensure your infrastructure runs smoothly. ITIL-certified approach to incident management and problem resolution.',
    'services.modal.techStack': 'Technology Stack',
    'services.modal.keyFeatures': 'Key Features',
    'services.modal.cta': 'Discuss Your Project',
    
    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'Professional Journey',
    'experience.cbre.title': 'IT Support Specialist - 2nd Level',
    'experience.cbre.company': 'CBRE for DXC/Dell',
    'experience.cbre.period': '2017 - 2023',
    'experience.cbre.description': 'Provided enterprise-level technical support managing Active Directory, ServiceNow ticketing, and complex Windows environments across global infrastructure.',
    'experience.cbre.task1': 'Active Directory user & group management',
    'experience.cbre.task2': 'ServiceNow incident resolution & escalation',
    'experience.cbre.task3': '2nd Level technical support & troubleshooting',
    'experience.cbre.task4': 'Windows Server administration',
    'experience.cbre.task5': 'Network configuration & VPN management',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Full-Stack Applications',
    'projects.viewLive': 'View Live',
    'projects.viewCode': 'View Code',
    
    // Skills
    'skills.title': 'Technical Stack',
    'skills.subtitle': 'Technologies I Work With',
    'skills.languages': 'Languages',
    'skills.frameworks': 'Frameworks',
    'skills.systems': 'Systems & Tools',
    
    // Education
    'education.title': 'Education',
    'education.subtitle': 'Academic Background',
    'education.bsc.degree': 'B.Sc. Computer Science',
    'education.bsc.school': 'Sanaa University',
    'education.diploma.degree': 'Full-Stack Web Development Diploma',
    'education.diploma.school': 'Code Institute, Dublin',
    'education.diploma.year': '2024',
    
    // Chat
    'chat.title': 'AI Assistant',
    'chat.placeholder': 'Ask me anything about Noah...',
    'chat.welcome': 'Hello! I\'m Noah\'s AI assistant. I know his CV inside and out. Ask me about his experience, skills, or projects!',
    'chat.send': 'Send',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What clients and colleagues say about working with me',
    'testimonials.1.name': 'Michael Schmidt',
    'testimonials.1.role': 'IT Manager',
    'testimonials.1.company': 'TechCorp GmbH',
    'testimonials.1.quote': 'Noah\'s Full-Stack expertise and deep understanding of IT infrastructure made him invaluable. He delivered a robust web application while seamlessly integrating with our enterprise systems.',
    'testimonials.2.name': 'Sarah Weber',
    'testimonials.2.role': 'Lead Developer',
    'testimonials.2.company': 'Digital Solutions AG',
    'testimonials.2.quote': 'Exceptional problem-solving skills and reliable delivery. Noah consistently exceeded expectations, tackling complex challenges with both creativity and technical precision.',
    'testimonials.3.name': 'Thomas Müller',
    'testimonials.3.role': 'CTO',
    'testimonials.3.company': 'StartupHub Berlin',
    'testimonials.3.quote': 'His hackathon mentality combined with enterprise experience is rare. Noah built our MVP in record time without sacrificing code quality or security best practices.',

    // Footer
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.services': 'Leistungen',
    'nav.experience': 'Erfahrung',
    'nav.projects': 'Projekte',
    'nav.skills': 'Fähigkeiten',
    'nav.education': 'Ausbildung',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.greeting': 'Hallo, ich bin',
    'hero.name': 'Noah Al-Samawi',
    'hero.title': 'Full-Stack Entwickler & IT-Ingenieur',
    'hero.subtitle': 'Robuste Weblösungen mit Enterprise-Expertise',
    'hero.description': 'Ich verbinde IT-Infrastruktur mit moderner Webentwicklung – mit über 6 Jahren Erfahrung in Großunternehmen und der Leidenschaft für elegante Full-Stack-Lösungen.',
    'hero.cta.contact': 'Kontakt aufnehmen',
    'hero.cta.projects': 'Projekte ansehen',
    'hero.cta.download': 'Lebenslauf herunterladen',
    'hero.location': 'Frankfurt, Deutschland',
    
    // About
    'about.title': 'Über mich',
    'about.subtitle': 'Lernen Sie mich kennen',
    'about.years': 'Jahre Erfahrung',
    'about.valueProposition': 'Ein vielseitiger Entwickler, der 6+ Jahre Enterprise-IT-Stabilität mit der kreativen Agilität eines Freelancers und Hackathon-Enthusiasten verbindet.',
    'about.description1': 'Ich bin Softwareentwickler und IT-Systemingenieur in Frankfurt mit einer einzigartigen Kombination aus Enterprise-IT-Erfahrung und modernen Full-Stack-Entwicklungsfähigkeiten.',
    'about.description2': 'Neben meiner Unternehmenserfahrung bei CBRE habe ich maßgeschneiderte Lösungen für Privatkunden entwickelt. Meine aktive Teilnahme an Hackathons hat meine Fähigkeiten in Rapid Prototyping & agiler Entwicklung geschärft – komplexe Lösungen unter Zeitdruck im Team.',
    'about.highlight1': '6+ Jahre Enterprise-IT bei Fortune-500-Unternehmen',
    'about.highlight2': 'Full-Stack-Entwicklung mit React, Django & TypeScript',
    'about.highlight3': 'Code Institute Diplom in Full-Stack Webentwicklung (2024)',
    'about.highlight4': 'Rapid Prototyping & Innovation durch mehrere Hackathons',
    'about.highlight5': 'Maßgeschneiderte Lösungen für Freelance-Kunden',
    'about.stat1': 'Jahre IT-Erfahrung',
    'about.stat2': 'Hackathons absolviert',
    'about.stat3': 'Projekte geliefert',
    
    // Services
    'services.title': 'Leistungen',
    'services.subtitle': 'Wie ich Ihnen helfen kann',
    'services.webdev.title': 'Webentwicklung',
    'services.webdev.desc': 'Moderne, responsive Webanwendungen mit aktuellen Technologien.',
    'services.webdev.f1': 'React & TypeScript Frontends',
    'services.webdev.f2': 'Django & REST API Backends',
    'services.webdev.f3': 'Datenbankdesign & Optimierung',
    'services.security.title': 'Cybersicherheit',
    'services.security.desc': 'Schutz digitaler Assets mit Enterprise-Sicherheitspraktiken.',
    'services.security.f1': 'Sicherheitsaudits & Bewertungen',
    'services.security.f2': 'Netzwerksicherheitskonfiguration',
    'services.security.f3': 'Active Directory Management',
    'services.support.title': 'Tech-Support',
    'services.support.desc': 'Professioneller IT-Support mit Enterprise-Level-Fehlerbehebung.',
    'services.support.f1': 'Windows Server Administration',
    'services.support.f2': 'IT-Infrastruktur-Management',
    'services.support.f3': 'ServiceNow Ticketing & Eskalation',
    'services.learnMore': 'Mehr erfahren',
    'services.webdev.details': 'Ich entwickle komplette Webanwendungen vom Konzept bis zum Deployment. Mit React und TypeScript für dynamische Frontends und Django REST Backends erstelle ich skalierbare, wartbare Lösungen. Ob Single-Page-App, E-Commerce-Plattform oder Custom Dashboard – ich liefere sauberen, performanten Code.',
    'services.security.details': 'Mit 6+ Jahren Enterprise-IT-Erfahrung helfe ich, Ihre digitale Infrastruktur zu sichern. Von Active Directory-Härtung bis zur Netzwerksicherheitskonfiguration implementiere ich Best Practices zum Schutz gegen moderne Bedrohungen.',
    'services.support.details': 'Professioneller IT-Support mit Enterprise-Level-Expertise. Ich behebe Probleme in komplexen Windows-Umgebungen, verwalte Cloud-Dienste und sorge für reibungslosen Infrastrukturbetrieb. ITIL-zertifizierter Ansatz für Incident Management.',
    'services.modal.techStack': 'Technologie-Stack',
    'services.modal.keyFeatures': 'Hauptfunktionen',
    'services.modal.cta': 'Projekt besprechen',
    
    // Experience
    'experience.title': 'Erfahrung',
    'experience.subtitle': 'Beruflicher Werdegang',
    'experience.cbre.title': 'IT Support Spezialist - 2nd Level',
    'experience.cbre.company': 'CBRE für DXC/Dell',
    'experience.cbre.period': '2017 - 2023',
    'experience.cbre.description': 'Enterprise-Level technischer Support mit Active Directory, ServiceNow und komplexen Windows-Umgebungen in globaler Infrastruktur.',
    'experience.cbre.task1': 'Active Directory Benutzer- & Gruppenverwaltung',
    'experience.cbre.task2': 'ServiceNow Incident-Auflösung & Eskalation',
    'experience.cbre.task3': '2nd Level technischer Support & Fehlerbehebung',
    'experience.cbre.task4': 'Windows Server Administration',
    'experience.cbre.task5': 'Netzwerkkonfiguration & VPN-Management',
    
    // Projects
    'projects.title': 'Projekte',
    'projects.subtitle': 'Full-Stack Anwendungen',
    'projects.viewLive': 'Live ansehen',
    'projects.viewCode': 'Code ansehen',
    
    // Skills
    'skills.title': 'Technologien',
    'skills.subtitle': 'Womit ich arbeite',
    'skills.languages': 'Sprachen',
    'skills.frameworks': 'Frameworks',
    'skills.systems': 'Systeme & Tools',
    
    // Education
    'education.title': 'Ausbildung',
    'education.subtitle': 'Akademischer Hintergrund',
    'education.bsc.degree': 'B.Sc. Informatik',
    'education.bsc.school': 'Universität Sanaa',
    'education.diploma.degree': 'Full-Stack Webentwicklung Diplom',
    'education.diploma.school': 'Code Institute, Dublin',
    'education.diploma.year': '2024',
    
    // Chat
    'chat.title': 'KI-Assistent',
    'chat.placeholder': 'Fragen Sie mich über Noah...',
    'chat.welcome': 'Hallo! Ich bin Noahs KI-Assistent. Fragen Sie mich zu seiner Erfahrung, Fähigkeiten oder Projekten!',
    'chat.send': 'Senden',
    
    // Testimonials
    'testimonials.title': 'Referenzen',
    'testimonials.subtitle': 'Was Kunden und Kollegen über die Zusammenarbeit mit mir sagen',
    'testimonials.1.name': 'Michael Schmidt',
    'testimonials.1.role': 'IT-Manager',
    'testimonials.1.company': 'TechCorp GmbH',
    'testimonials.1.quote': 'Noahs Full-Stack-Expertise und sein tiefes Verständnis der IT-Infrastruktur machten ihn unverzichtbar. Er lieferte eine robuste Webanwendung und integrierte sie nahtlos in unsere Unternehmenssysteme.',
    'testimonials.2.name': 'Sarah Weber',
    'testimonials.2.role': 'Lead Developer',
    'testimonials.2.company': 'Digital Solutions AG',
    'testimonials.2.quote': 'Außergewöhnliche Problemlösungsfähigkeiten und zuverlässige Lieferung. Noah übertraf konstant die Erwartungen und meisterte komplexe Herausforderungen mit Kreativität und technischer Präzision.',
    'testimonials.3.name': 'Thomas Müller',
    'testimonials.3.role': 'CTO',
    'testimonials.3.company': 'StartupHub Berlin',
    'testimonials.3.quote': 'Seine Hackathon-Mentalität kombiniert mit Enterprise-Erfahrung ist selten. Noah baute unser MVP in Rekordzeit ohne Kompromisse bei Codequalität oder Sicherheits-Best-Practices.',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    
    // Common
    'common.loading': 'Lädt...',
    'common.error': 'Ein Fehler ist aufgetreten',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const direction: Direction = 'ltr'; // Both English and German are LTR

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'de')) {
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
