import { useState, useEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import { Hero } from './components/Hero'
import Footer from './components/Footer'
import { Chatbot } from './components/Chatbot'
import { ArrowUp } from 'lucide-react'
import { Button } from './components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import DemoSection from './components/DemoSection'

// Lazy load components for better performance
const Services = lazy(() => import('./components/Services'))
const CaseStudies = lazy(() => import('./components/CaseStudies'))
const Team = lazy(() => import('./components/Team'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
  </div>
)

export default function App() {
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
    <HelmetProvider>
      <div className="min-h-screen bg-[#070914] text-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <main>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <Services />
            <CaseStudies />
            <DemoSection />
            <Team />
            <Contact />
          </Suspense>
        </main>

        <Footer />
        <Chatbot />

        {/* Scroll to top button */}
        <motion.div
          style={{ opacity }}
          className="fixed bottom-8 right-8 z-50"
        >
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-yellow-500 text-gray-900 shadow-lg hover:bg-yellow-400 transition-colors"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </HelmetProvider>
  )
}
