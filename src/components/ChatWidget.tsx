import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Rocket, Shield, Mail, HelpCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const { direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showCalendly, setShowCalendly] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: HelpCircle, label: 'Preise?', action: 'pricing' },
    { icon: Rocket, label: 'Wie arbeiten wir?', action: 'how' },
    { icon: Calendar, label: 'Call buchen', action: 'book' },
    { icon: Shield, label: 'Projekte', action: 'projects' },
    { icon: Mail, label: 'Kontakt', action: 'contact' },
  ];

  const getWelcomeMessage = () => {
    return `👋 **Willkommen! Ich bin Noahs KI-Assistent.**

Ich helfe Ihnen gerne dabei, mehr über **Noah Al-Samawi** zu erfahren — Computer Engineer & Full-Stack Developer aus Frankfurt.

💡 Fragen Sie mich zu Projekten, meinem Arbeitsprozess oder vereinbaren Sie direkt einen Call.

**Wie kann ich Ihnen weiterhelfen?**`;
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: getWelcomeMessage() }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addResponse = (userLabel: string, response: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userLabel };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    setShowQuickActions(false);

    const responses: Record<string, string> = {
      pricing: `💰 **Preisgestaltung**

Meine Preise richten sich nach der Komplexität des Projekts. Egal ob MVP oder Enterprise-System – lassen Sie uns Ihre Anforderungen in einem kurzen Call besprechen.

Jedes Projekt beginnt mit einem **kostenlosen Erstgespräch**, in dem wir den Umfang und das Budget gemeinsam definieren.

📧 Kontakt: **kontakt@noahsamawi.de**`,
      how: `⚙️ **So arbeite ich:**

**1. Discovery Call (Analyse)** → Verstehen Ihrer Ziele & Herausforderungen.
**2. Architektur & Strategie** → Detaillierter Scope, Zeitplan und Technologieauswahl.
**3. Agile Entwicklung** → Wöchentliche Sprints mit Live-Previews und transparenter Kommunikation.
**4. Launch & Skalierung** → Deployment, Dokumentation und laufende Optimierung.

⏱ Durchschnittliche Lieferzeit: **2–8 Wochen** je nach Umfang.
🔒 Der gesamte Code gehört Ihnen. Vollständiger IP-Transfer nach Abschluss.`,
      book: `📅 **Termin vereinbaren**

Klicken Sie unten, um ein 30-minütiges Erstgespräch mit Noah zu vereinbaren.`,
      projects: `🚀 **Ausgewählte Projekte:**

• **KI Customer Intelligence Suite** — GPT-4o, Node.js, WhatsApp API → 85% schnellere Antwortzeit.
• **Smart SaaS Finanz-Dashboard** — Next.js, Supabase, Recharts → 10+ Std./Woche eingespart.
• **Zero-Touch Workflow-Automatisierung** — n8n, Make.com, Python → 0% menschliche Fehler.

Scrollen Sie zu den **Fallstudien** für weitere Details!`,
      contact: `✉️ **Kontakt:**

📧 E-Mail: **kontakt@noahsamawi.de**
🌐 Website: **noahsamawi.de**
💼 LinkedIn: Noah Al-Samawi
📍 Frankfurt am Main, Deutschland

Antwortzeit: **< 4 Stunden** ⚡`,
    };

    const label = quickActions.find(a => a.action === action)?.label || action;
    
    if (action === 'book') {
      addResponse(label, responses[action]);
      setTimeout(() => setShowCalendly(true), 1200);
    } else {
      addResponse(label, responses[action]);
    }

    setTimeout(() => setShowQuickActions(true), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowQuickActions(false);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let response = '';
      if (query.includes('preis') || query.includes('kosten') || query.includes('budget') || query.includes('price') || query.includes('cost')) {
        response = `Meine Preise richten sich nach der Komplexität des Projekts. Lassen Sie uns Ihre Anforderungen in einem kurzen Call besprechen.\n\nNutzen Sie den **„Call buchen"**-Button!`;
      } else if (query.includes('projekt') || query.includes('arbeit') || query.includes('portfolio') || query.includes('project') || query.includes('work')) {
        response = `Ich habe KI-gestützte Customer Intelligence Suites, SaaS-Dashboards und Zero-Touch-Automatisierungssysteme entwickelt. Schauen Sie sich die **Fallstudien**-Sektion an!`;
      } else if (query.includes('kontakt') || query.includes('email') || query.includes('contact') || query.includes('reach')) {
        response = `📧 **kontakt@noahsamawi.de**\n📍 Frankfurt am Main, Deutschland\n💼 LinkedIn: Noah Al-Samawi\n\nAntwortzeit: < 4 Stunden ⚡`;
      } else {
        response = `Vielen Dank für Ihre Frage! Ich kann Ihnen weiterhelfen bei:\n\n• **Preise** — Projektbasierte Kalkulation\n• **Prozess** — Mein Arbeitsprozess\n• **Termin** — Discovery Call buchen\n\nNutzen Sie die Schnellaktionen unten oder stellen Sie Ihre Frage! 🚀`;
      }
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

              {/* Calendly / Book a Call */}
              {showCalendly && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 rounded-xl border border-primary/30">
                  <div className="text-center space-y-3">
                    <Calendar className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-sm font-semibold text-foreground">Discovery Call vereinbaren</p>
                    <p className="text-xs text-muted-foreground">30 Minuten mit Noah Al-Samawi</p>
                    <a
                      href="mailto:kontakt@noahsamawi.de?subject=Terminanfrage%3A%20Tech-Consulting"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Termin anfragen
                    </a>
                    <p className="text-[10px] text-muted-foreground">Calendly-Integration in Kürze verfügbar</p>
                  </div>
                </motion.div>
              )}

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
                      <Icon className="h-3.5 w-3.5" />
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
                  placeholder="Fragen Sie mich zu Projekten, Prozessen oder Terminen..."
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
        onClick={() => { setIsOpen(!isOpen); setShowCalendly(false); }}
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
