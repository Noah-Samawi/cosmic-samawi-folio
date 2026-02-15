import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send, User, MessageSquare, Loader2, Linkedin, Github, Instagram } from 'lucide-react';
import { z } from 'zod';
import SuccessConfetti from './SuccessConfetti';
import CosmicMap from './CosmicMap';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().max(200, { message: "Subject must be less than 200 characters" }).optional(),
  message: z.string().trim().min(1, { message: "Message is required" }).max(2000, { message: "Message must be less than 2000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const { language, t, direction } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      email: "kontakt@noahsamawi.de",
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
      email: "kontakt@noahsamawi.de",
      contactInfo: "Kontaktinformationen",
      followMe: "Folgen Sie mir"
    },
    ar: {
      title: "تواصل معي",
      subtitle: "هل لديك مشروع في ذهنك؟ لنناقش كيف يمكننا العمل معاً.",
      namePlaceholder: "اسمك",
      emailPlaceholder: "بريدك الإلكتروني",
      subjectPlaceholder: "الموضوع (اختياري)",
      messagePlaceholder: "رسالتك...",
      sendButton: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      successTitle: "تم إرسال الرسالة!",
      successMessage: "شكراً لتواصلك. سأرد عليك قريباً.",
      errorTitle: "خطأ",
      errorMessage: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      location: "فرانكفورت، ألمانيا",
      email: "kontakt@noahsamawi.de",
      contactInfo: "معلومات الاتصال",
      followMe: "تابعني"
    }
  };

  const currentContent = content[language] || content.en;

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

      setShowSuccess(true);
      
      toast({
        title: currentContent.successTitle,
        description: currentContent.successMessage,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: currentContent.errorTitle,
        description: currentContent.errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/noah-al-samawi-058583197/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Noah-Samawi", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/noahsamawi.dev", label: "Instagram" },
  ];

  return (
    <>
      <SuccessConfetti show={showSuccess} onComplete={() => setShowSuccess(false)} />
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="contact-heading" dir={direction}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            {currentContent.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-muted-foreground rtl:left-auto rtl:right-3" aria-hidden="true" />
                <Input
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={currentContent.namePlaceholder}
                  aria-label={currentContent.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="pl-10 rtl:pl-3 rtl:pr-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.name && <p id="name-error" className="text-destructive text-sm mt-1" role="alert">{errors.name}</p>}
              </div>

              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground rtl:left-auto rtl:right-3" aria-hidden="true" />
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={currentContent.emailPlaceholder}
                  aria-label={currentContent.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="pl-10 rtl:pl-3 rtl:pr-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.email && <p id="email-error" className="text-destructive text-sm mt-1" role="alert">{errors.email}</p>}
              </div>

              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={currentContent.subjectPlaceholder}
                  className="pl-10 rtl:pl-3 rtl:pr-10 bg-card/50 border-border/50 focus:border-primary h-12"
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={currentContent.messagePlaceholder}
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
                    <Loader2 className="h-5 w-5 animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                    {currentContent.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {currentContent.sendButton}
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info with Cosmic Map */}
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Cosmic Map */}
            <CosmicMap />

            {/* Contact Card */}
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                {currentContent.contactInfo}
              </h3>
              
              <div className="space-y-3 mb-6">
                <a 
                  href={`mailto:${currentContent.email}`} 
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  {currentContent.email}
                </a>
              </div>

              <div className="border-t border-border/30 pt-4">
                <h4 className="text-sm font-semibold mb-3 text-foreground">
                  {currentContent.followMe}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <social.icon className="h-4 w-4 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section>
    </>
  );
};

export default ContactSection;
