import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

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
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AnimatedSection>
          <AboutSection />
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
          <EducationSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TestimonialsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ContactSection />
        </AnimatedSection>
      </main>
      <Footer />
      <ChatWidget />
      <BackToTop />
    </div>
  );
};

export default Index;
