import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "de" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.casestudies": "Case Studies",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.consult": "Consult Now",

    // Hero - Agency
    "hero.badge": "AI-Powered Software Agency",
    "hero.tagline": "Automating the Future with AI-Powered Solutions",
    "hero.description": "We design, build, and automate intelligent software systems that help businesses scale faster. From custom web apps to AI integration and workflow automation.",
    "hero.cta.consult": "Start a Project",
    "hero.cta.casestudies": "View Case Studies",
    "hero.greeting": "Hello, I'm",
    "hero.name": "Noah Al-Samawi",
    "hero.title": "Security-Minded Full-Stack Developer",
    "hero.subtitle": "Building modern web applications with a Security-First approach",
    "hero.cta.contact": "Get in Touch",
    "hero.cta.projects": "View Projects",
    "hero.cta.download": "Download CV",
    "hero.location": "Frankfurt, Germany",
    "hero.status": "Open to Opportunities",

    // About - Founder
    "about.agencyTitle": "Founder & Lead Engineer",
    "about.agencySubtitle": "The mind behind Tech-Noah Solutions",
    "about.title": "About Me",
    "about.subtitle": "Get to know me better",
    "about.years": "Years Experience",
    "about.valueProposition": "Passionate about bridging the gap between robust software engineering and defensive security.",
    "about.description1": 'I don\'t just build apps; I secure them. With a hands-on "breaker" mindset, I utilize tools like Burp Suite and Python scripting to identify vulnerabilities before they become threats.',
    "about.description2": "My background involves building Home Labs for attack simulation and automating security workflows. Combined with 6+ years of enterprise IT and full-stack development, I deliver solutions that are both functional and fortified.",
    "about.highlight1": "6+ years enterprise IT experience at Fortune 500 companies",
    "about.highlight2": "Full-Stack development with React, Django & TypeScript",
    "about.highlight3": "Code Institute Diploma in Full-Stack Web Development (2024)",
    "about.highlight4": "Rapid Prototyping & Innovation through multiple Hackathons",
    "about.highlight5": "Custom Tailored Solutions for freelance clients",
    "about.stat1": "Years IT Experience",
    "about.stat2": "Hackathons Joined",
    "about.stat3": "Projects Delivered",

    // Hire Me Section
    "hire.title": "Turn Ideas Into Reality",
    "hire.subtitle": "Do you need a website, a custom app, or a security audit? I don't just write code; I build businesses.",
    "hire.webdesign.title": "Web Design",
    "hire.webdesign.desc": "Beautiful, responsive websites that convert visitors into customers.",
    "hire.apps.title": "Custom Apps",
    "hire.apps.desc": "Tailored web applications built for your specific business needs.",
    "hire.security.title": "Cyber Security",
    "hire.security.desc": "Protect your digital assets with professional security audits.",
    "hire.cta": "Let's Work Together",

    // Agency Services (Bento Grid)
    "agency.services.title": "Our Services",
    "agency.services.subtitle": "End-to-end technology solutions to power your business growth",
    "agency.services.webdev.title": "Custom Web & App Development",
    "agency.services.webdev.desc": "Full-stack applications built with modern frameworks. From MVPs to enterprise platforms, we deliver scalable, secure, and performant solutions.",
    "agency.services.ai.title": "AI Systems & Integration",
    "agency.services.ai.desc": "Leverage the power of AI to supercharge your business. We build custom GPT integrations, ML pipelines, and intelligent automation that drives real results.",
    "agency.services.automation.title": "Business Automation",
    "agency.services.automation.desc": "Streamline your operations with smart workflow automation. CRM integrations, data pipelines, and process optimization.",
    "agency.services.consulting.title": "Strategic Consulting",
    "agency.services.consulting.desc": "Expert guidance on architecture decisions, security audits, and technology strategy to future-proof your business.",

    // Services (legacy)
    "services.title": "Services",
    "services.subtitle": "How I can help bring your ideas to life",
    "services.webdev.title": "Web Development",
    "services.webdev.desc": "Building responsive, modern web applications with cutting-edge technologies.",
    "services.webdev.f1": "React & TypeScript frontends",
    "services.webdev.f2": "Django & REST API backends",
    "services.webdev.f3": "Database design & optimization",
    "services.security.title": "Cybersecurity",
    "services.security.desc": "Protecting your digital assets with enterprise-grade security practices.",
    "services.security.f1": "Security audits & assessments",
    "services.security.f2": "Network security configuration",
    "services.security.f3": "Active Directory management",
    "services.support.title": "Tech Support",
    "services.support.desc": "Professional IT support with enterprise-level troubleshooting expertise.",
    "services.support.f1": "Windows Server administration",
    "services.support.f2": "IT infrastructure management",
    "services.support.f3": "ServiceNow ticketing & escalation",
    "services.learnMore": "Learn more",
    "services.webdev.details": "I build complete web applications from concept to deployment.",
    "services.security.details": "Leveraging 6+ years of enterprise IT experience, I help secure your digital infrastructure.",
    "services.support.details": "Professional IT support with enterprise-level expertise.",
    "services.modal.techStack": "Technology Stack",
    "services.modal.keyFeatures": "Key Features",
    "services.modal.cta": "Discuss Your Project",
    "services.modal.downloadCV": "Download CV",

    // Case Studies
    "casestudies.title": "Case Studies",
    "casestudies.subtitle": "Real solutions we've built for real businesses",
    "casestudies.viewProject": "View Project",
    "casestudies.livePreview": "Live Preview (Coming Soon)",
    "casestudies.1.title": "AI Customer Intelligence Suite",
    "casestudies.1.desc": "An AI-powered customer intelligence platform integrating GPT-4o with WhatsApp Business API for automated, context-aware customer interactions and sentiment analytics.",
    "casestudies.1.result": "85% faster response time — Real-time sentiment analysis with AI-driven routing",
    "casestudies.2.title": "Smart SaaS Financial Dashboard",
    "casestudies.2.desc": "A comprehensive financial analytics dashboard for SaaS companies with real-time revenue tracking, expense management, and automated reporting via Recharts visualizations.",
    "casestudies.2.result": "Saved 10+ hours/week — Automated financial insights & trend forecasting",
    "casestudies.3.title": "Zero-Touch Workflow Automation",
    "casestudies.3.desc": "End-to-end business process automation using n8n, Make.com, and custom Python scripts eliminating manual data entry and human intervention across multiple departments.",
    "casestudies.3.result": "0% human error — Fully automated cross-platform data workflows",

    // Top Bar
    "topbar.clientLogin": "Client Login",
    "topbar.quickBrowse": "Quick Browse",

    // Multi-step Inquiry
    "inquiry.title": "Start Your Project",
    "inquiry.subtitle": "Tell us about your project and we'll get back to you within 24 hours.",
    "inquiry.step1.title": "What do you need?",
    "inquiry.step1.subtitle": "Select the type of service you're looking for",
    "inquiry.step2.title": "Budget & Timeline",
    "inquiry.step2.subtitle": "Help us understand your project scope",
    "inquiry.step3.title": "Your Details",
    "inquiry.step3.subtitle": "How can we reach you?",
    "inquiry.type.webdev": "Web / App Development",
    "inquiry.type.ai": "AI Integration & Automation",
    "inquiry.type.automation": "Business Process Automation",
    "inquiry.type.consulting": "Strategic Tech Consulting",
    "inquiry.industry": "Your Industry (optional)",
    "inquiry.budget": "Estimated Budget",
    "inquiry.timelineLabel": "Project Timeline",
    "inquiry.timeline.asap": "ASAP",
    "inquiry.timeline.1to3": "1–3 Months",
    "inquiry.timeline.3to6": "3–6 Months",
    "inquiry.timeline.flexible": "Flexible",
    "inquiry.name": "Your Name",
    "inquiry.email": "Your Email",
    "inquiry.details": "Tell us more about your project...",
    "inquiry.back": "Back",
    "inquiry.next": "Next",
    "inquiry.submit": "Submit Inquiry",
    "inquiry.submitting": "Submitting...",
    "inquiry.success": "Inquiry Submitted!",
    "inquiry.successMessage": "Thank you! We'll get back to you within 24 hours.",
    "inquiry.error": "Error",
    "inquiry.errorMessage": "Failed to submit. Please try again.",

    // Experience
    "experience.title": "Experience",
    "experience.subtitle": "Professional Journey",
    "experience.cbre.title": "IT Support Specialist - 2nd Level",
    "experience.cbre.company": "CBRE for DXC/Dell",
    "experience.cbre.period": "2017 - 2023",
    "experience.cbre.description": "Provided enterprise-level technical support managing Active Directory, ServiceNow ticketing, and complex Windows environments across global infrastructure.",
    "experience.cbre.task1": "Active Directory user & group management",
    "experience.cbre.task2": "ServiceNow incident resolution & escalation",
    "experience.cbre.task3": "2nd Level technical support & troubleshooting",
    "experience.cbre.task4": "Windows Server administration",
    "experience.cbre.task5": "Network configuration & VPN management",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Full-Stack Applications",
    "projects.viewLive": "View Live",
    "projects.viewCode": "View Code",

    // Skills
    "skills.title": "Technical Stack",
    "skills.subtitle": "Technologies We Work With",
    "skills.languages": "Languages",
    "skills.frameworks": "Frameworks",
    "skills.systems": "Systems & Tools",
    "skills.security": "Cybersecurity & Pen-Testing",

    // Education
    "education.title": "Education",
    "education.subtitle": "Academic Background",
    "education.bsc.degree": "B.Sc. Computer Science",
    "education.bsc.school": "Sanaa University",
    "education.diploma.degree": "Full-Stack Web Development Diploma",
    "education.diploma.school": "Code Institute, Dublin",
    "education.diploma.year": "2024",

    // Chat
    "chat.title": "AI Assistant",
    "chat.placeholder": "Ask us anything...",
    "chat.welcome": "Hello! I'm the Tech-Noah Solutions assistant. Ask me about our services, case studies, or how we can help your business!",
    "chat.send": "Send",

    // Testimonials
    "testimonials.title": "Client Testimonials",
    "testimonials.subtitle": "What our clients say about working with Tech-Noah Solutions",
    "testimonials.writeReview": "Write a Review",
    "testimonials.1.name": "Michael Schmidt",
    "testimonials.1.role": "IT Manager",
    "testimonials.1.company": "TechCorp GmbH",
    "testimonials.1.quote": "Tech-Noah's Full-Stack expertise and deep understanding of IT infrastructure made them invaluable. They delivered a robust web application while seamlessly integrating with our enterprise systems.",
    "testimonials.2.name": "Sarah Weber",
    "testimonials.2.role": "Lead Developer",
    "testimonials.2.company": "Digital Solutions AG",
    "testimonials.2.quote": "Exceptional problem-solving skills and reliable delivery. The team consistently exceeded expectations, tackling complex challenges with both creativity and technical precision.",
    "testimonials.3.name": "Thomas Müller",
    "testimonials.3.role": "CTO",
    "testimonials.3.company": "StartupHub Berlin",
    "testimonials.3.quote": "Their hackathon mentality combined with enterprise experience is rare. They built our MVP in record time without sacrificing code quality or security best practices.",

    // Review Modal
    "review.title": "Write a Review",
    "review.name": "Your Name",
    "review.role": "Your Role (Optional)",
    "review.company": "Company (Optional)",
    "review.message": "Your Review",
    "review.rating": "Rating",
    "review.submit": "Submit Review",
    "review.submitting": "Submitting...",
    "review.success": "Review Submitted!",
    "review.successMessage": "Thank you! Your review will be displayed after approval.",
    "review.error": "Error",
    "review.errorMessage": "Failed to submit review. Please try again.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.visitors": "Visitors",

    // Command Palette
    "command.search": "Search...",
    "command.placeholder": "Type a command or search...",
    "command.navigation": "Navigation",
    "command.actions": "Actions",
    "command.downloadCV": "Download CV",
    "command.copyEmail": "Copy Email",
    "command.emailCopied": "Email copied to clipboard!",
    "command.lightMode": "Switch to Light Mode",
    "command.darkMode": "Switch to Dark Mode",
    "command.navigate": "Navigate",
    "command.select": "Select",
    "command.close": "Close",
    "command.noResults": "No results found.",

    // Design Gallery
    "gallery.title": "Design Gallery",
    "gallery.subtitle": "Choose a style that matches your vision",
    "gallery.select": "I want this style",
    "gallery.minimalist": "Minimalist",
    "gallery.minimalist.desc": "Clean, simple, and elegant design with focus on content.",
    "gallery.cosmic": "Cosmic / Dark",
    "gallery.cosmic.desc": "Modern dark theme with neon accents and tech aesthetics.",
    "gallery.corporate": "Corporate",
    "gallery.corporate.desc": "Professional and trustworthy design for businesses.",
    "gallery.ecommerce": "E-Commerce",
    "gallery.ecommerce.desc": "Conversion-focused design for online stores.",
    "gallery.creative": "Creative",
    "gallery.creative.desc": "Bold, artistic designs that stand out.",

    // Style Gallery Section
    "styles.title": "Choose Your Style",
    "styles.subtitle": "Select a design aesthetic that matches your brand vision",
    "styles.colorPalette": "Color Palette",

    // Cookie Banner
    "cookie.message": "We use cookies to improve your experience.",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind? Let's discuss how we can work together.",
    "contact.location": "Frankfurt, Germany",
    "contact.mapAlt": "Location Map",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message Sent!",
    "contact.successMessage": "Thank you for reaching out. We'll get back to you soon.",
    "contact.error": "Error",
    "contact.errorMessage": "Failed to send message. Please try again.",
    "contact.fillAll": "Please fill in all required fields.",

    // Styles Inquiry
    "styles.inquiryDesc": "Send us a project inquiry for:",
    "command.back": "Back",

    // Skills Filter
    "skills.all": "All Technologies",
    "skills.active": "Active",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.services": "Leistungen",
    "nav.casestudies": "Fallstudien",
    "nav.experience": "Erfahrung",
    "nav.projects": "Projekte",
    "nav.skills": "Fähigkeiten",
    "nav.education": "Ausbildung",
    "nav.contact": "Kontakt",
    "nav.consult": "Beratung starten",

    // Hero - Agency
    "hero.badge": "KI-gestützte Software-Agentur",
    "hero.tagline": "Die Zukunft mit KI-gestützten Lösungen automatisieren",
    "hero.description": "Wir entwerfen, entwickeln und automatisieren intelligente Softwaresysteme, die Unternehmen schneller skalieren lassen. Von maßgeschneiderten Web-Apps bis hin zu KI-Integration und Workflow-Automatisierung.",
    "hero.cta.consult": "Projekt starten",
    "hero.cta.casestudies": "Fallstudien ansehen",
    "hero.greeting": "Hallo, ich bin",
    "hero.name": "Noah Al-Samawi",
    "hero.title": "Full-Stack Entwickler mit Fokus auf IT-Sicherheit",
    "hero.subtitle": "Moderne Webanwendungen mit Security-First-Ansatz",
    "hero.cta.contact": "Kontakt aufnehmen",
    "hero.cta.projects": "Projekte ansehen",
    "hero.cta.download": "Lebenslauf herunterladen",
    "hero.location": "Frankfurt, Deutschland",
    "hero.status": "Offen für Projekte",

    // About - Founder
    "about.agencyTitle": "Gründer & Lead Engineer",
    "about.agencySubtitle": "Der Kopf hinter Tech-Noah Solutions",
    "about.title": "Über mich",
    "about.subtitle": "Lernen Sie mich kennen",
    "about.years": "Jahre Erfahrung",
    "about.valueProposition": "Leidenschaftlich daran, robuste Softwareentwicklung mit defensiver Security zu verbinden.",
    "about.description1": 'Ich baue nicht nur Apps; ich sichere sie ab.',
    "about.description2": "Mein Hintergrund umfasst den Aufbau von Home Labs für Angriffssimulationen und die Automatisierung von Security-Workflows. Kombiniert mit 6+ Jahren Enterprise-IT und Full-Stack-Entwicklung liefere ich Lösungen, die funktional und sicher sind.",
    "about.highlight1": "6+ Jahre Enterprise-IT bei Fortune-500-Unternehmen",
    "about.highlight2": "Full-Stack-Entwicklung mit React, Django & TypeScript",
    "about.highlight3": "Code Institute Diplom in Full-Stack Webentwicklung (2024)",
    "about.highlight4": "Rapid Prototyping & Innovation durch mehrere Hackathons",
    "about.highlight5": "Maßgeschneiderte Lösungen für Freelance-Kunden",
    "about.stat1": "Jahre IT-Erfahrung",
    "about.stat2": "Hackathons absolviert",
    "about.stat3": "Projekte geliefert",

    // Hire Me Section
    "hire.title": "Ideen in Realität verwandeln",
    "hire.subtitle": "Brauchen Sie eine Website, eine maßgeschneiderte App oder ein Sicherheitsaudit?",
    "hire.webdesign.title": "Web-Design",
    "hire.webdesign.desc": "Schöne, responsive Websites, die Besucher in Kunden verwandeln.",
    "hire.apps.title": "Individuelle Apps",
    "hire.apps.desc": "Maßgeschneiderte Webanwendungen für Ihre spezifischen Geschäftsanforderungen.",
    "hire.security.title": "Cybersicherheit",
    "hire.security.desc": "Schützen Sie Ihre digitalen Assets mit professionellen Sicherheitsaudits.",
    "hire.cta": "Lass uns zusammenarbeiten",

    // Agency Services
    "agency.services.title": "Unsere Leistungen",
    "agency.services.subtitle": "End-to-End-Technologielösungen für Ihr Unternehmenswachstum",
    "agency.services.webdev.title": "Web- & App-Entwicklung",
    "agency.services.webdev.desc": "Full-Stack-Anwendungen mit modernen Frameworks. Von MVPs bis zu Enterprise-Plattformen – skalierbar, sicher und performant.",
    "agency.services.ai.title": "KI-Systeme & Integration",
    "agency.services.ai.desc": "Nutzen Sie die Kraft der KI für Ihr Unternehmen. Wir entwickeln GPT-Integrationen, ML-Pipelines und intelligente Automatisierung.",
    "agency.services.automation.title": "Geschäftsautomatisierung",
    "agency.services.automation.desc": "Optimieren Sie Ihre Abläufe mit intelligenter Workflow-Automatisierung. CRM-Integrationen, Datenpipelines und Prozessoptimierung.",
    "agency.services.consulting.title": "Strategische Beratung",
    "agency.services.consulting.desc": "Expertenberatung zu Architektur, Sicherheitsaudits und Technologiestrategie für die Zukunftssicherheit Ihres Unternehmens.",

    // Services (legacy)
    "services.title": "Leistungen",
    "services.subtitle": "Wie ich Ihnen helfen kann",
    "services.learnMore": "Mehr erfahren",
    "services.webdev.title": "Webentwicklung",
    "services.webdev.desc": "Moderne, responsive Webanwendungen.",
    "services.webdev.f1": "React & TypeScript Frontends",
    "services.webdev.f2": "Django & REST API Backends",
    "services.webdev.f3": "Datenbankdesign & Optimierung",
    "services.security.title": "Cybersicherheit",
    "services.security.desc": "Schutz digitaler Assets.",
    "services.security.f1": "Sicherheitsaudits & Bewertungen",
    "services.security.f2": "Netzwerksicherheitskonfiguration",
    "services.security.f3": "Active Directory Management",
    "services.support.title": "Tech-Support",
    "services.support.desc": "Professioneller IT-Support.",
    "services.support.f1": "Windows Server Administration",
    "services.support.f2": "IT-Infrastruktur-Management",
    "services.support.f3": "ServiceNow Ticketing & Eskalation",
    "services.webdev.details": "Komplette Webanwendungen vom Konzept bis zum Deployment.",
    "services.security.details": "Sicherung Ihrer digitalen Infrastruktur.",
    "services.support.details": "Professioneller IT-Support mit Enterprise-Level-Expertise.",
    "services.modal.techStack": "Technologie-Stack",
    "services.modal.keyFeatures": "Hauptfunktionen",
    "services.modal.cta": "Projekt besprechen",
    "services.modal.downloadCV": "Lebenslauf herunterladen",

    // Case Studies
    "casestudies.title": "Fallstudien",
    "casestudies.subtitle": "Echte Lösungen, die wir für echte Unternehmen entwickelt haben",
    "casestudies.viewProject": "Projekt ansehen",
    "casestudies.livePreview": "Live-Vorschau (Demnächst)",
    "casestudies.1.title": "KI-Kundenintelligenz-Suite",
    "casestudies.1.desc": "Eine KI-gestützte Plattform zur Kundenintelligenz mit GPT-4o und WhatsApp Business API für automatisierte, kontextbezogene Kundeninteraktionen.",
    "casestudies.1.result": "85% schnellere Antwortzeit — Echtzeit-Sentimentanalyse mit KI-Routing",
    "casestudies.2.title": "Smart SaaS Finanz-Dashboard",
    "casestudies.2.desc": "Ein umfassendes Finanzanalyse-Dashboard für SaaS-Unternehmen mit Echtzeit-Umsatzverfolgung und automatisierter Berichterstattung.",
    "casestudies.2.result": "10+ Stunden/Woche gespart — Automatisierte Finanzeinblicke",
    "casestudies.3.title": "Zero-Touch Workflow-Automatisierung",
    "casestudies.3.desc": "End-to-End-Geschäftsprozessautomatisierung mit n8n, Make.com und Python-Skripten zur Eliminierung manueller Dateneingabe.",
    "casestudies.3.result": "0% menschliche Fehler — Vollautomatisierte Daten-Workflows",

    // Top Bar
    "topbar.clientLogin": "Kunden-Login",
    "topbar.quickBrowse": "Schnell durchsuchen",

    // Multi-step Inquiry
    "inquiry.title": "Ihr Projekt starten",
    "inquiry.subtitle": "Erzählen Sie uns von Ihrem Projekt und wir melden uns innerhalb von 24 Stunden.",
    "inquiry.step1.title": "Was brauchen Sie?",
    "inquiry.step1.subtitle": "Wählen Sie die Art der gewünschten Dienstleistung",
    "inquiry.step2.title": "Budget & Zeitplan",
    "inquiry.step2.subtitle": "Helfen Sie uns, den Umfang zu verstehen",
    "inquiry.step3.title": "Ihre Daten",
    "inquiry.step3.subtitle": "Wie können wir Sie erreichen?",
    "inquiry.type.webdev": "Web- / App-Entwicklung",
    "inquiry.type.ai": "KI-Integration & Automatisierung",
    "inquiry.type.automation": "Geschäftsprozess-Automatisierung",
    "inquiry.type.consulting": "Strategische Tech-Beratung",
    "inquiry.industry": "Ihre Branche (optional)",
    "inquiry.budget": "Geschätztes Budget",
    "inquiry.timelineLabel": "Projektzeitplan",
    "inquiry.timeline.asap": "Sofort",
    "inquiry.timeline.1to3": "1–3 Monate",
    "inquiry.timeline.3to6": "3–6 Monate",
    "inquiry.timeline.flexible": "Flexibel",
    "inquiry.name": "Ihr Name",
    "inquiry.email": "Ihre E-Mail",
    "inquiry.details": "Erzählen Sie uns mehr über Ihr Projekt...",
    "inquiry.back": "Zurück",
    "inquiry.next": "Weiter",
    "inquiry.submit": "Anfrage senden",
    "inquiry.submitting": "Wird gesendet...",
    "inquiry.success": "Anfrage gesendet!",
    "inquiry.successMessage": "Vielen Dank! Wir melden uns innerhalb von 24 Stunden.",
    "inquiry.error": "Fehler",
    "inquiry.errorMessage": "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.",

    // Experience
    "experience.title": "Erfahrung",
    "experience.subtitle": "Beruflicher Werdegang",
    "experience.cbre.title": "IT Support Spezialist - 2nd Level",
    "experience.cbre.company": "CBRE für DXC/Dell",
    "experience.cbre.period": "2017 - 2023",
    "experience.cbre.description": "Enterprise-Level technischer Support mit Active Directory, ServiceNow und komplexen Windows-Umgebungen.",
    "experience.cbre.task1": "Active Directory Benutzer- & Gruppenverwaltung",
    "experience.cbre.task2": "ServiceNow Incident-Auflösung & Eskalation",
    "experience.cbre.task3": "2nd Level technischer Support & Fehlerbehebung",
    "experience.cbre.task4": "Windows Server Administration",
    "experience.cbre.task5": "Netzwerkkonfiguration & VPN-Management",

    // Projects
    "projects.title": "Projekte",
    "projects.subtitle": "Full-Stack Anwendungen",
    "projects.viewLive": "Live ansehen",
    "projects.viewCode": "Code ansehen",

    // Skills
    "skills.title": "Technologien",
    "skills.subtitle": "Womit wir arbeiten",
    "skills.languages": "Sprachen",
    "skills.frameworks": "Frameworks",
    "skills.systems": "Systeme & Tools",
    "skills.security": "Cybersecurity & Pen-Testing",

    // Education
    "education.title": "Ausbildung",
    "education.subtitle": "Akademischer Hintergrund",
    "education.bsc.degree": "B.Sc. Informatik",
    "education.bsc.school": "Universität Sanaa",
    "education.diploma.degree": "Full-Stack Webentwicklung Diplom",
    "education.diploma.school": "Code Institute, Dublin",
    "education.diploma.year": "2024",

    // Chat
    "chat.title": "KI-Assistent",
    "chat.placeholder": "Fragen Sie uns...",
    "chat.welcome": "Hallo! Ich bin der Tech-Noah Solutions Assistent. Fragen Sie mich zu unseren Leistungen oder Fallstudien!",
    "chat.send": "Senden",

    // Testimonials
    "testimonials.title": "Kundenstimmen",
    "testimonials.subtitle": "Was unsere Kunden über die Zusammenarbeit mit Tech-Noah Solutions sagen",
    "testimonials.writeReview": "Bewertung schreiben",
    "testimonials.1.name": "Michael Schmidt",
    "testimonials.1.role": "IT-Manager",
    "testimonials.1.company": "TechCorp GmbH",
    "testimonials.1.quote": "Tech-Noahs Full-Stack-Expertise und tiefes Verständnis der IT-Infrastruktur machten sie unverzichtbar.",
    "testimonials.2.name": "Sarah Weber",
    "testimonials.2.role": "Lead Developer",
    "testimonials.2.company": "Digital Solutions AG",
    "testimonials.2.quote": "Außergewöhnliche Problemlösungsfähigkeiten und zuverlässige Lieferung. Das Team übertraf konstant die Erwartungen.",
    "testimonials.3.name": "Thomas Müller",
    "testimonials.3.role": "CTO",
    "testimonials.3.company": "StartupHub Berlin",
    "testimonials.3.quote": "Ihre Hackathon-Mentalität kombiniert mit Enterprise-Erfahrung ist selten. Sie bauten unser MVP in Rekordzeit.",

    // Review Modal
    "review.title": "Bewertung schreiben",
    "review.name": "Ihr Name",
    "review.role": "Ihre Position (Optional)",
    "review.company": "Unternehmen (Optional)",
    "review.message": "Ihre Bewertung",
    "review.rating": "Bewertung",
    "review.submit": "Bewertung abschicken",
    "review.submitting": "Wird gesendet...",
    "review.success": "Bewertung eingereicht!",
    "review.successMessage": "Vielen Dank! Ihre Bewertung wird nach Genehmigung angezeigt.",
    "review.error": "Fehler",
    "review.errorMessage": "Bewertung konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.visitors": "Besucher",

    // Command Palette
    "command.search": "Suchen...",
    "command.placeholder": "Befehl eingeben oder suchen...",
    "command.navigation": "Navigation",
    "command.actions": "Aktionen",
    "command.downloadCV": "Lebenslauf herunterladen",
    "command.copyEmail": "E-Mail kopieren",
    "command.emailCopied": "E-Mail in Zwischenablage kopiert!",
    "command.lightMode": "Zum hellen Modus wechseln",
    "command.darkMode": "Zum dunklen Modus wechseln",
    "command.navigate": "Navigieren",
    "command.select": "Auswählen",
    "command.close": "Schließen",
    "command.noResults": "Keine Ergebnisse gefunden.",

    // Design Gallery
    "gallery.title": "Design-Galerie",
    "gallery.subtitle": "Wählen Sie einen Stil, der zu Ihrer Vision passt",
    "gallery.select": "Diesen Stil möchte ich",
    "gallery.minimalist": "Minimalistisch",
    "gallery.minimalist.desc": "Klares, einfaches und elegantes Design mit Fokus auf Inhalt.",
    "gallery.cosmic": "Kosmisch / Dunkel",
    "gallery.cosmic.desc": "Modernes dunkles Theme mit Neonakzenten und Tech-Ästhetik.",
    "gallery.corporate": "Corporate",
    "gallery.corporate.desc": "Professionelles und vertrauenswürdiges Design für Unternehmen.",
    "gallery.ecommerce": "E-Commerce",
    "gallery.ecommerce.desc": "Konversionsorientiertes Design für Online-Shops.",
    "gallery.creative": "Kreativ",
    "gallery.creative.desc": "Mutige, künstlerische Designs, die herausstechen.",

    // Style Gallery Section
    "styles.title": "Wählen Sie Ihren Stil",
    "styles.subtitle": "Wählen Sie eine Designästhetik, die zu Ihrer Markenvision passt",
    "styles.colorPalette": "Farbpalette",

    // Cookie Banner
    "cookie.message": "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.",
    "cookie.accept": "Akzeptieren",
    "cookie.decline": "Ablehnen",

    // Contact
    "contact.title": "Kontakt aufnehmen",
    "contact.subtitle": "Haben Sie ein Projekt im Sinn? Lassen Sie uns besprechen, wie wir zusammenarbeiten können.",
    "contact.location": "Frankfurt, Deutschland",
    "contact.mapAlt": "Standortkarte",
    "contact.name": "Ihr Name",
    "contact.email": "Ihre E-Mail",
    "contact.message": "Ihre Nachricht",
    "contact.send": "Nachricht senden",
    "contact.sending": "Wird gesendet...",
    "contact.success": "Nachricht gesendet!",
    "contact.successMessage": "Vielen Dank für Ihre Nachricht. Ich werde mich bald bei Ihnen melden.",
    "contact.error": "Fehler",
    "contact.errorMessage": "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    "contact.fillAll": "Bitte füllen Sie alle erforderlichen Felder aus.",

    // Styles Inquiry
    "styles.inquiryDesc": "Senden Sie mir eine Projektanfrage für:",
    "command.back": "Zurück",

    // Skills Filter
    "skills.all": "Alle Technologien",
    "skills.active": "Aktiv",

    // Common
    "common.loading": "Lädt...",
    "common.error": "Ein Fehler ist aufgetreten",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "عنا",
    "nav.services": "الخدمات",
    "nav.casestudies": "دراسات الحالة",
    "nav.experience": "الخبرة",
    "nav.projects": "المشاريع",
    "nav.skills": "المهارات",
    "nav.education": "التعليم",
    "nav.contact": "تواصل معنا",
    "nav.consult": "ابدأ مشروعك",

    // Hero - Agency
    "hero.badge": "وكالة برمجيات مدعومة بالذكاء الاصطناعي",
    "hero.tagline": "أتمتة المستقبل بحلول مدعومة بالذكاء الاصطناعي",
    "hero.description": "نصمم ونبني ونؤتمت أنظمة برمجية ذكية تساعد الشركات على التوسع بشكل أسرع. من تطبيقات الويب المخصصة إلى تكامل الذكاء الاصطناعي وأتمتة سير العمل.",
    "hero.cta.consult": "ابدأ مشروعاً",
    "hero.cta.casestudies": "عرض دراسات الحالة",
    "hero.greeting": "مرحباً، أنا",
    "hero.name": "نوح السماوي",
    "hero.title": "مطور Full-Stack مع التركيز على الأمن",
    "hero.subtitle": "بناء تطبيقات ويب حديثة بنهج الأمان أولاً",
    "hero.cta.contact": "تواصل معنا",
    "hero.cta.projects": "عرض المشاريع",
    "hero.cta.download": "تحميل السيرة الذاتية",
    "hero.location": "فرانكفورت، ألمانيا",
    "hero.status": "متاح للفرص",

    // About - Founder
    "about.agencyTitle": "المؤسس والمهندس الرئيسي",
    "about.agencySubtitle": "العقل المدبر وراء Tech-Noah Solutions",
    "about.title": "عنا",
    "about.subtitle": "تعرف علينا أكثر",
    "about.years": "سنوات الخبرة",
    "about.valueProposition": "شغوف بربط هندسة البرمجيات المتينة بالأمان الدفاعي.",
    "about.description1": 'لا نبني التطبيقات فحسب؛ بل نؤمّنها.',
    "about.description2": "تشمل خلفيتنا بناء مختبرات منزلية لمحاكاة الهجمات وأتمتة سير عمل الأمان. مع أكثر من 6 سنوات من تقنية المعلومات للشركات وتطوير Full-Stack.",
    "about.highlight1": "أكثر من 6 سنوات خبرة في شركات Fortune 500",
    "about.highlight2": "تطوير Full-Stack مع React وDjango وTypeScript",
    "about.highlight3": "دبلوم تطوير الويب Full-Stack من Code Institute (2024)",
    "about.highlight4": "النماذج الأولية السريعة والابتكار من خلال الهاكاثونات",
    "about.highlight5": "حلول مخصصة للعملاء المستقلين",
    "about.stat1": "سنوات خبرة IT",
    "about.stat2": "هاكاثونات",
    "about.stat3": "مشاريع منجزة",

    // Hire Me Section
    "hire.title": "حوّل الأفكار إلى واقع",
    "hire.subtitle": "هل تحتاج موقع ويب، تطبيق مخصص، أو تدقيق أمني؟",
    "hire.webdesign.title": "تصميم الويب",
    "hire.webdesign.desc": "مواقع جميلة ومتجاوبة تحول الزوار إلى عملاء.",
    "hire.apps.title": "تطبيقات مخصصة",
    "hire.apps.desc": "تطبيقات ويب مصممة لاحتياجات عملك الخاصة.",
    "hire.security.title": "الأمن السيبراني",
    "hire.security.desc": "احمِ أصولك الرقمية بتدقيقات أمنية احترافية.",
    "hire.cta": "لنعمل معاً",

    // Agency Services
    "agency.services.title": "خدماتنا",
    "agency.services.subtitle": "حلول تقنية شاملة لنمو أعمالك",
    "agency.services.webdev.title": "تطوير الويب والتطبيقات",
    "agency.services.webdev.desc": "تطبيقات Full-Stack بأطر عمل حديثة. من MVPs إلى منصات المؤسسات – قابلة للتوسع وآمنة وعالية الأداء.",
    "agency.services.ai.title": "أنظمة الذكاء الاصطناعي والتكامل",
    "agency.services.ai.desc": "استفد من قوة الذكاء الاصطناعي لتعزيز أعمالك. نبني تكاملات GPT المخصصة وخطوط ML والأتمتة الذكية.",
    "agency.services.automation.title": "أتمتة الأعمال",
    "agency.services.automation.desc": "بسّط عملياتك بأتمتة سير العمل الذكية. تكاملات CRM وخطوط البيانات وتحسين العمليات.",
    "agency.services.consulting.title": "الاستشارات الاستراتيجية",
    "agency.services.consulting.desc": "إرشاد خبير في قرارات الهندسة وتدقيقات الأمان واستراتيجية التكنولوجيا.",

    // Services (legacy)
    "services.title": "الخدمات",
    "services.subtitle": "كيف يمكننا مساعدتك",
    "services.learnMore": "اعرف المزيد",
    "services.webdev.title": "تطوير الويب",
    "services.webdev.desc": "بناء تطبيقات ويب حديثة ومتجاوبة.",
    "services.webdev.f1": "واجهات React وTypeScript",
    "services.webdev.f2": "خلفيات Django وREST API",
    "services.webdev.f3": "تصميم وتحسين قواعد البيانات",
    "services.security.title": "الأمن السيبراني",
    "services.security.desc": "حماية أصولك الرقمية.",
    "services.security.f1": "تدقيقات وتقييمات أمنية",
    "services.security.f2": "تكوين أمان الشبكة",
    "services.security.f3": "إدارة Active Directory",
    "services.support.title": "الدعم التقني",
    "services.support.desc": "دعم IT احترافي.",
    "services.support.f1": "إدارة Windows Server",
    "services.support.f2": "إدارة البنية التحتية لـ IT",
    "services.support.f3": "تذاكر ServiceNow والتصعيد",
    "services.webdev.details": "أبني تطبيقات ويب كاملة من الفكرة إلى النشر.",
    "services.security.details": "تأمين بنيتك التحتية الرقمية.",
    "services.support.details": "دعم IT احترافي بخبرة مؤسسية.",
    "services.modal.techStack": "التقنيات المستخدمة",
    "services.modal.keyFeatures": "الميزات الرئيسية",
    "services.modal.cta": "ناقش مشروعك",
    "services.modal.downloadCV": "تحميل السيرة الذاتية",

    // Case Studies
    "casestudies.title": "دراسات الحالة",
    "casestudies.subtitle": "حلول حقيقية بنيناها لشركات حقيقية",
    "casestudies.viewProject": "عرض المشروع",
    "casestudies.livePreview": "معاينة مباشرة (قريباً)",
    "casestudies.1.title": "مجموعة ذكاء العملاء بالذكاء الاصطناعي",
    "casestudies.1.desc": "منصة ذكاء عملاء مدعومة بالذكاء الاصطناعي تدمج GPT-4o مع واجهة WhatsApp Business API للتفاعلات الآلية والسياقية.",
    "casestudies.1.result": "85% أسرع في الاستجابة — تحليل المشاعر في الوقت الحقيقي مع التوجيه الذكي",
    "casestudies.2.title": "لوحة تحكم مالية SaaS ذكية",
    "casestudies.2.desc": "لوحة تحكم شاملة للتحليلات المالية لشركات SaaS مع تتبع الإيرادات في الوقت الحقيقي والتقارير الآلية.",
    "casestudies.2.result": "توفير 10+ ساعات/أسبوع — رؤى مالية آلية وتوقعات الاتجاهات",
    "casestudies.3.title": "أتمتة سير العمل بدون تدخل",
    "casestudies.3.desc": "أتمتة شاملة لعمليات الأعمال باستخدام n8n وMake.com وPython للقضاء على الإدخال اليدوي للبيانات.",
    "casestudies.3.result": "0% أخطاء بشرية — تدفقات بيانات مؤتمتة بالكامل عبر المنصات",

    // Top Bar
    "topbar.clientLogin": "تسجيل دخول العميل",
    "topbar.quickBrowse": "تصفح سريع",

    // Multi-step Inquiry
    "inquiry.title": "ابدأ مشروعك",
    "inquiry.subtitle": "أخبرنا عن مشروعك وسنرد عليك خلال 24 ساعة.",
    "inquiry.step1.title": "ماذا تحتاج؟",
    "inquiry.step1.subtitle": "اختر نوع الخدمة التي تبحث عنها",
    "inquiry.step2.title": "الميزانية والجدول الزمني",
    "inquiry.step2.subtitle": "ساعدنا في فهم نطاق مشروعك",
    "inquiry.step3.title": "بياناتك",
    "inquiry.step3.subtitle": "كيف يمكننا الوصول إليك؟",
    "inquiry.type.webdev": "تطوير الويب / التطبيقات",
    "inquiry.type.ai": "تكامل الذكاء الاصطناعي والأتمتة",
    "inquiry.type.automation": "أتمتة العمليات التجارية",
    "inquiry.type.consulting": "استشارات تقنية استراتيجية",
    "inquiry.industry": "مجال عملك (اختياري)",
    "inquiry.budget": "الميزانية المقدرة",
    "inquiry.timelineLabel": "الجدول الزمني للمشروع",
    "inquiry.timeline.asap": "في أقرب وقت",
    "inquiry.timeline.1to3": "1–3 أشهر",
    "inquiry.timeline.3to6": "3–6 أشهر",
    "inquiry.timeline.flexible": "مرن",
    "inquiry.name": "اسمك",
    "inquiry.email": "بريدك الإلكتروني",
    "inquiry.details": "أخبرنا المزيد عن مشروعك...",
    "inquiry.back": "رجوع",
    "inquiry.next": "التالي",
    "inquiry.submit": "إرسال الاستفسار",
    "inquiry.submitting": "جارٍ الإرسال...",
    "inquiry.success": "تم إرسال الاستفسار!",
    "inquiry.successMessage": "شكراً! سنرد عليك خلال 24 ساعة.",
    "inquiry.error": "خطأ",
    "inquiry.errorMessage": "فشل الإرسال. يرجى المحاولة مرة أخرى.",

    // Experience
    "experience.title": "الخبرة",
    "experience.subtitle": "المسيرة المهنية",
    "experience.cbre.title": "أخصائي دعم IT - المستوى الثاني",
    "experience.cbre.company": "CBRE لـ DXC/Dell",
    "experience.cbre.period": "2017 - 2023",
    "experience.cbre.description": "دعم تقني على مستوى المؤسسات.",
    "experience.cbre.task1": "إدارة مستخدمي ومجموعات Active Directory",
    "experience.cbre.task2": "حل حوادث ServiceNow والتصعيد",
    "experience.cbre.task3": "دعم تقني المستوى الثاني واستكشاف الأخطاء",
    "experience.cbre.task4": "إدارة Windows Server",
    "experience.cbre.task5": "تكوين الشبكة وإدارة VPN",

    // Projects
    "projects.title": "المشاريع",
    "projects.subtitle": "تطبيقات Full-Stack",
    "projects.viewLive": "عرض مباشر",
    "projects.viewCode": "عرض الكود",

    // Skills
    "skills.title": "التقنيات",
    "skills.subtitle": "التقنيات التي نعمل بها",
    "skills.languages": "اللغات",
    "skills.frameworks": "أطر العمل",
    "skills.systems": "الأنظمة والأدوات",
    "skills.security": "الأمن السيبراني واختبار الاختراق",

    // Education
    "education.title": "التعليم",
    "education.subtitle": "الخلفية الأكاديمية",
    "education.bsc.degree": "بكالوريوس علوم الحاسوب",
    "education.bsc.school": "جامعة صنعاء",
    "education.diploma.degree": "دبلوم تطوير الويب Full-Stack",
    "education.diploma.school": "Code Institute، دبلن",
    "education.diploma.year": "2024",

    // Chat
    "chat.title": "المساعد الذكي",
    "chat.placeholder": "اسألنا أي شيء...",
    "chat.welcome": "مرحباً! أنا مساعد Tech-Noah Solutions الذكي. اسألني عن خدماتنا أو دراسات الحالة!",
    "chat.send": "إرسال",

    // Testimonials
    "testimonials.title": "آراء العملاء",
    "testimonials.subtitle": "ما يقوله عملاؤنا عن العمل مع Tech-Noah Solutions",
    "testimonials.writeReview": "اكتب تقييماً",
    "testimonials.1.name": "ميخائيل شميت",
    "testimonials.1.role": "مدير IT",
    "testimonials.1.company": "TechCorp GmbH",
    "testimonials.1.quote": "خبرة Tech-Noah في Full-Stack وفهمهم العميق للبنية التحتية جعلهم لا غنى عنهم.",
    "testimonials.2.name": "سارة ويبر",
    "testimonials.2.role": "مطور رئيسي",
    "testimonials.2.company": "Digital Solutions AG",
    "testimonials.2.quote": "مهارات استثنائية في حل المشاكل وتسليم موثوق. الفريق تجاوز التوقعات باستمرار.",
    "testimonials.3.name": "توماس مولر",
    "testimonials.3.role": "CTO",
    "testimonials.3.company": "StartupHub Berlin",
    "testimonials.3.quote": "عقليتهم في الهاكاثون مع خبرتهم المؤسسية نادرة. بنوا MVP في وقت قياسي.",

    // Review Modal
    "review.title": "اكتب تقييماً",
    "review.name": "اسمك",
    "review.role": "منصبك (اختياري)",
    "review.company": "الشركة (اختياري)",
    "review.message": "تقييمك",
    "review.rating": "التقييم",
    "review.submit": "إرسال التقييم",
    "review.submitting": "جارٍ الإرسال...",
    "review.success": "تم إرسال التقييم!",
    "review.successMessage": "شكراً! سيظهر تقييمك بعد الموافقة.",
    "review.error": "خطأ",
    "review.errorMessage": "فشل إرسال التقييم. يرجى المحاولة مرة أخرى.",

    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.visitors": "الزوار",

    // Command Palette
    "command.search": "بحث...",
    "command.placeholder": "اكتب أمراً أو ابحث...",
    "command.navigation": "التنقل",
    "command.actions": "الإجراءات",
    "command.downloadCV": "تحميل السيرة الذاتية",
    "command.copyEmail": "نسخ البريد الإلكتروني",
    "command.emailCopied": "تم نسخ البريد الإلكتروني!",
    "command.lightMode": "التبديل للوضع الفاتح",
    "command.darkMode": "التبديل للوضع الداكن",
    "command.navigate": "تنقل",
    "command.select": "اختيار",
    "command.close": "إغلاق",
    "command.noResults": "لا توجد نتائج.",

    // Design Gallery
    "gallery.title": "معرض التصاميم",
    "gallery.subtitle": "اختر أسلوباً يناسب رؤيتك",
    "gallery.select": "أريد هذا الأسلوب",
    "gallery.minimalist": "بسيط",
    "gallery.minimalist.desc": "تصميم نظيف وبسيط وأنيق.",
    "gallery.cosmic": "كوني / داكن",
    "gallery.cosmic.desc": "ثيم داكن حديث مع لمسات نيون.",
    "gallery.corporate": "مؤسسي",
    "gallery.corporate.desc": "تصميم احترافي وموثوق للأعمال.",
    "gallery.ecommerce": "تجارة إلكترونية",
    "gallery.ecommerce.desc": "تصميم موجه للتحويل.",
    "gallery.creative": "إبداعي",
    "gallery.creative.desc": "تصاميم جريئة وفنية تبرز.",

    // Style Gallery Section
    "styles.title": "اختر أسلوبك",
    "styles.subtitle": "اختر جمالية تصميم تناسب رؤية علامتك التجارية",
    "styles.colorPalette": "لوحة الألوان",

    // Cookie Banner
    "cookie.message": "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
    "cookie.accept": "قبول",
    "cookie.decline": "رفض",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "هل لديك مشروع في ذهنك؟ لنناقش كيف يمكننا العمل معاً.",
    "contact.location": "فرانكفورت، ألمانيا",
    "contact.mapAlt": "خريطة الموقع",
    "contact.name": "اسمك",
    "contact.email": "بريدك الإلكتروني",
    "contact.message": "رسالتك",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جارٍ الإرسال...",
    "contact.success": "تم إرسال الرسالة!",
    "contact.successMessage": "شكراً لتواصلك. سنرد عليك قريباً.",
    "contact.error": "خطأ",
    "contact.errorMessage": "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    "contact.fillAll": "يرجى ملء جميع الحقول المطلوبة.",

    // Styles Inquiry
    "styles.inquiryDesc": "أرسل لنا استفسار مشروع لـ:",
    "command.back": "رجوع",

    // Skills Filter
    "skills.all": "جميع التقنيات",
    "skills.active": "نشط",

    // Common
    "common.loading": "جارٍ التحميل...",
    "common.error": "حدث خطأ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Arabic is RTL, English and German are LTR
  const direction: Direction = language === "ar" ? "rtl" : "ltr";

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
    if (saved && (saved === "en" || saved === "de" || saved === "ar")) {
      setLanguageState(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
