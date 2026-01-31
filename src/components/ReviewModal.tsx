import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reviewSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  role: z.string().trim().max(100).optional(),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, { message: "Review must be at least 10 characters" }).max(500),
  rating: z.number().min(1).max(5),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const { t, direction } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReviewFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRating = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = reviewSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReviewFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ReviewFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          name: result.data.name,
          role: result.data.role || null,
          company: result.data.company || null,
          message: result.data.message,
          rating: result.data.rating,
        });

      if (error) throw error;

      toast({
        title: t('review.success'),
        description: t('review.successMessage'),
      });

      setFormData({ name: '', role: '', company: '', message: '', rating: 5 });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: t('review.error'),
        description: t('review.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            dir={direction}
          >
            <div className="relative overflow-hidden rounded-2xl glass-card border border-primary/20 shadow-2xl shadow-primary/10 p-6">
              {/* Glow effects */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('review.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('review.name')}
                    className="bg-card/50 border-border/50 focus:border-primary"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder={t('review.role')}
                    className="bg-card/50 border-border/50 focus:border-primary"
                    disabled={isSubmitting}
                  />
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('review.company')}
                    className="bg-card/50 border-border/50 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('review.message')}
                    rows={4}
                    className="bg-card/50 border-border/50 focus:border-primary resize-none"
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t('review.rating')}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredStar || formData.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t('review.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t('review.submit')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
