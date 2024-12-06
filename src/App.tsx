import { useState, useEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <HelmetProvider>
      <div className="w-full min-h-screen">
        <div className={`w-full min-h-screen flex flex-col items-stretch ${isDarkMode ? 'bg-[#0b1120] text-white' : 'bg-white text-gray-900'}`}>
          <Header 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          <main className="w-full flex-1">
            {/* Hero - Carga inmediata para mejor First Contentful Paint */}
            <Hero isDarkMode={isDarkMode} />
            
            {/* Lazy load del resto de secciones */}
            <Suspense fallback={<LoadingFallback />}>
              {/* Servicios - Qué ofrecemos */}
              <Services isDarkMode={isDarkMode} />
              
              {/* Demo Section */}
              <DemoSection isDarkMode={isDarkMode} />
              
              {/* Casos de Éxito - Prueba social */}
              <CaseStudies isDarkMode={isDarkMode} />
              
              {/* Equipo - Generar confianza */}
              <Team isDarkMode={isDarkMode} />
              
              {/* Contacto - Llamada a la acción principal */}
              <Contact isDarkMode={isDarkMode} />
            </Suspense>
          </main>
          
          <Footer isDarkMode={isDarkMode} />
        </div>
        
        <Chatbot isDarkMode={isDarkMode} />
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-24 md:bottom-8 right-8 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full shadow-lg ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              }`}
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </HelmetProvider>
  )
}
