import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Brain, Bot, Database, Cpu, LineChart, Lock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { SEO } from '../../SEO/SEO'

interface ServiceCardProps {
  title: string
  description: string
  Icon: any
  delay: number
}

const services = [
  {
    title: "Machine Learning Avanzado",
    description: "Implementamos soluciones de ML personalizadas para optimizar sus procesos empresariales y toma de decisiones.",
    Icon: Brain
  },
  {
    title: "Chatbots Inteligentes",
    description: "Desarrollamos asistentes virtuales con IA que mejoran la experiencia del cliente y automatizan el soporte.",
    Icon: Bot
  },
  {
    title: "Big Data Analytics",
    description: "Transformamos grandes volúmenes de datos en insights accionables para su negocio.",
    Icon: Database
  },
  {
    title: "Automatización IA",
    description: "Optimizamos sus operaciones mediante la automatización inteligente de procesos repetitivos.",
    Icon: Cpu
  },
  {
    title: "Análisis Predictivo",
    description: "Anticipamos tendencias y comportamientos para una toma de decisiones más informada.",
    Icon: LineChart
  },
  {
    title: "IA Segura y Ética",
    description: "Implementamos soluciones de IA con los más altos estándares de seguridad y ética.",
    Icon: Lock
  }
]

const ServiceCard = ({ title, description, Icon, delay }: ServiceCardProps) => {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  // Mouse movement animation setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15])  
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15])  
  const glowX = useTransform(mouseX, [-100, 100], [0, 100])
  const glowY = useTransform(mouseY, [-100, 100], [0, 100])
  const z = useTransform(mouseY, [-100, 100], [0, 50])  

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      filter: "blur(10px)",
      rotateX: 20,
      z: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: delay * 0.1
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        z,
        transformStyle: "preserve-3d",
        transformPerspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-6 rounded-xl backdrop-blur-sm 
        ${isHovered ? 'shadow-2xl scale-105' : 'shadow-xl'} 
        transition-all duration-300 ease-out
        bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 hover:border-white/40
        dark:from-gray-800/50 dark:to-gray-900/50
        dark:border-gray-700/50 dark:hover:border-gray-600`}
    >
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
          animate={{ 
            boxShadow: isHovered 
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
        />
      )}
    </motion.div>
  )
}

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      <SEO 
        title="Servicios de IA - ZettAI"
        description="Ofrecemos servicios especializados en inteligencia artificial: procesamiento de lenguaje natural, visión por computadora, análisis predictivo y más."
        type="website"
        keywords={['servicios IA', 'procesamiento lenguaje natural', 'visión por computadora', 'análisis predictivo', 'machine learning servicios']}
      />
      <section 
        id="servicios"
        ref={ref}
        className="relative py-32 bg-black perspective-1000"
      >
        {/* Partículas 3D sutiles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                background: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)',
                transform: `translateZ(${Math.random() * 100}px)`,
                animation: `particle${i} ${Math.random() * 20 + 15}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-6xl mx-auto"
          >
            {/* Title Container with Left Alignment */}
            <div className="flex flex-col items-start space-y-6 mb-24">
              {/* Main Title with Gradient */}
              <motion.div
                variants={{
                  hidden: { 
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 90,
                      damping: 20,
                    }
                  }
                }}
                className="relative"
              >
                <h2 className="text-7xl font-bold leading-tight">
                  <span className="inline-block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                    Nuestros
                    <br />
                    Servicios
                  </span>
                </h2>
              </motion.div>
　　 　 　 　 {/* Description with max width */}
              <motion.p 
                variants={{
                  hidden: { 
                    opacity: 0,
                    y: 20
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 70,
                      damping: 20,
                      delay: 0.1
                    }
                  }
                }}
                className="text-xl text-gray-400 max-w-xl leading-relaxed"
              >
                Transformamos su negocio con soluciones de IA innovadoras y personalizadas, 
                llevando su empresa al siguiente nivel tecnológico
              </motion.p>
            </div>

            {/* Services Grid Container */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              <AnimatePresence>
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    {...service}
                    delay={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          ${[...Array(100)].map((_, i) => `
            @keyframes particle${i} {
              0% {
                transform: translate3d(
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 100}px
                );
              }
              50% {
                transform: translate3d(
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 200}px
                );
              }
              100% {
                transform: translate3d(
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 40 - 20}px,
                  ${Math.random() * 100}px
                );
              }
            }
          `).join('\n')}
        `}</style>
      </section>
    </>
  )
}
