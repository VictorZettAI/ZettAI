import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Sparkles, MousePointer2, ArrowDown, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import geometricBg from '../assets/robot.jpg'
import circuitLines from '../assets/circuit-lines.jpg'

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
      y: 20,
      filter: "blur(5px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08
      }
    }
  }

  const wordVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      rotateX: 20,
      filter: "blur(3px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
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

  const mouseInteractionVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: 1,
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
        'radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
        'radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
        'radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
        'radial-gradient(circle at 20% 80%, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75]
      }
    }
  }

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo de circuitos */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${circuitLines})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center -250px',
          opacity: 0.6
        }}
      />

      {/* Imagen principal */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          delay: 0.3
        }}
        style={{
          backgroundImage: `url(${geometricBg})`,
          backgroundSize: '85%',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="ml-auto w-full md:w-1/2 text-right"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            filter: isHovered ? "brightness(1.1)" : "brightness(1)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            variants={titleVariants}
          >
            {["Potencia", "tu", "Negocio", "con"].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block ml-4"
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
            className="flex flex-col sm:flex-row gap-6 justify-end"
            variants={titleVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4,
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-yellow-500 hover:bg-yellow-400 text-white border-none button-pulse"
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
                className="group relative overflow-hidden border-2 border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 button-pulse"
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
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover-scale"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-6 h-6 text-white/80" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
