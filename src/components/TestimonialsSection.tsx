import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, PenLine } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import ReviewModal from './ReviewModal';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  nameKey?: string;
  roleKey?: string;
  companyKey?: string;
  quoteKey?: string;
  name?: string;
  role?: string;
  company?: string;
  message?: string;
  rating: number;
  isFromDB?: boolean;
}

const staticTestimonials: Testimonial[] = [
  {
    id: '1',
    nameKey: 'testimonials.1.name',
    roleKey: 'testimonials.1.role',
    companyKey: 'testimonials.1.company',
    quoteKey: 'testimonials.1.quote',
    rating: 5,
  },
  {
    id: '2',
    nameKey: 'testimonials.2.name',
    roleKey: 'testimonials.2.role',
    companyKey: 'testimonials.2.company',
    quoteKey: 'testimonials.2.quote',
    rating: 5,
  },
  {
    id: '3',
    nameKey: 'testimonials.3.name',
    roleKey: 'testimonials.3.role',
    companyKey: 'testimonials.3.company',
    quoteKey: 'testimonials.3.quote',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([]);

  // Fetch approved reviews from database
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const formattedReviews: Testimonial[] = data.map(review => ({
          id: review.id,
          name: review.name,
          role: review.role || undefined,
          company: review.company || undefined,
          message: review.message,
          rating: review.rating,
          isFromDB: true,
        }));
        setDbTestimonials(formattedReviews);
      }
    };

    fetchReviews();
  }, []);

  const allTestimonials = [...staticTestimonials, ...dbTestimonials];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!api) return;
    if (e.key === 'ArrowLeft') {
      api.scrollPrev();
    } else if (e.key === 'ArrowRight') {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getTestimonialName = (testimonial: Testimonial) => 
    testimonial.isFromDB ? testimonial.name : t(testimonial.nameKey!);
  
  const getTestimonialRole = (testimonial: Testimonial) => 
    testimonial.isFromDB ? testimonial.role : t(testimonial.roleKey!);
  
  const getTestimonialCompany = (testimonial: Testimonial) => 
    testimonial.isFromDB ? testimonial.company : t(testimonial.companyKey!);
  
  const getTestimonialQuote = (testimonial: Testimonial) => 
    testimonial.isFromDB ? testimonial.message : t(testimonial.quoteKey!);

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden" dir={direction}>
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {t('testimonials.subtitle')}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsReviewModalOpen(true)}
            className="gap-2 border-primary/30 hover:bg-primary/10"
          >
            <PenLine className="w-4 h-4" />
            {t('testimonials.writeReview')}
          </Button>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto px-12 group/carousel"
          onMouseEnter={() => api?.plugins()?.autoplay?.stop()}
          onMouseLeave={() => api?.plugins()?.autoplay?.play()}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
              direction: direction,
            }}
            plugins={[
              Autoplay({
                delay: 4500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {allTestimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    {/* Glassmorphism Card */}
                    <div className="h-full p-6 md:p-8 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
                      {/* Cosmic glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
                      </div>

                      {/* Quote icon */}
                      <div className="mb-6 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Quote className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4 relative z-10">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                      </div>

                      {/* Quote text */}
                      <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-6 relative z-10 italic">
                        "{getTestimonialQuote(testimonial)}"
                      </p>

                      {/* Author */}
                      <div className="relative z-10 flex items-center gap-4">
                        {/* Avatar placeholder with gradient */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {getTestimonialName(testimonial)?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {getTestimonialName(testimonial)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getTestimonialRole(testimonial)} {getTestimonialCompany(testimonial) && `· ${getTestimonialCompany(testimonial)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 border-primary/20 hover:bg-primary/10 hover:border-primary/40" />
            <CarouselNext className="hidden md:flex -right-4 border-primary/20 hover:bg-primary/10 hover:border-primary/40" />
          </Carousel>

          {/* Mobile indicators */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {allTestimonials.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/30"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
};

export default TestimonialsSection;
