import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  isDarkMode: boolean
}

export function Hero({ isDarkMode }: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.75 // Ralentizar el video para un efecto más suave
    }
  }, [])

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-[#0B1120]' : 'bg-white'}`}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`object-cover w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/videos/poster.jpg"
        >
          <source src="/videos/ai-backgrounds.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Potencia tu Negocio con{' '}
            <span className={isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}>
              Inteligencia Artificial
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-xl md:text-2xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Transformamos tu empresa con soluciones de IA personalizadas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('contacto')}
              className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/20"
            >
              Empieza Ahora
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('servicios')}
              className={`px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-gray-800/20' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-gray-200/20'
              }`}
            >
              Conoce Más
            </motion.button>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-10 w-20 h-20 opacity-20"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
                : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.4), transparent)'
            }}
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-10 w-32 h-32 opacity-20"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
                : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.4), transparent)'
            }}
          />
        </div>
      </div>
    </section>
  )
}
