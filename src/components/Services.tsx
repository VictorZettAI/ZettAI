import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Brain, Bot, Database, Cpu, LineChart, Lock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

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
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])
  const glowX = useTransform(mouseX, [-100, 100], [0, 100])
  const glowY = useTransform(mouseY, [-100, 100], [0, 100])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
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
      rotateX: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: delay * 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -45,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: (delay * 0.1) + 0.3
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 transform-gpu transition-all duration-300"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              to bottom right,
              rgba(234, 179, 8, 0.2),
              transparent,
              rgba(234, 179, 8, 0.2)
            )
          `,
          filter: "blur(1px)",
          transformStyle: "preserve-3d",
          transform: "translateZ(-1px)"
        }}
      />

      {/* Glow effect following mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(
              circle at ${x}% ${y}%,
              rgba(234, 179, 8, 0.15),
              transparent 80%
            )`
          ),
          transformStyle: "preserve-3d",
          transform: "translateZ(-2px)"
        }}
      />
      
      <motion.div
        className="relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <motion.div
            variants={iconVariants}
            className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 text-yellow-500 transform-gpu"
            style={{ transform: "translateZ(30px)" }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
          <motion.h3 
            className="text-xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent"
            variants={{
              hover: {
                x: 5,
                transition: { duration: 0.2 }
              }
            }}
            style={{ transform: "translateZ(25px)" }}
          >
            {title}
          </motion.h3>
        </div>
        
        <motion.p 
          className="text-base leading-relaxed text-gray-400"
          variants={{
            hover: {
              y: -2,
              transition: { duration: 0.2 }
            }
          }}
          style={{ transform: "translateZ(15px)" }}
        >
          {description}
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, rgba(234, 179, 8, 0.7) 0%, rgba(234, 179, 8, 0.3) 100%)",
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)"
          }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section 
      id="servicios"
      ref={ref}
      className="relative py-32 overflow-hidden bg-black"
    >
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
    </section>
  )
}
