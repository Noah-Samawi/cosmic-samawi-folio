import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

// XING SVG Icon
const XingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.026c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.041z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, direction } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number>(0);

  // Increment and fetch visitor count (with session deduplication)
  useEffect(() => {
    const trackVisitor = async () => {
      const sessionKey = 'visitor_counted';
      const alreadyCounted = sessionStorage.getItem(sessionKey);

      if (!alreadyCounted) {
        // First visit this session - increment count
        const { data, error } = await supabase.rpc('increment_visitor_count');
        
        if (!error && data) {
          setVisitorCount(data);
          sessionStorage.setItem(sessionKey, 'true');
        }
      } else {
        // Already counted - just fetch current count
        const { data, error } = await supabase
          .from('visitor_stats')
          .select('visitor_count')
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          setVisitorCount(data.visitor_count);
        }
      }
    };

    trackVisitor();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Noah-Samawi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/noah-al-samawi-058583197/', label: 'LinkedIn' },
    { icon: XingIcon, href: 'https://www.xing.com/profile/Noah_AlSamawi', label: 'XING', isCustom: true },
    { icon: Mail, href: 'mailto:kontakt@noahsamawi.de', label: 'Email' },
  ];

  return (
    <footer id="contact" className="relative py-16 border-t border-border/50" dir={direction}>
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a href="#home" className="inline-block">
              <span className="font-display text-3xl font-bold gradient-text">
                Noah<span className="text-foreground">.</span>
              </span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 mb-8"
          >
            {socialLinks.map(({ icon: Icon, href, label, isCustom }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:bg-primary/10 transition-all group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                {isCustom ? (
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    <Icon />
                  </span>
                ) : (
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Visitor Counter */}
          {visitorCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">
                  {t('footer.visitors')}: <span className="font-semibold text-primary">{formatNumber(visitorCount)}</span>
                </span>
              </div>
            </motion.div>
          )}

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex justify-center gap-6 mb-6"
          >
            <a href="/impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Datenschutz
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-1">
              © {currentYear} Noah Al-Samawi. {t('footer.rights')}
            </p>
            <p className="mt-2 flex items-center justify-center gap-1 text-xs">
              Built with <Heart className="h-3 w-3 text-destructive fill-destructive" /> using React & TypeScript
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
