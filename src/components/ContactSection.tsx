import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ArrowRight,
  ShieldCheck,
  User,
  Tag,
  MessageSquare,
  Send,
  Loader2,
  Instagram,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const contactItems = [
  { icon: Phone, label: '+49 152 1515 8667', href: 'tel:+4915215158667' },
  { icon: Mail, label: 'kontakt@noahsamawi.de', href: 'mailto:kontakt@noahsamawi.de' },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/noah-al-samawi',
    href: 'https://www.linkedin.com/in/noah-al-samawi-058583197/',
    external: true,
  },
  { icon: MapPin, label: 'Frankfurt am Main, Deutschland', href: null as string | null },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/noah-al-samawi-058583197/',
  },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Noah-Samawi' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/noavio_it_solutions/' },
];

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (website.trim() !== '') {
      // Silent reject
      return;
    }

    if (!consent) {
      setConsentError(true);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, subject: subject || undefined, message },
      });
      if (error) throw error;

      toast({
        title: t('contact.success'),
        description: t('contact.successBody'),
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setConsent(false);
    } catch (err) {
      toast({
        title: t('common.error'),
        description: t('contact.errorBody'),
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-t border-cyan-500/10 bg-slate-900/40"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: heading + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium mb-3">
              {t('contact.eyebrow')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
              {t('contact.title')}
            </h2>
            <p className="text-base text-slate-400 leading-relaxed text-balance mb-8">
              {t('contact.sub')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot — visually hidden */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Name */}
              <div className="relative">
                <User className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  type="text"
                  required
                  placeholder={t('contact.name')} aria-label={t('contact.name')} dir="auto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full h-12 ps-11 pe-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  type="email"
                  required
                  placeholder={t('contact.email')} aria-label={t('contact.email')} dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="w-full h-12 ps-11 pe-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="relative">
                <Tag className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  type="text"
                  placeholder={t('contact.subject')} aria-label={t('contact.subject')} dir="auto"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={150}
                  className="w-full h-12 ps-11 pe-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute start-3.5 top-4 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <textarea
                  required
                  rows={5}
                  placeholder={t('contact.message')} aria-label={t('contact.message')} dir="auto"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  className="w-full ps-11 pe-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors resize-none"
                />
              </div>

              {/* DSGVO consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-400/40 focus:ring-offset-0 cursor-pointer accent-cyan-500"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    {t('contact.consentBefore')}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                    >
                      {t('legal.privacy')}
                    </a>
                    {t('contact.consentAfter')}
                  </span>
                </label>
                {consentError && (
                  <p className="mt-2 text-xs text-red-400" role="alert">
                    {t('contact.consentError')}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all duration-150 hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {submitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </motion.div>

          {/* Right: Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-7 md:p-8 backdrop-blur-sm h-fit"
          >
            <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-medium mb-6">
              {t('contact.direct')}
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-3 text-slate-300 group-hover:text-cyan-300 transition-colors duration-150">
                    <span className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 transition-colors">
                      <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    </span>
                    <bdi className="text-[15px] break-all" dir={item.href ? "ltr" : undefined}>{item.href ? item.label : t("contact.location")}</bdi>
                  </span>
                );
                return (
                  <li key={i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={(item as any).external ? '_blank' : undefined}
                        rel={(item as any).external ? 'noopener noreferrer' : undefined}
                        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Social row */}
            <div className="mt-7 pt-6 border-t border-slate-800">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium mb-4">
                {t('contact.social')}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-slate-900/60 border border-cyan-500/20 flex items-center justify-center text-cyan-300 hover:border-cyan-400/60 hover:bg-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('contact.languages')}: <span className="text-slate-400 font-medium">Deutsch · English · العربية</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
