import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import HireMeSection from '@/components/HireMeSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StyleGallerySection from '@/components/StyleGallerySection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SectionSkeleton from '@/components/SectionSkeleton';
import DesignGallery from '@/components/DesignGallery';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load Contact section for better LCP performance
const ContactSection = lazy(() => import('@/components/ContactSection'));

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

  // Listen for design gallery open event from command palette
  useEffect(() => {
    const handleOpenDesignGallery = () => {
      setIsDesignGalleryOpen(true);
    };

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
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <HireMeSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ServicesSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ProjectsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <SkillsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <StyleGallerySection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <EducationSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TestimonialsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Suspense fallback={<SectionSkeleton type="contact" />}>
            <ContactSection />
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
