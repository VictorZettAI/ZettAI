import { motion } from 'framer-motion'
import { Brain, Bot, Database, Cpu, LineChart, Lock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="group relative p-8 rounded-2xl transition-all duration-300 bg-gray-800/50 hover:bg-gray-800/80 hover:shadow-xl"
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500"
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 origin-left scale-x-0 transition-transform group-hover:scale-x-100"
        initial={false}
      />
    </motion.div>
  )
}

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section 
      id="servicios"
      ref={ref}
      className="py-24 relative overflow-hidden bg-[#0B1120]"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
            'radial-gradient(circle at 100% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
            'radial-gradient(circle at 0% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
            'radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
            'radial-gradient(circle at 0% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Nuestros Servicios
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-400">
            Transformamos su negocio con soluciones de IA innovadoras y personalizadas
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
