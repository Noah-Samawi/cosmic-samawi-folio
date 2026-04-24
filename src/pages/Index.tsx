import React, { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AiNativeStatement from '@/components/AiNativeStatement';
import MetricsBar from '@/components/MetricsBar';
import TrustStrip from '@/components/TrustStrip';
import ServicesSection from '@/components/ServicesSection';
import ApproachSection from '@/components/ApproachSection';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SectionSkeleton from '@/components/SectionSkeleton';
import { useLanguage } from '@/contexts/LanguageContext';

const TerminalAbout = lazy(() => import('@/components/TerminalAbout'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ProcessTimeline = lazy(() => import('@/components/ProcessTimeline'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

const Index: React.FC = () => {
  const { direction } = useLanguage();

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <AiNativeStatement />
        <MetricsBar />
        <TrustStrip />
        <ServicesSection />
        <ApproachSection />
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ProcessTimeline />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TerminalAbout />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
};

export default Index;

