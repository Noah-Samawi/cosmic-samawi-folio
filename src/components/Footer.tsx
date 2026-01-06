import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/noahalsamawi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/noahalsamawi', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@noahalsamawi.dev', label: 'Email' },
  ];

  return (
    <footer id="contact" className="relative py-16 border-t border-border/50">
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
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:bg-primary/10 transition-all group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
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
