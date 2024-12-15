import { useState, useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useScroll, useTransform } from 'framer-motion';

// Importaciones con @
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import { Chatbot } from '@/components/ui/Chatbot';
import { DemoSection } from '@/components/sections/DemoSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { SEOProvider } from '@/providers/SEOProvider';
import { appConfig } from '@/config';
import '@/styles/animations.css';

// Lazy load components for better performance
const LazyServices = lazy(() => import('@/components/sections/Services').then(module => ({ default: module.Services })));
const LazyCaseStudies = lazy(() => import('@/components/sections/CaseStudies').then(module => ({ default: module.CaseStudies })));
const LazyTeam = lazy(() => import('@/components/sections/Team').then(module => ({ default: module.Team })));
const LazyContact = lazy(() => import('@/components/sections/Contact').then(module => ({ default: module.Contact })));
const LazyBlog = lazy(() => import('@/components/sections/Blog').then(module => ({ default: module.Blog })));
const LazyIAS = lazy(() => import('@/components/sections/IAS').then(module => ({ default: module.IAS })));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <SEOProvider>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-[#070914] text-white">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={
                  <main>
                    <Hero />
                    <Services />
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyCaseStudies />
                      <DemoSection />
                      <LazyTeam />
                      <Contact />
                      <Testimonials />
                    </Suspense>
                  </main>
                } />
                <Route path="/blog" element={<LazyBlog />} />
                <Route path="/ias" element={<LazyIAS />} />
              </Routes>
            </Suspense>
            <Chatbot />
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </SEOProvider>
  )
}

export default App;
