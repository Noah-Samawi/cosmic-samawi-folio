import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TerminalAbout from '@/components/TerminalAbout';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SectionSkeleton from '@/components/SectionSkeleton';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy-load all below-fold components
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const StartupStarterKit = lazy(() => import('@/components/StartupStarterKit'));
const BentoSkillsGrid = lazy(() => import('@/components/BentoSkillsGrid'));
const AIInsightsSection = lazy(() => import('@/components/AIInsightsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const AIRadar = lazy(() => import('@/components/AIRadar'));
const CaseStudiesSection = lazy(() => import('@/components/CaseStudiesSection'));
const TechStackGrid = lazy(() => import('@/components/TechStackGrid'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
const DesignGallery = lazy(() => import('@/components/DesignGallery'));

// Deferred ChatWidget
const ChatWidget = lazy(() => import('@/components/ChatWidget'));

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
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleOpenDesignGallery = () => setIsDesignGalleryOpen(true);
    window.addEventListener('openDesignGallery', handleOpenDesignGallery);
    return () => window.removeEventListener('openDesignGallery', handleOpenDesignGallery);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <AnimatedSection>
          <TerminalAbout />
        </AnimatedSection>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <ServicesSection />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <StartupStarterKit />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <BentoSkillsGrid />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <AIInsightsSection />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <ProjectsSection />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={null}>
          <AIRadar />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <CaseStudiesSection />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <TechStackGrid />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <TestimonialsSection />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AnimatedSection delay={0.1}>
            <ContactSection />
          </AnimatedSection>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {showChat && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
      <BackToTop />
      <Suspense fallback={null}>
        <DesignGallery 
          isOpen={isDesignGalleryOpen} 
          onClose={() => setIsDesignGalleryOpen(false)} 
        />
      </Suspense>
    </div>
  );
};

export default Index;
