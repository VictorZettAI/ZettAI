import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Sparkles, MousePointer2, ArrowDown, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface HeroProps {
}

export function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const controls = useAnimationControls()
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  
  const springConfig = { 
    stiffness: 50, 
    damping: 12,   
    mass: 1
  }
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [2, -2]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-2, 2]), springConfig)
  const parallaxY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig)
  const parallaxX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.75
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
      const smoothing = 0.08
      mouseX.set(lerp(mouseX.get(), clientX, smoothing))
      mouseY.set(lerp(mouseY.get(), clientY, smoothing))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const titleVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08
      }
    }
  }

  const wordVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      rotateX: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: { 
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.98,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  }

  const sparkleVariants = {
    initial: { scale: 0.8, rotate: 0 },
    animate: { 
      scale: [0.8, 1, 0.8],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const scrollIndicatorVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: [0.4, 0.8, 0.4],
      y: [0, 8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const backgroundPatternVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
        'radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
        'radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
        'radial-gradient(circle at 20% 80%, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75]
      }
    }
  }

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1120]"
      style={{
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background patterns */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        variants={backgroundPatternVariants}
        animate="animate"
      />

      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          y, 
          scale,
          x: parallaxX,
          transformStyle: "preserve-3d"
        }}
        animate={{ opacity: isVideoLoaded ? 0.8 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-[120%] transition-all duration-1000 transform"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/videos/poster.jpg"
        >
          <source src="/videos/ai-backgrounds.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content with Enhanced Animations */}
      <motion.div 
        className="container mx-auto px-4 py-32 relative z-20"
        style={{ 
          opacity,
          y: parallaxY,
          transformStyle: "preserve-3d"
        }}
        variants={titleVariants}
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            variants={titleVariants}
          >
            {["Potencia", "tu", "Negocio", "con"].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mx-2"
                variants={wordVariants}
                whileHover="hover"
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="block mt-3 text-yellow-500"
              variants={wordVariants}
              whileHover="hover"
            >
              Inteligencia Artificial
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={wordVariants}
            className="text-xl md:text-2xl mb-14 text-gray-300"
          >
            Automatiza, optimiza y escala tus operaciones con soluciones de IA personalizadas
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={titleVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-yellow-500 hover:bg-yellow-400 text-white border-none"
              >
                <span className="relative z-10 flex items-center">
                  Comienza Ahora
                  <motion.span 
                    className="ml-2"
                    variants={sparkleVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-yellow-400"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden border-2 border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50"
              >
                <span className="relative z-10 flex items-center text-white/80 group-hover:text-white">
                  Ver Demo
                  <motion.span
                    className="ml-2"
                    animate={{
                      x: [0, 5, 0],
                      opacity: [1, 0.6, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gray-800"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
      >
        <ArrowDown className="w-6 h-6 text-white/80" />
      </motion.div>
    </motion.section>
  )
}
