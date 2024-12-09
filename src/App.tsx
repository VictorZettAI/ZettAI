import { useState, useEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Hero } from './components/Hero'
import Footer from './components/Footer'
import { Chatbot } from './components/Chatbot'
import { ArrowUp } from 'lucide-react'
import { Button } from './components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import DemoSection from './components/DemoSection'
import './styles/animations.css'
import './styles/backgrounds.css'

// Lazy load components for better performance
const Services = lazy(() => import('./components/Services'))
const CaseStudies = lazy(() => import('./components/CaseStudies'))
const Team = lazy(() => import('./components/Team'))
const Contact = lazy(() => import('./components/Contact'))
const Blog = lazy(() => import('./components/Blogs'))
const IAS = lazy(() => import('./components/IAS'))

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
      <Router>
        <div className="min-h-screen bg-[#070914] text-white">
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <Services />
                  <DemoSection />
                  <CaseStudies />
                  <Team />
                  <Contact />
                </main>
              } />
              <Route path="/blog" element={<Blog />} />
              <Route path="/ias" element={<IAS />} />
            </Routes>
          </Suspense>
          <Chatbot />
          <Footer />

          {showScrollTop && (
            <motion.div 
              style={{ opacity }}
              className="fixed bottom-8 right-8 z-50"
            >
              <Button
                size="icon"
                variant="outline"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded-full bg-yellow-500 hover:bg-yellow-400 text-black border-none shadow-lg"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </Router>
    </HelmetProvider>
  )
}
