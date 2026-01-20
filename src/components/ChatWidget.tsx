import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Bot, Rocket, Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  action: string;
}

const ChatWidget: React.FC = () => {
  const { t, direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { icon: Rocket, label: 'View Projects 🚀', action: 'projects' },
    { icon: Shield, label: 'Security Skills 🛡️', action: 'security' },
    { icon: Mail, label: 'Contact Noah ✉️', action: 'contact' },
  ];

  // Multilingual welcome message
  const getWelcomeMessage = () => {
    return `👋 **مرحباً | Hallo | Hello!**

I'm **Noah Intelligence**, your AI guide to Noah Al-Samawi's portfolio.

Noah is a **Full-Stack Engineer based in Frankfurt, Germany**.

🇬🇧 I can help you explore his expertise in full-stack development and cybersecurity.
🇩🇪 Ich kann Ihnen Noahs Fachwissen zeigen.
🇸🇦 يمكنني مساعدتك في استكشاف خبرات نوح.

🌐 Website: **noahsamawi.de**
📧 Email: **kontakt@noahsamawi.de**

**What would you like to know?**`;
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: getWelcomeMessage(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickAction = (action: string) => {
    setShowQuickActions(false);
    let response = '';

    switch (action) {
      case 'projects':
        response = `🚀 **Noah's Projects & Full-Stack Background**

Noah is a **Full-Stack Developer** with expertise bridging enterprise IT and modern web development.

**Featured Projects:**
• **VistaSphere** - Modern React app with advanced UI patterns
• **Web Application Security** - Django project with OWASP best practices
• **TechForHer** - Platform empowering women in tech
• **Chain Breaker** - Habit tracking application

**Tech Stack:**
• Frontend: React, TypeScript, Tailwind CSS
• Backend: Django, Python, PostgreSQL
• DevOps: Docker, AWS, Git

Would you like to learn about his security expertise or get in touch?`;
        break;
      case 'security':
        response = `🛡️ **Noah's Security & Enterprise IT Expertise**

With **6+ years at CBRE** supporting DXC/Dell, Noah brings enterprise-grade security knowledge:

**Security Skills:**
• OWASP security best practices
• Secure authentication systems
• Vulnerability assessment & prevention
• Network security configuration

**Enterprise IT Experience:**
• Active Directory management
• Windows Server administration
• ServiceNow incident management
• VPN & network security

His project **"Web Application Security"** showcases these skills with practical security implementations.

Would you like to see his projects or contact him?`;
        break;
      case 'contact':
        response = `✉️ **Get in Touch with Noah**

Noah Al-Samawi is a Full-Stack Engineer based in Frankfurt, Germany, available for development and cybersecurity opportunities.

**Contact Information:**
🌐 Website: **noahsamawi.de**
📧 Email: **kontakt@noahsamawi.de**
💼 LinkedIn: [Noah Al-Samawi](https://www.linkedin.com/in/noah-al-samawi-058583197/)
🔗 GitHub: [Noah-Samawi](https://github.com/Noah-Samawi)
🌐 XING: [Noah Al-Samawi](https://www.xing.com/profile/Noah_AlSamawi)

📍 Based in **Frankfurt, Germany**

Feel free to reach out for collaborations, job opportunities, or just to connect!`;
        break;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: quickActions.find(a => a.action === action)?.label || action,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowQuickActions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Smart response based on input
    setTimeout(() => {
      const query = input.toLowerCase();
      let response = '';

      if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
        response = `Noah has built several impressive projects:\n\n• **VistaSphere** - React/TypeScript frontend application\n• **Web Application Security** - Security-focused Django project\n• **TechForHer** - Women in tech platform\n• **Chain Breaker** - Habit tracking app\n\nAll projects are available on his GitHub!`;
      } else if (query.includes('security') || query.includes('cyber') || query.includes('protect')) {
        response = `🛡️ Noah is passionate about cybersecurity! He has 6+ years of enterprise IT experience and specializes in:\n\n• OWASP security practices\n• Secure authentication systems\n• Network security & Active Directory\n• Vulnerability prevention\n\nCheck out his security-focused project on GitHub!`;
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
        response = `📧 You can reach Noah at:\n\n**Website:** noahsamawi.de\n**Email:** kontakt@noahsamawi.de\n**LinkedIn:** linkedin.com/in/noah-al-samawi-058583197\n**GitHub:** github.com/Noah-Samawi\n\nHe's a Full-Stack Engineer based in Frankfurt, Germany and open to opportunities!`;
      } else if (query.includes('skill') || query.includes('tech') || query.includes('language')) {
        response = `Noah's technical arsenal:\n\n**Languages:** Python, JavaScript, TypeScript, SQL\n**Frontend:** React, Tailwind CSS, Bootstrap\n**Backend:** Django, Django REST Framework\n**Systems:** Linux, Windows Server, Docker, AWS\n**Security:** Active Directory, OWASP, Network Security`;
      } else if (query.includes('experience') || query.includes('job') || query.includes('cbre')) {
        response = `Noah has 6+ years of enterprise IT experience at CBRE (supporting DXC/Dell), where he:\n\n• Managed Active Directory for large organizations\n• Handled ServiceNow incident resolution\n• Administered Windows Server environments\n• Configured network security & VPNs\n\nHe's since transitioned to full-stack development!`;
      } else {
        response = `Thanks for your question! Noah is a Full-Stack Developer based in Frankfurt with:\n\n• 6+ years enterprise IT at CBRE\n• Full-Stack skills (React, Django)\n• Passion for cybersecurity\n• Code Institute Diploma (2024)\n\nUse the quick actions below or ask about projects, skills, or contact info! 🚀`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
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
            {/* Header - Noah Intelligence branding */}
            <div className="p-4 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">
                      Noah Intelligence
                    </h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online • AI Assistant
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
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
                  <div
                    className={`shrink-0 p-2 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-primary/20'
                        : 'bg-gradient-to-br from-primary/20 to-accent/20'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
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
                  placeholder="Ask me anything about Noah..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm border border-border/50"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="gradient"
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 rounded-xl"
                >
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
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
