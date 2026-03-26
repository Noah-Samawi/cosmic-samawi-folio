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
    "nav.consult": "Get a Quote",

    // Hero
    "hero.badge": "IT · Web · Design — All from One Source",
    "hero.greeting": "Holistic IT, Web &",
    "hero.name": "Design Solutions",
    "hero.title": "Everything from a single source for startups & local businesses in Frankfurt and remote.",
    "hero.subtitle": "Custom Websites, AI Integration, Branding, Print Design & Full IT Support — tailored for your success.",
    "hero.cta.contact": "Get in Touch",
    "hero.cta.projects": "View Projects",
    "hero.cta.download": "View Company Profile",
    "hero.cta.profile": "View Company Profile",
    "hero.location": "Frankfurt, Germany",
    "hero.status": "Available for Projects",

    // Services - 3 Pillars
    "services.title": "Services",
    "services.subtitle": "Three pillars for your digital and physical business presence",
    "services.learnMore": "Learn more",
    "services.web.title": "Web & Software",
    "services.web.desc": "Custom websites, AI-powered web apps, and modern software solutions — from concept to deployment.",
    "services.web.f1": "Custom Landing Pages & Websites",
    "services.web.f2": "AI Integration (GPT, Automation)",
    "services.web.f3": "Full-Stack Web Applications",
    "services.design.title": "Branding & Print Design",
    "services.design.desc": "Professional visual identity for your business — from business cards to social media assets.",
    "services.design.f1": "Business Cards (Visitenkarten)",
    "services.design.f2": "Flyers & Social Media Graphics",
    "services.design.f3": "Corporate Identity & Branding",
    "services.it.title": "IT & Tech Support",
    "services.it.desc": "Reliable 1st & 2nd level IT support for individuals and offices — hardware, networks, and troubleshooting.",
    "services.it.f1": "1st & 2nd Level IT Support",
    "services.it.f2": "Hardware Setup (Printers, Phones, Networks)",
    "services.it.f3": "Troubleshooting & Remote Support",
    "services.web.details": "I build complete web applications from concept to deployment, with AI integration capabilities.",
    "services.design.details": "Professional print and digital design to establish your brand identity.",
    "services.it.details": "Comprehensive IT support with enterprise-level expertise for individuals and offices.",
    "services.modal.techStack": "Technology Stack",
    "services.modal.keyFeatures": "Key Features",
    "services.modal.cta": "Request a Quote",
    "services.modal.downloadCV": "Download CV",

    // Starter Kit
    "starterkit.badge": "Most Popular",
    "starterkit.title": "Startup Starter-Kit",
    "starterkit.subtitle": "Launch your business fast — everything you need in one package.",
    "starterkit.item1": "Custom Landing Page",
    "starterkit.item2": "Business Card Design",
    "starterkit.item3": "Social Media Flyer",
    "starterkit.item4": "Basic IT Setup & Consultation",
    "starterkit.cta": "Request Quote",
    "starterkit.note": "Individual pricing based on your needs",

    // Agency Services (Bento Grid) - updated
    "agency.services.title": "Our Services",
    "agency.services.subtitle": "Three pillars for your digital and physical business presence",
    "agency.services.webdev.title": "Web & Software",
    "agency.services.webdev.desc": "Custom websites, AI-powered web apps, and modern software solutions — from concept to deployment.",
    "agency.services.ai.title": "Branding & Print Design",
    "agency.services.ai.desc": "Professional visual identity for your business — from business cards to social media assets and corporate identity.",
    "agency.services.automation.title": "IT & Tech Support",
    "agency.services.automation.desc": "Reliable 1st & 2nd level IT support for individuals and offices — hardware, networks, and troubleshooting.",
    "agency.services.consulting.title": "Strategic Consulting",
    "agency.services.consulting.desc": "Expert guidance on architecture decisions, security audits, and technology strategy.",

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
    "inquiry.type.webdev": "Web & Software",
    "inquiry.type.ai": "Branding & Print Design",
    "inquiry.type.automation": "IT & Tech Support",
    "inquiry.type.consulting": "Strategic Consulting",
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

    // About
    "about.title": "About Me",
    "about.subtitle": "Get to know me better",
    "about.agencyTitle": "Founder & Lead Engineer",
    "about.agencySubtitle": "The mind behind Tech-Noah Solutions",
    "about.years": "Years Experience",
    "about.valueProposition": "Passionate about bridging the gap between robust software engineering and defensive security.",
    "about.description1": 'I don\'t just build apps; I secure them.',
    "about.description2": "With 6+ years of enterprise IT, full-stack development, and a passion for design — I deliver holistic digital solutions for startups, local businesses, and individuals.",
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
    "skills.all": "All Technologies",
    "skills.active": "Active",

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
    "chat.welcome": "Hello! I'm Noah's AI assistant. Ask me about our services or how we can help your business!",
    "chat.send": "Send",

    // Testimonials
    "testimonials.title": "Client Testimonials",
    "testimonials.subtitle": "What our clients say about working with us",
    "testimonials.writeReview": "Write a Review",
    "testimonials.1.name": "Michael Schmidt",
    "testimonials.1.role": "IT Manager",
    "testimonials.1.company": "TechCorp GmbH",
    "testimonials.1.quote": "Noah's Full-Stack expertise and deep understanding of IT infrastructure made him invaluable. He delivered a robust web application while seamlessly integrating with our enterprise systems.",
    "testimonials.2.name": "Sarah Weber",
    "testimonials.2.role": "Lead Developer",
    "testimonials.2.company": "Digital Solutions AG",
    "testimonials.2.quote": "Exceptional problem-solving skills and reliable delivery. Noah consistently exceeded expectations, tackling complex challenges with both creativity and technical precision.",
    "testimonials.3.name": "Thomas Müller",
    "testimonials.3.role": "CTO",
    "testimonials.3.company": "StartupHub Berlin",
    "testimonials.3.quote": "His hackathon mentality combined with enterprise experience is rare. He built our MVP in record time without sacrificing code quality or security best practices.",

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
    "command.back": "Back",

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
    "styles.inquiryDesc": "Send us a project inquiry for:",

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

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über mich",
    "nav.services": "Leistungen",
    "nav.casestudies": "Fallstudien",
    "nav.experience": "Erfahrung",
    "nav.projects": "Projekte",
    "nav.skills": "Fähigkeiten",
    "nav.education": "Ausbildung",
    "nav.contact": "Kontakt",
    "nav.consult": "Angebot anfordern",

    // Hero
    "hero.badge": "IT · Web · Design — Alles aus einer Hand",
    "hero.greeting": "Ganzheitliche IT, Web &",
    "hero.name": "Design Lösungen",
    "hero.title": "Alles aus einer Hand für Startups & lokale Unternehmen in Frankfurt und remote.",
    "hero.subtitle": "Individuelle Websites, KI-Integration, Branding, Druckdesign & Full IT-Support — maßgeschneidert für Ihren Erfolg.",
    "hero.cta.contact": "Kontakt aufnehmen",
    "hero.cta.projects": "Projekte ansehen",
    "hero.cta.download": "Firmenprofil ansehen",
    "hero.cta.profile": "Firmenprofil ansehen",
    "hero.location": "Frankfurt, Deutschland",
    "hero.status": "Verfügbar für Projekte",

    // Services - 3 Pillars
    "services.title": "Leistungen",
    "services.subtitle": "Drei Säulen für Ihre digitale und physische Geschäftspräsenz",
    "services.learnMore": "Mehr erfahren",
    "services.web.title": "Web & Software",
    "services.web.desc": "Individuelle Websites, KI-gestützte Web-Apps und moderne Softwarelösungen — vom Konzept bis zum Launch.",
    "services.web.f1": "Individuelle Landing Pages & Websites",
    "services.web.f2": "KI-Integration (GPT, Automatisierung)",
    "services.web.f3": "Full-Stack Webanwendungen",
    "services.design.title": "Branding & Druckdesign",
    "services.design.desc": "Professionelle visuelle Identität für Ihr Unternehmen — von Visitenkarten bis Social-Media-Grafiken.",
    "services.design.f1": "Visitenkarten-Design",
    "services.design.f2": "Flyer & Social-Media-Grafiken",
    "services.design.f3": "Corporate Identity & Branding",
    "services.it.title": "IT & Tech-Support",
    "services.it.desc": "Zuverlässiger 1st & 2nd Level IT-Support für Privatpersonen und Büros — Hardware, Netzwerke und Fehlerbehebung.",
    "services.it.f1": "1st & 2nd Level IT-Support",
    "services.it.f2": "Hardware-Einrichtung (Drucker, Telefone, Netzwerke)",
    "services.it.f3": "Fehlerbehebung & Remote-Support",
    "services.web.details": "Ich baue komplette Webanwendungen vom Konzept bis zum Deployment, mit KI-Integration.",
    "services.design.details": "Professionelles Print- und Digital-Design für Ihre Markenidentität.",
    "services.it.details": "Umfassender IT-Support mit Enterprise-Level-Expertise für Privatpersonen und Büros.",
    "services.modal.techStack": "Technologie-Stack",
    "services.modal.keyFeatures": "Hauptfunktionen",
    "services.modal.cta": "Angebot anfordern",
    "services.modal.downloadCV": "Lebenslauf herunterladen",

    // Starter Kit
    "starterkit.badge": "Am beliebtesten",
    "starterkit.title": "Startup Starter-Kit",
    "starterkit.subtitle": "Starten Sie Ihr Business schnell — alles was Sie brauchen in einem Paket.",
    "starterkit.item1": "Individuelle Landing Page",
    "starterkit.item2": "Visitenkarten-Design",
    "starterkit.item3": "Social-Media-Flyer",
    "starterkit.item4": "Basis IT-Setup & Beratung",
    "starterkit.cta": "Angebot anfordern",
    "starterkit.note": "Individuelle Preisgestaltung nach Ihren Bedürfnissen",

    // Agency Services (Bento Grid) - updated
    "agency.services.title": "Unsere Leistungen",
    "agency.services.subtitle": "Drei Säulen für Ihre digitale und physische Geschäftspräsenz",
    "agency.services.webdev.title": "Web & Software",
    "agency.services.webdev.desc": "Individuelle Websites, KI-gestützte Web-Apps und moderne Softwarelösungen — vom Konzept bis zum Launch.",
    "agency.services.ai.title": "Branding & Druckdesign",
    "agency.services.ai.desc": "Professionelle visuelle Identität für Ihr Unternehmen — von Visitenkarten bis Social-Media-Grafiken und Corporate Identity.",
    "agency.services.automation.title": "IT & Tech-Support",
    "agency.services.automation.desc": "Zuverlässiger 1st & 2nd Level IT-Support für Privatpersonen und Büros — Hardware, Netzwerke und Fehlerbehebung.",
    "agency.services.consulting.title": "Strategische Beratung",
    "agency.services.consulting.desc": "Expertenberatung zu Architektur, Sicherheitsaudits und Technologiestrategie.",

    // About
    "about.title": "Über mich",
    "about.subtitle": "Lernen Sie mich kennen",
    "about.agencyTitle": "Gründer & Lead Engineer",
    "about.agencySubtitle": "Der Kopf hinter den Lösungen",
    "about.years": "Jahre Erfahrung",
    "about.valueProposition": "Leidenschaftlich daran, robuste Softwareentwicklung mit defensiver Security zu verbinden.",
    "about.description1": 'Ich baue nicht nur Apps; ich sichere sie ab.',
    "about.description2": "Mit 6+ Jahren Enterprise-IT, Full-Stack-Entwicklung und einer Leidenschaft für Design liefere ich ganzheitliche digitale Lösungen für Startups, lokale Unternehmen und Privatpersonen.",
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
    "inquiry.type.webdev": "Web & Software",
    "inquiry.type.ai": "Branding & Druckdesign",
    "inquiry.type.automation": "IT & Tech-Support",
    "inquiry.type.consulting": "Strategische Beratung",
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
    "skills.all": "Alle Technologien",
    "skills.active": "Aktiv",

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
    "chat.welcome": "Hallo! Ich bin Noahs KI-Assistent. Fragen Sie mich zu unseren Leistungen!",
    "chat.send": "Senden",

    // Testimonials
    "testimonials.title": "Kundenstimmen",
    "testimonials.subtitle": "Was unsere Kunden über die Zusammenarbeit sagen",
    "testimonials.writeReview": "Bewertung schreiben",
    "testimonials.1.name": "Michael Schmidt",
    "testimonials.1.role": "IT-Manager",
    "testimonials.1.company": "TechCorp GmbH",
    "testimonials.1.quote": "Noahs Full-Stack-Expertise und tiefes Verständnis der IT-Infrastruktur machten ihn unverzichtbar.",
    "testimonials.2.name": "Sarah Weber",
    "testimonials.2.role": "Lead Developer",
    "testimonials.2.company": "Digital Solutions AG",
    "testimonials.2.quote": "Außergewöhnliche Problemlösungsfähigkeiten und zuverlässige Lieferung. Noah übertraf konstant die Erwartungen.",
    "testimonials.3.name": "Thomas Müller",
    "testimonials.3.role": "CTO",
    "testimonials.3.company": "StartupHub Berlin",
    "testimonials.3.quote": "Seine Hackathon-Mentalität kombiniert mit Enterprise-Erfahrung ist selten. Er baute unser MVP in Rekordzeit.",

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
    "command.back": "Zurück",

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
    "styles.inquiryDesc": "Senden Sie mir eine Projektanfrage für:",

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

    // Common
    "common.loading": "Lädt...",
    "common.error": "Ein Fehler ist aufgetreten",
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
