import { motion } from 'framer-motion';
import { Zap, LockKeyhole, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  { key: 'direct', icon: Zap },
  { key: 'secure', icon: LockKeyhole },
  { key: 'local', icon: MapPin },
];

const WhyNoavioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="why-noavio" aria-labelledby="why-noavio-title" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs uppercase text-primary font-medium mb-3">{t('why.eyebrow')}</p>
          <h2 id="why-noavio-title" className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-4">
            {t('why.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('why.sub')}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ key, icon: Icon }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-lg border border-border bg-card p-6 md:p-8 transition-colors hover:border-primary"
            >
              <Icon className="h-8 w-8 text-primary mb-5" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-bold text-foreground mb-3">{t(`why.${key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`why.${key}.body`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNoavioSection;