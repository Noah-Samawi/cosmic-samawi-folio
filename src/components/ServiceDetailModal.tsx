import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ElementType;
    titleKey: string;
    descKey: string;
    detailsKey: string;
    techStack: string[];
    features: string[];
  } | null;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const { t } = useLanguage();

  if (!service) return null;

  const Icon = service.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glass-card border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <DialogTitle className="font-display text-2xl font-bold gradient-text">
              {t(service.titleKey)}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-base leading-relaxed">
            {t(service.detailsKey)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              {t('services.modal.techStack')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              {t('services.modal.keyFeatures')}
            </h4>
            <ul className="space-y-2">
              {service.features.map((featureKey, index) => (
                <motion.li
                  key={featureKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-2 text-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {t(featureKey)}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border/50">
            <Button
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {t('services.modal.cta')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
