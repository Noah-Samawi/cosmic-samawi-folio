import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Building2, ShoppingCart, Palette, Zap, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DesignGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DesignStyle {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  colors: string[];
  preview: string;
}

const DesignGallery: React.FC<DesignGalleryProps> = ({ isOpen, onClose }) => {
  const { t, direction } = useLanguage();
  const { toast } = useToast();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const designStyles: DesignStyle[] = [
    {
      id: 'minimalist',
      icon: Sparkles,
      titleKey: 'gallery.minimalist',
      descKey: 'gallery.minimalist.desc',
      colors: ['#ffffff', '#f5f5f5', '#1a1a1a', '#666666'],
      preview: 'bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800',
    },
    {
      id: 'cosmic',
      icon: Zap,
      titleKey: 'gallery.cosmic',
      descKey: 'gallery.cosmic.desc',
      colors: ['#0b1120', '#06b6d4', '#8b5cf6', '#22d3ee'],
      preview: 'bg-gradient-to-br from-[#0b1120] via-[#1e1b4b] to-[#0b1120]',
    },
    {
      id: 'corporate',
      icon: Building2,
      titleKey: 'gallery.corporate',
      descKey: 'gallery.corporate.desc',
      colors: ['#1e3a5f', '#ffffff', '#4a90d9', '#2c5282'],
      preview: 'bg-gradient-to-br from-[#1e3a5f] to-[#2c5282]',
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      titleKey: 'gallery.ecommerce',
      descKey: 'gallery.ecommerce.desc',
      colors: ['#f97316', '#fbbf24', '#ffffff', '#1a1a1a'],
      preview: 'bg-gradient-to-br from-orange-500 to-amber-400',
    },
    {
      id: 'creative',
      icon: Palette,
      titleKey: 'gallery.creative',
      descKey: 'gallery.creative.desc',
      colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#fbbf24'],
      preview: 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500',
    },
  ];

  const handleSelectStyle = (styleId: string) => {
    setSelectedStyle(styleId);
    const style = designStyles.find(s => s.id === styleId);
    if (style) {
      toast({
        title: `${t(style.titleKey)} selected!`,
        description: "I'll contact you to discuss this style for your project.",
      });
      // Scroll to contact after a short delay
      setTimeout(() => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 z-50 overflow-auto"
            dir={direction}
          >
            <div className="min-h-full flex items-start justify-center py-8">
              <div className="relative w-full max-w-5xl rounded-2xl glass-card border border-primary/20 shadow-2xl p-6 md:p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors z-10"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                    <span className="gradient-text">{t('gallery.title')}</span>
                  </h2>
                  <p className="text-muted-foreground">{t('gallery.subtitle')}</p>
                </div>

                {/* Design Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designStyles.map((style, index) => {
                    const Icon = style.icon;
                    const isSelected = selectedStyle === style.id;
                    
                    return (
                      <motion.div
                        key={style.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                          isSelected 
                            ? 'border-primary ring-2 ring-primary/50' 
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                        onClick={() => handleSelectStyle(style.id)}
                      >
                        {/* Preview area */}
                        <div className={`h-32 ${style.preview} relative`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                            >
                              <Check className="w-5 h-5 text-primary-foreground" />
                            </motion.div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="w-12 h-12 text-white/80 drop-shadow-lg" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 bg-card/50">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {t(style.titleKey)}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t(style.descKey)}
                          </p>

                          {/* Color swatches */}
                          <div className="flex gap-1">
                            {style.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border border-border/50"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={onClose}>
                    {t('command.close')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DesignGallery;
