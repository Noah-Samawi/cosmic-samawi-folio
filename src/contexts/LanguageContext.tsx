import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de' | 'ar';
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
    'hero.title': 'Full-Stack Developer & Cybersecurity Specialist',
    'hero.subtitle': 'Building secure web solutions with a breaker\'s mindset',
    'hero.description': 'I don\'t just build apps; I secure them. Bridging robust software engineering with defensive security using tools like Burp Suite, Python scripting, and Home Lab attack simulations.',
    'hero.cta.contact': 'Get in Touch',
    'hero.cta.projects': 'View Projects',
    'hero.cta.download': 'Download CV',
    'hero.location': 'Frankfurt, Germany',
    'hero.status': 'Open to Opportunities',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',
    'about.years': 'Years Experience',
    'about.valueProposition': 'Passionate about bridging the gap between robust software engineering and defensive security.',
    'about.description1': 'I don\'t just build apps; I secure them. With a hands-on "breaker" mindset, I utilize tools like Burp Suite and Python scripting to identify vulnerabilities before they become threats.',
    'about.description2': 'My background involves building Home Labs for attack simulation and automating security workflows. Combined with 6+ years of enterprise IT and full-stack development, I deliver solutions that are both functional and fortified.',
    'about.highlight1': '6+ years enterprise IT experience at Fortune 500 companies',
    'about.highlight2': 'Full-Stack development with React, Django & TypeScript',
    'about.highlight3': 'Code Institute Diploma in Full-Stack Web Development (2024)',
    'about.highlight4': 'Rapid Prototyping & Innovation through multiple Hackathons',
    'about.highlight5': 'Custom Tailored Solutions for freelance clients',
    'about.stat1': 'Years IT Experience',
    'about.stat2': 'Hackathons Joined',
    'about.stat3': 'Projects Delivered',
    
    // Hire Me Section
    'hire.title': 'Turn Ideas Into Reality',
    'hire.subtitle': 'Do you need a website, a custom app, or a security audit? I don\'t just write code; I build businesses.',
    'hire.webdesign.title': 'Web Design',
    'hire.webdesign.desc': 'Beautiful, responsive websites that convert visitors into customers.',
    'hire.apps.title': 'Custom Apps',
    'hire.apps.desc': 'Tailored web applications built for your specific business needs.',
    'hire.security.title': 'Cyber Security',
    'hire.security.desc': 'Protect your digital assets with professional security audits.',
    'hire.cta': 'Let\'s Work Together',
    
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
    'services.modal.downloadCV': 'Download CV',
    
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
    'skills.security': 'Cybersecurity & Pen-Testing',
    
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
    'testimonials.writeReview': 'Write a Review',
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

    // Review Modal
    'review.title': 'Write a Review',
    'review.name': 'Your Name',
    'review.role': 'Your Role (Optional)',
    'review.company': 'Company (Optional)',
    'review.message': 'Your Review',
    'review.rating': 'Rating',
    'review.submit': 'Submit Review',
    'review.submitting': 'Submitting...',
    'review.success': 'Review Submitted!',
    'review.successMessage': 'Thank you! Your review will be displayed after approval.',
    'review.error': 'Error',
    'review.errorMessage': 'Failed to submit review. Please try again.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.visitors': 'Visitors',
    
    // Command Palette
    'command.search': 'Search...',
    'command.placeholder': 'Type a command or search...',
    'command.navigation': 'Navigation',
    'command.actions': 'Actions',
    'command.downloadCV': 'Download CV',
    'command.copyEmail': 'Copy Email',
    'command.emailCopied': 'Email copied to clipboard!',
    'command.lightMode': 'Switch to Light Mode',
    'command.darkMode': 'Switch to Dark Mode',
    'command.navigate': 'Navigate',
    'command.select': 'Select',
    'command.close': 'Close',
    'command.noResults': 'No results found.',
    
    // Design Gallery
    'gallery.title': 'Design Gallery',
    'gallery.subtitle': 'Choose a style that matches your vision',
    'gallery.select': 'I want this style',
    'gallery.minimalist': 'Minimalist',
    'gallery.minimalist.desc': 'Clean, simple, and elegant design with focus on content.',
    'gallery.cosmic': 'Cosmic / Dark',
    'gallery.cosmic.desc': 'Modern dark theme with neon accents and tech aesthetics.',
    'gallery.corporate': 'Corporate',
    'gallery.corporate.desc': 'Professional and trustworthy design for businesses.',
    'gallery.ecommerce': 'E-Commerce',
    'gallery.ecommerce.desc': 'Conversion-focused design for online stores.',
    'gallery.creative': 'Creative',
    'gallery.creative.desc': 'Bold, artistic designs that stand out.',

    // Cookie Banner
    'cookie.message': 'We use cookies to improve your experience.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a project in mind? Let\'s discuss how we can work together.',
    'contact.location': 'Frankfurt, Germany',
    'contact.mapAlt': 'Location Map',
    
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
    'hero.title': 'Full-Stack Entwickler & Cybersecurity-Spezialist',
    'hero.subtitle': 'Sichere Weblösungen mit Hacker-Mentalität',
    'hero.description': 'Ich baue nicht nur Apps; ich sichere sie ab. Verbinde robuste Softwareentwicklung mit defensiver Security durch Tools wie Burp Suite, Python-Scripting und Home-Lab-Angriffssimulationen.',
    'hero.cta.contact': 'Kontakt aufnehmen',
    'hero.cta.projects': 'Projekte ansehen',
    'hero.cta.download': 'Lebenslauf herunterladen',
    'hero.location': 'Frankfurt, Deutschland',
    'hero.status': 'Offen für Projekte',
    
    // About
    'about.title': 'Über mich',
    'about.subtitle': 'Lernen Sie mich kennen',
    'about.years': 'Jahre Erfahrung',
    'about.valueProposition': 'Leidenschaftlich daran, robuste Softwareentwicklung mit defensiver Security zu verbinden.',
    'about.description1': 'Ich baue nicht nur Apps; ich sichere sie ab. Mit einer "Breaker"-Mentalität nutze ich Tools wie Burp Suite und Python-Scripting, um Schwachstellen zu identifizieren, bevor sie zu Bedrohungen werden.',
    'about.description2': 'Mein Hintergrund umfasst den Aufbau von Home Labs für Angriffssimulationen und die Automatisierung von Security-Workflows. Kombiniert mit 6+ Jahren Enterprise-IT und Full-Stack-Entwicklung liefere ich Lösungen, die funktional und sicher sind.',
    'about.highlight1': '6+ Jahre Enterprise-IT bei Fortune-500-Unternehmen',
    'about.highlight2': 'Full-Stack-Entwicklung mit React, Django & TypeScript',
    'about.highlight3': 'Code Institute Diplom in Full-Stack Webentwicklung (2024)',
    'about.highlight4': 'Rapid Prototyping & Innovation durch mehrere Hackathons',
    'about.highlight5': 'Maßgeschneiderte Lösungen für Freelance-Kunden',
    'about.stat1': 'Jahre IT-Erfahrung',
    'about.stat2': 'Hackathons absolviert',
    'about.stat3': 'Projekte geliefert',
    
    // Hire Me Section
    'hire.title': 'Ideen in Realität verwandeln',
    'hire.subtitle': 'Brauchen Sie eine Website, eine maßgeschneiderte App oder ein Sicherheitsaudit? Ich schreibe nicht nur Code; ich baue Unternehmen.',
    'hire.webdesign.title': 'Web-Design',
    'hire.webdesign.desc': 'Schöne, responsive Websites, die Besucher in Kunden verwandeln.',
    'hire.apps.title': 'Individuelle Apps',
    'hire.apps.desc': 'Maßgeschneiderte Webanwendungen für Ihre spezifischen Geschäftsanforderungen.',
    'hire.security.title': 'Cybersicherheit',
    'hire.security.desc': 'Schützen Sie Ihre digitalen Assets mit professionellen Sicherheitsaudits.',
    'hire.cta': 'Lass uns zusammenarbeiten',
    
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
    'services.modal.downloadCV': 'Lebenslauf herunterladen',
    
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
    'skills.security': 'Cybersecurity & Pen-Testing',
    
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
    'testimonials.writeReview': 'Bewertung schreiben',
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

    // Review Modal
    'review.title': 'Bewertung schreiben',
    'review.name': 'Ihr Name',
    'review.role': 'Ihre Position (Optional)',
    'review.company': 'Unternehmen (Optional)',
    'review.message': 'Ihre Bewertung',
    'review.rating': 'Bewertung',
    'review.submit': 'Bewertung abschicken',
    'review.submitting': 'Wird gesendet...',
    'review.success': 'Bewertung eingereicht!',
    'review.successMessage': 'Vielen Dank! Ihre Bewertung wird nach Genehmigung angezeigt.',
    'review.error': 'Fehler',
    'review.errorMessage': 'Bewertung konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.visitors': 'Besucher',
    
    // Command Palette
    'command.search': 'Suchen...',
    'command.placeholder': 'Befehl eingeben oder suchen...',
    'command.navigation': 'Navigation',
    'command.actions': 'Aktionen',
    'command.downloadCV': 'Lebenslauf herunterladen',
    'command.copyEmail': 'E-Mail kopieren',
    'command.emailCopied': 'E-Mail in Zwischenablage kopiert!',
    'command.lightMode': 'Zum hellen Modus wechseln',
    'command.darkMode': 'Zum dunklen Modus wechseln',
    'command.navigate': 'Navigieren',
    'command.select': 'Auswählen',
    'command.close': 'Schließen',
    'command.noResults': 'Keine Ergebnisse gefunden.',
    
    // Design Gallery
    'gallery.title': 'Design-Galerie',
    'gallery.subtitle': 'Wählen Sie einen Stil, der zu Ihrer Vision passt',
    'gallery.select': 'Diesen Stil möchte ich',
    'gallery.minimalist': 'Minimalistisch',
    'gallery.minimalist.desc': 'Klares, einfaches und elegantes Design mit Fokus auf Inhalt.',
    'gallery.cosmic': 'Kosmisch / Dunkel',
    'gallery.cosmic.desc': 'Modernes dunkles Theme mit Neonakzenten und Tech-Ästhetik.',
    'gallery.corporate': 'Corporate',
    'gallery.corporate.desc': 'Professionelles und vertrauenswürdiges Design für Unternehmen.',
    'gallery.ecommerce': 'E-Commerce',
    'gallery.ecommerce.desc': 'Konversionsorientiertes Design für Online-Shops.',
    'gallery.creative': 'Kreativ',
    'gallery.creative.desc': 'Mutige, künstlerische Designs, die herausstechen.',

    // Cookie Banner
    'cookie.message': 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.',
    'cookie.accept': 'Akzeptieren',
    'cookie.decline': 'Ablehnen',
    
    // Contact
    'contact.title': 'Kontakt aufnehmen',
    'contact.subtitle': 'Haben Sie ein Projekt im Sinn? Lassen Sie uns besprechen, wie wir zusammenarbeiten können.',
    'contact.location': 'Frankfurt, Deutschland',
    'contact.mapAlt': 'Standortkarte',
    
    // Common
    'common.loading': 'Lädt...',
    'common.error': 'Ein Fehler ist aufgetreten',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عني',
    'nav.services': 'الخدمات',
    'nav.experience': 'الخبرة',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.education': 'التعليم',
    'nav.contact': 'تواصل معي',
    
    // Hero
    'hero.greeting': 'مرحباً، أنا',
    'hero.name': 'نوح الصماوي',
    'hero.title': 'مطور Full-Stack وأخصائي أمن سيبراني',
    'hero.subtitle': 'بناء حلول ويب آمنة بعقلية الهاكر',
    'hero.description': 'لا أبني التطبيقات فحسب؛ بل أؤمّنها. أجمع بين هندسة البرمجيات المتينة والأمان الدفاعي باستخدام أدوات مثل Burp Suite وبرمجة Python ومحاكاة الهجمات في المختبر المنزلي.',
    'hero.cta.contact': 'تواصل معي',
    'hero.cta.projects': 'عرض المشاريع',
    'hero.cta.download': 'تحميل السيرة الذاتية',
    'hero.location': 'فرانكفورت، ألمانيا',
    'hero.status': 'متاح للفرص',
    
    // About
    'about.title': 'عني',
    'about.subtitle': 'تعرف علي أكثر',
    'about.years': 'سنوات الخبرة',
    'about.valueProposition': 'شغوف بربط هندسة البرمجيات المتينة بالأمان الدفاعي.',
    'about.description1': 'لا أبني التطبيقات فحسب؛ بل أؤمّنها. بعقلية "المخترق"، أستخدم أدوات مثل Burp Suite وبرمجة Python لتحديد الثغرات قبل أن تصبح تهديدات.',
    'about.description2': 'تشمل خلفيتي بناء مختبرات منزلية لمحاكاة الهجمات وأتمتة سير عمل الأمان. مع أكثر من 6 سنوات من تقنية المعلومات للشركات وتطوير Full-Stack، أقدم حلولاً عملية ومحصنة.',
    'about.highlight1': 'أكثر من 6 سنوات خبرة في شركات Fortune 500',
    'about.highlight2': 'تطوير Full-Stack مع React وDjango وTypeScript',
    'about.highlight3': 'دبلوم تطوير الويب Full-Stack من Code Institute (2024)',
    'about.highlight4': 'النماذج الأولية السريعة والابتكار من خلال الهاكاثونات',
    'about.highlight5': 'حلول مخصصة للعملاء المستقلين',
    'about.stat1': 'سنوات خبرة IT',
    'about.stat2': 'هاكاثونات',
    'about.stat3': 'مشاريع منجزة',
    
    // Hire Me Section
    'hire.title': 'حوّل الأفكار إلى واقع',
    'hire.subtitle': 'هل تحتاج موقع ويب، تطبيق مخصص، أو تدقيق أمني؟ أنا لا أكتب الكود فقط؛ أنا أبني أعمالاً.',
    'hire.webdesign.title': 'تصميم الويب',
    'hire.webdesign.desc': 'مواقع جميلة ومتجاوبة تحول الزوار إلى عملاء.',
    'hire.apps.title': 'تطبيقات مخصصة',
    'hire.apps.desc': 'تطبيقات ويب مصممة لاحتياجات عملك الخاصة.',
    'hire.security.title': 'الأمن السيبراني',
    'hire.security.desc': 'احمِ أصولك الرقمية بتدقيقات أمنية احترافية.',
    'hire.cta': 'لنعمل معاً',
    
    // Services
    'services.title': 'الخدمات',
    'services.subtitle': 'كيف يمكنني مساعدتك في تحقيق أفكارك',
    'services.webdev.title': 'تطوير الويب',
    'services.webdev.desc': 'بناء تطبيقات ويب حديثة ومتجاوبة بأحدث التقنيات.',
    'services.webdev.f1': 'واجهات React وTypeScript',
    'services.webdev.f2': 'خلفيات Django وREST API',
    'services.webdev.f3': 'تصميم وتحسين قواعد البيانات',
    'services.security.title': 'الأمن السيبراني',
    'services.security.desc': 'حماية أصولك الرقمية بممارسات أمان مؤسسية.',
    'services.security.f1': 'تدقيقات وتقييمات أمنية',
    'services.security.f2': 'تكوين أمان الشبكة',
    'services.security.f3': 'إدارة Active Directory',
    'services.support.title': 'الدعم التقني',
    'services.support.desc': 'دعم IT احترافي بخبرة مؤسسية في استكشاف الأخطاء.',
    'services.support.f1': 'إدارة Windows Server',
    'services.support.f2': 'إدارة البنية التحتية لـ IT',
    'services.support.f3': 'تذاكر ServiceNow والتصعيد',
    'services.learnMore': 'اعرف المزيد',
    'services.webdev.details': 'أبني تطبيقات ويب كاملة من الفكرة إلى النشر. باستخدام React وTypeScript للواجهات الديناميكية مع خلفيات Django REST، أنشئ حلولاً قابلة للتوسع والصيانة.',
    'services.security.details': 'بخبرة أكثر من 6 سنوات في IT المؤسسي، أساعد في تأمين بنيتك التحتية الرقمية. من تقوية Active Directory إلى تكوين أمان الشبكة، أنفذ أفضل الممارسات.',
    'services.support.details': 'دعم IT احترافي بخبرة مؤسسية. أحل المشاكل في بيئات Windows المعقدة، وأدير الخدمات السحابية، وأضمن تشغيل بنيتك التحتية بسلاسة.',
    'services.modal.techStack': 'التقنيات المستخدمة',
    'services.modal.keyFeatures': 'الميزات الرئيسية',
    'services.modal.cta': 'ناقش مشروعك',
    'services.modal.downloadCV': 'تحميل السيرة الذاتية',
    
    // Experience
    'experience.title': 'الخبرة',
    'experience.subtitle': 'المسيرة المهنية',
    'experience.cbre.title': 'أخصائي دعم IT - المستوى الثاني',
    'experience.cbre.company': 'CBRE لـ DXC/Dell',
    'experience.cbre.period': '2017 - 2023',
    'experience.cbre.description': 'قدمت دعماً تقنياً على مستوى المؤسسات لإدارة Active Directory وتذاكر ServiceNow وبيئات Windows المعقدة.',
    'experience.cbre.task1': 'إدارة مستخدمي ومجموعات Active Directory',
    'experience.cbre.task2': 'حل حوادث ServiceNow والتصعيد',
    'experience.cbre.task3': 'دعم تقني المستوى الثاني واستكشاف الأخطاء',
    'experience.cbre.task4': 'إدارة Windows Server',
    'experience.cbre.task5': 'تكوين الشبكة وإدارة VPN',
    
    // Projects
    'projects.title': 'المشاريع',
    'projects.subtitle': 'تطبيقات Full-Stack',
    'projects.viewLive': 'عرض مباشر',
    'projects.viewCode': 'عرض الكود',
    
    // Skills
    'skills.title': 'التقنيات',
    'skills.subtitle': 'التقنيات التي أعمل بها',
    'skills.languages': 'اللغات',
    'skills.frameworks': 'أطر العمل',
    'skills.systems': 'الأنظمة والأدوات',
    'skills.security': 'الأمن السيبراني واختبار الاختراق',
    
    // Education
    'education.title': 'التعليم',
    'education.subtitle': 'الخلفية الأكاديمية',
    'education.bsc.degree': 'بكالوريوس علوم الحاسوب',
    'education.bsc.school': 'جامعة صنعاء',
    'education.diploma.degree': 'دبلوم تطوير الويب Full-Stack',
    'education.diploma.school': 'Code Institute، دبلن',
    'education.diploma.year': '2024',
    
    // Chat
    'chat.title': 'المساعد الذكي',
    'chat.placeholder': 'اسألني أي شيء عن نوح...',
    'chat.welcome': 'مرحباً! أنا مساعد نوح الذكي. أعرف سيرته الذاتية بالكامل. اسألني عن خبرته أو مهاراته أو مشاريعه!',
    'chat.send': 'إرسال',
    
    // Testimonials
    'testimonials.title': 'التوصيات',
    'testimonials.subtitle': 'ما يقوله العملاء والزملاء عن العمل معي',
    'testimonials.writeReview': 'اكتب تقييماً',
    'testimonials.1.name': 'ميخائيل شميت',
    'testimonials.1.role': 'مدير IT',
    'testimonials.1.company': 'TechCorp GmbH',
    'testimonials.1.quote': 'خبرة نوح في Full-Stack وفهمه العميق للبنية التحتية لـ IT جعلته لا غنى عنه. قدم تطبيق ويب متين مع دمج سلس في أنظمتنا المؤسسية.',
    'testimonials.2.name': 'سارة ويبر',
    'testimonials.2.role': 'مطور رئيسي',
    'testimonials.2.company': 'Digital Solutions AG',
    'testimonials.2.quote': 'مهارات استثنائية في حل المشاكل وتسليم موثوق. نوح تجاوز التوقعات باستمرار، متعاملاً مع التحديات المعقدة بإبداع ودقة تقنية.',
    'testimonials.3.name': 'توماس مولر',
    'testimonials.3.role': 'CTO',
    'testimonials.3.company': 'StartupHub Berlin',
    'testimonials.3.quote': 'عقليته في الهاكاثون مع خبرته المؤسسية نادرة. بنى نوح MVP في وقت قياسي دون التضحية بجودة الكود أو أفضل ممارسات الأمان.',

    // Review Modal
    'review.title': 'اكتب تقييماً',
    'review.name': 'اسمك',
    'review.role': 'منصبك (اختياري)',
    'review.company': 'الشركة (اختياري)',
    'review.message': 'تقييمك',
    'review.rating': 'التقييم',
    'review.submit': 'إرسال التقييم',
    'review.submitting': 'جارٍ الإرسال...',
    'review.success': 'تم إرسال التقييم!',
    'review.successMessage': 'شكراً! سيظهر تقييمك بعد الموافقة.',
    'review.error': 'خطأ',
    'review.errorMessage': 'فشل إرسال التقييم. يرجى المحاولة مرة أخرى.',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.visitors': 'الزوار',
    
    // Command Palette
    'command.search': 'بحث...',
    'command.placeholder': 'اكتب أمراً أو ابحث...',
    'command.navigation': 'التنقل',
    'command.actions': 'الإجراءات',
    'command.downloadCV': 'تحميل السيرة الذاتية',
    'command.copyEmail': 'نسخ البريد الإلكتروني',
    'command.emailCopied': 'تم نسخ البريد الإلكتروني!',
    'command.lightMode': 'التبديل للوضع الفاتح',
    'command.darkMode': 'التبديل للوضع الداكن',
    'command.navigate': 'تنقل',
    'command.select': 'اختيار',
    'command.close': 'إغلاق',
    'command.noResults': 'لا توجد نتائج.',
    
    // Design Gallery
    'gallery.title': 'معرض التصاميم',
    'gallery.subtitle': 'اختر أسلوباً يناسب رؤيتك',
    'gallery.select': 'أريد هذا الأسلوب',
    'gallery.minimalist': 'بسيط',
    'gallery.minimalist.desc': 'تصميم نظيف وبسيط وأنيق مع التركيز على المحتوى.',
    'gallery.cosmic': 'كوني / داكن',
    'gallery.cosmic.desc': 'ثيم داكن حديث مع لمسات نيون وجماليات تقنية.',
    'gallery.corporate': 'مؤسسي',
    'gallery.corporate.desc': 'تصميم احترافي وموثوق للأعمال.',
    'gallery.ecommerce': 'تجارة إلكترونية',
    'gallery.ecommerce.desc': 'تصميم موجه للتحويل للمتاجر الإلكترونية.',
    'gallery.creative': 'إبداعي',
    'gallery.creative.desc': 'تصاميم جريئة وفنية تبرز.',

    // Cookie Banner
    'cookie.message': 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك.',
    'cookie.accept': 'قبول',
    'cookie.decline': 'رفض',
    
    // Contact
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'هل لديك مشروع في ذهنك؟ لنناقش كيف يمكننا العمل معاً.',
    'contact.location': 'فرانكفورت، ألمانيا',
    'contact.mapAlt': 'خريطة الموقع',
    
    // Common
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'حدث خطأ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  
  // Arabic is RTL, English and German are LTR
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'de' || saved === 'ar')) {
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
