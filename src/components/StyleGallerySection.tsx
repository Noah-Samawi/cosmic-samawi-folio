import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Sparkles, Building2, ShoppingCart, Palette, Zap, Check, Eye, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DesignStyle {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  colors: string[];
  preview: string;
  gradient: string;
  englishName: string;
}

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onSelect: () => void;
}> = ({ children, className, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
    >
      {children}
    </motion.div>
  );
};

const StyleGallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const designStyles: DesignStyle[] = [
    {
      id: 'minimalist',
      icon: Sparkles,
      titleKey: 'gallery.minimalist',
      descKey: 'gallery.minimalist.desc',
      colors: ['#ffffff', '#f5f5f5', '#1a1a1a', '#666666'],
      preview: 'bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800',
      gradient: 'from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900',
      englishName: 'Minimalist',
    },
    {
      id: 'corporate',
      icon: Building2,
      titleKey: 'gallery.corporate',
      descKey: 'gallery.corporate.desc',
      colors: ['#1e3a5f', '#ffffff', '#4a90d9', '#2c5282'],
      preview: 'bg-gradient-to-br from-[#1e3a5f] to-[#2c5282]',
      gradient: 'from-blue-800 to-blue-950',
      englishName: 'Corporate/Trust',
    },
    {
      id: 'cosmic',
      icon: Zap,
      titleKey: 'gallery.cosmic',
      descKey: 'gallery.cosmic.desc',
      colors: ['#0b1120', '#06b6d4', '#8b5cf6', '#22d3ee'],
      preview: 'bg-gradient-to-br from-[#0b1120] via-[#1e1b4b] to-[#0b1120]',
      gradient: 'from-indigo-950 via-purple-900 to-slate-950',
      englishName: 'Cosmic/Dark',
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      titleKey: 'gallery.ecommerce',
      descKey: 'gallery.ecommerce.desc',
      colors: ['#f97316', '#fbbf24', '#ffffff', '#1a1a1a'],
      preview: 'bg-gradient-to-br from-orange-500 to-amber-400',
      gradient: 'from-orange-500 to-amber-400',
      englishName: 'E-Commerce',
    },
    {
      id: 'creative',
      icon: Palette,
      titleKey: 'gallery.creative',
      descKey: 'gallery.creative.desc',
      colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#fbbf24'],
      preview: 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500',
      gradient: 'from-pink-500 via-purple-500 to-cyan-500',
      englishName: 'Creative',
    },
  ];

  const handleSelectStyle = (style: DesignStyle) => {
    setSelectedStyle(style);
    setPreviewOpen(true);
  };

  const handleConfirmStyle = () => {
    setShowContactForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStyle || !formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.error'),
        description: t('contact.fillAll'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: `Project Inquiry: ${selectedStyle.englishName}`,
          message: `[Design Style: ${selectedStyle.englishName}]\n\n${formData.message}`,
        },
      });

      if (error) throw error;

      toast({
        title: t('contact.success'),
        description: t('contact.successMessage'),
      });
      
      setFormData({ name: '', email: '', message: '' });
      setShowContactForm(false);
      setPreviewOpen(false);
      setSelectedStyle(null);
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="styles" className="py-24 md:py-32 relative overflow-hidden bg-muted/20">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('styles.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('styles.subtitle')}
          </p>
        </motion.div>

        {/* Design Grid with Tilt Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {designStyles.map((style, index) => {
            const Icon = style.icon;
            
            return (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard
                  className="cursor-pointer group"
                  onSelect={() => handleSelectStyle(style)}
                >
                  <div className="glass-card h-full overflow-hidden">
                    {/* Preview area */}
                    <div className={`h-40 ${style.preview} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-white/80 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {t(style.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {t(style.descKey)}
                      </p>

                      {/* Color swatches */}
                      <div className="flex gap-1.5">
                        {style.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-border/50 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={(open) => {
        setPreviewOpen(open);
        if (!open) {
          setShowContactForm(false);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {selectedStyle && t(selectedStyle.titleKey)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedStyle && !showContactForm && (
            <div className="space-y-6">
              {/* Large preview */}
              <div className={`h-64 rounded-xl ${selectedStyle.preview} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <selectedStyle.icon className="w-24 h-24 text-white/80 drop-shadow-lg" />
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground">
                {t(selectedStyle.descKey)}
              </p>

              {/* Color palette */}
              <div>
                <h4 className="text-sm font-medium mb-3">{t('styles.colorPalette')}</h4>
                <div className="flex gap-3">
                  {selectedStyle.colors.map((color, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-border shadow-md mb-1"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Button variant="hero" size="lg" onClick={handleConfirmStyle} className="flex-1 gap-2">
                  <Check className="w-5 h-5" />
                  {t('gallery.select')}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setPreviewOpen(false)}>
                  {t('command.close')}
                </Button>
              </div>
            </div>
          )}

          {selectedStyle && showContactForm && (
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <p className="text-muted-foreground text-sm mb-4">
                {t('styles.inquiryDesc')} <strong>{t(selectedStyle.titleKey)}</strong>
              </p>
              
              <Input
                name="name"
                placeholder={t('contact.name')}
                value={formData.name}
                onChange={handleFormChange}
                disabled={isSubmitting}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder={t('contact.email')}
                value={formData.email}
                onChange={handleFormChange}
                disabled={isSubmitting}
                required
              />
              <Textarea
                name="message"
                placeholder={t('contact.message')}
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                disabled={isSubmitting}
                required
              />
              
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="flex-1 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowContactForm(false)}
                  disabled={isSubmitting}
                >
                  {t('command.back')}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default StyleGallerySection;
