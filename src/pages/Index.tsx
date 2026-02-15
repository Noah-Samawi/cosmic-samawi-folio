import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoServicesSection from '@/components/BentoServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SectionSkeleton from '@/components/SectionSkeleton';
import DesignGallery from '@/components/DesignGallery';
import { useLanguage } from '@/contexts/LanguageContext';

const MultiStepInquiry = lazy(() => import('@/components/MultiStepInquiry'));

// Section wrapper with scroll-triggered animations
const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.22, 1, 0.36, 1] 
    }}
  >
    {children}
  </motion.div>
);

const Index: React.FC = () => {
  const { direction } = useLanguage();
  const [isDesignGalleryOpen, setIsDesignGalleryOpen] = useState(false);

  useEffect(() => {
    const handleOpenDesignGallery = () => setIsDesignGalleryOpen(true);
    window.addEventListener('openDesignGallery', handleOpenDesignGallery);
    return () => window.removeEventListener('openDesignGallery', handleOpenDesignGallery);
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <AnimatedSection>
          <BentoServicesSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <CaseStudiesSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <SkillsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TestimonialsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Suspense fallback={<SectionSkeleton type="contact" />}>
            <MultiStepInquiry />
          </Suspense>
        </AnimatedSection>
      </main>
      <Footer />
      <ChatWidget />
      <BackToTop />
      <DesignGallery 
        isOpen={isDesignGalleryOpen} 
        onClose={() => setIsDesignGalleryOpen(false)} 
      />
    </div>
  );
};

export default Index;
