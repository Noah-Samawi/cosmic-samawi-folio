import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Mail, Calendar, FileText, Code2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { icon: FileText, label: '📄 CV Herunterladen', action: 'cv' },
  { icon: Code2, label: '💻 Tech-Stack', action: 'techstack' },
  { icon: Bot, label: '🤖 KI & Automatisierung', action: 'ai' },
  { icon: Calendar, label: '📅 Call buchen', action: 'book' },
  { icon: Mail, label: '✉️ Kontakt', action: 'contact' },
];

const responses: Record<string, string> = {
  cv: `📄 **Lebenslauf herunterladen**

Sie können meinen vollständigen Lebenslauf direkt hier öffnen:

👉 [**CV als PDF öffnen**](/noah-al-samawi-cv.pdf)

Alternativ finden Sie den Download-Button auch im Hero-Bereich ganz oben auf der Seite.`,

  techstack: `💻 **Mein Tech-Stack**

Meine Kerntechnologien — darunter **React, Node.js, Python, Supabase und OpenAI** — finden Sie übersichtlich im interaktiven **Terminal-Fenster** direkt oben auf der Startseite.

Dort sehen Sie auch meine Schwerpunkte: skalierbare KI-Systeme und die Automatisierung von Geschäftslogik.

Suchen Sie nach einer bestimmten Technologie? Fragen Sie gerne!`,

  ai: `🤖 **KI & Automatisierung**

Ich bin spezialisiert auf die Automatisierung von Geschäftsprozessen mit modernster KI. Werfen Sie gerne einen Blick auf die Sektion **„Live AI & Tech Radar"** weiter unten, um zu sehen, wie ich Tools wie **OpenAI, LangChain und moderne Datenbanken** verknüpfe.

Mein Ansatz:
**1. Analyse** → Verstehen Ihrer Prozesse & Engpässe
**2. Strategie** → Auswahl der richtigen KI-Tools
**3. Entwicklung** → Agile Umsetzung mit Live-Previews
**4. Launch** → Deployment & kontinuierliche Optimierung

Möchten Sie mehr über ein konkretes Automatisierungsprojekt erfahren?`,

  book: `📅 **Termin vereinbaren**

Lassen Sie uns in einem 30-minütigen Erstgespräch Ihre Anforderungen besprechen — selbstverständlich kostenlos.

📧 Schreiben Sie mir direkt: **kontakt@noahsamawi.de**

Antwortzeit: **< 4 Stunden** ⚡`,

  contact: `✉️ **Kontaktdaten**

📧 E-Mail: **kontakt@noahsamawi.de**
🌐 Website: **noahsamawi.de**
💼 LinkedIn: Noah Al-Samawi
📍 Frankfurt am Main, Deutschland

Antwortzeit: **< 4 Stunden** ⚡`,
};

const getKeywordResponse = (query: string): string | null => {
  const q = query.toLowerCase();
  if (q.includes('tech') || q.includes('stack') || q.includes('skill') || q.includes('sprach') || q.includes('react') || q.includes('python') || q.includes('programm')) {
    return responses.techstack;
  }
  if (q.includes('ki') || q.includes('ai') || q.includes('automat') || q.includes('openai') || q.includes('gpt') || q.includes('prozess') || q.includes('workflow')) {
    return responses.ai;
  }
  if (q.includes('cv') || q.includes('lebenslauf') || q.includes('resume') || q.includes('download')) {
    return responses.cv;
  }
  if (q.includes('preis') || q.includes('kosten') || q.includes('budget') || q.includes('price') || q.includes('cost')) {
    return `💰 **Preisgestaltung**\n\nMeine Preise richten sich nach der Komplexität des Projekts. Jedes Projekt beginnt mit einem **kostenlosen Erstgespräch**.\n\nNutzen Sie den **„Call buchen"**-Button, um einen Termin zu vereinbaren!`;
  }
  if (q.includes('projekt') || q.includes('portfolio') || q.includes('arbeit') || q.includes('referenz')) {
    return `🚀 **Projekte**\n\nScrollen Sie zur Sektion **„Featured Projects"** weiter unten, um meine aktuellen Arbeiten zu sehen — darunter KI-gestützte Customer Intelligence Suites, SaaS-Dashboards und Workflow-Automatisierungen.\n\nJede Karte zeigt den verwendeten Tech-Stack und Links zu GitHub.`;
  }
  if (q.includes('kontakt') || q.includes('email') || q.includes('contact') || q.includes('reach') || q.includes('mail')) {
    return responses.contact;
  }
  return null;
};

const ChatWidget: React.FC = () => {
  const { direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `👋 **Willkommen! Ich bin Noahs KI-Assistent.**

Ich helfe Ihnen gerne dabei, mehr über **Noah Al-Samawi** zu erfahren — B.Sc. Computer Science, Full-Stack Engineer & KI-Spezialist aus Frankfurt.

💡 Nutzen Sie die Schnellaktionen unten oder stellen Sie mir direkt eine Frage!

**Wie kann ich Ihnen weiterhelfen?**`
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addResponse = (userLabel: string, response: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userLabel };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setShowQuickActions(false);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsLoading(false);
      setShowQuickActions(true);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'cv') {
      window.open('/noah-al-samawi-cv.pdf', '_blank');
      addResponse('📄 CV Herunterladen', responses.cv);
      return;
    }
    const label = quickActions.find(a => a.action === action)?.label || action;
    addResponse(label, responses[action]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');
    setIsLoading(true);
    setShowQuickActions(false);

    setTimeout(() => {
      const response = getKeywordResponse(query) ||
        `Vielen Dank für Ihre Frage! Ich kann Ihnen weiterhelfen bei:\n\n• **💻 Tech-Stack** — Meine Technologien im Terminal-Fenster\n• **🤖 KI & Automatisierung** — Mein Arbeitsprozess\n• **📄 CV** — Lebenslauf herunterladen\n• **📅 Termin** — Discovery Call buchen\n\nNutzen Sie die Schnellaktionen unten oder formulieren Sie Ihre Frage um! 🚀`;
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsLoading(false);
      setShowQuickActions(true);
    }, 1000);
  };

  return (
    <div className={`chat-widget ${direction === 'rtl' ? 'left-6 right-auto' : 'right-6 left-auto'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card"
            style={{ [direction === 'rtl' ? 'left' : 'right']: 0 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary-foreground text-lg">Noah's KI-Assistent</h3>
                    <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online • Frankfurt, DE
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-white/20 rounded-xl">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-custom bg-background">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 p-2 rounded-xl ${msg.role === 'user' ? 'bg-primary/20' : 'bg-gradient-to-br from-primary/20 to-accent/20'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-primary" /> : <Sparkles className="h-4 w-4 text-primary" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {showQuickActions && !isLoading && (
              <div className="px-4 py-3 border-t border-border/50 bg-muted/30">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map(({ icon: Icon, label, action }) => (
                    <motion.button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Fragen Sie mich zu Tech-Stack, KI oder Projekten..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm border border-border/50"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" variant="gradient" disabled={!input.trim() || isLoading} className="shrink-0 rounded-xl">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-2xl bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { rotate: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.5, repeat: !isOpen ? Infinity : 0, repeatDelay: 4 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
