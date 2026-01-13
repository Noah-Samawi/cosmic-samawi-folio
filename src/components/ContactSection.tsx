import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send, User, MessageSquare, Loader2, MapPin, Linkedin, Github } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().max(200, { message: "Subject must be less than 200 characters" }).optional(),
  message: z.string().trim().min(1, { message: "Message is required" }).max(2000, { message: "Message must be less than 2000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const content = {
    en: {
      title: "Get In Touch",
      subtitle: "Have a project in mind? Let's discuss how we can work together.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      subjectPlaceholder: "Subject (Optional)",
      messagePlaceholder: "Your Message...",
      sendButton: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for reaching out. I'll get back to you soon.",
      errorTitle: "Error",
      errorMessage: "Failed to send message. Please try again.",
      location: "Frankfurt, Germany",
      email: "nooh.alsamawi@gmail.com",
      contactInfo: "Contact Information",
      followMe: "Follow Me"
    },
    de: {
      title: "Kontakt aufnehmen",
      subtitle: "Haben Sie ein Projekt im Sinn? Lassen Sie uns besprechen, wie wir zusammenarbeiten können.",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre E-Mail",
      subjectPlaceholder: "Betreff (Optional)",
      messagePlaceholder: "Ihre Nachricht...",
      sendButton: "Nachricht senden",
      sending: "Wird gesendet...",
      successTitle: "Nachricht gesendet!",
      successMessage: "Vielen Dank für Ihre Nachricht. Ich werde mich bald bei Ihnen melden.",
      errorTitle: "Fehler",
      errorMessage: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      location: "Frankfurt, Deutschland",
      email: "nooh.alsamawi@gmail.com",
      contactInfo: "Kontaktinformationen",
      followMe: "Folgen Sie mir"
    }
  };

  const t = content[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data
      });

      if (error) throw error;

      toast({
        title: t.successTitle,
        description: t.successMessage,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t.errorTitle,
        description: t.errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, text: t.location },
    { icon: Mail, text: t.email, href: `mailto:${t.email}` },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/noah-alsamawi", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/noah-alsamawi", label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className="pl-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className="pl-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  className="pl-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  className="bg-card/50 border-border/50 focus:border-primary resize-none"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    {t.sendButton}
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {t.contactInfo}
              </h3>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    {info.href ? (
                      <a href={info.href} className="text-foreground hover:text-primary transition-colors">
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-foreground">{info.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border/30 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  {t.followMe}
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
